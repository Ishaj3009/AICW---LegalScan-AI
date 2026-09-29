"""Fast OCR engine for LegalScan AI.

The previous implementation ran EasyOCR FIVE times per image on CPU.
That was the primary latency risk. This version:
- decodes once
- resizes to a bounded working resolution
- performs ONE normal OCR pass
- performs ONE fallback pass only when the first pass finds no usable text
- maps bounding boxes back to original-image coordinates
- keeps EasyOCR loaded once at service startup
"""

import time
import easyocr
import numpy as np
import cv2

print("[OCR] Initializing EasyOCR once...")
_reader_started = time.perf_counter()
reader = easyocr.Reader(["en"], gpu=False, verbose=False)
print(f"[OCR] EasyOCR ready in {time.perf_counter() - _reader_started:.2f}s")

# Keep CPU OCR bounded. 1600 is enough for most package labels while being
# dramatically cheaper than running OCR over 3000-6000px phone photographs.
MAX_OCR_DIMENSION = 1600
MAX_RESULTS = 80
FALLBACK_MAX_RESULTS = 50


def _normalize_text(text: str) -> str:
    if not text:
        return ""
    return " ".join(str(text).strip().lower().split())


def _resize_for_ocr(img):
    """Resize while preserving aspect ratio and return scale factors."""
    h, w = img.shape[:2]
    max_dim = max(h, w)

    if max_dim <= MAX_OCR_DIMENSION:
        return img, 1.0, 1.0

    scale = MAX_OCR_DIMENSION / float(max_dim)
    new_w = max(1, int(round(w * scale)))
    new_h = max(1, int(round(h * scale)))

    resized = cv2.resize(
        img,
        (new_w, new_h),
        interpolation=cv2.INTER_AREA,
    )

    # Factors to map OCR coordinates back to the original image.
    return resized, w / float(new_w), h / float(new_h)


def _enhance_for_fallback(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    return clahe.apply(gray)


def _run_reader(img, pass_name: str):
    """Run one deliberately bounded EasyOCR pass."""
    started = time.perf_counter()

    results = reader.readtext(
        img,
        detail=1,
        paragraph=False,
        text_threshold=0.35,
        low_text=0.15,
        link_threshold=0.25,
        canvas_size=1600,
        mag_ratio=1.0,
        # Keep CPU memory/work predictable.
        batch_size=1,
        width_ths=0.7,
        height_ths=0.7,
    )

    elapsed = time.perf_counter() - started
    print(f"[OCR] {pass_name}: {len(results)} raw regions in {elapsed:.2f}s")
    return results


def perform_ocr(image_bytes: bytes) -> list:
    """Fast LegalScan OCR with a maximum of two OCR passes."""
    total_started = time.perf_counter()

    nparr = np.frombuffer(image_bytes, np.uint8)
    original = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if original is None:
        print("[OCR] Invalid image")
        return []

    original_h, original_w = original.shape[:2]
    working, x_scale, y_scale = _resize_for_ocr(original)

    print(
        f"[OCR] {original_w}x{original_h} -> "
        f"{working.shape[1]}x{working.shape[0]}"
    )

    all_results = []

    # ---------------------------------------------------------
    # PASS 1: normal colour image
    # ---------------------------------------------------------
    try:
        raw_results = _run_reader(working, "primary")
    except Exception as exc:
        print(f"[OCR] Primary pass failed: {exc}")
        raw_results = []

    def append_results(results, pass_name):
        for bbox, text, confidence in results:
            text = str(text or "").strip()
            confidence = float(confidence or 0.0)
            if not text or confidence < 0.08:
                continue

            mapped_bbox = []
            for point in bbox:
                x = int(round(float(point[0]) * x_scale))
                y = int(round(float(point[1]) * y_scale))
                x = max(0, min(original_w - 1, x))
                y = max(0, min(original_h - 1, y))
                mapped_bbox.append([x, y])

            all_results.append(
                {
                    "text": text,
                    "bbox": mapped_bbox,
                    "confidence": confidence,
                    "pass": pass_name,
                }
            )

    append_results(raw_results, "primary")

    # ---------------------------------------------------------
    # PASS 2: fallback only if primary found nothing.
    # This is intentionally NOT a five-pass OCR pipeline.
    # ---------------------------------------------------------
    if not all_results:
        print("[OCR] No usable primary text; running fallback pass...")
        try:
            fallback = _enhance_for_fallback(working)
            raw_fallback = _run_reader(fallback, "fallback")
            append_results(raw_fallback, "fallback")
        except Exception as exc:
            print(f"[OCR] Fallback pass failed: {exc}")

    # Strongest result first, then remove exact duplicate text.
    all_results.sort(key=lambda item: item["confidence"], reverse=True)

    unique_results = []
    seen = set()
    for result in all_results:
        normalized = _normalize_text(result["text"])
        if not normalized or normalized in seen:
            continue
        seen.add(normalized)
        unique_results.append(result)
        if len(unique_results) >= MAX_RESULTS:
            break

    print(
        f"[OCR] COMPLETE: {len(unique_results)} unique regions "
        f"in {time.perf_counter() - total_started:.2f}s"
    )

    return unique_results

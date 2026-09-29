import os
import time
from typing import List

import uvicorn
from fastapi import FastAPI, UploadFile, File, Form, HTTPException

from app.models.cnn_classifier import classify_image
from app.pipeline.quality_check import check_image_quality
from app.pipeline.ocr_engine import perform_ocr
from app.pipeline.nlp_extractor import extract_fields
from app.pipeline.rule_engine import evaluate_rules
from app.pipeline.evidence_generator import generate_evidence

app = FastAPI(
    title="LegalScan AI Service",
    version="1.1.0-fast",
)

# Generate evidence only for the strongest OCR regions.
MAX_EVIDENCE_ITEMS_PER_IMAGE = 12


def calculate_ai_confidence(image_analysis, extracted_data):
    if not image_analysis:
        return 0.0

    ocr_scores = []
    for image in image_analysis:
        for item in image.get("ocr", []) or []:
            try:
                score = float(item.get("confidence", 0.0))
            except (TypeError, ValueError):
                score = 0.0
            if score > 1:
                score /= 100.0
            if score > 0:
                ocr_scores.append(min(max(score, 0.0), 1.0))

    ocr_confidence = (
        sum(ocr_scores) / len(ocr_scores) if ocr_scores else 0.0
    )

    mandatory_fields = ("mrp", "net_quantity", "manufacturer")
    detected_count = sum(
        1 for field in mandatory_fields if extracted_data.get(field)
    )
    extraction_coverage = detected_count / len(mandatory_fields)

    quality_scores = []
    for image in image_analysis:
        quality = image.get("quality", {}) or {}
        level = str(quality.get("quality_level", "UNKNOWN")).upper()
        if level == "GOOD":
            quality_scores.append(1.0)
        elif level == "LOW_RESOLUTION":
            quality_scores.append(0.70)
        elif level == "POOR":
            quality_scores.append(0.40)
        else:
            quality_scores.append(0.50)

    quality_score = (
        sum(quality_scores) / len(quality_scores)
        if quality_scores else 0.0
    )

    confidence = (
        ocr_confidence * 45.0
        + extraction_coverage * 40.0
        + quality_score * 15.0
    )
    return round(min(max(confidence, 0.0), 100.0), 2)


@app.post("/api/analyze/full-pipeline")
async def analyze_full_pipeline(
    inspection_id: str = Form(...),
    images: List[UploadFile] = File(...),
):
    if not images:
        raise HTTPException(status_code=400, detail="No images provided")

    request_started = time.perf_counter()

    print("\n================================================")
    print("🤖 LEGALSCAN AI - FAST PIPELINE")
    print(f"🆔 Inspection ID: {inspection_id}")
    print(f"📷 Images received: {len(images)}")
    print("================================================")

    all_extracted_data = {
        "commodity_name": [],
        "product_name": [],
        "mrp": [],
        "net_quantity": [],
        "manufacturer": [],
    }

    all_violations = []
    quality_warnings = []
    quality_failures = []
    classifications = []
    image_analysis = []
    all_evidence = []
    processed_image_bytes = []
    processed_images_count = 0

    for index, image in enumerate(images, start=1):
        image_started = time.perf_counter()
        print(f"\n📷 Processing Image {index}/{len(images)}: {image.filename}")

        image_bytes = await image.read()
        if not image_bytes:
            print("⚠️ Empty image - skipped")
            continue

        print(f"📦 Input bytes: {len(image_bytes):,}")

        # ------------------------------------------------------
        # 1. Quality - cheap OpenCV operation
        # ------------------------------------------------------
        stage = time.perf_counter()
        try:
            quality = check_image_quality(image_bytes)
        except Exception as exc:
            print(f"⚠️ Quality check failed: {exc}")
            quality = {
                "passed": False,
                "blur_detected": False,
                "glare_detected": False,
                "resolution_warning": False,
                "quality_level": "UNKNOWN",
                "message": "Image quality analysis could not be completed.",
                "variance": 0.0,
                "glare_ratio": 0.0,
                "mean_brightness": 0.0,
            }
        print(f"⏱ Quality: {time.perf_counter() - stage:.2f}s")

        warning = {
            "filename": image.filename,
            "quality_level": quality.get("quality_level", "UNKNOWN"),
            "message": quality.get("message", "Image quality may affect OCR."),
            "blur_detected": bool(quality.get("blur_detected", False)),
            "glare_detected": bool(quality.get("glare_detected", False)),
            "resolution_warning": bool(quality.get("resolution_warning", False)),
            "passed": bool(quality.get("passed", False)),
        }

        if not warning["passed"] or warning["blur_detected"] or warning["glare_detected"] or warning["resolution_warning"]:
            quality_warnings.append(warning)

        if not warning["passed"]:
            quality_failures.append(warning["message"])

        # ------------------------------------------------------
        # 2. CNN - lightweight 224x224 inference
        # ------------------------------------------------------
        stage = time.perf_counter()
        try:
            classification = classify_image(image_bytes)
        except Exception as exc:
            print(f"⚠️ CNN failed: {exc}")
            classification = {
                "predicted_class": "UNCLEAR",
                "confidence": 0.0,
                "error": str(exc),
            }
        print(f"⏱ CNN: {time.perf_counter() - stage:.2f}s")
        classifications.append({"filename": image.filename, **classification})

        # ------------------------------------------------------
        # 3. OCR - this is now the optimized one/two-pass engine
        # ------------------------------------------------------
        stage = time.perf_counter()
        try:
            ocr_results = perform_ocr(image_bytes)
        except Exception as exc:
            print(f"❌ OCR failed: {exc}")
            ocr_results = []
        print(f"⏱ OCR: {time.perf_counter() - stage:.2f}s")

        # ------------------------------------------------------
        # 4. NLP extraction
        # ------------------------------------------------------
        stage = time.perf_counter()
        try:
            fields = extract_fields(ocr_results)
        except Exception as exc:
            print(f"❌ NLP extraction failed: {exc}")
            fields = {
                "commodity_name": [],
                "product_name": [],
                "mrp": [],
                "net_quantity": [],
                "manufacturer": [],
            }
        print(f"⏱ NLP: {time.perf_counter() - stage:.2f}s")

        for key in all_extracted_data:
            values = fields.get(key, [])
            if not isinstance(values, list):
                values = [values]
            for value in values:
                if value is None:
                    continue
                value = str(value).strip()
                if value and value not in all_extracted_data[key]:
                    all_extracted_data[key].append(value)

        processed_image_bytes.append((image.filename, image_bytes))

        image_analysis.append({
            "filename": image.filename,
            "cnn": classification,
            "quality": quality,
            "ocr": ocr_results,
            "extracted_fields": fields,
        })

        processed_images_count += 1
        print(f"✅ Image {index} complete in {time.perf_counter() - image_started:.2f}s")

    if processed_images_count == 0:
        raise HTTPException(
            status_code=400,
            detail="No valid images could be processed.",
        )

    # ----------------------------------------------------------
    # 5. Legal rules ONCE after all images are merged
    # ----------------------------------------------------------
    stage = time.perf_counter()
    try:
        violations = evaluate_rules(
            all_extracted_data,
            quality_failures,
            image_quality_results=[item.get("quality", {}) for item in image_analysis],
        )
    except TypeError:
        violations = evaluate_rules(all_extracted_data, quality_failures)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Compliance rule evaluation failed: {exc}",
        )

    all_violations.extend(violations)
    print(f"⏱ Rule engine: {time.perf_counter() - stage:.2f}s")

    # ----------------------------------------------------------
    # 6. Evidence AFTER extraction/rules. Limit the number of crops.
    # ----------------------------------------------------------
    stage = time.perf_counter()
    for analysis, (filename, original_bytes) in zip(image_analysis, processed_image_bytes):
        try:
            ocr_for_evidence = (analysis.get("ocr", []) or [])[:MAX_EVIDENCE_ITEMS_PER_IMAGE]
            if ocr_for_evidence:
                evidence_paths = generate_evidence(
                    original_bytes,
                    ocr_for_evidence,
                    inspection_id,
                )
                all_evidence.extend(evidence_paths)
        except Exception as exc:
            print(f"⚠️ Evidence generation skipped for {filename}: {exc}")
    print(f"⏱ Evidence stage: {time.perf_counter() - stage:.2f}s")

    overall_confidence = calculate_ai_confidence(
        image_analysis,
        all_extracted_data,
    )

    field_keywords = {
        "mrp": ("mrp", "maximum retail price", "rs", "₹", "inr"),
        "net_quantity": ("net quantity", "net qty", "net weight", "net wt", " g", " kg", " ml", " l"),
        "manufacturer": ("manufactured", "manufacturer", "mfg", "mfd", "packed by", "packer"),
    }

    declarations = []
    for key, values in all_extracted_data.items():
        if not values:
            continue

        scores = []
        for image in image_analysis:
            for item in image.get("ocr", []) or []:
                raw_text = str(item.get("text", "")).strip().lower()
                if not raw_text:
                    continue
                keywords = field_keywords.get(key, ())
                if any(keyword in raw_text for keyword in keywords):
                    try:
                        score = float(item.get("confidence", 0.0))
                    except (TypeError, ValueError):
                        score = 0.0
                    if score <= 1:
                        score *= 100
                    scores.append(min(max(score, 0.0), 100.0))

        field_confidence = round(sum(scores) / len(scores), 2) if scores else overall_confidence
        declarations.append({
            "field": key,
            "value": ", ".join(values),
            "confidence": field_confidence,
        })

    total_time = time.perf_counter() - request_started

    result = {
        "inspection_id": inspection_id,
        "processed_images": processed_images_count,
        "declarations": declarations,
        "extracted_data": all_extracted_data,
        "violations": all_violations,
        "quality_warnings": quality_warnings,
        "image_quality": [item.get("quality", {}) for item in image_analysis],
        "classifications": classifications,
        "image_analysis": image_analysis,
        "overall_confidence": overall_confidence,
        "confidence_breakdown": {
            "method": "OCR + extraction coverage + image quality",
            "ocr_weight": 45,
            "extraction_weight": 40,
            "image_quality_weight": 15,
            "overall_confidence": overall_confidence,
        },
        "evidence_files": all_evidence,
        "processing_time_seconds": round(total_time, 2),
    }

    print("\n================================================")
    print("✅ LEGALSCAN AI ANALYSIS COMPLETE")
    print(f"📷 Images processed: {processed_images_count}")
    print(f"⚖️ LM findings: {len(all_violations)}")
    print(f"📋 Declarations: {len(declarations)}")
    print(f"🎯 Confidence: {overall_confidence:.2f}%")
    print(f"⏱ TOTAL TIME: {total_time:.2f}s")
    print("================================================\n")

    return result


@app.get("/")
async def root():
    return {
        "success": True,
        "service": "LegalScan AI",
        "version": "1.1.0-fast",
        "message": "LegalScan AI service is running.",
    }


@app.get("/health")
async def health():
    return {"success": True, "service": "LegalScan AI", "status": "healthy"}


if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=False,
    )

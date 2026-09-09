# # # # import easyocr
# # # # import numpy as np
# # # # import cv2

# # # # reader = easyocr.Reader(['en'], gpu=False) # initialize once

# # # # def perform_ocr(image_bytes: bytes) -> list:
# # # #     """
# # # #     Extracts text and bounding boxes from an image using EasyOCR.
# # # #     Returns a list of dicts: [{'text': str, 'bbox': [[x,y], [x,y], [x,y], [x,y]], 'confidence': float}]
# # # #     """
# # # #     nparr = np.frombuffer(image_bytes, np.uint8)
# # # #     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
# # # #     if img is None:
# # # #         return []
        
# # # #     results = reader.readtext(img)
    
# # # #     extracted_data = []
# # # #     for bbox, text, prob in results:
# # # #         # bbox is a list of 4 points: [[x1, y1], [x2, y2], [x3, y3], [x4, y4]]
# # # #         extracted_data.append({
# # # #             "text": text,
# # # #             "bbox": [[int(coord[0]), int(coord[1])] for coord in bbox],
# # # #             "confidence": float(prob)
# # # #         })
        
# # # #     return extracted_data


# # # import easyocr
# # # import numpy as np
# # # import cv2


# # # # Initialize EasyOCR only once
# # # reader = easyocr.Reader(['en'], gpu=False)


# # # def _preprocess_images(img):
# # #     """
# # #     Create multiple versions of the image to improve OCR
# # #     on small/low-contrast package declarations.
# # #     """

# # #     processed_images = []

# # #     # ---------------------------------------------------------
# # #     # 1. Original image
# # #     # ---------------------------------------------------------
# # #     processed_images.append(img)

# # #     # ---------------------------------------------------------
# # #     # 2. Upscaled image
# # #     # ---------------------------------------------------------
# # #     height, width = img.shape[:2]

# # #     scale = 2

# # #     enlarged = cv2.resize(
# # #         img,
# # #         (width * scale, height * scale),
# # #         interpolation=cv2.INTER_CUBIC
# # #     )

# # #     processed_images.append(enlarged)

# # #     # ---------------------------------------------------------
# # #     # 3. Grayscale + contrast enhancement
# # #     # ---------------------------------------------------------
# # #     gray = cv2.cvtColor(enlarged, cv2.COLOR_BGR2GRAY)

# # #     clahe = cv2.createCLAHE(
# # #         clipLimit=2.0,
# # #         tileGridSize=(8, 8)
# # #     )

# # #     enhanced = clahe.apply(gray)

# # #     processed_images.append(enhanced)

# # #     # ---------------------------------------------------------
# # #     # 4. Sharpened image
# # #     # ---------------------------------------------------------
# # #     sharpen_kernel = np.array([
# # #         [0, -1, 0],
# # #         [-1, 5, -1],
# # #         [0, -1, 0]
# # #     ])

# # #     sharpened = cv2.filter2D(
# # #         enhanced,
# # #         -1,
# # #         sharpen_kernel
# # #     )

# # #     processed_images.append(sharpened)

# # #     return processed_images


# # # def _normalize_text(text):
# # #     """
# # #     Normalize OCR text for duplicate detection.
# # #     """

# # #     if not text:
# # #         return ""

# # #     text = text.strip().lower()

# # #     # Remove excessive spaces
# # #     text = " ".join(text.split())

# # #     return text


# # # def perform_ocr(image_bytes: bytes) -> list:
# # #     """
# # #     Performs multi-pass OCR using EasyOCR.

# # #     OCR is performed on:
# # #     1. Original image
# # #     2. Upscaled image
# # #     3. Contrast-enhanced image
# # #     4. Sharpened image

# # #     Returns:

# # #     [
# # #         {
# # #             "text": str,
# # #             "bbox": [[x,y], [x,y], [x,y], [x,y]],
# # #             "confidence": float
# # #         }
# # #     ]
# # #     """

# # #     # ---------------------------------------------------------
# # #     # Decode image
# # #     # ---------------------------------------------------------

# # #     nparr = np.frombuffer(
# # #         image_bytes,
# # #         np.uint8
# # #     )

# # #     img = cv2.imdecode(
# # #         nparr,
# # #         cv2.IMREAD_COLOR
# # #     )

# # #     if img is None:
# # #         return []

# # #     # ---------------------------------------------------------
# # #     # Generate preprocessing variants
# # #     # ---------------------------------------------------------

# # #     processed_images = _preprocess_images(img)

# # #     all_results = []

# # #     # ---------------------------------------------------------
# # #     # Run OCR on every version
# # #     # ---------------------------------------------------------

# # #     for index, processed_image in enumerate(processed_images):

# # #         try:

# # #             results = reader.readtext(
# # #                 processed_image,
# # #                 detail=1,
# # #                 paragraph=False,
# # #                 text_threshold=0.5,
# # #                 low_text=0.25,
# # #                 link_threshold=0.4,
# # #                 mag_ratio=1.5
# # #             )

# # #             for bbox, text, prob in results:

# # #                 if not text:
# # #                     continue

# # #                 text = text.strip()

# # #                 if not text:
# # #                     continue

# # #                 # Ignore extremely unreliable OCR
# # #                 if float(prob) < 0.20:
# # #                     continue

# # #                 # -------------------------------------------------
# # #                 # Bounding box
# # #                 # -------------------------------------------------

# # #                 clean_bbox = [
# # #                     [
# # #                         int(coord[0]),
# # #                         int(coord[1])
# # #                     ]
# # #                     for coord in bbox
# # #                 ]

# # #                 all_results.append({
# # #                     "text": text,
# # #                     "bbox": clean_bbox,
# # #                     "confidence": float(prob),
# # #                     "pass": index + 1
# # #                 })

# # #         except Exception as error:

# # #             print(
# # #                 f"⚠️ OCR pass {index + 1} failed: {error}"
# # #             )

# # #     # ---------------------------------------------------------
# # #     # Remove duplicate OCR results
# # #     # ---------------------------------------------------------

# # #     unique_results = []

# # #     seen_text = set()

# # #     # Sort by confidence so the strongest OCR
# # #     # result is retained.
# # #     all_results.sort(
# # #         key=lambda x: x["confidence"],
# # #         reverse=True
# # #     )

# # #     for result in all_results:

# # #         normalized = _normalize_text(
# # #             result["text"]
# # #         )

# # #         if not normalized:
# # #             continue

# # #         if normalized in seen_text:
# # #             continue

# # #         seen_text.add(normalized)

# # #         unique_results.append({
# # #             "text": result["text"],
# # #             "bbox": result["bbox"],
# # #             "confidence": result["confidence"]
# # #         })

# # #     # ---------------------------------------------------------
# # #     # Sort final results by confidence
# # #     # ---------------------------------------------------------

# # #     unique_results.sort(
# # #         key=lambda x: x["confidence"],
# # #         reverse=True
# # #     )

# # #     return unique_results

# # import easyocr
# # import numpy as np
# # import cv2


# # # Initialize EasyOCR once
# # reader = easyocr.Reader(['en'], gpu=False)


# # def _prepare_images(img):
# #     """
# #     Prepare a small number of OCR-friendly image versions.
# #     We intentionally keep this to 2 passes because the AI service
# #     is running on CPU.
# #     """

# #     images = []

# #     # ---------------------------------------------------------
# #     # PASS 1: Original image
# #     # ---------------------------------------------------------

# #     images.append(img)

# #     # ---------------------------------------------------------
# #     # PASS 2: Upscaled + contrast enhanced
# #     # ---------------------------------------------------------

# #     height, width = img.shape[:2]

# #     # Don't endlessly enlarge already-large images
# #     if width < 1600:
# #         scale = 2
# #     else:
# #         scale = 1

# #     if scale > 1:

# #         enlarged = cv2.resize(
# #             img,
# #             (width * scale, height * scale),
# #             interpolation=cv2.INTER_CUBIC
# #         )

# #     else:
# #         enlarged = img

# #     gray = cv2.cvtColor(
# #         enlarged,
# #         cv2.COLOR_BGR2GRAY
# #     )

# #     clahe = cv2.createCLAHE(
# #         clipLimit=2.0,
# #         tileGridSize=(8, 8)
# #     )

# #     enhanced = clahe.apply(gray)

# #     images.append(enhanced)

# #     return images


# # def _normalize_text(text):
# #     if not text:
# #         return ""

# #     text = text.strip().lower()

# #     return " ".join(text.split())


# # def perform_ocr(image_bytes: bytes) -> list:
# #     """
# #     Fast multi-pass OCR.

# #     Uses:
# #     1. Original image
# #     2. Upscaled/contrast-enhanced image

# #     Duplicate OCR results are removed.
# #     """

# #     # ---------------------------------------------------------
# #     # Decode image
# #     # ---------------------------------------------------------

# #     nparr = np.frombuffer(
# #         image_bytes,
# #         np.uint8
# #     )

# #     img = cv2.imdecode(
# #         nparr,
# #         cv2.IMREAD_COLOR
# #     )

# #     if img is None:
# #         print("❌ OCR: Invalid image")
# #         return []

# #     print(
# #         f"🔎 OCR image size: "
# #         f"{img.shape[1]}x{img.shape[0]}"
# #     )

# #     # ---------------------------------------------------------
# #     # Prepare images
# #     # ---------------------------------------------------------

# #     processed_images = _prepare_images(img)

# #     all_results = []

# #     # ---------------------------------------------------------
# #     # OCR
# #     # ---------------------------------------------------------

# #     for pass_number, processed_image in enumerate(
# #         processed_images,
# #         start=1
# #     ):

# #         print(
# #             f"📝 OCR pass {pass_number}/{len(processed_images)}..."
# #         )

# #         try:

# #             results = reader.readtext(
# #                 processed_image,
# #                 detail=1,
# #                 paragraph=False,
# #                 text_threshold=0.5,
# #                 low_text=0.25,
# #                 link_threshold=0.4
# #             )

# #             print(
# #                 f"   Found {len(results)} text regions"
# #             )

# #             for bbox, text, confidence in results:

# #                 text = text.strip()

# #                 if not text:
# #                     continue

# #                 confidence = float(confidence)

# #                 # Ignore extremely unreliable OCR
# #                 if confidence < 0.20:
# #                     continue

# #                 clean_bbox = [
# #                     [
# #                         int(point[0]),
# #                         int(point[1])
# #                     ]
# #                     for point in bbox
# #                 ]

# #                 all_results.append({
# #                     "text": text,
# #                     "bbox": clean_bbox,
# #                     "confidence": confidence
# #                 })

# #         except Exception as error:

# #             print(
# #                 f"⚠️ OCR pass {pass_number} failed: "
# #                 f"{error}"
# #             )

# #     # ---------------------------------------------------------
# #     # Remove duplicates
# #     # ---------------------------------------------------------

# #     all_results.sort(
# #         key=lambda x: x["confidence"],
# #         reverse=True
# #     )

# #     unique_results = []
# #     seen = set()

# #     for result in all_results:

# #         normalized = _normalize_text(
# #             result["text"]
# #         )

# #         if not normalized:
# #             continue

# #         if normalized in seen:
# #             continue

# #         seen.add(normalized)

# #         unique_results.append(result)

# #     # ---------------------------------------------------------
# #     # Final OCR output
# #     # ---------------------------------------------------------

# #     print(
# #         f"✅ OCR complete: "
# #         f"{len(unique_results)} unique text regions"
# #     )

# #     if unique_results:

# #         print("📖 OCR TEXT:")

# #         for result in unique_results:

# #             print(
# #                 f"   • {result['text']} "
# #                 f"({result['confidence']:.2f})"
# #             )

# #     else:

# #         print("⚠️ OCR found no usable text")

# #     return unique_results

# import easyocr
# import numpy as np
# import cv2


# # ============================================================
# # INITIALIZE EASYOCR ONCE
# # ============================================================

# print("🔤 Initializing EasyOCR...")

# reader = easyocr.Reader(
#     ['en'],
#     gpu=False
# )

# print("✅ EasyOCR initialized")


# # ============================================================
# # TEXT NORMALIZATION
# # ============================================================

# def _normalize_text(text):
#     if not text:
#         return ""

#     text = str(text).strip().lower()

#     # Normalize whitespace
#     text = " ".join(text.split())

#     return text


# # ============================================================
# # UPSCALE IMAGE
# # ============================================================

# def _upscale_image(img):
#     """
#     Automatically enlarge small package images.

#     Officers do NOT need to check image resolution.
#     The AI pipeline handles small images automatically.
#     """

#     height, width = img.shape[:2]

#     max_dimension = max(height, width)

#     if max_dimension < 500:
#         scale = 4

#     elif max_dimension < 900:
#         scale = 3

#     elif max_dimension < 1400:
#         scale = 2

#     else:
#         scale = 1

#     if scale == 1:
#         return img

#     enlarged = cv2.resize(
#         img,
#         (
#             width * scale,
#             height * scale
#         ),
#         interpolation=cv2.INTER_CUBIC
#     )

#     print(
#         f"   🔍 Upscaled image: "
#         f"{width}x{height} → "
#         f"{enlarged.shape[1]}x{enlarged.shape[0]}"
#     )

#     return enlarged


# # ============================================================
# # SHARPEN IMAGE
# # ============================================================

# def _sharpen_image(img):
#     """
#     Mild sharpening to improve printed label edges.
#     """

#     gaussian = cv2.GaussianBlur(
#         img,
#         (0, 0),
#         1.2
#     )

#     sharpened = cv2.addWeighted(
#         img,
#         1.5,
#         gaussian,
#         -0.5,
#         0
#     )

#     return sharpened


# # ============================================================
# # PREPARE OCR IMAGES
# # ============================================================

# def _prepare_images(img):
#     """
#     Create several OCR-friendly versions.

#     The pipeline automatically handles:
#     - Small images
#     - Low contrast
#     - Slight blur
#     - Uneven lighting
#     - Printed package text

#     We keep the number of passes controlled because
#     the AI service is running on CPU.
#     """

#     processed_images = []

#     # ---------------------------------------------------------
#     # PASS 1
#     # Original / upscaled image
#     # ---------------------------------------------------------

#     enlarged = _upscale_image(img)

#     processed_images.append(
#         ("original", enlarged)
#     )

#     # ---------------------------------------------------------
#     # PASS 2
#     # Grayscale + CLAHE
#     # ---------------------------------------------------------

#     gray = cv2.cvtColor(
#         enlarged,
#         cv2.COLOR_BGR2GRAY
#     )

#     clahe = cv2.createCLAHE(
#         clipLimit=2.5,
#         tileGridSize=(8, 8)
#     )

#     clahe_image = clahe.apply(gray)

#     processed_images.append(
#         ("clahe", clahe_image)
#     )

#     # ---------------------------------------------------------
#     # PASS 3
#     # Sharpened grayscale
#     # ---------------------------------------------------------

#     sharpened = _sharpen_image(
#         clahe_image
#     )

#     processed_images.append(
#         ("sharpened", sharpened)
#     )

#     # ---------------------------------------------------------
#     # PASS 4
#     # Adaptive threshold
#     # ---------------------------------------------------------

#     adaptive = cv2.adaptiveThreshold(
#         clahe_image,
#         255,
#         cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
#         cv2.THRESH_BINARY,
#         31,
#         9
#     )

#     processed_images.append(
#         ("adaptive", adaptive)
#     )

#     return processed_images


# # ============================================================
# # OCR
# # ============================================================

# def perform_ocr(image_bytes: bytes) -> list:
#     """
#     Multi-pass OCR optimized for packaged commodity labels.

#     Pipeline:

#         Original image
#               ↓
#         Automatic upscaling
#               ↓
#         Multiple preprocessing versions
#               ↓
#         EasyOCR
#               ↓
#         Confidence filtering
#               ↓
#         Duplicate removal
#               ↓
#         Final OCR results
#     """

#     # ========================================================
#     # DECODE IMAGE
#     # ========================================================

#     try:

#         nparr = np.frombuffer(
#             image_bytes,
#             np.uint8
#         )

#         img = cv2.imdecode(
#             nparr,
#             cv2.IMREAD_COLOR
#         )

#     except Exception as error:

#         print(
#             f"❌ OCR image decode error: {error}"
#         )

#         return []

#     if img is None:

#         print(
#             "❌ OCR: Invalid image"
#         )

#         return []

#     original_height, original_width = img.shape[:2]

#     print(
#         f"🔎 OCR image size: "
#         f"{original_width}x{original_height}"
#     )

#     # ========================================================
#     # PREPARE IMAGES
#     # ========================================================

#     processed_images = _prepare_images(
#         img
#     )

#     print(
#         f"🧠 OCR prepared "
#         f"{len(processed_images)} image versions"
#     )

#     # ========================================================
#     # RUN OCR
#     # ========================================================

#     all_results = []

#     for pass_number, (pass_name, processed_image) in enumerate(
#         processed_images,
#         start=1
#     ):

#         print(
#             f"📝 OCR pass "
#             f"{pass_number}/{len(processed_images)} "
#             f"[{pass_name}]..."
#         )

#         try:

#             results = reader.readtext(
#                 processed_image,

#                 detail=1,

#                 paragraph=False,

#                 # More tolerant than the previous settings
#                 text_threshold=0.35,

#                 low_text=0.15,

#                 link_threshold=0.25,

#                 # Helps with small text
#                 canvas_size=2560,

#                 mag_ratio=1.0
#             )

#             print(
#                 f"   Found {len(results)} text regions"
#             )

#             # ------------------------------------------------
#             # PROCESS OCR RESULTS
#             # ------------------------------------------------

#             for bbox, text, confidence in results:

#                 if text is None:
#                     continue

#                 text = str(text).strip()

#                 if not text:
#                     continue

#                 confidence = float(
#                     confidence
#                 )

#                 # ------------------------------------------------
#                 # Don't completely discard weak OCR.
#                 #
#                 # Very small package images can produce
#                 # confidence around 0.15-0.30.
#                 #
#                 # NLP extractor will perform its own stronger
#                 # confidence filtering later.
#                 # ------------------------------------------------

#                 if confidence < 0.12:
#                     continue

#                 # ------------------------------------------------
#                 # Clean bounding box
#                 # ------------------------------------------------

#                 clean_bbox = []

#                 for point in bbox:

#                     clean_bbox.append([
#                         int(point[0]),
#                         int(point[1])
#                     ])

#                 all_results.append({

#                     "text": text,

#                     "bbox": clean_bbox,

#                     "confidence": confidence,

#                     "pass": pass_name

#                 })

#         except Exception as error:

#             print(
#                 f"⚠️ OCR pass "
#                 f"{pass_number} failed: "
#                 f"{error}"
#             )

#     # ========================================================
#     # SORT BY CONFIDENCE
#     # ========================================================

#     all_results.sort(
#         key=lambda result:
#             result["confidence"],
#         reverse=True
#     )

#     # ========================================================
#     # REMOVE DUPLICATES
#     # ========================================================

#     unique_results = []

#     seen = set()

#     for result in all_results:

#         normalized = _normalize_text(
#             result["text"]
#         )

#         if not normalized:
#             continue

#         # ----------------------------------------------------
#         # Exact duplicate
#         # ----------------------------------------------------

#         if normalized in seen:
#             continue

#         seen.add(normalized)

#         unique_results.append(
#             result
#         )

#     # ========================================================
#     # SORT RESULTS FOR DISPLAY
#     # ========================================================
#     #
#     # OCR results are initially sorted by confidence.
#     # For downstream processing, confidence is more useful
#     # than spatial order.
#     #
#     # Keep highest confidence first.
#     # ========================================================

#     unique_results.sort(
#         key=lambda result:
#             result["confidence"],
#         reverse=True
#     )

#     # ========================================================
#     # FINAL OUTPUT
#     # ========================================================

#     print(
#         f"✅ OCR complete: "
#         f"{len(unique_results)} unique text regions"
#     )

#     if unique_results:

#         print("")
#         print("📖 OCR TEXT:")

#         for result in unique_results:

#             print(
#                 f"   • {result['text']} "
#                 f""
#                 f"(confidence="
#                 f"{result['confidence']:.2f}, "
#                 f"pass={result.get('pass', 'unknown')})"
#             )

#     else:

#         print(
#             "⚠️ OCR found no usable text"
#         )

#     return unique_results

import easyocr
import numpy as np
import cv2


# ============================================================
# INITIALIZE EASYOCR ONCE
# ============================================================

print("🔤 Initializing EasyOCR...")

reader = easyocr.Reader(
    ['en'],
    gpu=False
)

print("✅ EasyOCR initialized")


# ============================================================
# TEXT NORMALIZATION
# ============================================================

def _normalize_text(text):
    if not text:
        return ""

    text = str(text).strip().lower()

    # Normalize whitespace
    text = " ".join(text.split())

    return text


# ============================================================
# UPSCALE IMAGE
# ============================================================

def _upscale_image(img):
    """
    Automatically enlarge small package images.

    Officers do NOT need to check image resolution.
    The AI pipeline handles small images automatically.
    """

    height, width = img.shape[:2]

    max_dimension = max(height, width)

    if max_dimension < 500:
        scale = 4

    elif max_dimension < 900:
        scale = 3

    elif max_dimension < 1400:
        scale = 2

    else:
        scale = 1

    if scale == 1:
        return img

    enlarged = cv2.resize(
        img,
        (
            width * scale,
            height * scale
        ),
        interpolation=cv2.INTER_CUBIC
    )

    print(
        f"   🔍 Upscaled image: "
        f"{width}x{height} → "
        f"{enlarged.shape[1]}x{enlarged.shape[0]}"
    )

    return enlarged


# ============================================================
# SHARPEN IMAGE
# ============================================================

def _sharpen_image(img):
    """
    Mild sharpening to improve printed label edges.
    """

    gaussian = cv2.GaussianBlur(
        img,
        (0, 0),
        1.2
    )

    sharpened = cv2.addWeighted(
        img,
        1.5,
        gaussian,
        -0.5,
        0
    )

    return sharpened


# ============================================================
# PREPARE OCR IMAGES
# ============================================================

def _prepare_images(img):
    """
    Create multiple OCR-friendly versions for packaged commodity labels.
    """

    processed_images = []

    # 1. Original / automatically upscaled
    enlarged = _upscale_image(img)
    processed_images.append(("original", enlarged))

    # 2. Grayscale + CLAHE
    gray = cv2.cvtColor(
        enlarged,
        cv2.COLOR_BGR2GRAY
    )

    clahe = cv2.createCLAHE(
        clipLimit=2.5,
        tileGridSize=(8, 8)
    )

    clahe_image = clahe.apply(gray)
    processed_images.append(("clahe", clahe_image))

    # 3. Sharpened grayscale
    sharpened = _sharpen_image(clahe_image)
    processed_images.append(("sharpened", sharpened))

    # 4. OTSU threshold
    _, otsu = cv2.threshold(
        clahe_image,
        0,
        255,
        cv2.THRESH_BINARY + cv2.THRESH_OTSU
    )

    processed_images.append(("otsu", otsu))

    # 5. Adaptive threshold
    adaptive = cv2.adaptiveThreshold(
        clahe_image,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        9
    )

    processed_images.append(("adaptive", adaptive))

    return processed_images


# ============================================================
# OCR
# ============================================================

def perform_ocr(image_bytes: bytes) -> list:
    """
    Multi-pass OCR optimized for packaged commodity labels.

    Pipeline:

        Original image
              ↓
        Automatic upscaling
              ↓
        Multiple preprocessing versions
              ↓
        EasyOCR
              ↓
        Confidence filtering
              ↓
        Duplicate removal
              ↓
        Final OCR results
    """

    # ========================================================
    # DECODE IMAGE
    # ========================================================

    try:

        nparr = np.frombuffer(
            image_bytes,
            np.uint8
        )

        img = cv2.imdecode(
            nparr,
            cv2.IMREAD_COLOR
        )

    except Exception as error:

        print(
            f"❌ OCR image decode error: {error}"
        )

        return []

    if img is None:

        print(
            "❌ OCR: Invalid image"
        )

        return []

    original_height, original_width = img.shape[:2]

    print(
        f"🔎 OCR image size: "
        f"{original_width}x{original_height}"
    )

    # ========================================================
    # PREPARE IMAGES
    # ========================================================

    processed_images = _prepare_images(
        img
    )

    print(
        f"🧠 OCR prepared "
        f"{len(processed_images)} image versions"
    )

    # ========================================================
    # RUN OCR
    # ========================================================

    all_results = []

    for pass_number, (pass_name, processed_image) in enumerate(
        processed_images,
        start=1
    ):

        print(
            f"📝 OCR pass "
            f"{pass_number}/{len(processed_images)} "
            f"[{pass_name}]..."
        )

        try:

            results = reader.readtext(
                processed_image,

                detail=1,

                paragraph=False,

                # More tolerant than the previous settings
                text_threshold=0.30,

                low_text=0.10,

                link_threshold=0.20,

                # Helps with small text
                canvas_size=3000,

                mag_ratio=1.0
            )

            print(
                f"   Found {len(results)} text regions"
            )

            # ------------------------------------------------
            # PROCESS OCR RESULTS
            # ------------------------------------------------

            for bbox, text, confidence in results:

                if text is None:
                    continue

                text = str(text).strip()

                if not text:
                    continue

                confidence = float(
                    confidence
                )

                # ------------------------------------------------
                # Don't completely discard weak OCR.
                #
                # Very small package images can produce
                # confidence around 0.15-0.30.
                #
                # NLP extractor will perform its own stronger
                # confidence filtering later.
                # ------------------------------------------------

                if confidence < 0.08:
                    continue

                # ------------------------------------------------
                # Clean bounding box
                # ------------------------------------------------

                clean_bbox = []

                for point in bbox:

                    clean_bbox.append([
                        int(point[0]),
                        int(point[1])
                    ])

                all_results.append({

                    "text": text,

                    "bbox": clean_bbox,

                    "confidence": confidence,

                    "pass": pass_name

                })

        except Exception as error:

            print(
                f"⚠️ OCR pass "
                f"{pass_number} failed: "
                f"{error}"
            )

    # ========================================================
    # SORT BY CONFIDENCE
    # ========================================================

    all_results.sort(
        key=lambda result:
            result["confidence"],
        reverse=True
    )

    # ========================================================
    # REMOVE DUPLICATES
    # ========================================================

    unique_results = []

    seen = set()

    for result in all_results:

        normalized = _normalize_text(
            result["text"]
        )

        if not normalized:
            continue

        # ----------------------------------------------------
        # Exact duplicate
        # ----------------------------------------------------

        if normalized in seen:
            continue

        seen.add(normalized)

        unique_results.append(
            result
        )

    # ========================================================
    # SORT RESULTS FOR DISPLAY
    # ========================================================
    #
    # OCR results are initially sorted by confidence.
    # For downstream processing, confidence is more useful
    # than spatial order.
    #
    # Keep highest confidence first.
    # ========================================================

    unique_results.sort(
        key=lambda result:
            result["confidence"],
        reverse=True
    )

    # ========================================================
    # FINAL OUTPUT
    # ========================================================

    print(
        f"✅ OCR complete: "
        f"{len(unique_results)} unique text regions"
    )

    if unique_results:

        print("")
        print("📖 OCR TEXT:")

        for result in unique_results:

            print(
                f"   • {result['text']} "
                f""
                f"(confidence="
                f"{result['confidence']:.2f}, "
                f"pass={result.get('pass', 'unknown')})"
            )

    else:

        print(
            "⚠️ OCR found no usable text"
        )

    confidence_values = [
        float(result.get("confidence", 0.0))
        for result in unique_results
    ]

    average_confidence = (
        sum(confidence_values) / len(confidence_values)
        if confidence_values
        else 0.0
    )

    print(
        f"📊 OCR average confidence: {average_confidence:.2f}"
    )

    print(
        f"📊 OCR highest confidence: "
        f"{max(confidence_values):.2f}"
        if confidence_values
        else "📊 OCR highest confidence: 0.00"
    )

    return unique_results
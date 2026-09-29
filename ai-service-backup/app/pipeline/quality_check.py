# # # import cv2
# # # import numpy as np

# # # def check_image_quality(image_bytes: bytes) -> dict:
# # #     """
# # #     Analyzes image for blur (Laplacian variance) and glare (brightness threshold).
# # #     Returns a dict with 'passed', 'blur_detected', 'glare_detected', and 'message'.
# # #     """
# # #     nparr = np.frombuffer(image_bytes, np.uint8)
# # #     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
# # #     if img is None:
# # #         return {"passed": False, "message": "Invalid image format."}
        
# # #     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
# # #     # 1. Blur Detection using Laplacian Variance
# # #     variance = cv2.Laplacian(gray, cv2.CV_64F).var()
# # #     blur_threshold = 100.0  # Adjust based on camera/testing
# # #     is_blurred = variance < blur_threshold
    
# # #     # 2. Glare Detection using Brightness Histogram / Thresholding
# # #     # Check if a significant percentage of pixels are fully blown out (white)
# # #     _, thresholded = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY)
# # #     white_pixels = cv2.countNonZero(thresholded)
# # #     total_pixels = gray.shape[0] * gray.shape[1]
# # #     glare_ratio = white_pixels / total_pixels
# # #     glare_threshold = 0.35 # If >35% of image is pure white
# # #     is_glare = glare_ratio > glare_threshold
    
# # #     # Check for extreme overall brightness/darkness as a fallback
# # #     mean_brightness = np.mean(gray)
# # #     if mean_brightness > 220:
# # #         is_glare = True
        
# # #     passed = not (is_blurred or is_glare)
    
# # #     message = "Image quality acceptable."
# # #     if is_blurred and is_glare:
# # #         message = "Image is blurred and contains significant glare. Please capture a clearer image."
# # #     elif is_blurred:
# # #         message = "Image is too blurred. Please capture a clearer image."
# # #     elif is_glare:
# # #         message = "Image contains significant glare. Please capture a clearer image without direct reflections."
        
# # #     return {
# # #         "passed": bool(passed),
# # #         "blur_detected": bool(is_blurred),
# # #         "glare_detected": bool(is_glare),
# # #         "message": message,
# # #         "variance": float(variance),
# # #         "glare_ratio": float(glare_ratio)
# # #     }


# # import cv2
# # import numpy as np


# # def check_image_quality(image_bytes: bytes) -> dict:
# #     """
# #     Analyze image quality for:
# #     - Blur
# #     - Glare
# #     - Overall brightness

# #     Returns quality metrics used by the LegalScan AI pipeline.
# #     """

# #     nparr = np.frombuffer(image_bytes, np.uint8)
# #     img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

# #     if img is None:
# #         return {
# #             "passed": False,
# #             "blur_detected": False,
# #             "glare_detected": False,
# #             "message": "Invalid image format."
# #         }

# #     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# #     # =========================================================
# #     # 1. BLUR DETECTION
# #     # =========================================================

# #     variance = cv2.Laplacian(
# #         gray,
# #         cv2.CV_64F
# #     ).var()

# #     # Lower value = more blurry
# #     blur_threshold = 100.0

# #     is_blurred = variance < blur_threshold

# #     # =========================================================
# #     # 2. GLARE DETECTION
# #     # =========================================================

# #     # Detect pixels that are almost completely white.
# #     _, thresholded = cv2.threshold(
# #         gray,
# #         245,
# #         255,
# #         cv2.THRESH_BINARY
# #     )

# #     white_pixels = cv2.countNonZero(thresholded)

# #     total_pixels = gray.shape[0] * gray.shape[1]

# #     glare_ratio = (
# #         white_pixels / total_pixels
# #         if total_pixels > 0
# #         else 0
# #     )

# #     # Increased from 5% to 35%.
# #     # This prevents normal bright/white packaging
# #     # from being incorrectly classified as glare.
# #     glare_threshold = 0.35

# #     is_glare = glare_ratio > glare_threshold

# #     # =========================================================
# #     # 3. EXTREME BRIGHTNESS CHECK
# #     # =========================================================

# #     mean_brightness = float(np.mean(gray))

# #     # Only classify as glare when the entire image
# #     # is extremely bright.
# #     extreme_brightness = mean_brightness > 235

# #     if extreme_brightness:
# #         is_glare = True

# #     # =========================================================
# #     # 4. FINAL QUALITY RESULT
# #     # =========================================================

# #     passed = not (
# #         is_blurred or
# #         is_glare
# #     )

# #     # =========================================================
# #     # 5. USER-FRIENDLY MESSAGE
# #     # =========================================================

# #     if is_blurred and is_glare:

# #         message = (
# #             "Image is blurred and contains significant glare. "
# #             "Please capture a clearer image."
# #         )

# #     elif is_blurred:

# #         message = (
# #             "Image is too blurred. "
# #             "Please capture a clearer image."
# #         )

# #     elif is_glare:

# #         message = (
# #             "Image contains significant glare. "
# #             "Please capture the package without direct reflections."
# #         )

# #     else:

# #         message = "Image quality acceptable."

# #     # =========================================================
# #     # 6. RETURN RESULTS
# #     # =========================================================

# #     return {
# #         "passed": bool(passed),

# #         "blur_detected": bool(is_blurred),

# #         "glare_detected": bool(is_glare),

# #         "message": message,

# #         "variance": float(variance),

# #         "glare_ratio": float(glare_ratio),

# #         "mean_brightness": mean_brightness
# #     }


# import cv2
# import numpy as np


# # ============================================================
# # IMAGE QUALITY CHECK
# # ============================================================

# def check_image_quality(image_bytes: bytes) -> dict:
#     """
#     Analyze package image quality for:

#     - Blur
#     - Glare
#     - Brightness
#     - Image resolution

#     Important:
#     Resolution alone does NOT make an image invalid.

#     The officer should not have to manually check image
#     dimensions. The AI handles small images automatically.

#     Returns quality metrics used by the LegalScan AI pipeline.
#     """

#     # ========================================================
#     # 1. DECODE IMAGE
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
#             f"❌ QUALITY CHECK decode error: {error}"
#         )

#         return {
#             "passed": False,
#             "blur_detected": False,
#             "glare_detected": False,
#             "resolution_warning": False,
#             "message": "Unable to decode image."
#         }

#     if img is None:

#         print(
#             "❌ QUALITY CHECK: Invalid image"
#         )

#         return {
#             "passed": False,
#             "blur_detected": False,
#             "glare_detected": False,
#             "resolution_warning": False,
#             "message": "Invalid image format."
#         }

#     # ========================================================
#     # IMAGE DIMENSIONS
#     # ========================================================

#     height, width = img.shape[:2]

#     total_pixels = width * height

#     print(
#         f"📷 Quality check image: "
#         f"{width}x{height}"
#     )

#     # ========================================================
#     # 2. GRAYSCALE
#     # ========================================================

#     gray = cv2.cvtColor(
#         img,
#         cv2.COLOR_BGR2GRAY
#     )

#     # ========================================================
#     # 3. RESOLUTION CHECK
#     # ========================================================
#     #
#     # IMPORTANT:
#     #
#     # We do NOT fail the image simply because it is small.
#     #
#     # Small images can still contain readable text.
#     # OCR preprocessing will upscale them automatically.
#     #
#     # This is only informational.
#     # ========================================================

#     smallest_dimension = min(
#         width,
#         height
#     )

#     resolution_warning = (
#         width < 400 or
#         height < 400
#     )

#     if resolution_warning:

#         print(
#             "⚠️ Low-resolution image detected."
#         )

#         print(
#             "   AI OCR preprocessing will "
#             "automatically upscale the image."
#         )

#     # ========================================================
#     # 4. BLUR DETECTION
#     # ========================================================
#     #
#     # Laplacian variance is useful for detecting blur,
#     # but a fixed threshold does not work equally well for
#     # every image size.
#     #
#     # We therefore use a dynamic threshold.
#     # ========================================================

#     variance = cv2.Laplacian(
#         gray,
#         cv2.CV_64F
#     ).var()

#     # --------------------------------------------------------
#     # Dynamic blur threshold
#     # --------------------------------------------------------

#     max_dimension = max(
#         width,
#         height
#     )

#     if max_dimension < 400:

#         # Very small images naturally have lower
#         # focus variance.
#         blur_threshold = 25.0

#     elif max_dimension < 800:

#         blur_threshold = 40.0

#     elif max_dimension < 1400:

#         blur_threshold = 60.0

#     else:

#         blur_threshold = 80.0

#     is_blurred = (
#         variance < blur_threshold
#     )

#     print(
#         f"   Blur variance: "
#         f"{variance:.2f}"
#     )

#     print(
#         f"   Blur threshold: "
#         f"{blur_threshold:.2f}"
#     )

#     print(
#         f"   Blur detected: "
#         f"{is_blurred}"
#     )

#     # ========================================================
#     # 5. GLARE DETECTION
#     # ========================================================
#     #
#     # Detect very bright pixels.
#     #
#     # Normal white packaging should not automatically
#     # become glare.
#     # ========================================================

#     _, thresholded = cv2.threshold(
#         gray,
#         250,
#         255,
#         cv2.THRESH_BINARY
#     )

#     white_pixels = cv2.countNonZero(
#         thresholded
#     )

#     glare_ratio = (
#         white_pixels / total_pixels
#         if total_pixels > 0
#         else 0
#     )

#     # Higher threshold to avoid falsely detecting
#     # white/light coloured packaging as glare.
#     glare_threshold = 0.45

#     is_glare = (
#         glare_ratio > glare_threshold
#     )

#     print(
#         f"   Glare ratio: "
#         f"{glare_ratio:.4f}"
#     )

#     print(
#         f"   Glare detected: "
#         f"{is_glare}"
#     )

#     # ========================================================
#     # 6. MEAN BRIGHTNESS
#     # ========================================================

#     mean_brightness = float(
#         np.mean(gray)
#     )

#     print(
#         f"   Mean brightness: "
#         f"{mean_brightness:.2f}"
#     )

#     # --------------------------------------------------------
#     # Extreme brightness
#     # --------------------------------------------------------

#     extreme_brightness = (
#         mean_brightness > 245
#     )

#     if extreme_brightness:

#         print(
#             "⚠️ Extreme brightness detected."
#         )

#         is_glare = True

#     # ========================================================
#     # 7. DARK IMAGE DETECTION
#     # ========================================================

#     extreme_darkness = (
#         mean_brightness < 20
#     )

#     if extreme_darkness:

#         print(
#             "⚠️ Image is extremely dark."
#         )

#     # ========================================================
#     # 8. FINAL QUALITY DECISION
#     # ========================================================
#     #
#     # IMPORTANT:
#     #
#     # resolution_warning DOES NOT make the image fail.
#     #
#     # Only genuine blur/glare causes quality failure.
#     # ========================================================

#     passed = not (
#         is_blurred or
#         is_glare
#     )

#     # ========================================================
#     # 9. USER-FRIENDLY MESSAGE
#     # ========================================================

#     if is_blurred and is_glare:

#         message = (
#             "Image appears blurred and contains "
#             "significant glare."
#         )

#     elif is_blurred:

#         message = (
#             "Image appears blurred and OCR confidence "
#             "may be reduced."
#         )

#     elif is_glare:

#         message = (
#             "Image contains significant glare that "
#             "may affect OCR."
#         )

#     elif resolution_warning:

#         message = (
#             "Image resolution is low, but the AI will "
#             "automatically enhance and upscale it for OCR."
#         )

#     else:

#         message = (
#             "Image quality acceptable."
#         )

#     # ========================================================
#     # 10. QUALITY LEVEL
#     # ========================================================

#     if is_blurred or is_glare:

#         quality_level = "POOR"

#     elif resolution_warning:

#         quality_level = "LOW_RESOLUTION"

#     else:

#         quality_level = "GOOD"

#     # ========================================================
#     # 11. FINAL LOG
#     # ========================================================

#     print("")
#     print("📊 IMAGE QUALITY RESULT")
#     print(
#         f"   Resolution: {width}x{height}"
#     )
#     print(
#         f"   Quality level: {quality_level}"
#     )
#     print(
#         f"   Blur: {is_blurred}"
#     )
#     print(
#         f"   Glare: {is_glare}"
#     )
#     print(
#         f"   Resolution warning: "
#         f"{resolution_warning}"
#     )
#     print(
#         f"   Passed: {passed}"
#     )
#     print("")

#     # ========================================================
#     # 12. RETURN
#     # ========================================================

#     return {

#         "passed": bool(passed),

#         "blur_detected": bool(
#             is_blurred
#         ),

#         "glare_detected": bool(
#             is_glare
#         ),

#         "resolution_warning": bool(
#             resolution_warning
#         ),

#         "quality_level": quality_level,

#         "message": message,

#         "width": int(width),

#         "height": int(height),

#         "variance": float(
#             variance
#         ),

#         "blur_threshold": float(
#             blur_threshold
#         ),

#         "glare_ratio": float(
#             glare_ratio
#         ),

#         "glare_threshold": float(
#             glare_threshold
#         ),

#         "mean_brightness": mean_brightness,

#         "extreme_brightness": bool(
#             extreme_brightness
#         ),

#         "extreme_darkness": bool(
#             extreme_darkness
#         )
#     }


import cv2
import numpy as np


# ============================================================
# IMAGE QUALITY CHECK
# ============================================================

def check_image_quality(image_bytes: bytes) -> dict:
    """
    Analyze package image quality for:

    - Blur
    - Glare
    - Brightness
    - Image resolution

    Blur detection uses multiple signals instead of relying only
    on Laplacian variance:

    1. Laplacian variance
    2. Edge density
    3. Image dimensions

    This helps reduce false blur detection on clear packages
    containing large smooth areas.

    Resolution alone does NOT make an image invalid.

    Returns quality metrics used by the LegalScan AI pipeline.
    """

    # ========================================================
    # 1. DECODE IMAGE
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
            f"❌ QUALITY CHECK decode error: {error}"
        )

        return {
            "passed": False,
            "blur_detected": False,
            "glare_detected": False,
            "resolution_warning": False,
            "quality_level": "UNKNOWN",
            "message": "Unable to decode image.",
            "variance": 0.0,
            "blur_threshold": 0.0,
            "edge_density": 0.0
        }

    if img is None:

        print(
            "❌ QUALITY CHECK: Invalid image"
        )

        return {
            "passed": False,
            "blur_detected": False,
            "glare_detected": False,
            "resolution_warning": False,
            "quality_level": "UNKNOWN",
            "message": "Invalid image format.",
            "variance": 0.0,
            "blur_threshold": 0.0,
            "edge_density": 0.0
        }

    # ========================================================
    # IMAGE DIMENSIONS
    # ========================================================

    height, width = img.shape[:2]

    total_pixels = width * height

    print(
        f"📷 Quality check image: "
        f"{width}x{height}"
    )

    # ========================================================
    # 2. GRAYSCALE
    # ========================================================

    gray = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2GRAY
    )

    # ========================================================
    # 3. RESOLUTION CHECK
    # ========================================================

    resolution_warning = (
        width < 400 or
        height < 400
    )

    if resolution_warning:

        print(
            "⚠️ Low-resolution image detected."
        )

        print(
            "   AI OCR preprocessing can "
            "upscale the image."
        )

    # ========================================================
    # 4. BLUR DETECTION
    # ========================================================
    #
    # We use TWO independent image signals:
    #
    # A. Laplacian variance
    #    Measures high-frequency detail.
    #
    # B. Edge density
    #    Measures how much useful edge information exists.
    #
    # This is more reliable than using Laplacian variance alone.
    # ========================================================

    variance = cv2.Laplacian(
        gray,
        cv2.CV_64F
    ).var()

    # --------------------------------------------------------
    # Edge detection
    # --------------------------------------------------------

    edges = cv2.Canny(
        gray,
        threshold1=50,
        threshold2=150
    )

    edge_pixels = cv2.countNonZero(
        edges
    )

    edge_density = (
        edge_pixels / total_pixels
        if total_pixels > 0
        else 0.0
    )

    print(
        f"   Blur variance : "
        f"{variance:.2f}"
    )

    print(
        f"   Edge density  : "
        f"{edge_density:.4f}"
    )

    # ========================================================
    # 5. ADAPTIVE BLUR THRESHOLDS
    # ========================================================
    #
    # We do not use one fixed threshold for every image.
    #
    # Larger images normally contain more detail.
    # Smaller images naturally produce lower measurements.
    # ========================================================

    max_dimension = max(
        width,
        height
    )

    if max_dimension < 400:

        variance_threshold = 20.0
        edge_threshold = 0.008

    elif max_dimension < 800:

        variance_threshold = 35.0
        edge_threshold = 0.010

    elif max_dimension < 1400:

        variance_threshold = 50.0
        edge_threshold = 0.012

    else:

        variance_threshold = 65.0
        edge_threshold = 0.014

    # ========================================================
    # 6. BLUR CLASSIFICATION
    # ========================================================
    #
    # IMPORTANT:
    #
    # A low Laplacian score alone does NOT automatically mean
    # blurry.
    #
    # We require BOTH:
    #
    #   low focus variance
    #       AND
    #   very low edge density
    #
    # This prevents clear packaging with smooth backgrounds
    # from being incorrectly classified as blurry.
    # ========================================================

    low_variance = (
        variance < variance_threshold
    )

    low_edge_density = (
        edge_density < edge_threshold
    )

    is_blurred = (
        low_variance and
        low_edge_density
    )

    # ========================================================
    # 7. VERY STRONG BLUR SIGNAL
    # ========================================================
    #
    # If the image has extremely low focus variance, it can
    # still be considered blurry even if a few edges exist.
    #
    # This handles heavily blurred images.
    # ========================================================

    extreme_blur = (
        variance < (
            variance_threshold * 0.45
        )
    )

    if extreme_blur:

        is_blurred = True

    print(
        f"   Variance threshold: "
        f"{variance_threshold:.2f}"
    )

    print(
        f"   Edge threshold: "
        f"{edge_threshold:.4f}"
    )

    print(
        f"   Low variance: "
        f"{low_variance}"
    )

    print(
        f"   Low edge density: "
        f"{low_edge_density}"
    )

    print(
        f"   Extreme blur: "
        f"{extreme_blur}"
    )

    print(
        f"   Blur detected: "
        f"{is_blurred}"
    )

    # ========================================================
    # 8. GLARE DETECTION
    # ========================================================

    _, thresholded = cv2.threshold(
        gray,
        250,
        255,
        cv2.THRESH_BINARY
    )

    white_pixels = cv2.countNonZero(
        thresholded
    )

    glare_ratio = (
        white_pixels / total_pixels
        if total_pixels > 0
        else 0.0
    )

    glare_threshold = 0.45

    is_glare = (
        glare_ratio > glare_threshold
    )

    print(
        f"   Glare ratio: "
        f"{glare_ratio:.4f}"
    )

    print(
        f"   Glare detected: "
        f"{is_glare}"
    )

    # ========================================================
    # 9. MEAN BRIGHTNESS
    # ========================================================

    mean_brightness = float(
        np.mean(gray)
    )

    print(
        f"   Mean brightness: "
        f"{mean_brightness:.2f}"
    )

    # ========================================================
    # 10. EXTREME BRIGHTNESS
    # ========================================================

    extreme_brightness = (
        mean_brightness > 245
    )

    if extreme_brightness:

        print(
            "⚠️ Extreme brightness detected."
        )

        is_glare = True

    # ========================================================
    # 11. DARK IMAGE DETECTION
    # ========================================================

    extreme_darkness = (
        mean_brightness < 20
    )

    if extreme_darkness:

        print(
            "⚠️ Image is extremely dark."
        )

    # ========================================================
    # 12. FINAL QUALITY DECISION
    # ========================================================
    #
    # Resolution alone does NOT fail the image.
    #
    # Genuine blur or significant glare causes quality failure.
    # ========================================================

    passed = not (
        is_blurred or
        is_glare
    )

    # ========================================================
    # 13. USER-FRIENDLY MESSAGE
    # ========================================================

    if is_blurred and is_glare:

        message = (
            "Image appears blurred and contains "
            "significant glare. A clearer image "
            "is recommended for reliable inspection."
        )

    elif is_blurred:

        message = (
            "Image appears genuinely blurred. "
            "A clearer image is recommended for "
            "reliable declaration verification."
        )

    elif is_glare:

        message = (
            "Image contains significant glare that "
            "may affect text verification."
        )

    elif resolution_warning:

        message = (
            "Image resolution is low, but the image "
            "can still be processed. AI OCR preprocessing "
            "can upscale the image."
        )

    else:

        message = (
            "Image quality acceptable."
        )

    # ========================================================
    # 14. QUALITY LEVEL
    # ========================================================

    if is_blurred or is_glare:

        quality_level = "POOR"

    elif resolution_warning:

        quality_level = "LOW_RESOLUTION"

    else:

        quality_level = "GOOD"

    # ========================================================
    # 15. FINAL LOG
    # ========================================================

    print("")
    print("📊 IMAGE QUALITY RESULT")
    print(
        f"   Resolution: "
        f"{width}x{height}"
    )

    print(
        f"   Quality level: "
        f"{quality_level}"
    )

    print(
        f"   Blur: "
        f"{is_blurred}"
    )

    print(
        f"   Glare: "
        f"{is_glare}"
    )

    print(
        f"   Resolution warning: "
        f"{resolution_warning}"
    )

    print(
        f"   Variance: "
        f"{variance:.2f}"
    )

    print(
        f"   Edge density: "
        f"{edge_density:.4f}"
    )

    print(
        f"   Passed: "
        f"{passed}"
    )

    print("")

    # ========================================================
    # 16. RETURN RESULT
    # ========================================================

    return {

        "passed": bool(
            passed
        ),

        "blur_detected": bool(
            is_blurred
        ),

        "glare_detected": bool(
            is_glare
        ),

        "resolution_warning": bool(
            resolution_warning
        ),

        "quality_level": quality_level,

        "message": message,

        "width": int(
            width
        ),

        "height": int(
            height
        ),

        "variance": float(
            variance
        ),

        "blur_threshold": float(
            variance_threshold
        ),

        "edge_density": float(
            edge_density
        ),

        "edge_threshold": float(
            edge_threshold
        ),

        "glare_ratio": float(
            glare_ratio
        ),

        "glare_threshold": float(
            glare_threshold
        ),

        "mean_brightness": float(
            mean_brightness
        ),

        "extreme_brightness": bool(
            extreme_brightness
        ),

        "extreme_darkness": bool(
            extreme_darkness
        )
    }
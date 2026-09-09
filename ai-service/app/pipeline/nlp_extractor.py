# # # import re

# # # def extract_fields(ocr_results: list) -> dict:
# # #     """
# # #     Extracts key fields like MRP, Net Quantity, Manufacturer from OCR results.
# # #     Returns a dict of lists to handle multiple detections across angles.
# # #     """
# # #     full_text = " ".join([item['text'] for item in ocr_results])
    
# # #     extracted = {
# # #         "mrp": [],
# # #         "net_quantity": [],
# # #         "manufacturer": []
# # #     }
    
# # #     # MRP extraction
# # #     mrp_matches = re.finditer(r'(?i)(?:mrp|rs\.?|,1|rupees|₹)\s*[:\.-]?\s*(\d+(?:\.\d{1,2})?)', full_text)
# # #     for match in mrp_matches:
# # #         val = match.group(1).strip()
# # #         if val not in extracted["mrp"]:
# # #             extracted["mrp"].append(val)
        
# # #     # Net Quantity extraction
# # #     qty_matches = re.finditer(r'(?i)(\d+(?:\.\d+)?)\s*(kg|g|ml|l|litre|grams)\b', full_text)
# # #     for match in qty_matches:
# # #         val = f"{match.group(1)}{match.group(2).lower()}"
# # #         if val not in extracted["net_quantity"]:
# # #             extracted["net_quantity"].append(val)
        
# # #     # Manufacturer / Packed by
# # #     mfg_matches = re.finditer(r'(?i)(?:manufactured by|mfg by|pkd by|packed by|marketed by)\s*[:-]?\s*([^,.\n]+)', full_text)
# # #     for match in mfg_matches:
# # #         val = match.group(1).strip()
# # #         if len(val) > 3 and val not in extracted["manufacturer"]:
# # #             extracted["manufacturer"].append(val)
            
# # #     return extracted


# # import tensorflow as tf
# # from tensorflow.keras.applications import MobileNetV2
# # from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
# # from tensorflow.keras.models import Model
# # from tensorflow.keras.preprocessing.image import ImageDataGenerator
# # import os
# # import numpy as np
# # import cv2

# # CLASSES = ['FRONT', 'BACK', 'LEFT', 'RIGHT', 'TOP', 'BOTTOM', 'GLARE']
# # IMG_SIZE = 224
# # BATCH_SIZE = 32
# # EPOCHS = 5

# # def create_model(num_classes=len(CLASSES)):
# #     base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(IMG_SIZE, IMG_SIZE, 3))
# #     x = base_model.output
# #     x = GlobalAveragePooling2D()(x)
# #     x = Dense(128, activation='relu')(x)
# #     predictions = Dense(num_classes, activation='softmax')(x)
    
# #     model = Model(inputs=base_model.input, outputs=predictions)
    
# #     for layer in base_model.layers:
# #         layer.trainable = False
        
# #     model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
# #     return model

# # def generate_synthetic_dataset(base_dir):
# #     """Generate synthetic images if real dataset is not present."""
# #     print("Generating synthetic dataset for multi-angle and glare scenarios...")
# #     for cls in CLASSES:
# #         cls_dir = os.path.join(base_dir, cls)
# #         os.makedirs(cls_dir, exist_ok=True)
# #         # Create 10 dummy images per class
# #         for i in range(10):
# #             img = np.random.randint(0, 255, (IMG_SIZE, IMG_SIZE, 3), dtype=np.uint8)
# #             if cls == 'GLARE':
# #                 # Add a bright spot to simulate glare
# #                 cv2.circle(img, (IMG_SIZE//2, IMG_SIZE//2), 50, (255, 255, 255), -1)
# #             else:
# #                 # Add text to simulate product panels
# #                 cv2.putText(img, cls, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 0), 2)
# #             cv2.imwrite(os.path.join(cls_dir, f'img_{i}.png'), img)

# # def train_model(dataset_dir):
# #     print("Initializing training for LegalScan Multi-Angle CNN...")
    
# #     # Check if dataset exists, if not generate synthetic data
# #     if not os.path.exists(dataset_dir) or len(os.listdir(dataset_dir)) == 0:
# #         generate_synthetic_dataset(dataset_dir)
        
# #     datagen = ImageDataGenerator(
# #         rescale=1./255,
# #         rotation_range=20,
# #         width_shift_range=0.2,
# #         height_shift_range=0.2,
# #         horizontal_flip=True,
# #         validation_split=0.2
# #     )
    
# #     train_generator = datagen.flow_from_directory(
# #         dataset_dir,
# #         target_size=(IMG_SIZE, IMG_SIZE),
# #         batch_size=BATCH_SIZE,
# #         class_mode='categorical',
# #         subset='training'
# #     )
    
# #     val_generator = datagen.flow_from_directory(
# #         dataset_dir,
# #         target_size=(IMG_SIZE, IMG_SIZE),
# #         batch_size=BATCH_SIZE,
# #         class_mode='categorical',
# #         subset='validation'
# #     )
    
# #     model = create_model()
    
# #     print("Starting training...")
# #     model.fit(
# #         train_generator,
# #         epochs=EPOCHS,
# #         validation_data=val_generator
# #     )
    
# #     save_dir = os.path.join(os.path.dirname(__file__), '../app/models/saved_models')
# #     os.makedirs(save_dir, exist_ok=True)
        
# #     model_path = os.path.join(save_dir, 'cnn_model.keras')
# #     model.save(model_path)
# #     print(f"Training Complete! Model saved to {model_path}")

# # if __name__ == "__main__":
# #     dataset_path = os.path.join(os.path.dirname(__file__), 'synthetic_dataset')
# #     train_model(dataset_path)


# import re


# def _clean_text(text: str) -> str:
#     if not text:
#         return ""

#     text = text.replace("\n", " ")
#     text = re.sub(r"\s+", " ", text)

#     return text.strip()


# def _unique(values):
#     result = []
#     seen = set()

#     for value in values:
#         value = value.strip()

#         if value and value.lower() not in seen:
#             result.append(value)
#             seen.add(value.lower())

#     return result


# def extract_fields(ocr_results: list) -> dict:
#     """
#     Extract important Legal Metrology fields from OCR results.

#     Returns:
#         {
#             "mrp": [],
#             "net_quantity": [],
#             "manufacturer": []
#         }
#     """

#     extracted = {
#         "mrp": [],
#         "net_quantity": [],
#         "manufacturer": []
#     }

#     if not ocr_results:
#         return extracted

#     # -----------------------------------------
#     # Prepare OCR text
#     # -----------------------------------------

#     usable_items = []

#     for item in ocr_results:

#         text = _clean_text(item.get("text", ""))
#         confidence = float(item.get("confidence", 0))

#         # Ignore extremely unreliable OCR
#         if text and confidence >= 0.25:
#             usable_items.append({
#                 "text": text,
#                 "confidence": confidence
#             })

#     if not usable_items:
#         return extracted

#     full_text = " ".join(
#         item["text"] for item in usable_items
#     )

#     # -----------------------------------------
#     # MRP EXTRACTION
#     # -----------------------------------------

#     mrp_patterns = [

#         # Maximum Retail Price / MRP
#         r"(?i)\b(?:maximum\s+retail\s+price|m\.?\s*r\.?\s*p\.?)"
#         r"\s*[:=\-]?\s*(?:rs\.?|inr|₹)?\s*"
#         r"(\d+(?:\.\d{1,2})?)",

#         # Rs / INR
#         r"(?i)\b(?:rs\.?|inr)"
#         r"\s*[:=\-]?\s*(\d+(?:\.\d{1,2})?)",

#         # ₹
#         r"₹\s*(\d+(?:\.\d{1,2})?)"
#     ]

#     for pattern in mrp_patterns:

#         matches = re.finditer(pattern, full_text)

#         for match in matches:

#             value = match.group(1).strip()

#             if value not in extracted["mrp"]:
#                 extracted["mrp"].append(value)

#     # -----------------------------------------
#     # NET QUANTITY EXTRACTION
#     # -----------------------------------------

#     quantity_patterns = [

#         # Net Qty / Net Quantity / Net Weight
#         r"(?i)\b(?:net\s*(?:qty|quantity|wt|weight)|net)"
#         r"\s*[:=\-]?\s*"
#         r"(\d+(?:\.\d+)?)\s*"
#         r"(kg|kgs|g|gm|gms|mg|ml|l|ltr|litre|litres)\b",

#         # Generic quantity
#         r"(?i)\b"
#         r"(\d+(?:\.\d+)?)\s*"
#         r"(kg|kgs|g|gm|gms|mg|ml|l|ltr|litre|litres)\b"
#     ]

#     unit_map = {
#         "kgs": "kg",
#         "gm": "g",
#         "gms": "g",
#         "ltr": "l",
#         "litre": "l",
#         "litres": "l"
#     }

#     for pattern in quantity_patterns:

#         matches = re.finditer(pattern, full_text)

#         for match in matches:

#             number = match.group(1)
#             unit = match.group(2).lower()

#             unit = unit_map.get(unit, unit)

#             value = f"{number}{unit}"

#             if value not in extracted["net_quantity"]:
#                 extracted["net_quantity"].append(value)

#     # -----------------------------------------
#     # MANUFACTURER EXTRACTION
#     # -----------------------------------------

#     manufacturer_patterns = [

#         r"(?i)\bmanufactured\s*(?:by|for)"
#         r"\s*[:=\-]?\s*(.+?)"
#         r"(?=\s+(?:mfg|mfd|packed|pkd|marketed|customer|consumer|mrp|net)\b|$)",

#         r"(?i)\bmanufactured\s*(?:&|and)\s*packed\s*by"
#         r"\s*[:=\-]?\s*(.+?)"
#         r"(?=\s+(?:customer|consumer|mrp|net)\b|$)",

#         r"(?i)\bmfg\.?\s*(?:by)?"
#         r"\s*[:=\-]?\s*(.+?)"
#         r"(?=\s+(?:packed|pkd|marketed|customer|consumer|mrp|net)\b|$)",

#         r"(?i)\bmfd\.?\s*(?:by)?"
#         r"\s*[:=\-]?\s*(.+?)"
#         r"(?=\s+(?:packed|pkd|marketed|customer|consumer|mrp|net)\b|$)",

#         r"(?i)\bpacked\s*(?:by|at)"
#         r"\s*[:=\-]?\s*(.+?)"
#         r"(?=\s+(?:customer|consumer|mrp|net)\b|$)",

#         r"(?i)\bpkd\.?\s*by"
#         r"\s*[:=\-]?\s*(.+?)"
#         r"(?=\s+(?:customer|consumer|mrp|net)\b|$)"
#     ]

#     for pattern in manufacturer_patterns:

#         matches = re.finditer(pattern, full_text)

#         for match in matches:

#             value = match.group(1).strip(" .,:;-")

#             if len(value) >= 3:
#                 extracted["manufacturer"].append(value)

#     # -----------------------------------------
#     # Remove duplicates
#     # -----------------------------------------

#     extracted["mrp"] = _unique(
#         extracted["mrp"]
#     )

#     extracted["net_quantity"] = _unique(
#         extracted["net_quantity"]
#     )

#     extracted["manufacturer"] = _unique(
#         extracted["manufacturer"]
#     )

#     return extracted


import re


# ============================================================
# TEXT HELPERS
# ============================================================

def _clean_text(text: str) -> str:
    if not text:
        return ""

    text = str(text).replace("\n", " ")
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def _unique(values):
    result = []
    seen = set()

    for value in values:
        value = _clean_text(value)

        if not value:
            continue

        key = value.lower()

        if key not in seen:
            result.append(value)
            seen.add(key)

    return result


def _ocr_confidence(item):
    try:
        confidence = float(item.get("confidence", 0))
    except (TypeError, ValueError):
        confidence = 0.0

    # Support both 0-1 and 0-100 confidence formats.
    if confidence > 1:
        confidence /= 100.0

    return min(max(confidence, 0.0), 1.0)


def _normalise_ocr_text(text):
    """
    Normalize common OCR mistakes without changing the actual
    meaning of the detected text.
    """
    text = _clean_text(text)

    replacements = [
        (r"\bmanufacturcd\b", "manufactured"),
        (r"\bmanufacturcd\b", "manufactured"),
        (r"\bmanufaclured\b", "manufactured"),
        (r"\bmanufaclurer\b", "manufacturer"),
        (r"\bmanufac1ured\b", "manufactured"),
        (r"\bmfgd\b", "mfg"),
        (r"\bmfd\b", "mfd"),
        (r"\bpkd\b", "pkd"),
        (r"\bqty\b", "qty"),
        (r"\bquanity\b", "quantity"),
        (r"\bquantily\b", "quantity"),
    ]

    for pattern, replacement in replacements:
        text = re.sub(
            pattern,
            replacement,
            text,
            flags=re.IGNORECASE
        )

    return text


def _clean_company_name(value):
    value = _clean_text(value)

    # Remove obvious separators around the extracted value.
    value = value.strip(" .,:;-|")

    # Remove trailing legal/compliance labels that OCR may have
    # attached to the company name.
    value = re.split(
        r"\s+(?:mrp|m\.?r\.?p|net\s+(?:qty|quantity|wt|weight)|"
        r"customer\s+care|consumer\s+care|marketed\s+by|"
        r"packed\s+by|pkd\s+by)\b",
        value,
        maxsplit=1,
        flags=re.IGNORECASE
    )[0]

    return value.strip(" .,:;-|")


# ============================================================
# FIELD EXTRACTION
# ============================================================

def extract_fields(ocr_results: list) -> dict:
    """
    Extract important package information from OCR results.

    Returns:
        {
            "commodity_name": [],
            "product_name": [],
            "mrp": [],
            "net_quantity": [],
            "manufacturer": []
        }

    The extra commodity_name/product_name fields are intentional.
    They allow the Node backend to display the detected product
    without forcing the Dashboard to invent a value.
    """

    extracted = {
        "commodity_name": [],
        "product_name": [],
        "mrp": [],
        "net_quantity": [],
        "manufacturer": []
    }

    if not ocr_results:
        return extracted

    # ========================================================
    # PREPARE OCR TEXT
    # ========================================================

    usable_items = []

    for item in ocr_results:
        raw_text = item.get("text", "")
        text = _normalise_ocr_text(raw_text)
        confidence = _ocr_confidence(item)

        # OCR engine already performs filtering. Keep moderately
        # confident detections so small manufacturer text is not
        # discarded too early.
        if text and confidence >= 0.15:
            usable_items.append({
                "text": text,
                "confidence": confidence
            })

    if not usable_items:
        return extracted

    full_text = " ".join(
        item["text"]
        for item in usable_items
    )

    # ========================================================
    # MRP
    # ========================================================

    mrp_patterns = [
        r"(?i)\bmaximum\s+retail\s+price\b\s*[:=\-]?\s*(?:rs\.?|inr|₹)?\s*(\d+(?:\.\d{1,2})?)",
        r"(?i)\bm\.?\s*r\.?\s*p\.?\s*[:=\-]?\s*(?:rs\.?|inr|₹)?\s*(\d+(?:\.\d{1,2})?)",
        r"(?i)\bmrp\b\s*[:=\-]?\s*(?:rs\.?|inr|₹)?\s*(\d+(?:\.\d{1,2})?)",
        r"(?i)\b(?:rs\.?|inr)\s*[:=\-]?\s*(\d+(?:\.\d{1,2})?)",
        r"₹\s*(\d+(?:\.\d{1,2})?)"
    ]

    for pattern in mrp_patterns:
        for match in re.finditer(pattern, full_text):
            value = match.group(1).strip()

            if value:
                extracted["mrp"].append(value)

    # ========================================================
    # NET QUANTITY
    # ========================================================

    quantity_patterns = [
        r"(?i)\bnet\s+(?:qty|quantity|wt|weight)\b\s*[:=\-]?\s*(\d+(?:\.\d+)?)\s*(kg|kgs|g|gm|gms|mg|ml|l|ltr|litre|litres)\b",
        r"(?i)\bnet\b\s*[:=\-]?\s*(\d+(?:\.\d+)?)\s*(kg|kgs|g|gm|gms|mg|ml|l|ltr|litre|litres)\b"
    ]

    unit_map = {
        "kgs": "kg",
        "gm": "g",
        "gms": "g",
        "ltr": "l",
        "litre": "l",
        "litres": "l"
    }

    for pattern in quantity_patterns:
        for match in re.finditer(pattern, full_text):
            number = match.group(1)
            unit = match.group(2).lower()
            unit = unit_map.get(unit, unit)

            extracted["net_quantity"].append(
                f"{number}{unit}"
            )

    # Also detect standalone quantity strings. These are marked as
    # candidates only when they occur near package/quantity language.
    generic_quantity_pattern = (
        r"(?i)\b(\d+(?:\.\d+)?)\s*"
        r"(kg|kgs|g|gm|gms|mg|ml|l|ltr|litre|litres)\b"
    )

    for match in re.finditer(
        generic_quantity_pattern,
        full_text
    ):
        start = max(0, match.start() - 40)
        context = full_text[start:match.end()].lower()

        if any(
            word in context
            for word in (
                "net",
                "quantity",
                "qty",
                "weight",
                "contents"
            )
        ):
            number = match.group(1)
            unit = unit_map.get(
                match.group(2).lower(),
                match.group(2).lower()
            )

            extracted["net_quantity"].append(
                f"{number}{unit}"
            )

    # ========================================================
    # MANUFACTURER
    # ========================================================
    #
    # IMPORTANT:
    # "manufactured & packed by" must be checked before the
    # shorter "manufactured by" pattern.
    # ========================================================

    manufacturer_patterns = [
        # Manufactured & Packed By
        r"(?i)\bmanufactured\s*(?:&|and)\s*packed\s*by\b\s*[:=\-]?\s*(.+?)(?=\s+(?:mfg|mfd|packed|pkd|marketed|customer|consumer|mrp|m\.r\.p|net|batch|exp|expiry|best\s+before)\b|$)",

        # Manufactured By / Manufactured For
        r"(?i)\bmanufactured\s+(?:by|for)\b\s*[:=\-]?\s*(.+?)(?=\s+(?:mfg|mfd|packed|pkd|marketed|customer|consumer|mrp|m\.r\.p|net|batch|exp|expiry|best\s+before)\b|$)",

        # Manufacturer
        r"(?i)\bmanufacturer\b\s*[:=\-]?\s*(.+?)(?=\s+(?:mfg|mfd|manufactured|packed|pkd|marketed|customer|consumer|mrp|m\.r\.p|net|batch|exp|expiry|best\s+before)\b|$)",

        # MFG BY / MFG
        r"(?i)\bmfg\.?\s*(?:by)?\b\s*[:=\-]?\s*(.+?)(?=\s+(?:packed|pkd|marketed|manufactured|mfd|customer|consumer|mrp|m\.r\.p|net|batch|exp|expiry|best\s+before)\b|$)",

        # MFD BY / MFD
        r"(?i)\bmfd\.?\s*(?:by)?\b\s*[:=\-]?\s*(.+?)(?=\s+(?:packed|pkd|marketed|manufactured|mfg|customer|consumer|mrp|m\.r\.p|net|batch|exp|expiry|best\s+before)\b|$)",

        # Packed By / Packed At
        r"(?i)\bpacked\s+(?:by|at)\b\s*[:=\-]?\s*(.+?)(?=\s+(?:mfg|mfd|manufactured|pkd|marketed|customer|consumer|mrp|m\.r\.p|net|batch|exp|expiry|best\s+before)\b|$)",

        # PKD BY
        r"(?i)\bpkd\.?\s*by\b\s*[:=\-]?\s*(.+?)(?=\s+(?:mfg|mfd|manufactured|packed|marketed|customer|consumer|mrp|m\.r\.p|net|batch|exp|expiry|best\s+before)\b|$)"
    ]

    for pattern in manufacturer_patterns:
        for match in re.finditer(
            pattern,
            full_text
        ):
            value = _clean_company_name(
                match.group(1)
            )

            if len(value) >= 3:
                extracted["manufacturer"].append(
                    value
                )

    # ========================================================
    # PRODUCT / COMMODITY NAME
    # ========================================================
    #
    # Product detection should be conservative. We prefer explicit
    # labels such as "Product Name:" or "Commodity:" and then use
    # high-confidence short OCR text as a fallback.
    # ========================================================

    product_patterns = [
        r"(?i)\bproduct\s+name\b\s*[:=\-]\s*(.+?)(?=\s+(?:mrp|m\.r\.p|net|quantity|manufacturer|manufactured|mfg|mfd|packed|pkd|batch|exp|expiry)\b|$)",
        r"(?i)\bcommodity\s*(?:name)?\b\s*[:=\-]\s*(.+?)(?=\s+(?:mrp|m\.r\.p|net|quantity|manufacturer|manufactured|mfg|mfd|packed|pkd|batch|exp|expiry)\b|$)"
    ]

    for pattern in product_patterns:
        for match in re.finditer(
            pattern,
            full_text
        ):
            value = _clean_text(match.group(1))
            value = value.strip(" .,:;-|")

            if 2 <= len(value) <= 100:
                extracted["commodity_name"].append(value)

    # If no explicit product label exists, use a conservative
    # high-confidence OCR candidate. Avoid obvious compliance labels,
    # units, prices, dates and manufacturer phrases.
    if not extracted["commodity_name"]:
        excluded = re.compile(
            r"(?i)^(?:mrp|maximum|retail|price|"
            r"net|quantity|qty|weight|"
            r"manufactured|manufacturer|mfg|mfd|"
            r"packed|pkd|marketed|"
            r"batch|lot|expiry|exp|"
            r"customer|consumer|care|"
            r"veg|vegetarian|non[- ]?veg|"
            r"ingredients?|nutrition|"
            r"www|www\.|https?://)"
        )

        candidates = []

        for item in usable_items:
            text = _clean_text(item["text"])
            confidence = item["confidence"]

            if confidence < 0.55:
                continue

            if len(text) < 3 or len(text) > 80:
                continue

            if excluded.search(text):
                continue

            if re.search(
                r"(?i)\b(?:rs\.?|inr|mrp|₹)\s*\d",
                text
            ):
                continue

            if re.fullmatch(
                r"(?i)[\d\s.,/-]+",
                text
            ):
                continue

            if re.search(
                r"(?i)\b\d+(?:\.\d+)?\s*(?:kg|g|gm|mg|ml|l|ltr)\b",
                text
            ):
                continue

            candidates.append(
                (text, confidence)
            )

        # Use the strongest candidate only. This avoids combining
        # unrelated OCR lines into a fabricated product name.
        candidates.sort(
            key=lambda item: (
                item[1],
                -len(item[0])
            ),
            reverse=True
        )

        if candidates:
            extracted["commodity_name"].append(
                candidates[0][0]
            )

    extracted["product_name"] = list(
        extracted["commodity_name"]
    )

    # ========================================================
    # REMOVE DUPLICATES
    # ========================================================

    extracted["commodity_name"] = _unique(
        extracted["commodity_name"]
    )

    extracted["product_name"] = _unique(
        extracted["product_name"]
    )

    extracted["mrp"] = _unique(
        extracted["mrp"]
    )

    extracted["net_quantity"] = _unique(
        extracted["net_quantity"]
    )

    extracted["manufacturer"] = _unique(
        extracted["manufacturer"]
    )

    # ========================================================
    # FIELD CONFIDENCE
    # ========================================================
    #
    # This is useful to the backend if it wants to expose field-level
    # confidence later. Existing code that expects only the original
    # three lists remains compatible.
    # ========================================================

    field_confidence = {
        "commodity_name": 0.0,
        "product_name": 0.0,
        "mrp": 0.0,
        "net_quantity": 0.0,
        "manufacturer": 0.0
    }

    for field in field_confidence:
        values = extracted.get(field, [])

        if not values:
            continue

        relevant_scores = []

        for item in usable_items:
            item_text = item["text"].lower()

            if field in ("commodity_name", "product_name"):
                if any(
                    value.lower() in item_text
                    for value in values
                ):
                    relevant_scores.append(
                        item["confidence"]
                    )

            elif field == "mrp":
                if re.search(
                    r"(?i)(?:mrp|maximum\s+retail\s+price|rs\.?|inr|₹)",
                    item_text
                ):
                    relevant_scores.append(
                        item["confidence"]
                    )

            elif field == "net_quantity":
                if re.search(
                    r"(?i)(?:net|qty|quantity|weight|kg|g|gm|mg|ml|ltr|litre)",
                    item_text
                ):
                    relevant_scores.append(
                        item["confidence"]
                    )

            elif field == "manufacturer":
                if re.search(
                    r"(?i)(?:manufactured|manufacturer|mfg|mfd|packed\s+by|pkd)",
                    item_text
                ):
                    relevant_scores.append(
                        item["confidence"]
                    )

        if relevant_scores:
            field_confidence[field] = round(
                sum(relevant_scores)
                / len(relevant_scores),
                4
            )

    extracted["_field_confidence"] = field_confidence

    return extracted
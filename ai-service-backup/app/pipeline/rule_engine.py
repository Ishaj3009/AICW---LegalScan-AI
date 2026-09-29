# # import json
# # import os

# # def evaluate_rules(extracted_data: dict, quality_failures: list = None) -> list:
# #     """
# #     Evaluates extracted fields against predefined rules for the 5 scenarios.
# #     """
# #     violations = []
    
# #     # Check 1: Image Quality (Scenario 5)
# #     if quality_failures and len(quality_failures) > 0:
# #         for failure in quality_failures:
# #             violations.append({
# #                 "rule_id": "IQA-001",
# #                 "field": "image_quality",
# #                 "requirement": "Clear image without severe blur or glare",
# #                 "detected_value": "Blur/Glare Detected",
# #                 "expected_value": "Clear Image",
# #                 "severity": "HIGH",
# #                 "confidence": 99.0,
# #                 "explanation": failure
# #             })
    
# #     # Extract lists safely
# #     mrp_list = extracted_data.get("mrp", [])
# #     mfg_list = extracted_data.get("manufacturer", [])
    
# #     # Check 2: Missing MRP (Scenario 2)
# #     if len(mrp_list) == 0:
# #         violations.append({
# #             "rule_id": "LM-PC-MRP-001",
# #             "field": "mrp",
# #             "requirement": "Maximum Retail Price (MRP) must be declared",
# #             "detected_value": "Not Found",
# #             "expected_value": "Valid MRP",
# #             "severity": "HIGH",
# #             "confidence": 85.0,
# #             "explanation": "No MRP declaration found on the analyzed panels."
# #         })
        
# #     # Check 3: Conflicting MRP (Scenario 4)
# #     elif len(mrp_list) > 1:
# #         # Check if they are actually different values
# #         unique_mrps = list(set([float(x) for x in mrp_list if x.replace('.', '', 1).isdigit()]))
# #         if len(unique_mrps) > 1:
# #             violations.append({
# #                 "rule_id": "LM-PC-MRP-002",
# #                 "field": "mrp",
# #                 "requirement": "MRP must be unambiguous and non-conflicting",
# #                 "detected_value": f"Multiple: {mrp_list}",
# #                 "expected_value": "Single MRP",
# #                 "severity": "HIGH",
# #                 "confidence": 95.0,
# #                 "explanation": "Conflicting MRP declarations found across different panels."
# #             })
            
# #     # Check 4: Missing Manufacturer (Scenario 3)
# #     if len(mfg_list) == 0:
# #         violations.append({
# #             "rule_id": "LM-PC-MFG-001",
# #             "field": "manufacturer",
# #             "requirement": "Name and address of manufacturer/packer must be declared",
# #             "detected_value": "Not Found",
# #             "expected_value": "Manufacturer Details",
# #             "severity": "MEDIUM",
# #             "confidence": 80.0,
# #             "explanation": "Manufacturer or packer details are missing or unreadable."
# #         })
        
# #     return violations


# def evaluate_rules(
#     extracted_data: dict,
#     quality_failures: list = None,
#     image_quality_results: list = None
# ) -> list:
#     """
#     Evaluate extracted declarations against Legal Metrology checks.

#     Important:
#     - Detected declaration = Present
#     - Missing declaration from a clear image = Potential Violation
#     - Poor/uncertain image = Officer Review
#     """

#     violations = []

#     quality_failures = quality_failures or []
#     image_quality_results = image_quality_results or []

#     # ---------------------------------------------------------
#     # IMAGE QUALITY
#     # ---------------------------------------------------------

#     for quality in image_quality_results:

#         if not quality.get("passed", True):

#             violations.append({
#                 "rule_id": "IQA-001",
#                 "field": "image_quality",
#                 "requirement": "Clear image without severe blur or glare",
#                 "detected_value": "Blur/Glare Detected",
#                 "expected_value": "Clear Image",
#                 "severity": "HIGH",
#                 "confidence": 99.0,
#                 "status": "AI_DETECTED",
#                 "explanation": quality.get(
#                     "message",
#                     "Image quality is insufficient for reliable inspection."
#                 )
#             })

#     # ---------------------------------------------------------
#     # DETERMINE WHETHER IMAGE QUALITY IS SUFFICIENT
#     # ---------------------------------------------------------

#     poor_quality = any(
#         not q.get("passed", True)
#         for q in image_quality_results
#     )

#     # ---------------------------------------------------------
#     # MRP
#     # ---------------------------------------------------------

#     mrp_list = extracted_data.get("mrp", [])

#     if len(mrp_list) == 0:

#         if poor_quality:

#             violations.append({
#                 "rule_id": "LM-PC-MRP-REVIEW",
#                 "field": "mrp",
#                 "requirement": "Maximum Retail Price (MRP) must be declared",
#                 "detected_value": "Not Clearly Detectable",
#                 "expected_value": "Valid MRP",
#                 "severity": "MEDIUM",
#                 "confidence": 60.0,
#                 "status": "AI_DETECTED",
#                 "explanation": (
#                     "MRP could not be reliably detected because "
#                     "the image quality is insufficient. Officer review required."
#                 )
#             })

#         else:

#             violations.append({
#                 "rule_id": "LM-PC-MRP-001",
#                 "field": "mrp",
#                 "requirement": "Maximum Retail Price (MRP) must be declared",
#                 "detected_value": "Not Found",
#                 "expected_value": "Valid MRP",
#                 "severity": "HIGH",
#                 "confidence": 85.0,
#                 "status": "AI_DETECTED",
#                 "explanation": "No MRP declaration was detected in the analyzed image panels."
#             })

#     elif len(mrp_list) > 1:

#         numeric_mrps = []

#         for value in mrp_list:
#             try:
#                 numeric_mrps.append(float(value))
#             except (ValueError, TypeError):
#                 pass

#         if len(set(numeric_mrps)) > 1:

#             violations.append({
#                 "rule_id": "LM-PC-MRP-002",
#                 "field": "mrp",
#                 "requirement": "MRP must be unambiguous and non-conflicting",
#                 "detected_value": ", ".join(mrp_list),
#                 "expected_value": "Single consistent MRP",
#                 "severity": "HIGH",
#                 "confidence": 95.0,
#                 "status": "AI_DETECTED",
#                 "explanation": (
#                     "Different MRP values were detected across the "
#                     "provided package images."
#                 )
#             })

#     # ---------------------------------------------------------
#     # MANUFACTURER
#     # ---------------------------------------------------------

#     manufacturer_list = extracted_data.get("manufacturer", [])

#     if len(manufacturer_list) == 0:

#         if poor_quality:

#             violations.append({
#                 "rule_id": "LM-PC-MFG-REVIEW",
#                 "field": "manufacturer",
#                 "requirement": (
#                     "Name and address of manufacturer/packer "
#                     "must be declared"
#                 ),
#                 "detected_value": "Not Clearly Detectable",
#                 "expected_value": "Manufacturer Details",
#                 "severity": "MEDIUM",
#                 "confidence": 60.0,
#                 "status": "AI_DETECTED",
#                 "explanation": (
#                     "Manufacturer details could not be reliably detected "
#                     "because image quality is insufficient. Officer review required."
#                 )
#             })

#         else:

#             violations.append({
#                 "rule_id": "LM-PC-MFG-001",
#                 "field": "manufacturer",
#                 "requirement": (
#                     "Name and address of manufacturer/packer "
#                     "must be declared"
#                 ),
#                 "detected_value": "Not Found",
#                 "expected_value": "Manufacturer Details",
#                 "severity": "MEDIUM",
#                 "confidence": 80.0,
#                 "status": "AI_DETECTED",
#                 "explanation": (
#                     "Manufacturer or packer details were not detected "
#                     "in the analyzed image panels."
#                 )
#             })

#     return violations

# ============================================================
# LEGALSCAN AI - RULE ENGINE
# ============================================================
#
# Purpose:
#   Evaluate OCR-extracted package declarations against
#   Legal Metrology compliance requirements.
#
# Important design principle:
#
#   "OCR could not read it"
#          ≠
#   "Declaration is missing"
#
# Therefore:
#
#   Reliable field detected
#          → PRESENT
#
#   Some reliable OCR exists, but required field is absent
#          → POTENTIAL VIOLATION
#
#   OCR cannot reliably read the package
#          → OFFICER REVIEW
#
# Image quality warnings are NOT returned as Legal Metrology
# violations. They should be displayed separately by the UI.
# ============================================================


def _has_value(values):
    """
    Safely determine whether a field contains usable values.
    """

    if not values:
        return False

    if not isinstance(values, list):
        values = [values]

    for value in values:

        if value is None:
            continue

        text = str(value).strip()

        if text:
            return True

    return False


def _clean_values(values):
    """
    Normalize extracted values into a clean list.
    """

    if not values:
        return []

    if not isinstance(values, list):
        values = [values]

    cleaned = []

    for value in values:

        if value is None:
            continue

        value = str(value).strip()

        if not value:
            continue

        if value not in cleaned:
            cleaned.append(value)

    return cleaned


def _numeric_mrp(value):
    """
    Try to extract a numeric MRP value.

    Examples:
        ₹89       → 89
        Rs. 89    → 89
        INR 89    → 89
        89        → 89

    Returns None when a numeric value cannot be determined.
    """

    if value is None:
        return None

    text = str(value).strip()

    if not text:
        return None

    # Keep digits and decimal point only
    cleaned = ""

    for char in text:

        if char.isdigit() or char == ".":

            cleaned += char

    if not cleaned:
        return None

    try:

        return float(cleaned)

    except (ValueError, TypeError):

        return None


def evaluate_rules(
    extracted_data: dict,
    quality_failures: list = None,
    image_quality_results: list = None
) -> list:
    """
    Evaluate extracted declarations against Legal Metrology
    compliance requirements.

    ------------------------------------------------------------
    DECISION LOGIC
    ------------------------------------------------------------

    1. Reliable declaration detected
          → No violation

    2. OCR produced reliable text but required declaration
       was not detected
          → Potential violation

    3. OCR produced no reliable declaration text
          → Officer Review

    4. Poor image quality
          → Officer Review

       BUT:

          Image quality is NOT itself a Legal Metrology
          violation.

    ------------------------------------------------------------
    """

    # ========================================================
    # SAFE DEFAULTS
    # ========================================================

    extracted_data = extracted_data or {}

    quality_failures = (
        quality_failures or []
    )

    image_quality_results = (
        image_quality_results or []
    )

    findings = []

    # ========================================================
    # CLEAN EXTRACTED FIELDS
    # ========================================================

    mrp_list = _clean_values(
        extracted_data.get("mrp", [])
    )

    net_quantity_list = _clean_values(
        extracted_data.get("net_quantity", [])
    )

    manufacturer_list = _clean_values(
        extracted_data.get("manufacturer", [])
    )

    # ========================================================
    # DETERMINE OCR AVAILABILITY
    # ========================================================
    #
    # This is extremely important.
    #
    # If ALL fields are empty, we cannot conclude that the
    # package is non-compliant.
    #
    # It simply means that the AI could not confidently
    # extract the required information.
    # ========================================================

    has_mrp = _has_value(
        mrp_list
    )

    has_net_quantity = _has_value(
        net_quantity_list
    )

    has_manufacturer = _has_value(
        manufacturer_list
    )

    has_any_extracted_field = (
        has_mrp
        or has_net_quantity
        or has_manufacturer
    )

    # ========================================================
    # IMAGE QUALITY STATUS
    # ========================================================
    #
    # Image quality warnings are deliberately NOT added to
    # findings.
    #
    # They are still available through image_quality_results
    # and quality_failures so main.py can expose them separately.
    # ========================================================

    poor_quality = any(
        not quality.get("passed", True)
        for quality in image_quality_results
        if isinstance(quality, dict)
    )

    low_resolution = any(
        quality.get(
            "resolution_warning",
            False
        )
        for quality in image_quality_results
        if isinstance(quality, dict)
    )

    # ========================================================
    # OCR UNAVAILABLE / NO RELIABLE EXTRACTION
    # ========================================================
    #
    # If the AI could not extract ANY reliable declaration,
    # all required fields must go to REVIEW.
    #
    # This prevents:
    #
    #     OCR = 0
    #          ↓
    #     MRP Missing
    #
    # which is a false conclusion.
    # ========================================================

    if not has_any_extracted_field:

        review_reason = (
            "No reliable declaration text could be extracted "
            "from the available package evidence."
        )

        if poor_quality:

            review_reason = (
                "Declaration text could not be reliably detected "
                "because image quality may affect OCR accuracy. "
                "Officer review required."
            )

        elif low_resolution:

            review_reason = (
                "No reliable declaration text could be extracted "
                "from the available image. The image may require "
                "manual verification."
            )

        # ----------------------------------------------------
        # MRP REVIEW
        # ----------------------------------------------------

        findings.append({

            "rule_id": "LM-PC-MRP-REVIEW",

            "field": "mrp",

            "requirement": (
                "Maximum Retail Price (MRP) must be declared"
            ),

            "detected_value": (
                "Not Clearly Detectable"
            ),

            "expected_value": "Valid MRP",

            "severity": "MEDIUM",

            "confidence": 60.0,

            "status": "AI_DETECTED",

            "review_required": True,

            "explanation": review_reason

        })

        # ----------------------------------------------------
        # NET QUANTITY REVIEW
        # ----------------------------------------------------

        findings.append({

            "rule_id": "LM-PC-NETQTY-REVIEW",

            "field": "net_quantity",

            "requirement": (
                "Net quantity must be declared"
            ),

            "detected_value": (
                "Not Clearly Detectable"
            ),

            "expected_value": (
                "Valid net quantity"
            ),

            "severity": "MEDIUM",

            "confidence": 60.0,

            "status": "AI_DETECTED",

            "review_required": True,

            "explanation": review_reason

        })

        # ----------------------------------------------------
        # MANUFACTURER REVIEW
        # ----------------------------------------------------

        findings.append({

            "rule_id": "LM-PC-MFG-REVIEW",

            "field": "manufacturer",

            "requirement": (
                "Name and address of manufacturer/packer "
                "must be declared"
            ),

            "detected_value": (
                "Not Clearly Detectable"
            ),

            "expected_value": (
                "Manufacturer / Packer Details"
            ),

            "severity": "MEDIUM",

            "confidence": 60.0,

            "status": "AI_DETECTED",

            "review_required": True,

            "explanation": review_reason

        })

        # ----------------------------------------------------
        # RETURN
        # ----------------------------------------------------
        #
        # Do not continue into "missing declaration" logic.
        # Nothing was readable enough to make that conclusion.
        # ----------------------------------------------------

        return findings

    # ========================================================
    # MRP
    # ========================================================

    if not has_mrp:

        # ----------------------------------------------------
        # Some other declaration was successfully extracted.
        #
        # Therefore OCR is functioning, and MRP appears to
        # be absent from the readable evidence.
        # ----------------------------------------------------

        findings.append({

            "rule_id": "LM-PC-MRP-001",

            "field": "mrp",

            "requirement": (
                "Maximum Retail Price (MRP) must be declared"
            ),

            "detected_value": "Not Found",

            "expected_value": "Valid MRP",

            "severity": "HIGH",

            "confidence": 85.0,

            "status": "AI_DETECTED",

            "review_required": False,

            "explanation": (
                "Reliable package text was detected, but "
                "no MRP declaration was identified in the "
                "analyzed evidence."
            )

        })

    # ========================================================
    # MRP CONFLICT
    # ========================================================

    elif len(mrp_list) > 1:

        numeric_mrps = []

        for value in mrp_list:

            numeric_value = _numeric_mrp(
                value
            )

            if numeric_value is not None:

                numeric_mrps.append(
                    numeric_value
                )

        # ----------------------------------------------------
        # Only report a conflict when numeric values are
        # actually different.
        # ----------------------------------------------------

        if (
            len(numeric_mrps) > 1
            and len(set(numeric_mrps)) > 1
        ):

            findings.append({

                "rule_id": "LM-PC-MRP-002",

                "field": "mrp",

                "requirement": (
                    "MRP must be unambiguous and non-conflicting"
                ),

                "detected_value": (
                    ", ".join(mrp_list)
                ),

                "expected_value": (
                    "Single consistent MRP"
                ),

                "severity": "HIGH",

                "confidence": 95.0,

                "status": "AI_DETECTED",

                "review_required": True,

                "explanation": (
                    "Different MRP values were detected "
                    "across the provided package evidence."
                )

            })

    # ========================================================
    # NET QUANTITY
    # ========================================================

    if not has_net_quantity:

        # ----------------------------------------------------
        # Because some reliable OCR data exists, absence of
        # net quantity can now be treated as a potential
        # missing declaration rather than total OCR failure.
        # ----------------------------------------------------

        findings.append({

            "rule_id": "LM-PC-NETQTY-001",

            "field": "net_quantity",

            "requirement": (
                "Net quantity must be declared"
            ),

            "detected_value": "Not Found",

            "expected_value": (
                "Valid net quantity"
            ),

            "severity": "HIGH",

            "confidence": 80.0,

            "status": "AI_DETECTED",

            "review_required": False,

            "explanation": (
                "Reliable package text was detected, but "
                "no net quantity declaration was identified "
                "in the analyzed evidence."
            )

        })

    # ========================================================
    # MANUFACTURER
    # ========================================================

    if not has_manufacturer:

        findings.append({

            "rule_id": "LM-PC-MFG-001",

            "field": "manufacturer",

            "requirement": (
                "Name and address of manufacturer/packer "
                "must be declared"
            ),

            "detected_value": "Not Found",

            "expected_value": (
                "Manufacturer / Packer Details"
            ),

            "severity": "MEDIUM",

            "confidence": 80.0,

            "status": "AI_DETECTED",

            "review_required": False,

            "explanation": (
                "Reliable package text was detected, but "
                "manufacturer or packer details were not "
                "identified in the analyzed evidence."
            )

        })

    # ========================================================
    # FINAL LOGGING
    # ========================================================

    print("")
    print("⚖️ LEGALSCAN AI RULE ENGINE")
    print("--------------------------------------------")

    print(
        f"MRP detected: "
        f"{has_mrp}"
    )

    print(
        f"Net quantity detected: "
        f"{has_net_quantity}"
    )

    print(
        f"Manufacturer detected: "
        f"{has_manufacturer}"
    )

    print(
        f"Any reliable extraction: "
        f"{has_any_extracted_field}"
    )

    print(
        f"Poor image quality: "
        f"{poor_quality}"
    )

    print(
        f"Low resolution: "
        f"{low_resolution}"
    )

    print(
        f"Legal Metrology findings: "
        f"{len(findings)}"
    )

    for finding in findings:

        print(
            f"   • "
            f"{finding.get('rule_id')} → "
            f"{finding.get('detected_value')}"
        )

    print("--------------------------------------------")
    print("")

    return findings
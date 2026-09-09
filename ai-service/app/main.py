# # from fastapi import FastAPI, UploadFile, File, Form, HTTPException
# # from typing import List
# # import uvicorn

# # from app.models.cnn_classifier import classify_image
# # from app.pipeline.quality_check import check_image_quality
# # from app.pipeline.ocr_engine import perform_ocr
# # from app.pipeline.nlp_extractor import extract_fields
# # from app.pipeline.rule_engine import evaluate_rules
# # from app.pipeline.evidence_generator import generate_evidence

# # app = FastAPI(title="LegalScan AI Service", version="1.0.0")

# # @app.post("/api/analyze/full-pipeline")
# # async def analyze_full_pipeline(
# #     inspection_id: str = Form(...),
# #     images: List[UploadFile] = File(...)
# # ):
# #     if not images:
# #         raise HTTPException(status_code=400, detail="No images provided")

# #     all_extracted_data = {
# #         "mrp": [],
# #         "net_quantity": [],
# #         "manufacturer": []
# #     }
# #     all_violations = []
# #     total_confidence = 0.0
# #     processed_images_count = 0
# #     all_evidence = []
# #     quality_failures = []
    
# #     for image in images:
# #         image_bytes = await image.read()
        
# #         # 1. Quality Check
# #         quality = check_image_quality(image_bytes)
# #         if not quality['passed']:
# #             quality_failures.append(quality['message'])
            
# #         # 2. CNN Classification
# #         classification = classify_image(image_bytes)
# #         total_confidence += classification['confidence']
        
# #         # 3. OCR
# #         ocr_results = perform_ocr(image_bytes)
        
# #         # 4. Evidence Generation
# #         evidence_paths = generate_evidence(image_bytes, ocr_results, inspection_id)
# #         all_evidence.extend(evidence_paths)
        
# #         # 5. NLP Extraction
# #         fields = extract_fields(ocr_results)
        
# #         # Merge extracted fields (which are lists now)
# #         for k, v_list in fields.items():
# #             for v in v_list:
# #                 if v not in all_extracted_data[k]:
# #                     all_extracted_data[k].append(v)
                
# #         processed_images_count += 1

# #     # 6. Rule Engine Evaluation
# #     violations = evaluate_rules(all_extracted_data, quality_failures)
    
# #     overall_confidence = total_confidence / processed_images_count if processed_images_count > 0 else 0.0

# #     return {
# #         "inspection_id": inspection_id,
# #         "declarations": [
# #             {"field": k, "value": ", ".join(v), "confidence": 90} for k, v in all_extracted_data.items() if v
# #         ],
# #         "violations": violations,
# #         "overall_confidence": overall_confidence,
# #         "evidence_files": all_evidence
# #     }

# # if __name__ == "__main__":
# #     uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)


# # from fastapi import FastAPI, UploadFile, File, Form, HTTPException
# # from typing import List
# # import uvicorn

# # from app.models.cnn_classifier import classify_image
# # from app.pipeline.quality_check import check_image_quality
# # from app.pipeline.ocr_engine import perform_ocr
# # from app.pipeline.nlp_extractor import extract_fields
# # from app.pipeline.rule_engine import evaluate_rules
# # from app.pipeline.evidence_generator import generate_evidence


# # app = FastAPI(
# #     title="LegalScan AI Service",
# #     version="1.0.0"
# # )


# # @app.post("/api/analyze/full-pipeline")
# # async def analyze_full_pipeline(
# #     inspection_id: str = Form(...),
# #     images: List[UploadFile] = File(...)
# # ):
# #     """
# #     Complete LegalScan AI inspection pipeline.

# #     Flow:

# #     Uploaded Images
# #         ↓
# #     Image Quality Check
# #         ↓
# #     CNN Classification
# #         ↓
# #     OCR
# #         ↓
# #     NLP Field Extraction
# #         ↓
# #     Rule Engine
# #         ↓
# #     Compliance / Violations
# #         ↓
# #     Evidence
# #     """

# #     # =========================================================
# #     # VALIDATION
# #     # =========================================================

# #     if not images:
# #         raise HTTPException(
# #             status_code=400,
# #             detail="No images provided"
# #         )

# #     print("")
# #     print("================================================")
# #     print("🤖 LEGALSCAN AI - FULL PIPELINE")
# #     print("================================================")
# #     print(f"🆔 Inspection ID: {inspection_id}")
# #     print(f"📷 Images received: {len(images)}")
# #     print("================================================")


# #     # =========================================================
# #     # INITIAL DATA STRUCTURES
# #     # =========================================================

# #     all_extracted_data = {
# #         "mrp": [],
# #         "net_quantity": [],
# #         "manufacturer": []
# #     }

# #     all_violations = []

# #     total_confidence = 0.0
# #     processed_images_count = 0

# #     all_evidence = []

# #     # Store actual quality results for every image
# #     quality_results = []

# #     # Keep quality failures separately for backward compatibility
# #     quality_failures = []

# #     # Store CNN results for every image
# #     classifications = []

# #     # Store OCR results for debugging / traceability
# #     image_analysis = []


# #     # =========================================================
# #     # PROCESS EACH IMAGE
# #     # =========================================================

# #     for index, image in enumerate(images, start=1):

# #         print("")
# #         print("------------------------------------------------")
# #         print(f"📷 Processing Image {index}/{len(images)}")
# #         print(f"📄 Filename: {image.filename}")
# #         print("------------------------------------------------")


# #         # =====================================================
# #         # READ IMAGE
# #         # =====================================================

# #         image_bytes = await image.read()

# #         if not image_bytes:
# #             print("⚠️ Empty image received.")
# #             continue

# #         print(
# #             f"📦 Image size: {len(image_bytes)} bytes"
# #         )


# #         # =====================================================
# #         # 1. IMAGE QUALITY CHECK
# #         # =====================================================

# #         try:

# #             quality = check_image_quality(
# #                 image_bytes
# #             )

# #         except Exception as error:

# #             print(
# #                 f"❌ Image quality analysis failed: {error}"
# #             )

# #             quality = {
# #                 "passed": False,
# #                 "blur_detected": False,
# #                 "glare_detected": False,
# #                 "message": (
# #                     "Image quality analysis could not be completed."
# #                 ),
# #                 "variance": 0.0,
# #                 "glare_ratio": 0.0
# #             }


# #         quality_results.append({
# #             "filename": image.filename,
# #             **quality
# #         })


# #         print(
# #             "📊 Image Quality:"
# #         )

# #         print(
# #             f"   Blur Variance : "
# #             f"{quality.get('variance', 0):.2f}"
# #         )

# #         print(
# #             f"   Glare Ratio   : "
# #             f"{quality.get('glare_ratio', 0):.4f}"
# #         )

# #         print(
# #             f"   Blur Detected : "
# #             f"{quality.get('blur_detected', False)}"
# #         )

# #         print(
# #             f"   Glare Detected: "
# #             f"{quality.get('glare_detected', False)}"
# #         )

# #         print(
# #             f"   Passed        : "
# #             f"{quality.get('passed', False)}"
# #         )


# #         if not quality.get("passed", False):

# #             quality_failures.append(
# #                 quality.get(
# #                     "message",
# #                     "Image quality is insufficient."
# #                 )
# #             )


# #         # =====================================================
# #         # 2. CNN CLASSIFICATION
# #         # =====================================================

# #         try:

# #             classification = classify_image(
# #                 image_bytes
# #             )

# #         except Exception as error:

# #             print(
# #                 f"❌ CNN classification failed: {error}"
# #             )

# #             classification = {
# #                 "predicted_class": "UNCLEAR",
# #                 "confidence": 0.0,
# #                 "error": str(error)
# #             }


# #         classification_record = {
# #             "filename": image.filename,
# #             **classification
# #         }

# #         classifications.append(
# #             classification_record
# #         )


# #         cnn_confidence = float(
# #             classification.get(
# #                 "confidence",
# #                 0.0
# #             )
# #         )

# #         total_confidence += cnn_confidence


# #         print(
# #             "🧠 CNN Classification:"
# #         )

# #         print(
# #             f"   Side       : "
# #             f"{classification.get('predicted_class', 'UNCLEAR')}"
# #         )

# #         print(
# #             f"   Confidence : "
# #             f"{cnn_confidence:.4f}"
# #         )


# #         # =====================================================
# #         # 3. OCR
# #         # =====================================================

# #         try:

# #             ocr_results = perform_ocr(
# #                 image_bytes
# #             )

# #         except Exception as error:

# #             print(
# #                 f"❌ OCR failed: {error}"
# #             )

# #             ocr_results = []


# #         print(
# #             f"🔤 OCR detections: "
# #             f"{len(ocr_results)}"
# #         )


# #         # Print detected OCR text
# #         if ocr_results:

# #             print("📝 OCR Text:")

# #             for item in ocr_results:

# #                 text = item.get(
# #                     "text",
# #                     ""
# #                 )

# #                 confidence = float(
# #                     item.get(
# #                         "confidence",
# #                         0.0
# #                     )
# #                 )

# #                 print(
# #                     f"   • {text} "
# #                     f"(confidence: {confidence:.2f})"
# #                 )

# #         else:

# #             print(
# #                 "⚠️ No readable text detected."
# #             )


# #         # =====================================================
# #         # 4. EVIDENCE GENERATION
# #         # =====================================================

# #         try:

# #             evidence_paths = generate_evidence(
# #                 image_bytes,
# #                 ocr_results,
# #                 inspection_id
# #             )

# #         except Exception as error:

# #             print(
# #                 f"⚠️ Evidence generation failed: {error}"
# #             )

# #             evidence_paths = []


# #         all_evidence.extend(
# #             evidence_paths
# #         )


# #         # =====================================================
# #         # 5. NLP / FIELD EXTRACTION
# #         # =====================================================

# #         try:

# #             fields = extract_fields(
# #                 ocr_results
# #             )

# #         except Exception as error:

# #             print(
# #                 f"❌ NLP extraction failed: {error}"
# #             )

# #             fields = {
# #                 "mrp": [],
# #                 "net_quantity": [],
# #                 "manufacturer": []
# #             }


# #         print(
# #             "🧠 Extracted Fields:"
# #         )

# #         print(
# #             f"   MRP          : "
# #             f"{fields.get('mrp', [])}"
# #         )

# #         print(
# #             f"   Net Quantity : "
# #             f"{fields.get('net_quantity', [])}"
# #         )

# #         print(
# #             f"   Manufacturer : "
# #             f"{fields.get('manufacturer', [])}"
# #         )


# #         # =====================================================
# #         # MERGE EXTRACTED FIELDS
# #         # =====================================================

# #         for key in all_extracted_data.keys():

# #             values = fields.get(
# #                 key,
# #                 []
# #             )

# #             if not isinstance(
# #                 values,
# #                 list
# #             ):
# #                 values = [values]


# #             for value in values:

# #                 if value is None:
# #                     continue

# #                 value = str(value).strip()

# #                 if not value:
# #                     continue

# #                 if value not in all_extracted_data[key]:

# #                     all_extracted_data[key].append(
# #                         value
# #                     )


# #         # =====================================================
# #         # STORE PER-IMAGE ANALYSIS
# #         # =====================================================

# #         image_analysis.append({

# #             "filename": image.filename,

# #             "cnn": classification,

# #             "quality": quality,

# #             "ocr": ocr_results,

# #             "extracted_fields": fields

# #         })


# #         processed_images_count += 1


# #         print(
# #             f"✅ Image {index} processed successfully."
# #         )


# #     # =========================================================
# #     # VALIDATION AFTER IMAGE PROCESSING
# #     # =========================================================

# #     if processed_images_count == 0:

# #         raise HTTPException(
# #             status_code=400,
# #             detail="No valid images could be processed."
# #         )


# #     # =========================================================
# #     # 6. LEGAL METROLOGY RULE ENGINE
# #     # =========================================================

# #     print("")
# #     print("================================================")
# #     print("⚖️ LEGAL METROLOGY RULE ENGINE")
# #     print("================================================")

# #     print(
# #         f"📋 Extracted MRP: "
# #         f"{all_extracted_data['mrp']}"
# #     )

# #     print(
# #         f"📋 Extracted Net Quantity: "
# #         f"{all_extracted_data['net_quantity']}"
# #     )

# #     print(
# #         f"📋 Extracted Manufacturer: "
# #         f"{all_extracted_data['manufacturer']}"
# #     )

# #     print(
# #         f"📊 Quality failures: "
# #         f"{len(quality_failures)}"
# #     )


# #     try:

# #         violations = evaluate_rules(
# #             all_extracted_data,
# #             quality_failures,
# #             quality_results
# #         )

# #     except TypeError:

# #         # Backward compatibility in case the old
# #         # rule_engine.py is still being used.

# #         violations = evaluate_rules(
# #             all_extracted_data,
# #             quality_failures
# #         )

# #     except Exception as error:

# #         print(
# #             f"❌ Rule engine failed: {error}"
# #         )

# #         raise HTTPException(
# #             status_code=500,
# #             detail=(
# #                 f"Compliance rule evaluation failed: {error}"
# #             )
# #         )


# #     all_violations.extend(
# #         violations
# #     )


# #     print(
# #         f"⚠️ Violations detected: "
# #         f"{len(violations)}"
# #     )


# #     for violation in violations:

# #         print(
# #             f"   • "
# #             f"{violation.get('rule_id', 'UNKNOWN')} "
# #             f"| "
# #             f"{violation.get('field', 'unknown')} "
# #             f"| "
# #             f"{violation.get('detected_value', 'N/A')}"
# #         )


# #     # =========================================================
# #     # OVERALL CONFIDENCE
# #     # =========================================================

# #     overall_confidence = (

# #         total_confidence /
# #         processed_images_count

# #         if processed_images_count > 0

# #         else 0.0
# #     )


# #     # =========================================================
# #     # FINAL RESULT
# #     # =========================================================

# #     result = {

# #         "inspection_id": inspection_id,

# #         "processed_images": processed_images_count,

# #         # ---------------------------------------------
# #         # Extracted declarations
# #         # ---------------------------------------------

# #         "declarations": [

# #             {
# #                 "field": key,
# #                 "value": ", ".join(values),
# #                 "confidence": 90
# #             }

# #             for key, values
# #             in all_extracted_data.items()

# #             if values

# #         ],

# #         # ---------------------------------------------
# #         # Raw extracted data
# #         # ---------------------------------------------

# #         "extracted_data": all_extracted_data,

# #         # ---------------------------------------------
# #         # Violations
# #         # ---------------------------------------------

# #         "violations": all_violations,

# #         # ---------------------------------------------
# #         # CNN results
# #         # ---------------------------------------------

# #         "classifications": classifications,

# #         # ---------------------------------------------
# #         # Image quality
# #         # ---------------------------------------------

# #         "image_quality": quality_results,

# #         # ---------------------------------------------
# #         # Detailed per-image analysis
# #         # ---------------------------------------------

# #         "image_analysis": image_analysis,

# #         # ---------------------------------------------
# #         # Overall confidence
# #         # ---------------------------------------------

# #         "overall_confidence": overall_confidence,

# #         # ---------------------------------------------
# #         # Evidence
# #         # ---------------------------------------------

# #         "evidence_files": all_evidence

# #     }


# #     print("")
# #     print("================================================")
# #     print("✅ ANALYSIS COMPLETE")
# #     print("================================================")

# #     print(
# #         f"📷 Images processed : "
# #         f"{processed_images_count}"
# #     )

# #     print(
# #         f"⚠️ Violations       : "
# #         f"{len(all_violations)}"
# #     )

# #     print(
# #         f"🎯 Overall confidence: "
# #         f"{overall_confidence:.4f}"
# #     )

# #     print("================================================")
# #     print("")


# #     return result


# # # =============================================================
# # # RUN SERVER
# # # =============================================================

# # if __name__ == "__main__":

# #     uvicorn.run(
# #         "app.main:app",
# #         host="0.0.0.0",
# #         port=8000,
# #         reload=True
# #     )

# from fastapi import FastAPI, UploadFile, File, Form, HTTPException
# from typing import List
# import uvicorn


# # ============================================================
# # LEGALSCAN AI PIPELINE IMPORTS
# # ============================================================

# from app.models.cnn_classifier import classify_image
# from app.pipeline.quality_check import check_image_quality
# from app.pipeline.ocr_engine import perform_ocr
# from app.pipeline.nlp_extractor import extract_fields
# from app.pipeline.rule_engine import evaluate_rules
# from app.pipeline.evidence_generator import generate_evidence


# # ============================================================
# # FASTAPI APPLICATION
# # ============================================================

# app = FastAPI(
#     title="LegalScan AI Service",
#     version="1.0.0"
# )


# # ============================================================
# # FULL AI PIPELINE
# # ============================================================

# @app.post("/api/analyze/full-pipeline")
# async def analyze_full_pipeline(
#     inspection_id: str = Form(...),
#     images: List[UploadFile] = File(...)
# ):
#     """
#     Complete LegalScan AI inspection pipeline.

#     Flow:

#         Uploaded Images
#               ↓
#         Image Quality Check
#               ↓
#         CNN Classification
#               ↓
#         OCR
#               ↓
#         NLP Field Extraction
#               ↓
#         Legal Metrology Rule Engine
#               ↓
#         Compliance / Review Findings
#               ↓
#         Evidence
#     """

#     # ========================================================
#     # VALIDATION
#     # ========================================================

#     if not images:

#         raise HTTPException(
#             status_code=400,
#             detail="No images provided"
#         )

#     print("")
#     print("================================================")
#     print("🤖 LEGALSCAN AI - FULL PIPELINE")
#     print("================================================")
#     print(
#         f"🆔 Inspection ID: {inspection_id}"
#     )
#     print(
#         f"📷 Images received: {len(images)}"
#     )
#     print("================================================")


#     # ========================================================
#     # INITIAL DATA STRUCTURES
#     # ========================================================

#     all_extracted_data = {
#         "mrp": [],
#         "net_quantity": [],
#         "manufacturer": []
#     }

#     # Legal Metrology findings ONLY
#     all_violations = []

#     # Separate image-quality warnings
#     quality_warnings = []

#     # Used internally / backwards compatibility
#     quality_failures = []

#     # CNN results
#     classifications = []

#     # Detailed per-image analysis
#     image_analysis = []

#     # Evidence
#     all_evidence = []

#     # Confidence
#     total_confidence = 0.0
#     processed_images_count = 0


#     # ========================================================
#     # PROCESS EACH IMAGE
#     # ========================================================

#     for index, image in enumerate(
#         images,
#         start=1
#     ):

#         print("")
#         print("------------------------------------------------")
#         print(
#             f"📷 Processing Image "
#             f"{index}/{len(images)}"
#         )
#         print(
#             f"📄 Filename: {image.filename}"
#         )
#         print("------------------------------------------------")


#         # ====================================================
#         # READ IMAGE
#         # ====================================================

#         try:

#             image_bytes = await image.read()

#         except Exception as error:

#             print(
#                 f"❌ Failed to read image: {error}"
#             )

#             continue


#         if not image_bytes:

#             print(
#                 "⚠️ Empty image received."
#             )

#             continue


#         print(
#             f"📦 Image size: "
#             f"{len(image_bytes)} bytes"
#         )


#         # ====================================================
#         # 1. IMAGE QUALITY CHECK
#         # ====================================================

#         try:

#             quality = check_image_quality(
#                 image_bytes
#             )

#         except Exception as error:

#             print(
#                 f"❌ Image quality analysis failed: "
#                 f"{error}"
#             )

#             quality = {

#                 "passed": False,

#                 "blur_detected": False,

#                 "glare_detected": False,

#                 "resolution_warning": False,

#                 "quality_level": "UNKNOWN",

#                 "message": (
#                     "Image quality analysis "
#                     "could not be completed."
#                 ),

#                 "variance": 0.0,

#                 "glare_ratio": 0.0,

#                 "mean_brightness": 0.0

#             }


#         # ====================================================
#         # STORE QUALITY RESULT
#         # ====================================================

#         quality_record = {

#             "filename": image.filename,

#             **quality

#         }

#         # Keep complete quality information
#         # for frontend/debugging.

#         quality_warnings_record = {

#             "filename": image.filename,

#             "quality_level": quality.get(
#                 "quality_level",
#                 "UNKNOWN"
#             ),

#             "message": quality.get(
#                 "message",
#                 "Image quality may affect OCR."
#             ),

#             "blur_detected": bool(
#                 quality.get(
#                     "blur_detected",
#                     False
#                 )
#             ),

#             "glare_detected": bool(
#                 quality.get(
#                     "glare_detected",
#                     False
#                 )
#             ),

#             "resolution_warning": bool(
#                 quality.get(
#                     "resolution_warning",
#                     False
#                 )
#             ),

#             "passed": bool(
#                 quality.get(
#                     "passed",
#                     False
#                 )
#             )

#         }


#         # ====================================================
#         # QUALITY WARNING DECISION
#         # ====================================================
#         #
#         # IMPORTANT:
#         #
#         # Image quality is NOT a Legal Metrology violation.
#         #
#         # It is a separate warning for the officer.
#         #
#         # ====================================================

#         has_quality_issue = (

#             quality.get(
#                 "blur_detected",
#                 False
#             )

#             or

#             quality.get(
#                 "glare_detected",
#                 False
#             )

#             or

#             quality.get(
#                 "resolution_warning",
#                 False
#             )

#             or

#             not quality.get(
#                 "passed",
#                 True
#             )
#         )


#         if has_quality_issue:

#             quality_warnings.append(
#                 quality_warnings_record
#             )


#         # Backward-compatible quality failure list

#         if not quality.get(
#             "passed",
#             False
#         ):

#             quality_failures.append(
#                 quality.get(
#                     "message",
#                     "Image quality may affect OCR."
#                 )
#             )


#         print("")
#         print("📊 IMAGE QUALITY")
#         print(
#             f"   Blur Variance : "
#             f"{quality.get('variance', 0):.2f}"
#         )
#         print(
#             f"   Glare Ratio   : "
#             f"{quality.get('glare_ratio', 0):.4f}"
#         )
#         print(
#             f"   Blur Detected : "
#             f"{quality.get('blur_detected', False)}"
#         )
#         print(
#             f"   Glare Detected: "
#             f"{quality.get('glare_detected', False)}"
#         )
#         print(
#             f"   Resolution Warn: "
#             f"{quality.get('resolution_warning', False)}"
#         )
#         print(
#             f"   Quality Level : "
#             f"{quality.get('quality_level', 'UNKNOWN')}"
#         )
#         print(
#             f"   Passed        : "
#             f"{quality.get('passed', False)}"
#         )


#         # ====================================================
#         # 2. CNN CLASSIFICATION
#         # ====================================================

#         try:

#             classification = classify_image(
#                 image_bytes
#             )

#         except Exception as error:

#             print(
#                 f"❌ CNN classification failed: "
#                 f"{error}"
#             )

#             classification = {

#                 "predicted_class": "UNCLEAR",

#                 "confidence": 0.0,

#                 "error": str(error)

#             }


#         classification_record = {

#             "filename": image.filename,

#             **classification

#         }

#         classifications.append(
#             classification_record
#         )


#         cnn_confidence = float(
#             classification.get(
#                 "confidence",
#                 0.0
#             )
#         )


#         total_confidence += (
#             cnn_confidence
#         )


#         print("")
#         print("🧠 CNN CLASSIFICATION")
#         print(
#             f"   Side       : "
#             f"{classification.get('predicted_class', 'UNCLEAR')}"
#         )
#         print(
#             f"   Confidence : "
#             f"{cnn_confidence:.4f}"
#         )


#         # ====================================================
#         # 3. OCR
#         # ====================================================

#         try:

#             ocr_results = perform_ocr(
#                 image_bytes
#             )

#         except Exception as error:

#             print(
#                 f"❌ OCR failed: "
#                 f"{error}"
#             )

#             ocr_results = []


#         print("")
#         print(
#             f"🔤 OCR detections: "
#             f"{len(ocr_results)}"
#         )


#         if ocr_results:

#             print("📝 OCR TEXT")

#             for item in ocr_results:

#                 text = item.get(
#                     "text",
#                     ""
#                 )

#                 confidence = float(
#                     item.get(
#                         "confidence",
#                         0.0
#                     )
#                 )

#                 print(
#                     f"   • {text} "
#                     f"(confidence: "
#                     f"{confidence:.2f})"
#                 )

#         else:

#             print(
#                 "⚠️ No readable text detected."
#             )


#         # ====================================================
#         # 4. EVIDENCE GENERATION
#         # ====================================================

#         try:

#             evidence_paths = generate_evidence(
#                 image_bytes,
#                 ocr_results,
#                 inspection_id
#             )

#         except Exception as error:

#             print(
#                 f"⚠️ Evidence generation failed: "
#                 f"{error}"
#             )

#             evidence_paths = []


#         all_evidence.extend(
#             evidence_paths
#         )


#         # ====================================================
#         # 5. NLP / FIELD EXTRACTION
#         # ====================================================

#         try:

#             fields = extract_fields(
#                 ocr_results
#             )

#         except Exception as error:

#             print(
#                 f"❌ NLP extraction failed: "
#                 f"{error}"
#             )

#             fields = {

#                 "mrp": [],

#                 "net_quantity": [],

#                 "manufacturer": []

#             }


#         print("")
#         print("🧠 EXTRACTED FIELDS")

#         print(
#             f"   MRP          : "
#             f"{fields.get('mrp', [])}"
#         )

#         print(
#             f"   Net Quantity : "
#             f"{fields.get('net_quantity', [])}"
#         )

#         print(
#             f"   Manufacturer : "
#             f"{fields.get('manufacturer', [])}"
#         )


#         # ====================================================
#         # MERGE EXTRACTED FIELDS
#         # ====================================================

#         for key in all_extracted_data.keys():

#             values = fields.get(
#                 key,
#                 []
#             )

#             if not isinstance(
#                 values,
#                 list
#             ):

#                 values = [values]


#             for value in values:

#                 if value is None:
#                     continue

#                 value = str(
#                     value
#                 ).strip()

#                 if not value:
#                     continue

#                 if value not in all_extracted_data[key]:

#                     all_extracted_data[key].append(
#                         value
#                     )


#         # ====================================================
#         # STORE PER-IMAGE ANALYSIS
#         # ====================================================

#         image_analysis.append({

#             "filename": image.filename,

#             "cnn": classification,

#             "quality": quality,

#             "ocr": ocr_results,

#             "extracted_fields": fields

#         })


#         processed_images_count += 1


#         print(
#             f"✅ Image {index} processed successfully."
#         )


#     # ========================================================
#     # VALIDATION AFTER IMAGE PROCESSING
#     # ========================================================

#     if processed_images_count == 0:

#         raise HTTPException(
#             status_code=400,
#             detail="No valid images could be processed."
#         )


#     # ========================================================
#     # 6. LEGAL METROLOGY RULE ENGINE
#     # ========================================================

#     print("")
#     print("================================================")
#     print("⚖️ LEGAL METROLOGY RULE ENGINE")
#     print("================================================")

#     print(
#         f"📋 Extracted MRP: "
#         f"{all_extracted_data['mrp']}"
#     )

#     print(
#         f"📋 Extracted Net Quantity: "
#         f"{all_extracted_data['net_quantity']}"
#     )

#     print(
#         f"📋 Extracted Manufacturer: "
#         f"{all_extracted_data['manufacturer']}"
#     )

#     print(
#         f"📊 Quality warnings: "
#         f"{len(quality_warnings)}"
#     )


#     try:

#         violations = evaluate_rules(

#             all_extracted_data,

#             quality_failures,

#             quality_results=[
#                 record
#                 for record in [
#                     item.get("quality")
#                     for item in image_analysis
#                 ]
#                 if item
#             ]

#         )

#     except TypeError:

#         # Backward compatibility

#         try:

#             violations = evaluate_rules(
#                 all_extracted_data,
#                 quality_failures
#             )

#         except Exception as error:

#             print(
#                 f"❌ Rule engine failed: "
#                 f"{error}"
#             )

#             raise HTTPException(
#                 status_code=500,
#                 detail=(
#                     "Compliance rule evaluation "
#                     f"failed: {error}"
#                 )
#             )

#     except Exception as error:

#         print(
#             f"❌ Rule engine failed: "
#             f"{error}"
#         )

#         raise HTTPException(
#             status_code=500,
#             detail=(
#                 "Compliance rule evaluation "
#                 f"failed: {error}"
#             )
#         )


#     # ========================================================
#     # STORE LEGAL METROLOGY FINDINGS
#     # ========================================================

#     all_violations.extend(
#         violations
#     )


#     print("")
#     print(
#         f"⚖️ Legal Metrology findings: "
#         f"{len(all_violations)}"
#     )

#     for violation in all_violations:

#         print(
#             f"   • "
#             f"{violation.get('rule_id', 'UNKNOWN')} "
#             f"| "
#             f"{violation.get('field', 'unknown')} "
#             f"| "
#             f"{violation.get('detected_value', 'N/A')}"
#         )


#     # ========================================================
#     # QUALITY WARNINGS
#     # ========================================================

#     print("")
#     print(
#         f"⚠️ Image quality warnings: "
#         f"{len(quality_warnings)}"
#     )

#     for warning in quality_warnings:

#         print(
#             f"   • "
#             f"{warning.get('filename')} "
#             f"| "
#             f"{warning.get('quality_level')} "
#             f"| "
#             f"{warning.get('message')}"
#         )


#     # ========================================================
#     # OVERALL CONFIDENCE
#     # ========================================================

#     overall_confidence = (

#         total_confidence /
#         processed_images_count

#         if processed_images_count > 0

#         else 0.0

#     )


#     # ========================================================
#     # DECLARATIONS
#     # ========================================================

#     declarations = []

#     for key, values in all_extracted_data.items():

#         if not values:
#             continue

#         declarations.append({

#             "field": key,

#             "value": ", ".join(values),

#             "confidence": 90

#         })


#     # ========================================================
#     # FINAL RESULT
#     # ========================================================

#     result = {

#         # ----------------------------------------------------
#         # Inspection
#         # ----------------------------------------------------

#         "inspection_id": inspection_id,

#         "processed_images": (
#             processed_images_count
#         ),


#         # ----------------------------------------------------
#         # Extracted declarations
#         # ----------------------------------------------------

#         "declarations": declarations,


#         # ----------------------------------------------------
#         # Raw extracted data
#         # ----------------------------------------------------

#         "extracted_data": (
#             all_extracted_data
#         ),


#         # ----------------------------------------------------
#         # LEGAL METROLOGY FINDINGS
#         # ----------------------------------------------------

#         "violations": all_violations,


#         # ----------------------------------------------------
#         # IMAGE QUALITY WARNINGS
#         # ----------------------------------------------------
#         #
#         # These are deliberately separate from violations.
#         #

#         "quality_warnings": quality_warnings,


#         # ----------------------------------------------------
#         # Raw quality results
#         # ----------------------------------------------------

#         "image_quality": [
#     item.get("quality", {})
#     for item in image_analysis
# ],


#         # ----------------------------------------------------
#         # CNN
#         # ----------------------------------------------------

#         "classifications": classifications,


#         # ----------------------------------------------------
#         # Detailed image analysis
#         # ----------------------------------------------------

#         "image_analysis": image_analysis,


#         # ----------------------------------------------------
#         # Overall confidence
#         # ----------------------------------------------------

#         "overall_confidence": (
#             overall_confidence
#         ),


#         # ----------------------------------------------------
#         # Evidence
#         # ----------------------------------------------------

#         "evidence_files": all_evidence

#     }


#     # ========================================================
#     # FINAL SUMMARY
#     # ========================================================

#     print("")
#     print("================================================")
#     print("✅ LEGALSCAN AI ANALYSIS COMPLETE")
#     print("================================================")

#     print(
#         f"📷 Images processed : "
#         f"{processed_images_count}"
#     )

#     print(
#         f"⚖️ LM findings      : "
#         f"{len(all_violations)}"
#     )

#     print(
#         f"⚠️ Quality warnings : "
#         f"{len(quality_warnings)}"
#     )

#     print(
#         f"📋 Declarations     : "
#         f"{len(declarations)}"
#     )

#     print(
#         f"🎯 Overall confidence: "
#         f"{overall_confidence:.4f}"
#     )

#     print("================================================")
#     print("")


#     return result


# # =============================================================
# # HEALTH CHECK
# # =============================================================

# @app.get("/")
# async def root():

#     return {

#         "success": True,

#         "service": "LegalScan AI",

#         "version": "1.0.0",

#         "message": (
#             "LegalScan AI service is running."
#         )

#     }


# @app.get("/health")
# async def health():

#     return {

#         "success": True,

#         "service": "LegalScan AI",

#         "status": "healthy"

#     }


# # =============================================================
# # RUN SERVER
# # =============================================================

# if __name__ == "__main__":

#     uvicorn.run(

#         "app.main:app",

#         host="0.0.0.0",

#         port=8000,

#         reload=True

#     )


from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from typing import List
import uvicorn


# ============================================================
# LEGALSCAN AI PIPELINE IMPORTS
# ============================================================

from app.models.cnn_classifier import classify_image
from app.pipeline.quality_check import check_image_quality
from app.pipeline.ocr_engine import perform_ocr
from app.pipeline.nlp_extractor import extract_fields
from app.pipeline.rule_engine import evaluate_rules
from app.pipeline.evidence_generator import generate_evidence


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="LegalScan AI Service",
    version="1.0.0"
)


# ============================================================
# CONFIDENCE CALCULATION
# ============================================================

def calculate_ai_confidence(
    image_analysis,
    extracted_data,
):
    """
    Calculate a meaningful LegalScan AI confidence score.

    The previous implementation used only CNN side-classification
    confidence. That can legitimately be 0 when the package-side CNN
    is UNCLEAR, even when OCR successfully reads the label.

    This score therefore focuses on evidence used for compliance:
      - OCR confidence: 45%
      - mandatory-field extraction coverage: 40%
      - image quality: 15%

    No value is artificially boosted to 90/100.
    """

    if not image_analysis:
        return 0.0

    # -----------------------------
    # OCR confidence
    # -----------------------------
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
        sum(ocr_scores) / len(ocr_scores)
        if ocr_scores
        else 0.0
    )

    # -----------------------------
    # Mandatory-field coverage
    # -----------------------------
    mandatory_fields = (
        "mrp",
        "net_quantity",
        "manufacturer",
    )

    detected_count = sum(
        1
        for field in mandatory_fields
        if extracted_data.get(field)
    )

    extraction_coverage = (
        detected_count / len(mandatory_fields)
    )

    # -----------------------------
    # Image quality
    # -----------------------------
    quality_scores = []

    for image in image_analysis:
        quality = image.get("quality", {}) or {}
        level = str(
            quality.get("quality_level", "UNKNOWN")
        ).upper()

        if level == "GOOD":
            quality_scores.append(1.0)
        elif level == "LOW_RESOLUTION":
            quality_scores.append(0.70)
        elif level == "POOR":
            quality_scores.append(0.40)
        else:
            # If quality could not be established, do not
            # give it full credit.
            quality_scores.append(0.50)

    quality_score = (
        sum(quality_scores) / len(quality_scores)
        if quality_scores
        else 0.0
    )

    confidence = (
        (ocr_confidence * 45.0)
        + (extraction_coverage * 40.0)
        + (quality_score * 15.0)
    )

    return round(
        min(max(confidence, 0.0), 100.0),
        2
    )


# ============================================================
# FULL AI PIPELINE
# ============================================================

@app.post("/api/analyze/full-pipeline")
async def analyze_full_pipeline(
    inspection_id: str = Form(...),
    images: List[UploadFile] = File(...)
):
    """
    Complete LegalScan AI inspection pipeline.

    Flow:

        Uploaded Images
              ↓
        Image Quality Check
              ↓
        CNN Classification
              ↓
        OCR
              ↓
        NLP Field Extraction
              ↓
        Legal Metrology Rule Engine
              ↓
        Compliance / Review Findings
              ↓
        Evidence
    """

    # ========================================================
    # VALIDATION
    # ========================================================

    if not images:

        raise HTTPException(
            status_code=400,
            detail="No images provided"
        )

    print("")
    print("================================================")
    print("🤖 LEGALSCAN AI - FULL PIPELINE")
    print("================================================")
    print(
        f"🆔 Inspection ID: {inspection_id}"
    )
    print(
        f"📷 Images received: {len(images)}"
    )
    print("================================================")


    # ========================================================
    # INITIAL DATA STRUCTURES
    # ========================================================

    all_extracted_data = {
    "commodity_name": [],
    "product_name": [],
    "mrp": [],
    "net_quantity": [],
    "manufacturer": []
}

    # Legal Metrology findings ONLY
    all_violations = []

    # Separate image-quality warnings
    quality_warnings = []

    # Used internally / backwards compatibility
    quality_failures = []

    # CNN results
    classifications = []

    # Detailed per-image analysis
    image_analysis = []

    # Evidence
    all_evidence = []

    # Processing count
    processed_images_count = 0


    # ========================================================
    # PROCESS EACH IMAGE
    # ========================================================

    for index, image in enumerate(
        images,
        start=1
    ):

        print("")
        print("------------------------------------------------")
        print(
            f"📷 Processing Image "
            f"{index}/{len(images)}"
        )
        print(
            f"📄 Filename: {image.filename}"
        )
        print("------------------------------------------------")


        # ====================================================
        # READ IMAGE
        # ====================================================

        try:

            image_bytes = await image.read()

        except Exception as error:

            print(
                f"❌ Failed to read image: {error}"
            )

            continue


        if not image_bytes:

            print(
                "⚠️ Empty image received."
            )

            continue


        print(
            f"📦 Image size: "
            f"{len(image_bytes)} bytes"
        )


        # ====================================================
        # 1. IMAGE QUALITY CHECK
        # ====================================================

        try:

            quality = check_image_quality(
                image_bytes
            )

        except Exception as error:

            print(
                f"❌ Image quality analysis failed: "
                f"{error}"
            )

            quality = {

                "passed": False,

                "blur_detected": False,

                "glare_detected": False,

                "resolution_warning": False,

                "quality_level": "UNKNOWN",

                "message": (
                    "Image quality analysis "
                    "could not be completed."
                ),

                "variance": 0.0,

                "glare_ratio": 0.0,

                "mean_brightness": 0.0

            }


        # ====================================================
        # STORE QUALITY RESULT
        # ====================================================

        quality_record = {

            "filename": image.filename,

            **quality

        }

        # Keep complete quality information
        # for frontend/debugging.

        quality_warnings_record = {

            "filename": image.filename,

            "quality_level": quality.get(
                "quality_level",
                "UNKNOWN"
            ),

            "message": quality.get(
                "message",
                "Image quality may affect OCR."
            ),

            "blur_detected": bool(
                quality.get(
                    "blur_detected",
                    False
                )
            ),

            "glare_detected": bool(
                quality.get(
                    "glare_detected",
                    False
                )
            ),

            "resolution_warning": bool(
                quality.get(
                    "resolution_warning",
                    False
                )
            ),

            "passed": bool(
                quality.get(
                    "passed",
                    False
                )
            )

        }


        # ====================================================
        # QUALITY WARNING DECISION
        # ====================================================
        #
        # IMPORTANT:
        #
        # Image quality is NOT a Legal Metrology violation.
        #
        # It is a separate warning for the officer.
        #
        # ====================================================

        has_quality_issue = (

            quality.get(
                "blur_detected",
                False
            )

            or

            quality.get(
                "glare_detected",
                False
            )

            or

            quality.get(
                "resolution_warning",
                False
            )

            or

            not quality.get(
                "passed",
                True
            )
        )


        if has_quality_issue:

            quality_warnings.append(
                quality_warnings_record
            )


        # Backward-compatible quality failure list

        if not quality.get(
            "passed",
            False
        ):

            quality_failures.append(
                quality.get(
                    "message",
                    "Image quality may affect OCR."
                )
            )


        print("")
        print("📊 IMAGE QUALITY")
        print(
            f"   Blur Variance : "
            f"{quality.get('variance', 0):.2f}"
        )
        print(
            f"   Glare Ratio   : "
            f"{quality.get('glare_ratio', 0):.4f}"
        )
        print(
            f"   Blur Detected : "
            f"{quality.get('blur_detected', False)}"
        )
        print(
            f"   Glare Detected: "
            f"{quality.get('glare_detected', False)}"
        )
        print(
            f"   Resolution Warn: "
            f"{quality.get('resolution_warning', False)}"
        )
        print(
            f"   Quality Level : "
            f"{quality.get('quality_level', 'UNKNOWN')}"
        )
        print(
            f"   Passed        : "
            f"{quality.get('passed', False)}"
        )


        # ====================================================
        # 2. CNN CLASSIFICATION
        # ====================================================

        try:

            classification = classify_image(
                image_bytes
            )

        except Exception as error:

            print(
                f"❌ CNN classification failed: "
                f"{error}"
            )

            classification = {

                "predicted_class": "UNCLEAR",

                "confidence": 0.0,

                "error": str(error)

            }


        classification_record = {

            "filename": image.filename,

            **classification

        }

        classifications.append(
            classification_record
        )


        cnn_confidence = float(
            classification.get(
                "confidence",
                0.0
            )
        )

        print("")
        print("🧠 CNN CLASSIFICATION")
        print(
            f"   Side       : "
            f"{classification.get('predicted_class', 'UNCLEAR')}"
        )
        print(
            f"   Confidence : "
            f"{cnn_confidence:.4f}"
        )


        # ====================================================
        # 3. OCR
        # ====================================================

        try:

            ocr_results = perform_ocr(
                image_bytes
            )

        except Exception as error:

            print(
                f"❌ OCR failed: "
                f"{error}"
            )

            ocr_results = []


        print("")
        print(
            f"🔤 OCR detections: "
            f"{len(ocr_results)}"
        )


        if ocr_results:

            print("📝 OCR TEXT")

            for item in ocr_results:

                text = item.get(
                    "text",
                    ""
                )

                confidence = float(
                    item.get(
                        "confidence",
                        0.0
                    )
                )

                print(
                    f"   • {text} "
                    f"(confidence: "
                    f"{confidence:.2f})"
                )

        else:

            print(
                "⚠️ No readable text detected."
            )


        # ====================================================
        # 4. EVIDENCE GENERATION
        # ====================================================

        try:

            evidence_paths = generate_evidence(
                image_bytes,
                ocr_results,
                inspection_id
            )

        except Exception as error:

            print(
                f"⚠️ Evidence generation failed: "
                f"{error}"
            )

            evidence_paths = []


        all_evidence.extend(
            evidence_paths
        )


        # ====================================================
        # 5. NLP / FIELD EXTRACTION
        # ====================================================

        try:

            fields = extract_fields(
                ocr_results
            )

        except Exception as error:

            print(
                f"❌ NLP extraction failed: "
                f"{error}"
            )

            fields = {

                "mrp": [],

                "net_quantity": [],

                "manufacturer": []

            }


        print("")
        print("🧠 EXTRACTED FIELDS")

        print(
            f"   MRP          : "
            f"{fields.get('mrp', [])}"
        )

        print(
            f"   Net Quantity : "
            f"{fields.get('net_quantity', [])}"
        )

        print(
            f"   Manufacturer : "
            f"{fields.get('manufacturer', [])}"
        )


        # ====================================================
        # MERGE EXTRACTED FIELDS
        # ====================================================

        for key in all_extracted_data.keys():

            values = fields.get(
                key,
                []
            )

            if not isinstance(
                values,
                list
            ):

                values = [values]


            for value in values:

                if value is None:
                    continue

                value = str(
                    value
                ).strip()

                if not value:
                    continue

                if value not in all_extracted_data[key]:

                    all_extracted_data[key].append(
                        value
                    )


        # ====================================================
        # STORE PER-IMAGE ANALYSIS
        # ====================================================

        image_analysis.append({

            "filename": image.filename,

            "cnn": classification,

            "quality": quality,

            "ocr": ocr_results,

            "extracted_fields": fields

        })


        processed_images_count += 1


        print(
            f"✅ Image {index} processed successfully."
        )


    # ========================================================
    # VALIDATION AFTER IMAGE PROCESSING
    # ========================================================

    if processed_images_count == 0:

        raise HTTPException(
            status_code=400,
            detail="No valid images could be processed."
        )


    # ========================================================
    # 6. LEGAL METROLOGY RULE ENGINE
    # ========================================================

    print("")
    print("================================================")
    print("⚖️ LEGAL METROLOGY RULE ENGINE")
    print("================================================")

    print(
        f"📋 Extracted MRP: "
        f"{all_extracted_data['mrp']}"
    )

    print(
        f"📋 Extracted Net Quantity: "
        f"{all_extracted_data['net_quantity']}"
    )

    print(
        f"📋 Extracted Manufacturer: "
        f"{all_extracted_data['manufacturer']}"
    )

    print(
        f"📊 Quality warnings: "
        f"{len(quality_warnings)}"
    )


    try:

        violations = evaluate_rules(

            all_extracted_data,

            quality_failures,

            quality_results=[
                record
                for record in [
                    item.get("quality")
                    for item in image_analysis
                ]
                if item
            ]

        )

    except TypeError:

        # Backward compatibility

        try:

            violations = evaluate_rules(
                all_extracted_data,
                quality_failures
            )

        except Exception as error:

            print(
                f"❌ Rule engine failed: "
                f"{error}"
            )

            raise HTTPException(
                status_code=500,
                detail=(
                    "Compliance rule evaluation "
                    f"failed: {error}"
                )
            )

    except Exception as error:

        print(
            f"❌ Rule engine failed: "
            f"{error}"
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Compliance rule evaluation "
                f"failed: {error}"
            )
        )


    # ========================================================
    # STORE LEGAL METROLOGY FINDINGS
    # ========================================================

    all_violations.extend(
        violations
    )


    print("")
    print(
        f"⚖️ Legal Metrology findings: "
        f"{len(all_violations)}"
    )

    for violation in all_violations:

        print(
            f"   • "
            f"{violation.get('rule_id', 'UNKNOWN')} "
            f"| "
            f"{violation.get('field', 'unknown')} "
            f"| "
            f"{violation.get('detected_value', 'N/A')}"
        )


    # ========================================================
    # QUALITY WARNINGS
    # ========================================================

    print("")
    print(
        f"⚠️ Image quality warnings: "
        f"{len(quality_warnings)}"
    )

    for warning in quality_warnings:

        print(
            f"   • "
            f"{warning.get('filename')} "
            f"| "
            f"{warning.get('quality_level')} "
            f"| "
            f"{warning.get('message')}"
        )


    # ========================================================
    # OVERALL AI CONFIDENCE
    # ========================================================

    overall_confidence = calculate_ai_confidence(
        image_analysis=image_analysis,
        extracted_data=all_extracted_data,
    )


    # ========================================================
    # DECLARATIONS
    # ========================================================

    declarations = []

    # Field-level confidence is derived from OCR detections rather
    # than using a hardcoded value.
    field_keywords = {
        "mrp": ("mrp", "maximum retail price", "rs", "₹", "inr"),
        "net_quantity": (
            "net quantity",
            "net qty",
            "net weight",
            "net wt",
            " g",
            " kg",
            " ml",
            " l",
        ),
        "manufacturer": (
            "manufactured",
            "manufacturer",
            "mfg",
            "mfd",
            "packed by",
            "packer",
        ),
    }

    for key, values in all_extracted_data.items():

        if not values:
            continue

        matching_ocr_scores = []

        for image in image_analysis:
            for item in image.get("ocr", []) or []:
                raw_text = str(
                    item.get("text", "")
                ).strip().lower()

                if not raw_text:
                    continue

                keywords = field_keywords.get(
                    key,
                    ()
                )

                if any(
                    keyword in raw_text
                    for keyword in keywords
                ):
                    try:
                        score = float(
                            item.get(
                                "confidence",
                                0.0
                            )
                        )
                    except (
                        TypeError,
                        ValueError
                    ):
                        score = 0.0

                    if score <= 1:
                        score *= 100

                    matching_ocr_scores.append(
                        min(max(score, 0.0), 100.0)
                    )

        field_confidence = (
            round(
                sum(matching_ocr_scores)
                / len(matching_ocr_scores),
                2
            )
            if matching_ocr_scores
            else round(
                overall_confidence,
                2
            )
        )

        declarations.append({

            "field": key,

            "value": ", ".join(values),

            "confidence": field_confidence

        })


    # ========================================================
    # FINAL RESULT
    # ========================================================

    result = {

        # ----------------------------------------------------
        # Inspection
        # ----------------------------------------------------

        "inspection_id": inspection_id,

        "processed_images": (
            processed_images_count
        ),


        # ----------------------------------------------------
        # Extracted declarations
        # ----------------------------------------------------

        "declarations": declarations,


        # ----------------------------------------------------
        # Raw extracted data
        # ----------------------------------------------------

        "extracted_data": (
            all_extracted_data
        ),


        # ----------------------------------------------------
        # LEGAL METROLOGY FINDINGS
        # ----------------------------------------------------

        "violations": all_violations,


        # ----------------------------------------------------
        # IMAGE QUALITY WARNINGS
        # ----------------------------------------------------
        #
        # These are deliberately separate from violations.
        #

        "quality_warnings": quality_warnings,


        # ----------------------------------------------------
        # Raw quality results
        # ----------------------------------------------------

        "image_quality": [
    item.get("quality", {})
    for item in image_analysis
],


        # ----------------------------------------------------
        # CNN
        # ----------------------------------------------------

        "classifications": classifications,


        # ----------------------------------------------------
        # Detailed image analysis
        # ----------------------------------------------------

        "image_analysis": image_analysis,


        # ----------------------------------------------------
        # Overall confidence
        # ----------------------------------------------------

        "overall_confidence": (
            overall_confidence
        ),

        "confidence_breakdown": {
            "method": "OCR + extraction coverage + image quality",
            "ocr_weight": 45,
            "extraction_weight": 40,
            "image_quality_weight": 15,
            "overall_confidence": overall_confidence,
        },


        # ----------------------------------------------------
        # Evidence
        # ----------------------------------------------------

        "evidence_files": all_evidence

    }


    # ========================================================
    # FINAL SUMMARY
    # ========================================================

    print("")
    print("================================================")
    print("✅ LEGALSCAN AI ANALYSIS COMPLETE")
    print("================================================")

    print(
        f"📷 Images processed : "
        f"{processed_images_count}"
    )

    print(
        f"⚖️ LM findings      : "
        f"{len(all_violations)}"
    )

    print(
        f"⚠️ Quality warnings : "
        f"{len(quality_warnings)}"
    )

    print(
        f"📋 Declarations     : "
        f"{len(declarations)}"
    )

    print(
        f"🎯 Overall AI confidence: "
        f"{overall_confidence:.2f}%"
    )

    print("================================================")
    print("")


    return result


# =============================================================
# HEALTH CHECK
# =============================================================

@app.get("/")
async def root():

    return {

        "success": True,

        "service": "LegalScan AI",

        "version": "1.0.0",

        "message": (
            "LegalScan AI service is running."
        )

    }


@app.get("/health")
async def health():

    return {

        "success": True,

        "service": "LegalScan AI",

        "status": "healthy"

    }


# =============================================================
# RUN SERVER
# =============================================================

if __name__ == "__main__":

    uvicorn.run(

        "app.main:app",

        host="0.0.0.0",

        port=8000,

        reload=True

    )
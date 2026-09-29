// // // // // const Violation = require('../models/Violation');

// // // // // // @desc    Get all violations
// // // // // // @route   GET /api/violations
// // // // // // @access  Private
// // // // // exports.getViolations = async (req, res) => {
// // // // //   try {
// // // // //     const violations = await Violation.find().populate('inspectionId').populate('evidenceId').sort({ createdAt: -1 });
// // // // //     res.json({ success: true, data: violations });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };

// // // // // // @desc    Review/update a violation
// // // // // // @route   PUT /api/violations/:id/review
// // // // // // @access  Private
// // // // // exports.reviewViolation = async (req, res) => {
// // // // //   try {
// // // // //     const { status, officerRemark } = req.body;
    
// // // // //     const violation = await Violation.findById(req.params.id);
// // // // //     if (!violation) {
// // // // //       return res.status(404).json({ success: false, message: 'Violation not found' });
// // // // //     }

// // // // //     violation.status = status || violation.status;
// // // // //     violation.officerRemark = officerRemark || violation.officerRemark;
// // // // //     await violation.save();

// // // // //     res.json({ success: true, data: violation });
// // // // //   } catch (error) {
// // // // //     res.status(500).json({ success: false, message: error.message });
// // // // //   }
// // // // // };


// // // // const Violation = require('../models/Violation');

// // // // // @desc    Get all violations
// // // // // @route   GET /api/violations
// // // // // @access  Private
// // // // exports.getViolations = async (req, res) => {
// // // //   try {
// // // //     const violations = await Violation.find()
// // // //       .populate('inspectionId')
// // // //       .populate('evidenceId')
// // // //       .sort({ createdAt: -1 });

// // // //     res.json({
// // // //       success: true,
// // // //       data: violations
// // // //     });

// // // //   } catch (error) {
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       message: error.message
// // // //     });
// // // //   }
// // // // };


// // // // // @desc    Review/update a violation
// // // // // @route   PUT /api/violations/:id/review
// // // // // @access  Private
// // // // exports.reviewViolation = async (req, res) => {
// // // //   try {
// // // //     const { status, officerRemark } = req.body;

// // // //     console.log('========================================');
// // // //     console.log('📝 REVIEW VIOLATION REQUEST');
// // // //     console.log('Violation ID:', req.params.id);
// // // //     console.log('New status:', status);
// // // //     console.log('Officer remark:', officerRemark);

// // // //     // --------------------------------------------------------
// // // //     // Validate status
// // // //     // --------------------------------------------------------

// // // //     const allowedStatuses = [
// // // //       'AI_DETECTED',
// // // //       'CONFIRMED',
// // // //       'REJECTED'
// // // //     ];

// // // //     if (status && !allowedStatuses.includes(status)) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: `Invalid violation status: ${status}`
// // // //       });
// // // //     }

// // // //     // --------------------------------------------------------
// // // //     // Find violation
// // // //     // --------------------------------------------------------

// // // //     const violation = await Violation.findById(req.params.id);

// // // //     if (!violation) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: 'Violation not found'
// // // //       });
// // // //     }

// // // //     console.log('🔎 Existing status:', violation.status);

// // // //     // --------------------------------------------------------
// // // //     // Update status
// // // //     // --------------------------------------------------------

// // // //     if (status) {
// // // //       violation.status = status;
// // // //     }

// // // //     // --------------------------------------------------------
// // // //     // Update officer remark
// // // //     // --------------------------------------------------------

// // // //     if (officerRemark !== undefined) {
// // // //       violation.officerRemark = officerRemark;
// // // //     }

// // // //     // --------------------------------------------------------
// // // //     // Save
// // // //     // --------------------------------------------------------

// // // //     await violation.save();

// // // //     console.log('✅ Violation saved');
// // // //     console.log('🆔 ID:', violation._id);
// // // //     console.log('📌 Saved status:', violation.status);
// // // //     console.log('💬 Saved remark:', violation.officerRemark);
// // // //     console.log('========================================');

// // // //     // --------------------------------------------------------
// // // //     // Fetch fresh document
// // // //     // --------------------------------------------------------

// // // //     const updatedViolation = await Violation.findById(
// // // //       violation._id
// // // //     ).populate('evidenceId');

// // // //     return res.status(200).json({
// // // //       success: true,
// // // //       message: 'Violation review updated successfully',
// // // //       data: updatedViolation
// // // //     });

// // // //   } catch (error) {
// // // //     console.error('❌ Review violation error:', error);

// // // //     return res.status(500).json({
// // // //       success: false,
// // // //       message: error.message
// // // //     });
// // // //   }
// // // // };


// // // const Violation = require('../models/Violation');


// // // // ========================================================
// // // // GET ALL LEGAL METROLOGY VIOLATIONS
// // // // @route   GET /api/violations
// // // // @access  Private
// // // // ========================================================

// // // exports.getViolations = async (req, res) => {
// // //   try {

// // //     console.log('========================================');
// // //     console.log('📋 GET VIOLATIONS REQUEST');
// // //     console.log('👤 User:', req.user?.email || req.user?._id || 'Unknown');


// // //     // ======================================================
// // //     // FETCH VIOLATIONS
// // //     // ======================================================

// // //     const violations = await Violation.find()
// // //       .populate({
// // //         path: 'inspectionId',
// // //         select: [
// // //           'inspectionId',
// // //           'officerId',
// // //           'commodityName',
// // //           'productCategory',
// // //           'inspectionType',
// // //           'inspectionDate',
// // //           'location',
// // //           'status',
// // //           'complianceStatus'
// // //         ].join(' ')
// // //       })
// // //       .populate('evidenceId')
// // //       .sort({ createdAt: -1 });


// // //     console.log(
// // //       '📦 Total violation records from database:',
// // //       violations.length
// // //     );


// // //     // ======================================================
// // //     // FILTER LEGAL VIOLATIONS ONLY
// // //     //
// // //     // Image quality findings such as IQA-001 should NOT
// // //     // appear in the Legal Metrology Violations page.
// // //     // ======================================================

// // //     const legalViolations = violations.filter((violation) => {

// // //       const ruleId = String(
// // //         violation.ruleId || ''
// // //       )
// // //         .trim()
// // //         .toUpperCase();


// // //       // ----------------------------------------------------
// // //       // Ignore image-quality findings
// // //       // ----------------------------------------------------

// // //       if (
// // //         ruleId.startsWith('IQA-') ||
// // //         ruleId.startsWith('IMAGE_QUALITY') ||
// // //         ruleId.startsWith('IMAGE-QUALITY')
// // //       ) {

// // //         console.log(
// // //           `🖼️ Image-quality finding excluded: ${ruleId}`
// // //         );

// // //         return false;
// // //       }


// // //       return true;
// // //     });


// // //     console.log(
// // //       '⚖️ Legal violation records:',
// // //       legalViolations.length
// // //     );


// // //     // ======================================================
// // //     // REMOVE DUPLICATES
// // //     //
// // //     // One violation is allowed for:
// // //     //
// // //     // Inspection
// // //     // +
// // //     // Rule
// // //     // +
// // //     // Field
// // //     //
// // //     // Example:
// // //     //
// // //     // INS-2026-1234 + LMR-03 + mrp
// // //     //
// // //     // will appear only once.
// // //     // ======================================================

// // //     const uniqueViolations = [];

// // //     const seen = new Set();


// // //     for (const violation of legalViolations) {

// // //       // ----------------------------------------------------
// // //       // Inspection ID
// // //       // ----------------------------------------------------

// // //       let inspectionId = 'UNKNOWN';


// // //       if (
// // //         violation.inspectionId &&
// // //         violation.inspectionId._id
// // //       ) {

// // //         inspectionId =
// // //           violation.inspectionId._id.toString();

// // //       } else if (
// // //         violation.inspectionId
// // //       ) {

// // //         inspectionId =
// // //           violation.inspectionId.toString();
// // //       }


// // //       // ----------------------------------------------------
// // //       // Normalize rule ID
// // //       // ----------------------------------------------------

// // //       const ruleId = String(
// // //         violation.ruleId || 'UNKNOWN'
// // //       )
// // //         .trim()
// // //         .toUpperCase();


// // //       // ----------------------------------------------------
// // //       // Normalize field
// // //       // ----------------------------------------------------

// // //       const field = String(
// // //         violation.field || 'general'
// // //       )
// // //         .trim()
// // //         .toLowerCase();


// // //       // ----------------------------------------------------
// // //       // Create unique key
// // //       // ----------------------------------------------------

// // //       const uniqueKey =
// // //         `${inspectionId}__${ruleId}__${field}`;


// // //       // ----------------------------------------------------
// // //       // Duplicate?
// // //       // ----------------------------------------------------

// // //       if (seen.has(uniqueKey)) {

// // //         console.log(
// // //           `⏭️ Duplicate hidden: ${uniqueKey}`
// // //         );

// // //         continue;
// // //       }


// // //       // ----------------------------------------------------
// // //       // First occurrence
// // //       // ----------------------------------------------------

// // //       seen.add(uniqueKey);

// // //       uniqueViolations.push(
// // //         violation
// // //       );
// // //     }


// // //     console.log(
// // //       '✅ Unique violations returned:',
// // //       uniqueViolations.length
// // //     );

// // //     console.log('========================================');


// // //     // ======================================================
// // //     // RESPONSE
// // //     // ======================================================

// // //     return res.status(200).json({
// // //       success: true,
// // //       data: uniqueViolations
// // //     });


// // //   } catch (error) {

// // //     console.error(
// // //       '❌ Get violations error:',
// // //       error
// // //     );


// // //     return res.status(500).json({
// // //       success: false,
// // //       message: error.message
// // //     });
// // //   }
// // // };



// // // // ========================================================
// // // // REVIEW / UPDATE VIOLATION
// // // // @route   PUT /api/violations/:id/review
// // // // @access  Private
// // // // ========================================================

// // // exports.reviewViolation = async (req, res) => {

// // //   try {

// // //     const {
// // //       status,
// // //       officerRemark
// // //     } = req.body;


// // //     console.log('========================================');
// // //     console.log('📝 REVIEW VIOLATION REQUEST');

// // //     console.log(
// // //       'Violation ID:',
// // //       req.params.id
// // //     );

// // //     console.log(
// // //       'New status:',
// // //       status
// // //     );

// // //     console.log(
// // //       'Officer remark:',
// // //       officerRemark
// // //     );


// // //     // ======================================================
// // //     // VALIDATE STATUS
// // //     // ======================================================

// // //     const allowedStatuses = [
// // //       'AI_DETECTED',
// // //       'CONFIRMED',
// // //       'REJECTED'
// // //     ];


// // //     if (
// // //       status &&
// // //       !allowedStatuses.includes(status)
// // //     ) {

// // //       return res.status(400).json({
// // //         success: false,
// // //         message:
// // //           `Invalid violation status: ${status}`
// // //       });
// // //     }


// // //     // ======================================================
// // //     // FIND VIOLATION
// // //     // ======================================================

// // //     const violation =
// // //       await Violation.findById(
// // //         req.params.id
// // //       );


// // //     if (!violation) {

// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Violation not found'
// // //       });
// // //     }


// // //     console.log(
// // //       '🔎 Existing status:',
// // //       violation.status
// // //     );


// // //     // ======================================================
// // //     // UPDATE STATUS
// // //     // ======================================================

// // //     if (status) {

// // //       violation.status =
// // //         status;
// // //     }


// // //     // ======================================================
// // //     // UPDATE OFFICER REMARK
// // //     // ======================================================

// // //     if (
// // //       officerRemark !== undefined
// // //     ) {

// // //       violation.officerRemark =
// // //         officerRemark;
// // //     }


// // //     // ======================================================
// // //     // SAVE
// // //     // ======================================================

// // //     await violation.save();


// // //     console.log(
// // //       '✅ Violation saved'
// // //     );

// // //     console.log(
// // //       '🆔 ID:',
// // //       violation._id
// // //     );

// // //     console.log(
// // //       '📌 Saved status:',
// // //       violation.status
// // //     );

// // //     console.log(
// // //       '💬 Saved remark:',
// // //       violation.officerRemark
// // //     );

// // //     console.log(
// // //       '========================================'
// // //     );


// // //     // ======================================================
// // //     // FETCH UPDATED DOCUMENT
// // //     // ======================================================

// // //     const updatedViolation =
// // //       await Violation.findById(
// // //         violation._id
// // //       )
// // //         .populate({
// // //           path: 'inspectionId',
// // //           select: [
// // //             'inspectionId',
// // //             'officerId',
// // //             'commodityName',
// // //             'productCategory',
// // //             'inspectionType',
// // //             'inspectionDate',
// // //             'location',
// // //             'status',
// // //             'complianceStatus'
// // //           ].join(' ')
// // //         })
// // //         .populate('evidenceId');


// // //     // ======================================================
// // //     // RESPONSE
// // //     // ======================================================

// // //     return res.status(200).json({

// // //       success: true,

// // //       message:
// // //         'Violation review updated successfully',

// // //       data:
// // //         updatedViolation
// // //     });


// // //   } catch (error) {

// // //     console.error(
// // //       '❌ Review violation error:',
// // //       error
// // //     );


// // //     return res.status(500).json({

// // //       success: false,

// // //       message:
// // //         error.message
// // //     });
// // //   }
// // // };


// // const Violation = require('../models/Violation');


// // // ========================================================
// // // GET ALL LEGAL METROLOGY VIOLATIONS
// // // @route   GET /api/violations
// // // @access  Private
// // // ========================================================

// // exports.getViolations = async (req, res) => {
// //   try {

// //     console.log('========================================');
// //     console.log('📋 GET VIOLATIONS REQUEST');
// //     console.log(
// //       '👤 User:',
// //       req.user?.email ||
// //       req.user?._id ||
// //       'Unknown'
// //     );


// //     // ======================================================
// //     // FETCH VIOLATIONS
// //     // ======================================================

// //     const violations =
// //       await Violation.find()
// //         .populate({
// //           path: 'inspectionId',
// //           select: [
// //             'inspectionId',
// //             'officerId',
// //             'commodityName',
// //             'productCategory',
// //             'inspectionType',
// //             'inspectionDate',
// //             'location',
// //             'status',
// //             'complianceStatus'
// //           ].join(' ')
// //         })
// //         .populate('evidenceId')
// //         .sort({
// //           createdAt: -1
// //         });


// //     console.log(
// //       '📦 Total violation records from database:',
// //       violations.length
// //     );


// //     // ======================================================
// //     // FILTER LEGAL VIOLATIONS ONLY
// //     //
// //     // Image-quality findings such as IQA-001 should NOT
// //     // appear on the Legal Metrology Violations page.
// //     // ======================================================

// //     const legalViolations =
// //       violations.filter((violation) => {

// //         const ruleId =
// //           String(
// //             violation?.ruleId || ''
// //           )
// //             .trim()
// //             .toUpperCase();


// //         // --------------------------------------------------
// //         // IGNORE IMAGE QUALITY FINDINGS
// //         // --------------------------------------------------

// //         if (
// //           ruleId.startsWith('IQA-') ||
// //           ruleId.startsWith('IMAGE_QUALITY') ||
// //           ruleId.startsWith('IMAGE-QUALITY')
// //         ) {

// //           console.log(
// //             `🖼️ Image-quality finding excluded: ${ruleId}`
// //           );

// //           return false;
// //         }


// //         return true;
// //       });


// //     console.log(
// //       '⚖️ Legal violation records:',
// //       legalViolations.length
// //     );


// //     // ======================================================
// //     // REQUIREMENT-LEVEL DEDUPLICATION
// //     //
// //     // The same inspection can have multiple AI findings
// //     // representing the same underlying requirement.
// //     //
// //     // Example:
// //     //
// //     // LM-PC-MRP-001 / mrp
// //     // LM-PC-MRP-REVIEW / mrp
// //     //
// //     // Both represent the same MRP requirement and should
// //     // appear only once on the Violations page.
// //     // ======================================================

// //     const groupedViolations =
// //       new Map();


// //     for (
// //       const violation of
// //       legalViolations
// //     ) {

// //       // ==================================================
// //       // GET INSPECTION OBJECT ID
// //       // ==================================================

// //       let inspectionObjectId =
// //         'UNKNOWN';


// //       if (
// //         violation?.inspectionId?._id
// //       ) {

// //         inspectionObjectId =
// //           violation.inspectionId._id.toString();

// //       } else if (
// //         violation?.inspectionId
// //       ) {

// //         inspectionObjectId =
// //           violation.inspectionId.toString();
// //       }


// //       // ==================================================
// //       // NORMALIZE RULE ID
// //       // ==================================================

// //       const ruleId =
// //         String(
// //           violation?.ruleId ||
// //           ''
// //         )
// //           .trim()
// //           .toUpperCase();


// //       // ==================================================
// //       // NORMALIZE FIELD
// //       // ==================================================

// //       const field =
// //         String(
// //           violation?.field ||
// //           ''
// //         )
// //           .trim()
// //           .toLowerCase();


// //       // ==================================================
// //       // NORMALIZE REQUIREMENT
// //       // ==================================================

// //       const requirement =
// //         String(
// //           violation?.requirement ||
// //           ''
// //         )
// //           .trim()
// //           .toLowerCase();


// //       // ==================================================
// //       // COMBINE TEXT FOR REQUIREMENT DETECTION
// //       // ==================================================

// //       const combinedText =
// //         `${ruleId} ${field} ${requirement}`;


// //       // ==================================================
// //       // IDENTIFY CANONICAL REQUIREMENT
// //       // ==================================================

// //       let requirementKey =
// //         'OTHER';


// //       // --------------------------------------------------
// //       // MRP
// //       // --------------------------------------------------

// //       if (
// //         combinedText.includes('mrp') ||
// //         combinedText.includes(
// //           'maximum retail price'
// //         ) ||
// //         combinedText.includes(
// //           'retail price'
// //         )
// //       ) {

// //         requirementKey =
// //           'MRP';
// //       }


// //       // --------------------------------------------------
// //       // NET QUANTITY
// //       // --------------------------------------------------

// //       else if (
// //         combinedText.includes(
// //           'net quantity'
// //         ) ||
// //         combinedText.includes(
// //           'net weight'
// //         ) ||
// //         combinedText.includes(
// //           'net volume'
// //         )
// //       ) {

// //         requirementKey =
// //           'NET_QUANTITY';
// //       }


// //       // --------------------------------------------------
// //       // MANUFACTURER / PACKER / IMPORTER
// //       // --------------------------------------------------

// //       else if (
// //         combinedText.includes(
// //           'manufacturer'
// //         ) ||
// //         combinedText.includes(
// //           'packer'
// //         ) ||
// //         combinedText.includes(
// //           'importer'
// //         )
// //       ) {

// //         requirementKey =
// //           'MANUFACTURER';
// //       }


// //       // --------------------------------------------------
// //       // CONSUMER CARE
// //       // --------------------------------------------------

// //       else if (
// //         combinedText.includes(
// //           'consumer care'
// //         ) ||
// //         combinedText.includes(
// //           'consumer complaint'
// //         ) ||
// //         combinedText.includes(
// //           'customer care'
// //         ) ||
// //         combinedText.includes(
// //           'helpline'
// //         ) ||
// //         combinedText.includes(
// //           'toll free'
// //         )
// //       ) {

// //         requirementKey =
// //           'CONSUMER_CARE';
// //       }


// //       // --------------------------------------------------
// //       // DATE
// //       // --------------------------------------------------

// //       else if (
// //         combinedText.includes(
// //           'manufacturing date'
// //         ) ||
// //         combinedText.includes(
// //           'date of manufacture'
// //         ) ||
// //         combinedText.includes(
// //           'packing date'
// //         ) ||
// //         combinedText.includes(
// //           'month'
// //         ) ||
// //         combinedText.includes(
// //           'year'
// //         )
// //       ) {

// //         requirementKey =
// //           'DATE';
// //       }


// //       // --------------------------------------------------
// //       // OTHER
// //       //
// //       // Unknown requirements are kept separate using
// //       // rule + field so unrelated violations are not
// //       // accidentally merged.
// //       // --------------------------------------------------

// //       else {

// //         requirementKey =
// //           `OTHER__${ruleId}__${field}`;
// //       }


// //       // ==================================================
// //       // CREATE FINAL UNIQUE KEY
// //       // ==================================================

// //       const uniqueKey =
// //         `${inspectionObjectId}__${requirementKey}`;


// //       console.log(
// //         `🔑 ${inspectionObjectId} → ${requirementKey}`
// //       );


// //       // ==================================================
// //       // CHECK IF ALREADY EXISTS
// //       // ==================================================

// //       const existing =
// //         groupedViolations.get(
// //           uniqueKey
// //         );


// //       // --------------------------------------------------
// //       // FIRST VIOLATION FOR THIS REQUIREMENT
// //       // --------------------------------------------------

// //       if (!existing) {

// //         groupedViolations.set(
// //           uniqueKey,
// //           violation
// //         );

// //         continue;
// //       }


// //       // ==================================================
// //       // DUPLICATE FOUND
// //       //
// //       // Keep the violation with the higher confidence.
// //       // ==================================================

// //       const existingConfidence =
// //         Number(
// //           existing?.confidence
// //         ) || 0;


// //       const currentConfidence =
// //         Number(
// //           violation?.confidence
// //         ) || 0;


// //       if (
// //         currentConfidence >
// //         existingConfidence
// //       ) {

// //         console.log(
// //           `🔄 Replacing lower-confidence violation: ${uniqueKey}`
// //         );

// //         groupedViolations.set(
// //           uniqueKey,
// //           violation
// //         );

// //       } else {

// //         console.log(
// //           `⏭️ Duplicate hidden: ${uniqueKey}`
// //         );
// //       }
// //     }


// //     // ======================================================
// //     // CONVERT MAP TO ARRAY
// //     // ======================================================

// //     const uniqueViolations =
// //       Array.from(
// //         groupedViolations.values()
// //       );


// //     // ======================================================
// //     // SORT FINAL RESULTS
// //     //
// //     // Keep newest violations first.
// //     // ======================================================

// //     uniqueViolations.sort(
// //       (a, b) => {

// //         const dateA =
// //           new Date(
// //             a?.createdAt || 0
// //           ).getTime();

// //         const dateB =
// //           new Date(
// //             b?.createdAt || 0
// //           ).getTime();

// //         return dateB - dateA;
// //       }
// //     );


// //     // ======================================================
// //     // LOG FINAL RESULT
// //     // ======================================================

// //     console.log(
// //       '========================================'
// //     );

// //     console.log(
// //       '📦 Database records:',
// //       violations.length
// //     );

// //     console.log(
// //       '⚖️ Legal records:',
// //       legalViolations.length
// //     );

// //     console.log(
// //       '✅ Unique violations returned:',
// //       uniqueViolations.length
// //     );

// //     console.log(
// //       '========================================'
// //     );


// //     // ======================================================
// //     // RESPONSE
// //     // ======================================================

// //     return res.status(200).json({

// //       success: true,

// //       data:
// //         uniqueViolations

// //     });


// //   } catch (error) {

// //     console.error(
// //       '❌ Get violations error:',
// //       error
// //     );


// //     return res.status(500).json({

// //       success: false,

// //       message:
// //         error.message

// //     });
// //   }
// // };



// // // ========================================================
// // // REVIEW / UPDATE VIOLATION
// // // @route   PUT /api/violations/:id/review
// // // @access  Private
// // // ========================================================

// // exports.reviewViolation = async (
// //   req,
// //   res
// // ) => {

// //   try {

// //     const {
// //       status,
// //       officerRemark
// //     } = req.body;


// //     console.log(
// //       '========================================'
// //     );

// //     console.log(
// //       '📝 REVIEW VIOLATION REQUEST'
// //     );


// //     console.log(
// //       'Violation ID:',
// //       req.params.id
// //     );


// //     console.log(
// //       'New status:',
// //       status
// //     );


// //     console.log(
// //       'Officer remark:',
// //       officerRemark
// //     );


// //     // ======================================================
// //     // VALIDATE STATUS
// //     // ======================================================

// //     const allowedStatuses = [
// //       'AI_DETECTED',
// //       'CONFIRMED',
// //       'REJECTED'
// //     ];


// //     if (
// //       status &&
// //       !allowedStatuses.includes(
// //         status
// //       )
// //     ) {

// //       return res.status(400).json({

// //         success: false,

// //         message:
// //           `Invalid violation status: ${status}`

// //       });
// //     }


// //     // ======================================================
// //     // FIND VIOLATION
// //     // ======================================================

// //     const violation =
// //       await Violation.findById(
// //         req.params.id
// //       );


// //     if (!violation) {

// //       return res.status(404).json({

// //         success: false,

// //         message:
// //           'Violation not found'

// //       });
// //     }


// //     console.log(
// //       '🔎 Existing status:',
// //       violation.status
// //     );


// //     // ======================================================
// //     // UPDATE STATUS
// //     // ======================================================

// //     if (status) {

// //       violation.status =
// //         status;
// //     }


// //     // ======================================================
// //     // UPDATE OFFICER REMARK
// //     // ======================================================

// //     if (
// //       officerRemark !== undefined
// //     ) {

// //       violation.officerRemark =
// //         officerRemark;
// //     }


// //     // ======================================================
// //     // SAVE
// //     // ======================================================

// //     await violation.save();


// //     console.log(
// //       '✅ Violation saved'
// //     );


// //     console.log(
// //       '🆔 ID:',
// //       violation._id
// //     );


// //     console.log(
// //       '📌 Saved status:',
// //       violation.status
// //     );


// //     console.log(
// //       '💬 Saved remark:',
// //       violation.officerRemark
// //     );
// // console.log(
// //   '🚨 FINAL API VIOLATIONS:',
// //   uniqueViolations.map(v => ({
// //     id: v._id,
// //     inspection:
// //       v.inspectionId?.inspectionId,
// //     rule: v.ruleId,
// //     field: v.field,
// //     requirement: v.requirement,
// //     confidence: v.confidence,
// //     status: v.status
// //   }))
// // );

// //     console.log(
// //       '========================================'
// //     );


// //     // ======================================================
// //     // FETCH UPDATED DOCUMENT
// //     // ======================================================

// //     const updatedViolation =
// //       await Violation.findById(
// //         violation._id
// //       )
// //         .populate({
// //           path: 'inspectionId',
// //           select: [
// //             'inspectionId',
// //             'officerId',
// //             'commodityName',
// //             'productCategory',
// //             'inspectionType',
// //             'inspectionDate',
// //             'location',
// //             'status',
// //             'complianceStatus'
// //           ].join(' ')
// //         })
// //         .populate(
// //           'evidenceId'
// //         );


// //     // ======================================================
// //     // RESPONSE
// //     // ======================================================

// //     return res.status(200).json({

// //       success: true,

// //       message:
// //         'Violation review updated successfully',

// //       data:
// //         updatedViolation

// //     });


// //   } catch (error) {

// //     console.error(
// //       '❌ Review violation error:',
// //       error
// //     );


// //     return res.status(500).json({

// //       success: false,

// //       message:
// //         error.message

// //     });
// //   }
// // };

// const Violation = require('../models/Violation');


// // ========================================================
// // GET ALL LEGAL METROLOGY VIOLATIONS
// // @route   GET /api/violations
// // @access  Private
// // ========================================================

// exports.getViolations = async (req, res) => {
//   try {

//     console.log('========================================');
//     console.log('📋 GET VIOLATIONS REQUEST');
//     console.log(
//       '👤 User:',
//       req.user?.email ||
//       req.user?._id ||
//       'Unknown'
//     );


//     // ======================================================
//     // FETCH VIOLATIONS
//     // ======================================================

//     const violations =
//       await Violation.find()
//         .populate({
//           path: 'inspectionId',
//           select: [
//             'inspectionId',
//             'officerId',
//             'commodityName',
//             'productCategory',
//             'inspectionType',
//             'inspectionDate',
//             'location',
//             'status',
//             'complianceStatus'
//           ].join(' ')
//         })
//         .populate('evidenceId')
//         .sort({
//           createdAt: -1
//         });


//     console.log(
//       '📦 Total violation records from database:',
//       violations.length
//     );


//     // ======================================================
//     // FILTER LEGAL VIOLATIONS ONLY
//     //
//     // Image-quality findings such as IQA-001 should NOT
//     // appear on the Legal Metrology Violations page.
//     // ======================================================

//     const legalViolations =
//       violations.filter((violation) => {

//         const ruleId =
//           String(
//             violation?.ruleId || ''
//           )
//             .trim()
//             .toUpperCase();


//         // --------------------------------------------------
//         // IGNORE IMAGE QUALITY FINDINGS
//         // --------------------------------------------------

//         if (
//           ruleId.startsWith('IQA-') ||
//           ruleId.startsWith('IMAGE_QUALITY') ||
//           ruleId.startsWith('IMAGE-QUALITY')
//         ) {

//           console.log(
//             `🖼️ Image-quality finding excluded: ${ruleId}`
//           );

//           return false;
//         }


//         return true;
//       });


//     console.log(
//       '⚖️ Legal violation records:',
//       legalViolations.length
//     );


//     // ======================================================
//     // REQUIREMENT-LEVEL DEDUPLICATION
//     //
//     // The same inspection can have multiple AI findings
//     // representing the same underlying requirement.
//     //
//     // Example:
//     //
//     // LM-PC-MRP-001 / mrp
//     // LM-PC-MRP-REVIEW / mrp
//     //
//     // Both represent the same MRP requirement and should
//     // appear only once on the Violations page.
//     // ======================================================

//     const groupedViolations =
//       new Map();


//     for (
//       const violation of
//       legalViolations
//     ) {

//       // ==================================================
//       // GET INSPECTION OBJECT ID
//       // ==================================================

//       let inspectionObjectId =
//         'UNKNOWN';


//       if (
//         violation?.inspectionId?._id
//       ) {

//         inspectionObjectId =
//           violation.inspectionId._id.toString();

//       } else if (
//         violation?.inspectionId
//       ) {

//         inspectionObjectId =
//           violation.inspectionId.toString();
//       }


//       // ==================================================
//       // NORMALIZE RULE ID
//       // ==================================================

//       const ruleId =
//         String(
//           violation?.ruleId ||
//           ''
//         )
//           .trim()
//           .toUpperCase();


//       // ==================================================
//       // NORMALIZE FIELD
//       // ==================================================

//       const field =
//         String(
//           violation?.field ||
//           ''
//         )
//           .trim()
//           .toLowerCase();


//       // ==================================================
//       // NORMALIZE REQUIREMENT
//       // ==================================================

//       const requirement =
//         String(
//           violation?.requirement ||
//           ''
//         )
//           .trim()
//           .toLowerCase();


//       // ==================================================
//       // COMBINE TEXT FOR REQUIREMENT DETECTION
//       // ==================================================

//       const combinedText =
//         `${ruleId} ${field} ${requirement}`;


//       // ==================================================
//       // IDENTIFY CANONICAL REQUIREMENT
//       // ==================================================

//       let requirementKey =
//         'OTHER';


//       // --------------------------------------------------
//       // MRP
//       // --------------------------------------------------

//       if (
//         combinedText.includes('mrp') ||
//         combinedText.includes(
//           'maximum retail price'
//         ) ||
//         combinedText.includes(
//           'retail price'
//         )
//       ) {

//         requirementKey =
//           'MRP';
//       }


//       // --------------------------------------------------
//       // NET QUANTITY
//       // --------------------------------------------------

//       else if (
//         combinedText.includes(
//           'net quantity'
//         ) ||
//         combinedText.includes(
//           'net weight'
//         ) ||
//         combinedText.includes(
//           'net volume'
//         )
//       ) {

//         requirementKey =
//           'NET_QUANTITY';
//       }


//       // --------------------------------------------------
//       // MANUFACTURER / PACKER / IMPORTER
//       // --------------------------------------------------

//       else if (
//         combinedText.includes(
//           'manufacturer'
//         ) ||
//         combinedText.includes(
//           'packer'
//         ) ||
//         combinedText.includes(
//           'importer'
//         )
//       ) {

//         requirementKey =
//           'MANUFACTURER';
//       }


//       // --------------------------------------------------
//       // CONSUMER CARE
//       // --------------------------------------------------

//       else if (
//         combinedText.includes(
//           'consumer care'
//         ) ||
//         combinedText.includes(
//           'consumer complaint'
//         ) ||
//         combinedText.includes(
//           'customer care'
//         ) ||
//         combinedText.includes(
//           'helpline'
//         ) ||
//         combinedText.includes(
//           'toll free'
//         )
//       ) {

//         requirementKey =
//           'CONSUMER_CARE';
//       }


//       // --------------------------------------------------
//       // DATE
//       // --------------------------------------------------

//       else if (
//         combinedText.includes(
//           'manufacturing date'
//         ) ||
//         combinedText.includes(
//           'date of manufacture'
//         ) ||
//         combinedText.includes(
//           'packing date'
//         ) ||
//         combinedText.includes(
//           'month'
//         ) ||
//         combinedText.includes(
//           'year'
//         )
//       ) {

//         requirementKey =
//           'DATE';
//       }


//       // --------------------------------------------------
//       // OTHER
//       //
//       // Unknown requirements are kept separate using
//       // rule + field so unrelated violations are not
//       // accidentally merged.
//       // --------------------------------------------------

//       else {

//         requirementKey =
//           `OTHER__${ruleId}__${field}`;
//       }


//       // ==================================================
//       // CREATE FINAL UNIQUE KEY
//       // ==================================================

//       const uniqueKey =
//         `${inspectionObjectId}__${requirementKey}`;


//       console.log(
//         `🔑 ${inspectionObjectId} → ${requirementKey}`
//       );


//       // ==================================================
//       // CHECK IF ALREADY EXISTS
//       // ==================================================

//       const existing =
//         groupedViolations.get(
//           uniqueKey
//         );


//       // --------------------------------------------------
//       // FIRST VIOLATION FOR THIS REQUIREMENT
//       // --------------------------------------------------

//       if (!existing) {

//         groupedViolations.set(
//           uniqueKey,
//           violation
//         );

//         continue;
//       }


//       // ==================================================
//       // DUPLICATE FOUND
//       //
//       // Keep the violation with the higher confidence.
//       // ==================================================

//       const existingConfidence =
//         Number(
//           existing?.confidence
//         ) || 0;


//       const currentConfidence =
//         Number(
//           violation?.confidence
//         ) || 0;


//       if (
//         currentConfidence >
//         existingConfidence
//       ) {

//         console.log(
//           `🔄 Replacing lower-confidence violation: ${uniqueKey}`
//         );

//         groupedViolations.set(
//           uniqueKey,
//           violation
//         );

//       } else {

//         console.log(
//           `⏭️ Duplicate hidden: ${uniqueKey}`
//         );
//       }
//     }


//     // ======================================================
//     // CONVERT MAP TO ARRAY
//     // ======================================================

//     const uniqueViolations =
//       Array.from(
//         groupedViolations.values()
//       );


//     // ======================================================
//     // SORT FINAL RESULTS
//     //
//     // Keep newest violations first.
//     // ======================================================

//     uniqueViolations.sort(
//       (a, b) => {

//         const dateA =
//           new Date(
//             a?.createdAt || 0
//           ).getTime();

//         const dateB =
//           new Date(
//             b?.createdAt || 0
//           ).getTime();

//         return dateB - dateA;
//       }
//     );


//     // ======================================================
//     // LOG FINAL RESULT
//     // ======================================================

//     console.log(
//       '========================================'
//     );

//     console.log(
//       '📦 Database records:',
//       violations.length
//     );

//     console.log(
//       '⚖️ Legal records:',
//       legalViolations.length
//     );

//     console.log(
//       '✅ Unique violations returned:',
//       uniqueViolations.length
//     );

//     console.log(
//       '========================================'
//     );


//     // ======================================================
//     // RESPONSE
//     // ======================================================

//     return res.status(200).json({

//       success: true,

//       data:
//         uniqueViolations

//     });


//   } catch (error) {

//     console.error(
//       '❌ Get violations error:',
//       error
//     );


//     return res.status(500).json({

//       success: false,

//       message:
//         error.message

//     });
//   }
// };



// // ========================================================
// // REVIEW / UPDATE VIOLATION
// // @route   PUT /api/violations/:id/review
// // @access  Private
// // ========================================================

// exports.reviewViolation = async (
//   req,
//   res
// ) => {

//   try {

//     const {
//       status,
//       officerRemark
//     } = req.body;


//     console.log(
//       '========================================'
//     );

//     console.log(
//       '📝 REVIEW VIOLATION REQUEST'
//     );


//     console.log(
//       'Violation ID:',
//       req.params.id
//     );


//     console.log(
//       'New status:',
//       status
//     );


//     console.log(
//       'Officer remark:',
//       officerRemark
//     );


//     // ======================================================
//     // VALIDATE STATUS
//     // ======================================================

//     const allowedStatuses = [
//       'AI_DETECTED',
//       'CONFIRMED',
//       'REJECTED'
//     ];


//     if (
//       status &&
//       !allowedStatuses.includes(
//         status
//       )
//     ) {

//       return res.status(400).json({

//         success: false,

//         message:
//           `Invalid violation status: ${status}`

//       });
//     }


//     // ======================================================
//     // FIND VIOLATION
//     // ======================================================

//     const violation =
//       await Violation.findById(
//         req.params.id
//       );


//     if (!violation) {

//       return res.status(404).json({

//         success: false,

//         message:
//           'Violation not found'

//       });
//     }


//     console.log(
//       '🔎 Existing status:',
//       violation.status
//     );


//     // ======================================================
//     // UPDATE STATUS
//     // ======================================================

//     if (status) {

//       violation.status =
//         status;
//     }


//     // ======================================================
//     // UPDATE OFFICER REMARK
//     // ======================================================

//     if (
//       officerRemark !== undefined
//     ) {

//       violation.officerRemark =
//         officerRemark;
//     }


//     // ======================================================
//     // SAVE
//     // ======================================================

//     await violation.save();


//     console.log(
//       '✅ Violation saved'
//     );


//     console.log(
//       '🆔 ID:',
//       violation._id
//     );


//     console.log(
//       '📌 Saved status:',
//       violation.status
//     );


//     console.log(
//       '💬 Saved remark:',
//       violation.officerRemark
//     );
// console.log(
//   '🚨 FINAL API VIOLATIONS:',
//   uniqueViolations.map(v => ({
//     id: v._id,
//     inspection:
//       v.inspectionId?.inspectionId,
//     rule: v.ruleId,
//     field: v.field,
//     requirement: v.requirement,
//     confidence: v.confidence,
//     status: v.status
//   }))
// );

//     console.log(
//       '========================================'
//     );


//     // ======================================================
//     // FETCH UPDATED DOCUMENT
//     // ======================================================

//     const updatedViolation =
//       await Violation.findById(
//         violation._id
//       )
//         .populate({
//           path: 'inspectionId',
//           select: [
//             'inspectionId',
//             'officerId',
//             'commodityName',
//             'productCategory',
//             'inspectionType',
//             'inspectionDate',
//             'location',
//             'status',
//             'complianceStatus'
//           ].join(' ')
//         })
//         .populate(
//           'evidenceId'
//         );


//     // ======================================================
//     // RESPONSE
//     // ======================================================

//     return res.status(200).json({

//       success: true,

//       message:
//         'Violation review updated successfully',

//       data:
//         updatedViolation

//     });


//   } catch (error) {

//     console.error(
//       '❌ Review violation error:',
//       error
//     );


//     return res.status(500).json({

//       success: false,

//       message:
//         error.message

//     });
//   }
// };


const Violation = require('../models/Violation');
const Inspection = require('../models/Inspection');

// ========================================================
// GET VIOLATIONS FOR LATEST INSPECTION ONLY
// @route   GET /api/violations
// @access  Private
// ========================================================

exports.getViolations = async (req, res) => {
  try {
    console.log('========================================');
    console.log('📋 GET VIOLATIONS REQUEST');

    console.log(
      '👤 User:',
      req.user?.email ||
        req.user?._id ||
        'Unknown'
    );

    // ======================================================
    // FIND LATEST INSPECTION FOR LOGGED-IN OFFICER
    // ======================================================

    const latestInspection =
      await Inspection.findOne({
        officerId: req.user._id
      })
        .sort({
          createdAt: -1
        })
        .select([
          '_id',
          'inspectionId',
          'officerId',
          'commodityName',
          'productCategory',
          'inspectionType',
          'inspectionDate',
          'location',
          'status',
          'complianceStatus'
        ].join(' '));

    // ======================================================
    // NO INSPECTION FOUND
    // ======================================================

    if (!latestInspection) {
      console.log(
        'ℹ️ No inspection found for current user'
      );

      return res.status(200).json({
        success: true,
        count: 0,
        data: []
      });
    }

    console.log(
      '🆕 Latest inspection:',
      latestInspection.inspectionId
    );

    console.log(
      '🆔 Inspection Mongo ID:',
      latestInspection._id
    );

    // ======================================================
    // FETCH ONLY VIOLATIONS FOR LATEST INSPECTION
    // ======================================================

    const violations =
      await Violation.find({
        inspectionId:
          latestInspection._id
      })
        .populate({
          path: 'inspectionId',
          select: [
            'inspectionId',
            'officerId',
            'commodityName',
            'productCategory',
            'inspectionType',
            'inspectionDate',
            'location',
            'status',
            'complianceStatus'
          ].join(' ')
        })
        .populate('evidenceId')
        .sort({
          createdAt: -1
        });

    console.log(
      '📦 Violations for latest inspection:',
      violations.length
    );

    // ======================================================
    // FILTER LEGAL VIOLATIONS ONLY
    //
    // IQA / image-quality findings should NOT appear
    // on the Legal Metrology Violations page.
    // ======================================================

    const legalViolations =
      violations.filter((violation) => {
        const ruleId =
          String(
            violation?.ruleId || ''
          )
            .trim()
            .toUpperCase();

        if (
          ruleId.startsWith('IQA-') ||
          ruleId.startsWith('IMAGE_QUALITY') ||
          ruleId.startsWith('IMAGE-QUALITY')
        ) {
          console.log(
            `🖼️ Image-quality finding excluded: ${ruleId}`
          );

          return false;
        }

        return true;
      });

    console.log(
      '⚖️ Legal violations:',
      legalViolations.length
    );

    // ======================================================
    // REQUIREMENT-LEVEL DEDUPLICATION
    // ======================================================

    const groupedViolations =
      new Map();

    for (
      const violation of
      legalViolations
    ) {

      // ==================================================
      // NORMALIZE RULE ID
      // ==================================================

      const ruleId =
        String(
          violation?.ruleId || ''
        )
          .trim()
          .toUpperCase();

      // ==================================================
      // NORMALIZE FIELD
      // ==================================================

      const field =
        String(
          violation?.field || ''
        )
          .trim()
          .toLowerCase();

      // ==================================================
      // NORMALIZE REQUIREMENT
      // ==================================================

      const requirement =
        String(
          violation?.requirement || ''
        )
          .trim()
          .toLowerCase();

      // ==================================================
      // COMBINE EVERYTHING
      // ==================================================

      const combinedText =
        `${ruleId} ${field} ${requirement}`;

      // ==================================================
      // DETERMINE CANONICAL REQUIREMENT
      // ==================================================

      let requirementKey =
        'OTHER';

      // --------------------------------------------------
      // MRP
      // --------------------------------------------------

      if (
        combinedText.includes('mrp') ||
        combinedText.includes(
          'maximum retail price'
        ) ||
        combinedText.includes(
          'retail price'
        )
      ) {

        requirementKey =
          'MRP';

      }

      // --------------------------------------------------
      // NET QUANTITY
      // --------------------------------------------------

      else if (
        combinedText.includes(
          'net quantity'
        ) ||
        combinedText.includes(
          'net weight'
        ) ||
        combinedText.includes(
          'net volume'
        ) ||
        combinedText.includes(
          'net_qty'
        ) ||
        combinedText.includes(
          'netqty'
        )
      ) {

        requirementKey =
          'NET_QUANTITY';

      }

      // --------------------------------------------------
      // MANUFACTURER / PACKER / IMPORTER
      // --------------------------------------------------

      else if (
        combinedText.includes(
          'manufacturer'
        ) ||
        combinedText.includes(
          'packer'
        ) ||
        combinedText.includes(
          'importer'
        ) ||
        combinedText.includes(
          'mfg'
        )
      ) {

        requirementKey =
          'MANUFACTURER';

      }

      // --------------------------------------------------
      // CONSUMER CARE
      // --------------------------------------------------

      else if (
        combinedText.includes(
          'consumer care'
        ) ||
        combinedText.includes(
          'consumer complaint'
        ) ||
        combinedText.includes(
          'customer care'
        ) ||
        combinedText.includes(
          'helpline'
        ) ||
        combinedText.includes(
          'toll free'
        ) ||
        combinedText.includes(
          'consumer'
        )
      ) {

        requirementKey =
          'CONSUMER_CARE';

      }

      // --------------------------------------------------
      // DATE
      // --------------------------------------------------

      else if (
        combinedText.includes(
          'manufacturing date'
        ) ||
        combinedText.includes(
          'date of manufacture'
        ) ||
        combinedText.includes(
          'packing date'
        ) ||
        combinedText.includes(
          'packed date'
        ) ||
        combinedText.includes(
          'month'
        ) ||
        combinedText.includes(
          'year'
        )
      ) {

        requirementKey =
          'DATE';

      }

      // --------------------------------------------------
      // COMMODITY / PRODUCT NAME
      // --------------------------------------------------

      else if (
        combinedText.includes(
          'commodity name'
        ) ||
        combinedText.includes(
          'product name'
        ) ||
        combinedText.includes(
          'commodity'
        )
      ) {

        requirementKey =
          'COMMODITY_NAME';

      }

      // --------------------------------------------------
      // OTHER
      // --------------------------------------------------

      else {

        requirementKey =
          `OTHER__${ruleId}__${field}`;

      }

      // ==================================================
      // UNIQUE KEY
      // ==================================================

      const uniqueKey =
        `${latestInspection._id}__${requirementKey}`;

      console.log(
        `🔑 ${latestInspection.inspectionId} → ${requirementKey}`
      );

      // ==================================================
      // CHECK EXISTING
      // ==================================================

      const existing =
        groupedViolations.get(
          uniqueKey
        );

      // ==================================================
      // FIRST RECORD
      // ==================================================

      if (!existing) {

        groupedViolations.set(
          uniqueKey,
          violation
        );

        continue;
      }

      // ==================================================
      // DUPLICATE
      // KEEP HIGHER CONFIDENCE
      // ==================================================

      const existingConfidence =
        Number(
          existing?.confidence
        ) || 0;

      const currentConfidence =
        Number(
          violation?.confidence
        ) || 0;

      if (
        currentConfidence >
        existingConfidence
      ) {

        console.log(
          `🔄 Replacing lower-confidence violation: ${uniqueKey}`
        );

        groupedViolations.set(
          uniqueKey,
          violation
        );

      } else {

        console.log(
          `⏭️ Duplicate hidden: ${uniqueKey}`
        );

      }
    }

    // ======================================================
    // CONVERT MAP TO ARRAY
    // ======================================================

    const uniqueViolations =
      Array.from(
        groupedViolations.values()
      );

    // ======================================================
    // SORT NEWEST FIRST
    // ======================================================

    uniqueViolations.sort(
      (a, b) => {

        const dateA =
          new Date(
            a?.createdAt || 0
          ).getTime();

        const dateB =
          new Date(
            b?.createdAt || 0
          ).getTime();

        return dateB - dateA;
      }
    );

    // ======================================================
    // FINAL DEBUG
    // ======================================================

    console.log('========================================');

    console.log(
      '🆕 LATEST INSPECTION:',
      latestInspection.inspectionId
    );

    console.log(
      '📦 Raw violations:',
      violations.length
    );

    console.log(
      '⚖️ Legal violations:',
      legalViolations.length
    );

    console.log(
      '✅ Unique violations:',
      uniqueViolations.length
    );

    console.log(
      '🚨 FINAL API VIOLATIONS:',
      uniqueViolations.map(
        (v) => ({
          id: v._id,
          inspection:
            v.inspectionId?.inspectionId,
          rule: v.ruleId,
          field: v.field,
          requirement:
            v.requirement,
          confidence:
            v.confidence,
          status:
            v.status
        })
      )
    );

    console.log('========================================');

    // ======================================================
    // RESPONSE
    // ======================================================

    return res.status(200).json({
      success: true,
      count:
        uniqueViolations.length,
      inspection:
        latestInspection.inspectionId,
      data:
        uniqueViolations
    });

  } catch (error) {

    console.error(
      '❌ Get violations error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};


// ========================================================
// REVIEW / UPDATE VIOLATION
// @route   PUT /api/violations/:id/review
// @access  Private
// ========================================================

exports.reviewViolation = async (
  req,
  res
) => {

  try {

    const {
      status,
      officerRemark
    } = req.body;

    console.log(
      '========================================'
    );

    console.log(
      '📝 REVIEW VIOLATION REQUEST'
    );

    console.log(
      'Violation ID:',
      req.params.id
    );

    console.log(
      'New status:',
      status
    );

    console.log(
      'Officer remark:',
      officerRemark
    );

    // ======================================================
    // VALIDATE STATUS
    // ======================================================

    const allowedStatuses = [
      'AI_DETECTED',
      'CONFIRMED',
      'REJECTED'
    ];

    if (
      status &&
      !allowedStatuses.includes(
        status
      )
    ) {

      return res.status(400).json({
        success: false,
        message:
          `Invalid violation status: ${status}`
      });

    }

    // ======================================================
    // FIND VIOLATION
    // ======================================================

    const violation =
      await Violation.findById(
        req.params.id
      );

    if (!violation) {

      return res.status(404).json({
        success: false,
        message:
          'Violation not found'
      });

    }

    console.log(
      '🔎 Existing status:',
      violation.status
    );

    // ======================================================
    // UPDATE STATUS
    // ======================================================

    if (status) {

      violation.status =
        status;

    }

    // ======================================================
    // UPDATE OFFICER REMARK
    // ======================================================

    if (
      officerRemark !== undefined
    ) {

      violation.officerRemark =
        officerRemark;

    }

    // ======================================================
    // SAVE
    // ======================================================

    await violation.save();

    console.log(
      '✅ Violation saved'
    );

    console.log(
      '🆔 ID:',
      violation._id
    );

    console.log(
      '📌 Saved status:',
      violation.status
    );

    console.log(
      '💬 Saved remark:',
      violation.officerRemark
    );

    // ======================================================
    // FETCH UPDATED DOCUMENT
    // ======================================================

    const updatedViolation =
      await Violation.findById(
        violation._id
      )
        .populate({
          path: 'inspectionId',
          select: [
            'inspectionId',
            'officerId',
            'commodityName',
            'productCategory',
            'inspectionType',
            'inspectionDate',
            'location',
            'status',
            'complianceStatus'
          ].join(' ')
        })
        .populate(
          'evidenceId'
        );

    // ======================================================
    // RESPONSE
    // ======================================================

    return res.status(200).json({
      success: true,
      message:
        'Violation review updated successfully',
      data:
        updatedViolation
    });

  } catch (error) {

    console.error(
      '❌ Review violation error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message
    });

  }
};
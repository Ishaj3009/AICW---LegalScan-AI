// // const Inspection = require('../models/Inspection');
// // const Image = require('../models/Image');
// // const Declaration = require('../models/Declaration');
// // const Violation = require('../models/Violation');
// // const aiService = require('../services/aiService');

// // // @desc    Create new inspection
// // // @route   POST /api/inspections
// // // @access  Private
// // exports.createInspection = async (req, res, next) => {
// //   try {
// //     const { location, productId, officerRemarks } = req.body;

// //     const inspection = await Inspection.create({
// //       inspectionId: `INS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
// //       officerId: req.user._id,
// //       location,
// //       productId: productId || null,
// //       officerRemarks
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: 'Inspection created',
// //       data: inspection
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Get all inspections
// // // @route   GET /api/inspections
// // // @access  Private
// // exports.getInspections = async (req, res, next) => {
// //   try {
// //     const inspections = await Inspection.find()
// //       .populate('officerId', 'name')
// //       .populate('productId', 'productName manufacturer')
// //       .sort('-createdAt');

// //     res.json({
// //       success: true,
// //       data: inspections
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Get inspection by ID
// // // @route   GET /api/inspections/:id
// // // @access  Private
// // exports.getInspectionById = async (req, res, next) => {
// //   try {
// //     const inspection = await Inspection.findById(req.params.id)
// //       .populate('officerId', 'name')
// //       .populate('productId')
// //       .populate('images')
// //       .populate('declarations')
// //       .populate('violations');

// //     if (!inspection) {
// //       res.status(404);
// //       throw new Error('Inspection not found');
// //     }

// //     res.json({
// //       success: true,
// //       data: inspection
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Upload image for inspection
// // // @route   POST /api/inspections/:id/images
// // // @access  Private
// // exports.uploadImage = async (req, res, next) => {
// //   try {
// //     const inspection = await Inspection.findById(req.params.id);
// //     if (!inspection) {
// //       res.status(404);
// //       throw new Error('Inspection not found');
// //     }

// //     if (!req.file) {
// //       res.status(400);
// //       throw new Error('No image file provided');
// //     }

// //     const { angle } = req.body;

// //     const image = await Image.create({
// //       inspectionId: inspection._id,
// //       imageUrl: `/uploads/${req.file.filename}`,
// //       filename: req.file.filename,
// //       mimeType: req.file.mimetype,
// //       angle: angle || 'UNKNOWN'
// //     });

// //     inspection.images.push(image._id);
// //     await inspection.save();

// //     res.status(201).json({
// //       success: true,
// //       message: 'Image uploaded successfully',
// //       data: image
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Trigger AI analysis
// // // @route   POST /api/inspections/:id/analyze
// // // @access  Private
// // exports.analyzeInspection = async (req, res, next) => {
// //   try {
// //     const inspection = await Inspection.findById(req.params.id);
// //     if (!inspection) {
// //       res.status(404);
// //       throw new Error('Inspection not found');
// //     }

// //     inspection.status = 'PROCESSING';
// //     await inspection.save();

// //     // Call Python AI Service
// //     const aiResult = await aiService.analyzeImages(inspection);

// //     // Save declarations
// //     if (aiResult.declarations && aiResult.declarations.length > 0) {
// //       for (let dec of aiResult.declarations) {
// //         const newDec = await Declaration.create({
// //           inspectionId: inspection._id,
// //           field: dec.field,
// //           value: dec.value,
// //           confidence: dec.confidence,
// //           verificationStatus: 'AI_DETECTED'
// //         });
// //         inspection.declarations.push(newDec._id);
// //       }
// //     }

// //     // Save violations
// //     if (aiResult.violations && aiResult.violations.length > 0) {
// //       for (let viol of aiResult.violations) {
// //         const newViol = await Violation.create({
// //           ruleId: viol.rule_id || 'UNKNOWN',
// //           inspectionId: inspection._id,
// //           field: viol.field || 'General',
// //           requirement: viol.requirement || 'Must comply with rules',
// //           detectedValue: viol.detected_value,
// //           expectedValue: viol.expected_value,
// //           severity: viol.severity || 'MEDIUM',
// //           confidence: viol.confidence,
// //           status: 'AI_DETECTED'
// //         });
// //         inspection.violations.push(newViol._id);
// //       }
// //       inspection.complianceStatus = aiResult.violations.some(v => v.severity === 'HIGH') 
// //         ? 'REQUIRES_REVIEW' 
// //         : 'POTENTIAL_VIOLATION';
// //     } else {
// //       inspection.complianceStatus = 'COMPLIANT';
// //     }

// //     inspection.status = 'UNDER_REVIEW';
// //     await inspection.save();

// //     res.json({
// //       success: true,
// //       message: 'Analysis completed successfully',
// //       data: inspection
// //     });

// //   } catch (error) {
// //     // Revert status on failure
// //     const inspection = await Inspection.findById(req.params.id);
// //     if (inspection) {
// //       inspection.status = 'DRAFT';
// //       await inspection.save();
// //     }
// //     next(error);
// //   }
// // };


// const Inspection = require('../models/Inspection');
// const Image = require('../models/Image');
// const Declaration = require('../models/Declaration');
// const Product = require('../models/Product');
// const Violation = require('../models/Violation');
// const aiService = require('../services/aiService');


// // ============================================================
// // CREATE NEW INSPECTION
// // ============================================================
// // @desc    Create new inspection
// // @route   POST /api/inspections
// // @access  Private
// exports.createInspection = async (req, res, next) => {
//   try {
//     console.log('📝 Creating new inspection...');
//     console.log('Request body:', req.body);

//     const {
//       location,
//       productId,
//       officerRemarks,
//       remarks,
//       inspectionType,
//       productCategory,
//       commodityName
//     } = req.body;

//     // Validate required field
//     if (!location || !location.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: 'Inspection location is required'
//       });
//     }

//     // Make sure authenticated user exists
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({
//         success: false,
//         message: 'User authentication information is missing'
//       });
//     }

//     // Generate unique inspection ID
//     const inspectionId = `INS-${new Date().getFullYear()}-${Math.floor(
//       1000 + Math.random() * 9000
//     )}`;

//     const inspection = await Inspection.create({
//       inspectionId,
//       officerId: req.user._id,
//       location: location.trim(),
//       productId: productId || null,

//       // Support both frontend and backend naming
//       officerRemarks: officerRemarks || remarks || '',

//       // These fields are useful for the frontend.
//       // They will only be saved if your schema supports them.
//       inspectionType: inspectionType || 'ROUTINE_CHECK',
//       productCategory: productCategory || '',
//       commodityName: commodityName || ''
//     });

//     console.log('✅ Inspection created:', inspection.inspectionId);

//     res.status(201).json({
//       success: true,
//       message: 'Inspection created successfully',
//       data: inspection
//     });

//   } catch (error) {
//     console.error('❌ Create inspection error:', error);

//     // Handle duplicate inspection ID
//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: 'Inspection ID already exists. Please try again.'
//       });
//     }

//     next(error);
//   }
// };


// // ============================================================
// // GET ALL INSPECTIONS
// // ============================================================
// // @desc    Get all inspections
// // @route   GET /api/inspections
// // @access  Private
// exports.getInspections = async (req, res, next) => {
//   try {
//     console.log('📋 Loading inspections...');
//     console.log('Query:', req.query);

//     // Read query parameters sent by Dashboard
//     const limit = Math.min(
//       parseInt(req.query.limit, 10) || 10,
//       100
//     );

//     const sortQuery = req.query.sort || '-createdAt';

//     // Basic sorting protection
//     let sort = {};

//     if (sortQuery.startsWith('-')) {
//       sort[sortQuery.substring(1)] = -1;
//     } else {
//       sort[sortQuery] = 1;
//     }

//     const inspections = await Inspection.find()
//       .populate('officerId', 'name email')
//       .populate('productId', 'productName manufacturer')
//       .sort(sort)
//       .limit(limit);

//     console.log(`✅ Loaded ${inspections.length} inspections`);

//     res.status(200).json({
//       success: true,
//       count: inspections.length,
//       data: inspections
//     });

//   } catch (error) {
//     console.error('❌ Get inspections error:', error);
//     next(error);
//   }
// };


// // ============================================================
// // GET INSPECTION BY ID
// // ============================================================
// // @desc    Get inspection by ID
// // @route   GET /api/inspections/:id
// // @access  Private
// exports.getInspectionById = async (req, res, next) => {
//   try {
//     console.log('🔍 Loading inspection:', req.params.id);

//     const inspection = await Inspection.findById(req.params.id)
//       .populate('officerId', 'name email')
//       .populate('productId')
//       .populate('images')
//       .populate('declarations')
//       .populate('violations');

//     if (!inspection) {
//       return res.status(404).json({
//         success: false,
//         message: 'Inspection not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: inspection
//     });

//   } catch (error) {
//     console.error('❌ Get inspection by ID error:', error);

//     // Invalid MongoDB ObjectId
//     if (error.name === 'CastError') {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid inspection ID'
//       });
//     }

//     next(error);
//   }
// };


// // ============================================================
// // UPLOAD IMAGE
// // ============================================================
// // @desc    Upload image for inspection
// // @route   POST /api/inspections/:id/images
// // @access  Private
// exports.uploadImage = async (req, res, next) => {
//   try {
//     console.log('📷 Uploading image for inspection:', req.params.id);

//     const inspection = await Inspection.findById(req.params.id);

//     if (!inspection) {
//       return res.status(404).json({
//         success: false,
//         message: 'Inspection not found'
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'No image file provided'
//       });
//     }

//     const { angle } = req.body;

//     const image = await Image.create({
//       inspectionId: inspection._id,
//       imageUrl: `/uploads/${req.file.filename}`,
//       filename: req.file.filename,
//       mimeType: req.file.mimetype,
//       angle: angle || 'UNKNOWN'
//     });

//     inspection.images.push(image._id);

//     await inspection.save();

//     console.log('✅ Image uploaded:', image.filename);

//     res.status(201).json({
//       success: true,
//       message: 'Image uploaded successfully',
//       data: image
//     });

//   } catch (error) {
//     console.error('❌ Upload image error:', error);
//     next(error);
//   }
// };


// // ============================================================
// // TRIGGER AI ANALYSIS
// // ============================================================
// // @desc    Trigger AI analysis
// // @route   POST /api/inspections/:id/analyze
// // @access  Private
// exports.analyzeInspection = async (req, res, next) => {
//   let inspection;

//   try {
//     console.log('🤖 Starting AI analysis:', req.params.id);

//     inspection = await Inspection.findById(req.params.id);

//     if (!inspection) {
//       return res.status(404).json({
//         success: false,
//         message: 'Inspection not found'
//       });
//     }

//     // Update processing status
//     inspection.status = 'PROCESSING';
//     await inspection.save();

//     console.log('🔄 Inspection status: PROCESSING');

//     // Call AI service
//     const aiResult = await aiService.analyzeImages(inspection);

//     console.log('🤖 AI result received');

//     // --------------------------------------------------------
//     // SAVE DECLARATIONS
//     // --------------------------------------------------------

//     if (
//       aiResult &&
//       Array.isArray(aiResult.declarations) &&
//       aiResult.declarations.length > 0
//     ) {
//       for (const dec of aiResult.declarations) {
//         const newDeclaration = await Declaration.create({
//           inspectionId: inspection._id,
//           field: dec.field || 'Unknown',
//           value: dec.value || '',
//           confidence: dec.confidence || 0,
//           verificationStatus: 'AI_DETECTED'
//         });

//         inspection.declarations.push(newDeclaration._id);
//       }

//       console.log(
//         `✅ Saved ${aiResult.declarations.length} declarations`
//       );
//     }


//     // --------------------------------------------------------
//     // SAVE VIOLATIONS
//     // --------------------------------------------------------

//     if (
//       aiResult &&
//       Array.isArray(aiResult.violations) &&
//       aiResult.violations.length > 0
//     ) {
//       for (const viol of aiResult.violations) {
//         const newViolation = await Violation.create({
//           ruleId: viol.rule_id || 'UNKNOWN',
//           inspectionId: inspection._id,
//           field: viol.field || 'General',
//           requirement:
//             viol.requirement || 'Must comply with Legal Metrology rules',
//           detectedValue: viol.detected_value || '',
//           expectedValue: viol.expected_value || '',
//           severity: viol.severity || 'MEDIUM',
//           confidence: viol.confidence || 0,
//           status: 'AI_DETECTED'
//         });

//         inspection.violations.push(newViolation._id);
//       }

//       console.log(
//         `⚠️ Saved ${aiResult.violations.length} violations`
//       );

//       // HIGH severity → officer review required
//       const hasHighSeverity = aiResult.violations.some(
//         (v) => String(v.severity).toUpperCase() === 'HIGH'
//       );

//       inspection.complianceStatus = hasHighSeverity
//         ? 'REQUIRES_REVIEW'
//         : 'POTENTIAL_VIOLATION';

//     } else {
//       // No violations detected
//       inspection.complianceStatus = 'COMPLIANT';

//       console.log('✅ No violations detected');
//     }


//     // --------------------------------------------------------
//     // COMPLETE ANALYSIS
//     // --------------------------------------------------------

//     inspection.status = 'UNDER_REVIEW';

//     await inspection.save();

//     console.log('✅ AI analysis completed successfully');

//     res.status(200).json({
//       success: true,
//       message: 'Analysis completed successfully',
//       data: inspection
//     });

//   } catch (error) {
//     console.error('❌ AI analysis error:', error);

//     // Revert status if something fails
//     try {
//       if (!inspection) {
//         inspection = await Inspection.findById(req.params.id);
//       }

//       if (inspection) {
//         inspection.status = 'DRAFT';
//         await inspection.save();
//       }
//     } catch (rollbackError) {
//       console.error(
//         '❌ Failed to rollback inspection status:',
//         rollbackError
//       );
//     }

//     next(error);
//   }
// };

const Inspection = require('../models/Inspection');
const Image = require('../models/Image');
const Declaration = require('../models/Declaration');
const Product = require('../models/Product');
const Violation = require('../models/Violation');
const aiService = require('../services/aiService');


// ============================================================
// CREATE NEW INSPECTION
// ============================================================
// @route   POST /api/inspections
// @access  Private

exports.createInspection = async (req, res, next) => {
  try {
    console.log('📝 Creating new inspection...');
    console.log('Request body:', req.body);

    const {
      location,
      productId,
      officerRemarks,
      remarks,
      inspectionType,
      productCategory,
      commodityName
    } = req.body;

    // Validate location
    if (!location || !location.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Inspection location is required'
      });
    }

    // Validate authenticated user
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'User authentication information is missing'
      });
    }

    // Generate custom inspection ID
    const inspectionId = `INS-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const inspection = await Inspection.create({
      inspectionId,
      officerId: req.user._id,
      location: location.trim(),
      productId: productId || null,

      officerRemarks: officerRemarks || remarks || '',

      inspectionType: inspectionType || 'ROUTINE_CHECK',
      productCategory: productCategory || '',
      commodityName: commodityName || ''
    });

    console.log(
      '✅ Inspection created:',
      inspection.inspectionId
    );

    res.status(201).json({
      success: true,
      message: 'Inspection created successfully',
      data: inspection
    });

  } catch (error) {
    console.error(
      '❌ Create inspection error:',
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Inspection ID already exists. Please try again.'
      });
    }

    next(error);
  }
};


// ============================================================
// GET ALL INSPECTIONS
// ============================================================
// @route   GET /api/inspections
// @access  Private

exports.getInspections = async (req, res, next) => {
  try {
    console.log('📋 Loading inspections...');
    console.log('Query:', req.query);

    const limit = Math.min(
      parseInt(req.query.limit, 10) || 10,
      100
    );

    const sortQuery =
      req.query.sort || '-createdAt';

    let sort = {};

    if (sortQuery.startsWith('-')) {
      sort[sortQuery.substring(1)] = -1;
    } else {
      sort[sortQuery] = 1;
    }

    const inspections = await Inspection.find()
      .populate('officerId', 'name email')
      .populate('productId', 'productName manufacturer')
      .sort(sort)
      .limit(limit);

    console.log(
      `✅ Loaded ${inspections.length} inspections`
    );

    res.status(200).json({
      success: true,
      count: inspections.length,
      data: inspections
    });

  } catch (error) {
    console.error(
      '❌ Get inspections error:',
      error
    );

    next(error);
  }
};


// ============================================================
// GET INSPECTION BY CUSTOM INSPECTION ID
// ============================================================
// @route   GET /api/inspections/:id
// @access  Private

exports.getInspectionById = async (req, res, next) => {
  try {
    console.log(
      '🔍 Loading inspection:',
      req.params.id
    );

    // IMPORTANT:
    // Frontend sends INS-2026-9341,
    // so use inspectionId instead of MongoDB _id.
    const inspection = await Inspection.findOne({
      inspectionId: req.params.id
    })
      .populate('officerId', 'name email')
      .populate('productId')
      .populate('images')
      .populate('declarations')
      .populate('violations');

    if (!inspection) {
      return res.status(404).json({
        success: false,
        message: 'Inspection not found'
      });
    }

    res.status(200).json({
      success: true,
      data: inspection
    });

  } catch (error) {
    console.error(
      '❌ Get inspection by ID error:',
      error
    );

    next(error);
  }
};


// ============================================================
// UPLOAD IMAGE
// ============================================================
// @route   POST /api/inspections/:id/images
// @access  Private

exports.uploadImage = async (req, res, next) => {
  try {
    console.log(
      '📷 Uploading image for inspection:',
      req.params.id
    );

    // IMPORTANT:
    // Use custom inspectionId.
    const inspection = await Inspection.findOne({
      inspectionId: req.params.id
    });

    if (!inspection) {
      return res.status(404).json({
        success: false,
        message: 'Inspection not found'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const { angle } = req.body;

    const image = await Image.create({
      inspectionId: inspection._id,
      imageUrl: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      mimeType: req.file.mimetype,
      angle: angle || 'UNKNOWN'
    });

    inspection.images.push(image._id);

    await inspection.save();

    console.log(
      '✅ Image uploaded:',
      image.filename
    );

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: image
    });

  } catch (error) {
    console.error(
      '❌ Upload image error:',
      error
    );

    next(error);
  }
};


// ============================================================
// TRIGGER AI ANALYSIS
// ============================================================
// @route   POST /api/inspections/:id/analyze
// @access  Private

exports.analyzeInspection = async (
  req,
  res,
  next
) => {

  let inspection;

  try {
    console.log(
      '🤖 Starting AI analysis:',
      req.params.id
    );

    // IMPORTANT:
    // Frontend sends INS-2026-9341.
    const inspection = await Inspection.findOne({
      inspectionId: req.params.id
    });

    if (!inspection) {
      return res.status(404).json({
        success: false,
        message: 'Inspection not found'
      });
    }

    // Save processing status
    inspection.status = 'PROCESSING';

    await inspection.save();

    console.log(
      '🔄 Inspection status: PROCESSING'
    );


    // ========================================================
    // AI SERVICE
    // ========================================================

    const aiResult =
      await aiService.analyzeImages(
        inspection
      );

    console.log(
      '🤖 AI result received'
    );


    // ========================================================
    // SAVE DECLARATIONS
    // ========================================================

    if (
      aiResult &&
      Array.isArray(aiResult.declarations) &&
      aiResult.declarations.length > 0
    ) {

      for (
        const dec of aiResult.declarations
      ) {

        const newDeclaration =
          await Declaration.create({

            inspectionId:
              inspection._id,

            field:
              dec.field || 'Unknown',

            value:
              dec.value || '',

            confidence:
              dec.confidence || 0,

            verificationStatus:
              'AI_DETECTED'
          });

        inspection.declarations.push(
          newDeclaration._id
        );
      }

      console.log(
        `✅ Saved ${aiResult.declarations.length} declarations`
      );
    }


    // ========================================================
    // SAVE VIOLATIONS
    // ========================================================

    if (
      aiResult &&
      Array.isArray(aiResult.violations) &&
      aiResult.violations.length > 0
    ) {

      for (
        const viol of aiResult.violations
      ) {

        const newViolation =
          await Violation.create({

            ruleId:
              viol.rule_id || 'UNKNOWN',

            inspectionId:
              inspection._id,

            field:
              viol.field || 'General',

            requirement:
              viol.requirement ||
              'Must comply with Legal Metrology rules',

            detectedValue:
              viol.detected_value || '',

            expectedValue:
              viol.expected_value || '',

            severity:
              viol.severity || 'MEDIUM',

            confidence:
              viol.confidence || 0,

            status:
              'AI_DETECTED'
          });

        inspection.violations.push(
          newViolation._id
        );
      }

      console.log(
        `⚠️ Saved ${aiResult.violations.length} violations`
      );


      // HIGH severity = officer review
      const hasHighSeverity =
        aiResult.violations.some(
          (v) =>
            String(v.severity)
              .toUpperCase() === 'HIGH'
        );

      inspection.complianceStatus =
        hasHighSeverity
          ? 'REQUIRES_REVIEW'
          : 'POTENTIAL_VIOLATION';

    } else {

      // No violations
      inspection.complianceStatus =
        'COMPLIANT';

      console.log(
        '✅ No violations detected'
      );
    }


    // ========================================================
    // COMPLETE ANALYSIS
    // ========================================================

    inspection.status =
      'UNDER_REVIEW';

    await inspection.save();

    console.log(
      '✅ AI analysis completed successfully'
    );

    res.status(200).json({
      success: true,
      message:
        'Analysis completed successfully',
      data: inspection
    });

  } catch (error) {

    console.error(
      '❌ AI analysis error:',
      error
    );

    // Rollback status
    try {

      if (!inspection) {
        inspection =
          await Inspection.findOne({
            inspectionId: req.params.id
          });
      }

      if (inspection) {
        inspection.status = 'DRAFT';
        await inspection.save();
      }

    } catch (rollbackError) {

      console.error(
        '❌ Failed to rollback inspection status:',
        rollbackError
      );
    }

    next(error);
  }
};
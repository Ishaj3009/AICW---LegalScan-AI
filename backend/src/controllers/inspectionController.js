// // // // // const Inspection = require('../models/Inspection');
// // // // // const Image = require('../models/Image');
// // // // // const Declaration = require('../models/Declaration');
// // // // // const Violation = require('../models/Violation');
// // // // // const aiService = require('../services/aiService');

// // // // // // @desc    Create new inspection
// // // // // // @route   POST /api/inspections
// // // // // // @access  Private
// // // // // exports.createInspection = async (req, res, next) => {
// // // // //   try {
// // // // //     const { location, productId, officerRemarks } = req.body;

// // // // //     const inspection = await Inspection.create({
// // // // //       inspectionId: `INS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
// // // // //       officerId: req.user._id,
// // // // //       location,
// // // // //       productId: productId || null,
// // // // //       officerRemarks
// // // // //     });

// // // // //     res.status(201).json({
// // // // //       success: true,
// // // // //       message: 'Inspection created',
// // // // //       data: inspection
// // // // //     });
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // @desc    Get all inspections
// // // // // // @route   GET /api/inspections
// // // // // // @access  Private
// // // // // exports.getInspections = async (req, res, next) => {
// // // // //   try {
// // // // //     const inspections = await Inspection.find()
// // // // //       .populate('officerId', 'name')
// // // // //       .populate('productId', 'productName manufacturer')
// // // // //       .sort('-createdAt');

// // // // //     res.json({
// // // // //       success: true,
// // // // //       data: inspections
// // // // //     });
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // @desc    Get inspection by ID
// // // // // // @route   GET /api/inspections/:id
// // // // // // @access  Private
// // // // // exports.getInspectionById = async (req, res, next) => {
// // // // //   try {
// // // // //     const inspection = await Inspection.findById(req.params.id)
// // // // //       .populate('officerId', 'name')
// // // // //       .populate('productId')
// // // // //       .populate('images')
// // // // //       .populate('declarations')
// // // // //       .populate('violations');

// // // // //     if (!inspection) {
// // // // //       res.status(404);
// // // // //       throw new Error('Inspection not found');
// // // // //     }

// // // // //     res.json({
// // // // //       success: true,
// // // // //       data: inspection
// // // // //     });
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // @desc    Upload image for inspection
// // // // // // @route   POST /api/inspections/:id/images
// // // // // // @access  Private
// // // // // exports.uploadImage = async (req, res, next) => {
// // // // //   try {
// // // // //     const inspection = await Inspection.findById(req.params.id);
// // // // //     if (!inspection) {
// // // // //       res.status(404);
// // // // //       throw new Error('Inspection not found');
// // // // //     }

// // // // //     if (!req.file) {
// // // // //       res.status(400);
// // // // //       throw new Error('No image file provided');
// // // // //     }

// // // // //     const { angle } = req.body;

// // // // //     const image = await Image.create({
// // // // //       inspectionId: inspection._id,
// // // // //       imageUrl: `/uploads/${req.file.filename}`,
// // // // //       filename: req.file.filename,
// // // // //       mimeType: req.file.mimetype,
// // // // //       angle: angle || 'UNKNOWN'
// // // // //     });

// // // // //     inspection.images.push(image._id);
// // // // //     await inspection.save();

// // // // //     res.status(201).json({
// // // // //       success: true,
// // // // //       message: 'Image uploaded successfully',
// // // // //       data: image
// // // // //     });
// // // // //   } catch (error) {
// // // // //     next(error);
// // // // //   }
// // // // // };

// // // // // // @desc    Trigger AI analysis
// // // // // // @route   POST /api/inspections/:id/analyze
// // // // // // @access  Private
// // // // // exports.analyzeInspection = async (req, res, next) => {
// // // // //   try {
// // // // //     const inspection = await Inspection.findById(req.params.id);
// // // // //     if (!inspection) {
// // // // //       res.status(404);
// // // // //       throw new Error('Inspection not found');
// // // // //     }

// // // // //     inspection.status = 'PROCESSING';
// // // // //     await inspection.save();

// // // // //     // Call Python AI Service
// // // // //     const aiResult = await aiService.analyzeImages(inspection);

// // // // //     // Save declarations
// // // // //     if (aiResult.declarations && aiResult.declarations.length > 0) {
// // // // //       for (let dec of aiResult.declarations) {
// // // // //         const newDec = await Declaration.create({
// // // // //           inspectionId: inspection._id,
// // // // //           field: dec.field,
// // // // //           value: dec.value,
// // // // //           confidence: dec.confidence,
// // // // //           verificationStatus: 'AI_DETECTED'
// // // // //         });
// // // // //         inspection.declarations.push(newDec._id);
// // // // //       }
// // // // //     }

// // // // //     // Save violations
// // // // //     if (aiResult.violations && aiResult.violations.length > 0) {
// // // // //       for (let viol of aiResult.violations) {
// // // // //         const newViol = await Violation.create({
// // // // //           ruleId: viol.rule_id || 'UNKNOWN',
// // // // //           inspectionId: inspection._id,
// // // // //           field: viol.field || 'General',
// // // // //           requirement: viol.requirement || 'Must comply with rules',
// // // // //           detectedValue: viol.detected_value,
// // // // //           expectedValue: viol.expected_value,
// // // // //           severity: viol.severity || 'MEDIUM',
// // // // //           confidence: viol.confidence,
// // // // //           status: 'AI_DETECTED'
// // // // //         });
// // // // //         inspection.violations.push(newViol._id);
// // // // //       }
// // // // //       inspection.complianceStatus = aiResult.violations.some(v => v.severity === 'HIGH') 
// // // // //         ? 'REQUIRES_REVIEW' 
// // // // //         : 'POTENTIAL_VIOLATION';
// // // // //     } else {
// // // // //       inspection.complianceStatus = 'COMPLIANT';
// // // // //     }

// // // // //     inspection.status = 'UNDER_REVIEW';
// // // // //     await inspection.save();

// // // // //     res.json({
// // // // //       success: true,
// // // // //       message: 'Analysis completed successfully',
// // // // //       data: inspection
// // // // //     });

// // // // //   } catch (error) {
// // // // //     // Revert status on failure
// // // // //     const inspection = await Inspection.findById(req.params.id);
// // // // //     if (inspection) {
// // // // //       inspection.status = 'DRAFT';
// // // // //       await inspection.save();
// // // // //     }
// // // // //     next(error);
// // // // //   }
// // // // // };


// // // // const Inspection = require('../models/Inspection');
// // // // const Image = require('../models/Image');
// // // // const Declaration = require('../models/Declaration');
// // // // const Product = require('../models/Product');
// // // // const Violation = require('../models/Violation');
// // // // const aiService = require('../services/aiService');


// // // // // ============================================================
// // // // // CREATE NEW INSPECTION
// // // // // ============================================================
// // // // // @desc    Create new inspection
// // // // // @route   POST /api/inspections
// // // // // @access  Private
// // // // exports.createInspection = async (req, res, next) => {
// // // //   try {
// // // //     console.log('📝 Creating new inspection...');
// // // //     console.log('Request body:', req.body);

// // // //     const {
// // // //       location,
// // // //       productId,
// // // //       officerRemarks,
// // // //       remarks,
// // // //       inspectionType,
// // // //       productCategory,
// // // //       commodityName
// // // //     } = req.body;

// // // //     // Validate required field
// // // //     if (!location || !location.trim()) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: 'Inspection location is required'
// // // //       });
// // // //     }

// // // //     // Make sure authenticated user exists
// // // //     if (!req.user || !req.user._id) {
// // // //       return res.status(401).json({
// // // //         success: false,
// // // //         message: 'User authentication information is missing'
// // // //       });
// // // //     }

// // // //     // Generate unique inspection ID
// // // //     const inspectionId = `INS-${new Date().getFullYear()}-${Math.floor(
// // // //       1000 + Math.random() * 9000
// // // //     )}`;

// // // //     const inspection = await Inspection.create({
// // // //       inspectionId,
// // // //       officerId: req.user._id,
// // // //       location: location.trim(),
// // // //       productId: productId || null,

// // // //       // Support both frontend and backend naming
// // // //       officerRemarks: officerRemarks || remarks || '',

// // // //       // These fields are useful for the frontend.
// // // //       // They will only be saved if your schema supports them.
// // // //       inspectionType: inspectionType || 'ROUTINE_CHECK',
// // // //       productCategory: productCategory || '',
// // // //       commodityName: commodityName || ''
// // // //     });

// // // //     console.log('✅ Inspection created:', inspection.inspectionId);

// // // //     res.status(201).json({
// // // //       success: true,
// // // //       message: 'Inspection created successfully',
// // // //       data: inspection
// // // //     });

// // // //   } catch (error) {
// // // //     console.error('❌ Create inspection error:', error);

// // // //     // Handle duplicate inspection ID
// // // //     if (error.code === 11000) {
// // // //       return res.status(409).json({
// // // //         success: false,
// // // //         message: 'Inspection ID already exists. Please try again.'
// // // //       });
// // // //     }

// // // //     next(error);
// // // //   }
// // // // };


// // // // // ============================================================
// // // // // GET ALL INSPECTIONS
// // // // // ============================================================
// // // // // @desc    Get all inspections
// // // // // @route   GET /api/inspections
// // // // // @access  Private
// // // // exports.getInspections = async (req, res, next) => {
// // // //   try {
// // // //     console.log('📋 Loading inspections...');
// // // //     console.log('Query:', req.query);

// // // //     // Read query parameters sent by Dashboard
// // // //     const limit = Math.min(
// // // //       parseInt(req.query.limit, 10) || 10,
// // // //       100
// // // //     );

// // // //     const sortQuery = req.query.sort || '-createdAt';

// // // //     // Basic sorting protection
// // // //     let sort = {};

// // // //     if (sortQuery.startsWith('-')) {
// // // //       sort[sortQuery.substring(1)] = -1;
// // // //     } else {
// // // //       sort[sortQuery] = 1;
// // // //     }

// // // //     const inspections = await Inspection.find()
// // // //       .populate('officerId', 'name email')
// // // //       .populate('productId', 'productName manufacturer')
// // // //       .sort(sort)
// // // //       .limit(limit);

// // // //     console.log(`✅ Loaded ${inspections.length} inspections`);

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       count: inspections.length,
// // // //       data: inspections
// // // //     });

// // // //   } catch (error) {
// // // //     console.error('❌ Get inspections error:', error);
// // // //     next(error);
// // // //   }
// // // // };


// // // // // ============================================================
// // // // // GET INSPECTION BY ID
// // // // // ============================================================
// // // // // @desc    Get inspection by ID
// // // // // @route   GET /api/inspections/:id
// // // // // @access  Private
// // // // exports.getInspectionById = async (req, res, next) => {
// // // //   try {
// // // //     console.log('🔍 Loading inspection:', req.params.id);

// // // //     const inspection = await Inspection.findById(req.params.id)
// // // //       .populate('officerId', 'name email')
// // // //       .populate('productId')
// // // //       .populate('images')
// // // //       .populate('declarations')
// // // //       .populate('violations');

// // // //     if (!inspection) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: 'Inspection not found'
// // // //       });
// // // //     }

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       data: inspection
// // // //     });

// // // //   } catch (error) {
// // // //     console.error('❌ Get inspection by ID error:', error);

// // // //     // Invalid MongoDB ObjectId
// // // //     if (error.name === 'CastError') {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: 'Invalid inspection ID'
// // // //       });
// // // //     }

// // // //     next(error);
// // // //   }
// // // // };


// // // // // ============================================================
// // // // // UPLOAD IMAGE
// // // // // ============================================================
// // // // // @desc    Upload image for inspection
// // // // // @route   POST /api/inspections/:id/images
// // // // // @access  Private
// // // // exports.uploadImage = async (req, res, next) => {
// // // //   try {
// // // //     console.log('📷 Uploading image for inspection:', req.params.id);

// // // //     const inspection = await Inspection.findById(req.params.id);

// // // //     if (!inspection) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: 'Inspection not found'
// // // //       });
// // // //     }

// // // //     if (!req.file) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: 'No image file provided'
// // // //       });
// // // //     }

// // // //     const { angle } = req.body;

// // // //     const image = await Image.create({
// // // //       inspectionId: inspection._id,
// // // //       imageUrl: `/uploads/${req.file.filename}`,
// // // //       filename: req.file.filename,
// // // //       mimeType: req.file.mimetype,
// // // //       angle: angle || 'UNKNOWN'
// // // //     });

// // // //     inspection.images.push(image._id);

// // // //     await inspection.save();

// // // //     console.log('✅ Image uploaded:', image.filename);

// // // //     res.status(201).json({
// // // //       success: true,
// // // //       message: 'Image uploaded successfully',
// // // //       data: image
// // // //     });

// // // //   } catch (error) {
// // // //     console.error('❌ Upload image error:', error);
// // // //     next(error);
// // // //   }
// // // // };


// // // // // ============================================================
// // // // // TRIGGER AI ANALYSIS
// // // // // ============================================================
// // // // // @desc    Trigger AI analysis
// // // // // @route   POST /api/inspections/:id/analyze
// // // // // @access  Private
// // // // exports.analyzeInspection = async (req, res, next) => {
// // // //   let inspection;

// // // //   try {
// // // //     console.log('🤖 Starting AI analysis:', req.params.id);

// // // //     inspection = await Inspection.findById(req.params.id);

// // // //     if (!inspection) {
// // // //       return res.status(404).json({
// // // //         success: false,
// // // //         message: 'Inspection not found'
// // // //       });
// // // //     }

// // // //     // Update processing status
// // // //     inspection.status = 'PROCESSING';
// // // //     await inspection.save();

// // // //     console.log('🔄 Inspection status: PROCESSING');

// // // //     // Call AI service
// // // //     const aiResult = await aiService.analyzeImages(inspection);

// // // //     console.log('🤖 AI result received');

// // // //     // --------------------------------------------------------
// // // //     // SAVE DECLARATIONS
// // // //     // --------------------------------------------------------

// // // //     if (
// // // //       aiResult &&
// // // //       Array.isArray(aiResult.declarations) &&
// // // //       aiResult.declarations.length > 0
// // // //     ) {
// // // //       for (const dec of aiResult.declarations) {
// // // //         const newDeclaration = await Declaration.create({
// // // //           inspectionId: inspection._id,
// // // //           field: dec.field || 'Unknown',
// // // //           value: dec.value || '',
// // // //           confidence: dec.confidence || 0,
// // // //           verificationStatus: 'AI_DETECTED'
// // // //         });

// // // //         inspection.declarations.push(newDeclaration._id);
// // // //       }

// // // //       console.log(
// // // //         `✅ Saved ${aiResult.declarations.length} declarations`
// // // //       );
// // // //     }


// // // //     // --------------------------------------------------------
// // // //     // SAVE VIOLATIONS
// // // //     // --------------------------------------------------------

// // // //     if (
// // // //       aiResult &&
// // // //       Array.isArray(aiResult.violations) &&
// // // //       aiResult.violations.length > 0
// // // //     ) {
// // // //       for (const viol of aiResult.violations) {
// // // //         const newViolation = await Violation.create({
// // // //           ruleId: viol.rule_id || 'UNKNOWN',
// // // //           inspectionId: inspection._id,
// // // //           field: viol.field || 'General',
// // // //           requirement:
// // // //             viol.requirement || 'Must comply with Legal Metrology rules',
// // // //           detectedValue: viol.detected_value || '',
// // // //           expectedValue: viol.expected_value || '',
// // // //           severity: viol.severity || 'MEDIUM',
// // // //           confidence: viol.confidence || 0,
// // // //           status: 'AI_DETECTED'
// // // //         });

// // // //         inspection.violations.push(newViolation._id);
// // // //       }

// // // //       console.log(
// // // //         `⚠️ Saved ${aiResult.violations.length} violations`
// // // //       );

// // // //       // HIGH severity → officer review required
// // // //       const hasHighSeverity = aiResult.violations.some(
// // // //         (v) => String(v.severity).toUpperCase() === 'HIGH'
// // // //       );

// // // //       inspection.complianceStatus = hasHighSeverity
// // // //         ? 'REQUIRES_REVIEW'
// // // //         : 'POTENTIAL_VIOLATION';

// // // //     } else {
// // // //       // No violations detected
// // // //       inspection.complianceStatus = 'COMPLIANT';

// // // //       console.log('✅ No violations detected');
// // // //     }


// // // //     // --------------------------------------------------------
// // // //     // COMPLETE ANALYSIS
// // // //     // --------------------------------------------------------

// // // //     inspection.status = 'UNDER_REVIEW';

// // // //     await inspection.save();

// // // //     console.log('✅ AI analysis completed successfully');

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       message: 'Analysis completed successfully',
// // // //       data: inspection
// // // //     });

// // // //   } catch (error) {
// // // //     console.error('❌ AI analysis error:', error);

// // // //     // Revert status if something fails
// // // //     try {
// // // //       if (!inspection) {
// // // //         inspection = await Inspection.findById(req.params.id);
// // // //       }

// // // //       if (inspection) {
// // // //         inspection.status = 'DRAFT';
// // // //         await inspection.save();
// // // //       }
// // // //     } catch (rollbackError) {
// // // //       console.error(
// // // //         '❌ Failed to rollback inspection status:',
// // // //         rollbackError
// // // //       );
// // // //     }

// // // //     next(error);
// // // //   }
// // // // };

// // // const Inspection = require('../models/Inspection');
// // // const Image = require('../models/Image');
// // // const Declaration = require('../models/Declaration');
// // // const Product = require('../models/Product');
// // // const Violation = require('../models/Violation');
// // // const aiService = require('../services/aiService');


// // // // ============================================================
// // // // CREATE NEW INSPECTION
// // // // ============================================================
// // // // @route   POST /api/inspections
// // // // @access  Private

// // // exports.createInspection = async (req, res, next) => {
// // //   try {
// // //     console.log('📝 Creating new inspection...');
// // //     console.log('Request body:', req.body);

// // //     const {
// // //       location,
// // //       productId,
// // //       officerRemarks,
// // //       remarks,
// // //       inspectionType,
// // //       productCategory,
// // //       commodityName
// // //     } = req.body;

// // //     // Validate location
// // //     if (!location || !location.trim()) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'Inspection location is required'
// // //       });
// // //     }

// // //     // Validate authenticated user
// // //     if (!req.user || !req.user._id) {
// // //       return res.status(401).json({
// // //         success: false,
// // //         message: 'User authentication information is missing'
// // //       });
// // //     }

// // //     // Generate custom inspection ID
// // //     const inspectionId = `INS-${new Date().getFullYear()}-${Math.floor(
// // //       1000 + Math.random() * 9000
// // //     )}`;

// // //     const inspection = await Inspection.create({
// // //       inspectionId,
// // //       officerId: req.user._id,
// // //       location: location.trim(),
// // //       productId: productId || null,

// // //       officerRemarks: officerRemarks || remarks || '',

// // //       inspectionType: inspectionType || 'ROUTINE_CHECK',
// // //       productCategory: productCategory || '',
// // //       commodityName: commodityName || ''
// // //     });

// // //     console.log(
// // //       '✅ Inspection created:',
// // //       inspection.inspectionId
// // //     );

// // //     res.status(201).json({
// // //       success: true,
// // //       message: 'Inspection created successfully',
// // //       data: inspection
// // //     });

// // //   } catch (error) {
// // //     console.error(
// // //       '❌ Create inspection error:',
// // //       error
// // //     );

// // //     if (error.code === 11000) {
// // //       return res.status(409).json({
// // //         success: false,
// // //         message: 'Inspection ID already exists. Please try again.'
// // //       });
// // //     }

// // //     next(error);
// // //   }
// // // };


// // // // ============================================================
// // // // GET ALL INSPECTIONS
// // // // ============================================================
// // // // @route   GET /api/inspections
// // // // @access  Private

// // // exports.getInspections = async (req, res, next) => {
// // //   try {
// // //     console.log('📋 Loading inspections...');
// // //     console.log('Query:', req.query);

// // //     const limit = Math.min(
// // //       parseInt(req.query.limit, 10) || 10,
// // //       100
// // //     );

// // //     const sortQuery =
// // //       req.query.sort || '-createdAt';

// // //     let sort = {};

// // //     if (sortQuery.startsWith('-')) {
// // //       sort[sortQuery.substring(1)] = -1;
// // //     } else {
// // //       sort[sortQuery] = 1;
// // //     }

// // //     const inspections = await Inspection.find()
// // //       .populate('officerId', 'name email')
// // //       .populate('productId', 'productName manufacturer')
// // //       .sort(sort)
// // //       .limit(limit);

// // //     console.log(
// // //       `✅ Loaded ${inspections.length} inspections`
// // //     );

// // //     res.status(200).json({
// // //       success: true,
// // //       count: inspections.length,
// // //       data: inspections
// // //     });

// // //   } catch (error) {
// // //     console.error(
// // //       '❌ Get inspections error:',
// // //       error
// // //     );

// // //     next(error);
// // //   }
// // // };


// // // // ============================================================
// // // // GET INSPECTION BY CUSTOM INSPECTION ID
// // // // ============================================================
// // // // @route   GET /api/inspections/:id
// // // // @access  Private

// // // exports.getInspectionById = async (req, res, next) => {
// // //   try {
// // //     console.log(
// // //       '🔍 Loading inspection:',
// // //       req.params.id
// // //     );

// // //     // IMPORTANT:
// // //     // Frontend sends INS-2026-9341,
// // //     // so use inspectionId instead of MongoDB _id.
// // //     const inspection = await Inspection.findOne({
// // //       inspectionId: req.params.id
// // //     })
// // //       .populate('officerId', 'name email')
// // //       .populate('productId')
// // //       .populate('images')
// // //       .populate('declarations')
// // //       .populate('violations');

// // //     if (!inspection) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Inspection not found'
// // //       });
// // //     }

// // //     res.status(200).json({
// // //       success: true,
// // //       data: inspection
// // //     });

// // //   } catch (error) {
// // //     console.error(
// // //       '❌ Get inspection by ID error:',
// // //       error
// // //     );

// // //     next(error);
// // //   }
// // // };


// // // // ============================================================
// // // // UPLOAD IMAGE
// // // // ============================================================
// // // // @route   POST /api/inspections/:id/images
// // // // @access  Private

// // // exports.uploadImage = async (req, res, next) => {
// // //   try {
// // //     console.log(
// // //       '📷 Uploading image for inspection:',
// // //       req.params.id
// // //     );

// // //     // IMPORTANT:
// // //     // Use custom inspectionId.
// // //     const inspection = await Inspection.findOne({
// // //       inspectionId: req.params.id
// // //     });

// // //     if (!inspection) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Inspection not found'
// // //       });
// // //     }

// // //     if (!req.file) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: 'No image file provided'
// // //       });
// // //     }

// // //     const { angle } = req.body;

// // //     const image = await Image.create({
// // //       inspectionId: inspection._id,
// // //       imageUrl: `/uploads/${req.file.filename}`,
// // //       filename: req.file.filename,
// // //       mimeType: req.file.mimetype,
// // //       angle: angle || 'UNKNOWN'
// // //     });

// // //     inspection.images.push(image._id);

// // //     await inspection.save();

// // //     console.log(
// // //       '✅ Image uploaded:',
// // //       image.filename
// // //     );

// // //     res.status(201).json({
// // //       success: true,
// // //       message: 'Image uploaded successfully',
// // //       data: image
// // //     });

// // //   } catch (error) {
// // //     console.error(
// // //       '❌ Upload image error:',
// // //       error
// // //     );

// // //     next(error);
// // //   }
// // // };


// // // // ============================================================
// // // // TRIGGER AI ANALYSIS
// // // // ============================================================
// // // // @route   POST /api/inspections/:id/analyze
// // // // @access  Private

// // // // ============================================================
// // // // TRIGGER AI ANALYSIS
// // // // ============================================================
// // // // @route   POST /api/inspections/:id/analyze
// // // // @access  Private

// // // exports.analyzeInspection = async (
// // //   req,
// // //   res,
// // //   next
// // // ) => {

// // //   let inspection;

// // //   try {

// // //     console.log(
// // //       '================================================'
// // //     );

// // //     console.log(
// // //       '🤖 Starting AI analysis:',
// // //       req.params.id
// // //     );

// // //     console.log(
// // //       '================================================'
// // //     );


// // //     // ========================================================
// // //     // FIND INSPECTION
// // //     // ========================================================

// // //     inspection = await Inspection.findOne({
// // //       inspectionId: req.params.id
// // //     });


// // //     if (!inspection) {

// // //       return res.status(404).json({
// // //         success: false,
// // //         message: 'Inspection not found'
// // //       });

// // //     }


// // //     // ========================================================
// // //     // PREVENT DUPLICATE / CONCURRENT ANALYSIS
// // //     // ========================================================

// // //     if (inspection.status === 'PROCESSING') {

// // //       console.log(
// // //         '⏭️ Analysis already running for:',
// // //         inspection.inspectionId
// // //       );

// // //       return res.status(409).json({
// // //         success: false,
// // //         message:
// // //           'Analysis is already in progress for this inspection.',
// // //         data: {
// // //           inspectionId: inspection.inspectionId,
// // //           status: inspection.status
// // //         }
// // //       });

// // //     }


// // //     // ========================================================
// // //     // MARK AS PROCESSING
// // //     // ========================================================

// // //     inspection.status = 'PROCESSING';

// // //     await inspection.save();

// // //     console.log(
// // //       '🔄 Inspection status: PROCESSING'
// // //     );


// // //     // ========================================================
// // //     // REMOVE PREVIOUS AI RESULTS
// // //     //
// // //     // This makes analysis IDEMPOTENT.
// // //     //
// // //     // If the officer retries/re-runs an inspection,
// // //     // old declarations and violations are removed before
// // //     // the new AI result is stored.
// // //     // ========================================================

// // //     console.log(
// // //       '🧹 Removing previous AI results...'
// // //     );


// // //     await Violation.deleteMany({
// // //       inspectionId: inspection._id
// // //     });


// // //     await Declaration.deleteMany({
// // //       inspectionId: inspection._id
// // //     });


// // //     inspection.declarations = [];

// // //     inspection.violations = [];


// // //     await inspection.save();


// // //     console.log(
// // //       '✅ Previous AI results cleared'
// // //     );


// // //     // ========================================================
// // //     // AI SERVICE
// // //     // ========================================================

// // //     console.log(
// // //       '📡 Sending images to LegalScan AI...'
// // //     );


// // //     const aiResult =
// // //       await aiService.analyzeImages(
// // //         inspection
// // //       );


// // //     console.log(
// // //       '🤖 AI result received'
// // //     );


// // //     console.log(
// // //       '📊 AI violations:',
// // //       Array.isArray(aiResult?.violations)
// // //         ? aiResult.violations.length
// // //         : 0
// // //     );


// // //     console.log(
// // //       '📊 AI declarations:',
// // //       Array.isArray(aiResult?.declarations)
// // //         ? aiResult.declarations.length
// // //         : 0
// // //     );


// // //     // ========================================================
// // //     // SAVE DECLARATIONS
// // //     // ========================================================

// // //     if (
// // //       aiResult &&
// // //       Array.isArray(aiResult.declarations) &&
// // //       aiResult.declarations.length > 0
// // //     ) {

// // //       console.log(
// // //         '💾 Saving declarations...'
// // //       );


// // //       for (
// // //         const dec of aiResult.declarations
// // //       ) {

// // //         const newDeclaration =
// // //           await Declaration.create({

// // //             inspectionId:
// // //               inspection._id,

// // //             field:
// // //               dec.field || 'Unknown',

// // //             value:
// // //               dec.value || '',

// // //             confidence:
// // //               Number(dec.confidence) || 0,

// // //             verificationStatus:
// // //               'AI_DETECTED'

// // //           });


// // //         inspection.declarations.push(
// // //           newDeclaration._id
// // //         );

// // //       }


// // //       console.log(
// // //         `✅ Saved ${aiResult.declarations.length} declarations`
// // //       );

// // //     } else {

// // //       console.log(
// // //         'ℹ️ No declarations detected by AI'
// // //       );

// // //     }


// // //     // ========================================================
// // //     // SAVE VIOLATIONS
// // //     // ========================================================

// // //     if (
// // //       aiResult &&
// // //       Array.isArray(aiResult.violations) &&
// // //       aiResult.violations.length > 0
// // //     ) {

// // //       console.log(
// // //         '💾 Saving violations...'
// // //       );


// // //       /*
// // //        * ------------------------------------------------------
// // //        * EXTRA DUPLICATE PROTECTION
// // //        *
// // //        * Even if AI accidentally returns the same rule twice,
// // //        * only one violation per rule + field will be saved.
// // //        * ------------------------------------------------------
// // //        */

// // //       const uniqueViolations = [];

// // //       const violationKeys = new Set();


// // //       for (
// // //         const viol of aiResult.violations
// // //       ) {

// // //         const ruleId =
// // //           viol.rule_id || 'UNKNOWN';

// // //         const field =
// // //           viol.field || 'General';


// // //         const uniqueKey =
// // //           `${ruleId}__${field}`;


// // //         if (
// // //           violationKeys.has(uniqueKey)
// // //         ) {

// // //           console.log(
// // //             `⏭️ Duplicate AI violation skipped: ${uniqueKey}`
// // //           );

// // //           continue;

// // //         }


// // //         violationKeys.add(
// // //           uniqueKey
// // //         );


// // //         uniqueViolations.push(
// // //           viol
// // //         );

// // //       }


// // //       console.log(
// // //         `📋 Unique violations to save: ${uniqueViolations.length}`
// // //       );


// // //       // ------------------------------------------------------
// // //       // Create unique violations
// // //       // ------------------------------------------------------

// // //       for (
// // //         const viol of uniqueViolations
// // //       ) {

// // //         const newViolation =
// // //           await Violation.create({

// // //             ruleId:
// // //               viol.rule_id ||
// // //               'UNKNOWN',

// // //             inspectionId:
// // //               inspection._id,

// // //             field:
// // //               viol.field ||
// // //               'General',

// // //             requirement:
// // //               viol.requirement ||
// // //               'Must comply with Legal Metrology rules',

// // //             detectedValue:
// // //               viol.detected_value ||
// // //               '',

// // //             expectedValue:
// // //               viol.expected_value ||
// // //               '',

// // //             severity:
// // //               viol.severity ||
// // //               'MEDIUM',

// // //             confidence:
// // //               Number(viol.confidence) ||
// // //               0,

// // //             status:
// // //               'AI_DETECTED'

// // //           });


// // //         inspection.violations.push(
// // //           newViolation._id
// // //         );

// // //       }


// // //       console.log(
// // //         `⚠️ Saved ${uniqueViolations.length} unique violations`
// // //       );


// // //       // ======================================================
// // //       // COMPLIANCE STATUS
// // //       // ======================================================

// // //       const hasHighSeverity =
// // //         uniqueViolations.some(
// // //           (v) =>
// // //             String(v.severity)
// // //               .toUpperCase() === 'HIGH'
// // //         );


// // //       inspection.complianceStatus =
// // //         hasHighSeverity
// // //           ? 'REQUIRES_REVIEW'
// // //           : 'POTENTIAL_VIOLATION';


// // //     } else {

// // //       // ======================================================
// // //       // NO VIOLATIONS
// // //       // ======================================================

// // //       inspection.complianceStatus =
// // //         'COMPLIANT';


// // //       console.log(
// // //         '✅ No violations detected'
// // //       );

// // //     }


// // //     // ========================================================
// // //     // COMPLETE ANALYSIS
// // //     // ========================================================

// // //     inspection.status =
// // //       'UNDER_REVIEW';


// // //     await inspection.save();


// // //     console.log(
// // //       '================================================'
// // //     );

// // //     console.log(
// // //       '✅ AI ANALYSIS COMPLETED'
// // //     );

// // //     console.log(
// // //       '🆔 Inspection:',
// // //       inspection.inspectionId
// // //     );

// // //     console.log(
// // //       '📋 Declarations:',
// // //       inspection.declarations.length
// // //     );

// // //     console.log(
// // //       '⚠️ Violations:',
// // //       inspection.violations.length
// // //     );

// // //     console.log(
// // //       '📌 Compliance:',
// // //       inspection.complianceStatus
// // //     );

// // //     console.log(
// // //       '📌 Status:',
// // //       inspection.status
// // //     );

// // //     console.log(
// // //       '================================================'
// // //     );


// // //     // ========================================================
// // //     // RESPONSE
// // //     // ========================================================

// // //     return res.status(200).json({

// // //       success: true,

// // //       message:
// // //         'Analysis completed successfully',

// // //       data: inspection

// // //     });


// // //   } catch (error) {

// // //     console.error(
// // //       '================================================'
// // //     );

// // //     console.error(
// // //       '❌ AI ANALYSIS ERROR'
// // //     );

// // //     console.error(
// // //       error
// // //     );

// // //     console.error(
// // //       '================================================'
// // //     );


// // //     // ========================================================
// // //     // ROLLBACK STATUS
// // //     // ========================================================

// // //     try {

// // //       if (!inspection) {

// // //         inspection =
// // //           await Inspection.findOne({
// // //             inspectionId:
// // //               req.params.id
// // //           });

// // //       }


// // //       if (inspection) {

// // //         inspection.status =
// // //           'DRAFT';


// // //         await inspection.save();


// // //         console.log(
// // //           '🔄 Inspection status rolled back to DRAFT'
// // //         );

// // //       }

// // //     } catch (rollbackError) {

// // //       console.error(
// // //         '❌ Failed to rollback inspection status:',
// // //         rollbackError
// // //       );

// // //     }


// // //     next(error);
// // //   }
// // // };

// // const Inspection = require('../models/Inspection');
// // const Image = require('../models/Image');
// // const Declaration = require('../models/Declaration');
// // const Product = require('../models/Product');
// // const Violation = require('../models/Violation');
// // const aiService = require('../services/aiService');


// // // ============================================================
// // // AI RESULT HELPERS
// // // ============================================================

// // const firstNonEmpty = (...values) => {
// //   for (const value of values) {
// //     if (
// //       value !== undefined &&
// //       value !== null &&
// //       String(value).trim() !== ''
// //     ) {
// //       return value;
// //     }
// //   }

// //   return '';
// // };


// // // ------------------------------------------------------------
// // // Normalize confidence to 0 - 100
// // // ------------------------------------------------------------

// // const normalizeConfidence = (value) => {
// //   const number = Number(value);

// //   if (!Number.isFinite(number)) {
// //     return 0;
// //   }

// //   // AI may return 0.75 or 75
// //   if (number <= 1) {
// //     return Math.max(
// //       0,
// //       Math.min(100, number * 100)
// //     );
// //   }

// //   return Math.max(
// //     0,
// //     Math.min(100, number)
// //   );
// // };


// // // ------------------------------------------------------------
// // // Extract field from AI result
// // // ------------------------------------------------------------

// // const extractAIField = (
// //   aiResult,
// //   field
// // ) => {

// //   const extracted =
// //     aiResult?.extracted_data ||
// //     aiResult?.extractedData ||
// //     {};


// //   const readValue = (value) => {

// //     if (Array.isArray(value)) {

// //       const usable =
// //         value
// //           .map((item) => {

// //             if (
// //               item &&
// //               typeof item === 'object'
// //             ) {

// //               return firstNonEmpty(
// //                 item.value,
// //                 item.text,
// //                 item.detected_value,
// //                 item.detectedValue
// //               );
// //             }

// //             return item;
// //           })
// //           .find(
// //             (item) =>
// //               item !== undefined &&
// //               item !== null &&
// //               String(item).trim() !== ''
// //           );

// //       return usable || '';
// //     }


// //     if (
// //       value &&
// //       typeof value === 'object'
// //     ) {

// //       return firstNonEmpty(
// //         value.value,
// //         value.text,
// //         value.detected_value,
// //         value.detectedValue
// //       );
// //     }


// //     return value || '';
// //   };


// //   // ------------------------------------------
// //   // 1. Top-level extracted_data
// //   // ------------------------------------------

// //   const topLevel =
// //     readValue(
// //       extracted[field]
// //     );

// //   if (topLevel) {
// //     return topLevel;
// //   }


// //   // ------------------------------------------
// //   // 2. image_analysis extracted_fields
// //   // ------------------------------------------

// //   if (
// //     Array.isArray(
// //       aiResult?.image_analysis
// //     )
// //   ) {

// //     for (
// //       const image of aiResult.image_analysis
// //     ) {

// //       const fields =
// //         image?.extracted_fields ||
// //         image?.extractedFields ||
// //         {};

// //       const value =
// //         readValue(
// //           fields[field]
// //         );

// //       if (value) {
// //         return value;
// //       }
// //     }
// //   }


// //   return '';
// // };

// // // ------------------------------------------------------------
// // // Calculate extraction coverage
// // // ------------------------------------------------------------

// // const calculateExtractionCoverage = (
// //   aiResult
// // ) => {

// //   const extracted =
// //     aiResult?.extracted_data ||
// //     aiResult?.extractedData ||
// //     {};

// //   const fields = [
// //     'mrp',
// //     'net_quantity',
// //     'manufacturer'
// //   ];

// //   let detectedCount = 0;


// //   for (const field of fields) {

// //     const value =
// //       extracted[field];


// //     if (Array.isArray(value)) {

// //       const found =
// //         value.some((item) => {

// //           const extractedValue =
// //             item &&
// //             typeof item === 'object'
// //               ? firstNonEmpty(
// //                   item.value,
// //                   item.text,
// //                   item.detected_value,
// //                   item.detectedValue
// //                 )
// //               : item;

// //           return (
// //             extractedValue !== undefined &&
// //             extractedValue !== null &&
// //             String(extractedValue).trim() !== ''
// //           );
// //         });


// //       if (found) {
// //         detectedCount++;
// //       }

// //       continue;
// //     }


// //     if (
// //       value &&
// //       typeof value === 'object'
// //     ) {

// //       const extractedValue =
// //         firstNonEmpty(
// //           value.value,
// //           value.text,
// //           value.detected_value,
// //           value.detectedValue
// //         );

// //       if (
// //         String(extractedValue).trim() !== ''
// //       ) {
// //         detectedCount++;
// //       }

// //       continue;
// //     }


// //     if (
// //       value !== undefined &&
// //       value !== null &&
// //       String(value).trim() !== ''
// //     ) {

// //       detectedCount++;
// //     }
// //   }


// //   return Number(
// //     (
// //       (detectedCount / fields.length) *
// //       100
// //     ).toFixed(2)
// //   );
// // };


// // // ------------------------------------------------------------
// // // Get AI detected product name
// // // ------------------------------------------------------------

// // // ------------------------------------------------------------
// // // Normalize AI value into a safe string
// // // ------------------------------------------------------------

// // const normalizeAIText = (value) => {

// //   if (value === undefined || value === null) {
// //     return '';
// //   }

// //   // AI may return:
// //   // ["Classic", "crispy"]
// //   if (Array.isArray(value)) {

// //     const values = value
// //       .map((item) => {

// //         if (
// //           item &&
// //           typeof item === 'object'
// //         ) {
// //           return firstNonEmpty(
// //             item.value,
// //             item.text,
// //             item.detected_value,
// //             item.detectedValue
// //           );
// //         }

// //         return item;
// //       })
// //       .filter(
// //         (item) =>
// //           item !== undefined &&
// //           item !== null &&
// //           String(item).trim() !== ''
// //       )
// //       .map((item) => String(item).trim());

// //     return values.join(', ');
// //   }

// //   // AI may return an object
// //   if (
// //     value &&
// //     typeof value === 'object'
// //   ) {
// //     return String(
// //       firstNonEmpty(
// //         value.value,
// //         value.text,
// //         value.detected_value,
// //         value.detectedValue
// //       ) || ''
// //     ).trim();
// //   }

// //   return String(value).trim();
// // };


// // // ------------------------------------------------------------
// // // Get AI detected product name
// // // ------------------------------------------------------------

// // const getAIProductName = (aiResult) => {

// //   // First check top-level extracted_data
// //   const extracted =
// //     aiResult?.extracted_data ||
// //     aiResult?.extractedData ||
// //     {};

// //   const candidates = [
// //     extracted.product_name,
// //     extracted.productName,
// //     extracted.commodity_name,
// //     extracted.commodityName,
// //     aiResult?.product_name,
// //     aiResult?.productName,
// //     aiResult?.commodity_name,
// //     aiResult?.commodityName
// //   ];

// //   for (const candidate of candidates) {

// //     const value = normalizeAIText(candidate);

// //     if (value) {
// //       return value;
// //     }
// //   }


// //   // Then check image_analysis[].extracted_fields
// //   if (
// //     Array.isArray(aiResult?.image_analysis)
// //   ) {

// //     for (
// //       const image of aiResult.image_analysis
// //     ) {

// //       const fields =
// //         image?.extracted_fields ||
// //         image?.extractedFields ||
// //         {};

// //       const imageCandidates = [
// //         fields.product_name,
// //         fields.productName,
// //         fields.commodity_name,
// //         fields.commodityName
// //       ];

// //       for (const candidate of imageCandidates) {

// //         const value =
// //           normalizeAIText(candidate);

// //         if (value) {
// //           return value;
// //         }
// //       }
// //     }
// //   }


// //   return '';
// // };
// // // ------------------------------------------------------------
// // // Build AI summary
// // // ------------------------------------------------------------

// // const buildAISummary = (
// //   aiResult
// // ) => {

// //   const rawConfidence =
// //     aiResult?.overall_confidence ??
// //     aiResult?.overallConfidence ??
// //     aiResult?.ai_confidence ??
// //     aiResult?.aiConfidence ??
// //     0;


// //   const aiConfidence =
// //     normalizeConfidence(
// //       rawConfidence
// //     );


// //   const productName =
// //     getAIProductName(
// //       aiResult
// //     );


// //   const manufacturer =
// //     extractAIField(
// //       aiResult,
// //       'manufacturer'
// //     );


// //   const mrp =
// //     extractAIField(
// //       aiResult,
// //       'mrp'
// //     );


// //   const netQuantity =
// //     extractAIField(
// //       aiResult,
// //       'net_quantity'
// //     );


// //   const declarations =
// //     Array.isArray(
// //       aiResult?.declarations
// //     )
// //       ? aiResult.declarations
// //       : [];


// //   const violations =
// //     Array.isArray(
// //       aiResult?.violations
// //     )
// //       ? aiResult.violations
// //       : [];


// //   return {

// //     aiConfidence,

// //     extractionCoverage:
// //       calculateExtractionCoverage(
// //         aiResult
// //       ),

// //     productName,

// //     manufacturer,

// //     mrp,

// //     netQuantity,

// //     declarationCount:
// //       declarations.length,

// //     findingCount:
// //       violations.length,

// //     analyzedAt:
// //       new Date(),

// //     analysisVersion:
// //       'LegalScan-AI-1.0'
// //   };
// // };


// // // ------------------------------------------------------------
// // // Save AI summary into inspection
// // // ------------------------------------------------------------

// // const persistAISummary = async (
// //   inspection,
// //   aiResult
// // ) => {

// //   const summary =
// //     buildAISummary(
// //       aiResult
// //     );


// //   await Inspection.updateOne(

// //     {
// //       _id: inspection._id
// //     },

// //     {
// //       $set: {

// //         aiConfidence:
// //           summary.aiConfidence,

// //         aiOverallConfidence:
// //           summary.aiConfidence,

// //         extractionCoverage:
// //           summary.extractionCoverage,

// //         aiProductName:
// //           summary.productName,

// //         aiManufacturer:
// //           summary.manufacturer,

// //         aiMRP:
// //           summary.mrp,

// //         aiNetQuantity:
// //           summary.netQuantity,

// //         aiAnalyzedAt:
// //           summary.analyzedAt,

// //         aiAnalysisVersion:
// //           summary.analysisVersion

// //       }
// //     },

// //     {
// //       strict: false
// //     }

// //   );


// //   // Update current inspection object
// //   inspection.aiConfidence =
// //     summary.aiConfidence;

// //   inspection.aiOverallConfidence =
// //     summary.aiConfidence;

// //   inspection.extractionCoverage =
// //     summary.extractionCoverage;

// //   inspection.aiProductName =
// //     summary.productName;

// //   inspection.aiManufacturer =
// //     summary.manufacturer;

// //   inspection.aiMRP =
// //     summary.mrp;

// //   inspection.aiNetQuantity =
// //     summary.netQuantity;

// //   inspection.aiAnalyzedAt =
// //     summary.analyzedAt;

// //   inspection.aiAnalysisVersion =
// //     summary.analysisVersion;


// //   // If AI detected product name,
// //   // use it instead of manually entered name.

// //   if (
// //     summary.productName &&
// //     summary.productName.length >= 2 &&
// //     !/^(unknown|not clearly detected|not detected)$/i.test(
// //       summary.productName
// //     )
// //   ) {

// //     inspection.commodityName =
// //       summary.productName;
// //   }


// //   console.log(
// //     '💾 AI SUMMARY SAVED'
// //   );

// //   console.log(
// //     `   AI Confidence       : ${summary.aiConfidence}%`
// //   );

// //   console.log(
// //     `   Extraction Coverage : ${summary.extractionCoverage}%`
// //   );

// //   console.log(
// //     `   Product             : ${
// //       summary.productName ||
// //       'Not Clearly Detected'
// //     }`
// //   );

// //   console.log(
// //     `   Manufacturer        : ${
// //       summary.manufacturer ||
// //       'Not Clearly Detected'
// //     }`
// //   );

// //   console.log(
// //     `   MRP                 : ${
// //       summary.mrp ||
// //       'Not Clearly Detectable'
// //     }`
// //   );

// //   console.log(
// //     `   Net Quantity        : ${
// //       summary.netQuantity ||
// //       'Not Clearly Detectable'
// //     }`
// //   );


// //   return summary;
// // };
// // // ============================================================
// // // CREATE NEW INSPECTION
// // // ============================================================
// // // @route   POST /api/inspections
// // // @access  Private

// // exports.createInspection = async (req, res, next) => {
// //   try {
// //     console.log('📝 Creating new inspection...');
// //     console.log('Request body:', req.body);

// //     const {
// //       location,
// //       productId,
// //       officerRemarks,
// //       remarks,
// //       inspectionType,
// //       productCategory,
// //       commodityName
// //     } = req.body;

// //     // Validate location
// //     if (!location || !location.trim()) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Inspection location is required'
// //       });
// //     }

// //     // Validate authenticated user
// //     if (!req.user || !req.user._id) {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'User authentication information is missing'
// //       });
// //     }

// //     // Generate custom inspection ID
// //     const inspectionId = `INS-${new Date().getFullYear()}-${Math.floor(
// //       1000 + Math.random() * 9000
// //     )}`;

// //     const inspection = await Inspection.create({
// //       inspectionId,
// //       officerId: req.user._id,
// //       location: location.trim(),
// //       productId: productId || null,

// //       officerRemarks: officerRemarks || remarks || '',

// //       inspectionType: inspectionType || 'ROUTINE_CHECK',
// //       productCategory: productCategory || '',
// //       commodityName: commodityName || ''
// //     });

// //     console.log(
// //       '✅ Inspection created:',
// //       inspection.inspectionId
// //     );

// //     res.status(201).json({
// //       success: true,
// //       message: 'Inspection created successfully',
// //       data: inspection
// //     });

// //   } catch (error) {
// //     console.error(
// //       '❌ Create inspection error:',
// //       error
// //     );

// //     if (error.code === 11000) {
// //       return res.status(409).json({
// //         success: false,
// //         message: 'Inspection ID already exists. Please try again.'
// //       });
// //     }

// //     next(error);
// //   }
// // };


// // // ============================================================
// // // GET ALL INSPECTIONS
// // // ============================================================
// // // @route   GET /api/inspections
// // // @access  Private

// // exports.getInspections = async (req, res, next) => {
// //   try {
// //     console.log('📋 Loading inspections...');
// //     console.log('Query:', req.query);

// //     const limit = Math.min(
// //       parseInt(req.query.limit, 10) || 10,
// //       100
// //     );

// //     const sortQuery =
// //       req.query.sort || '-createdAt';

// //     let sort = {};

// //     if (sortQuery.startsWith('-')) {
// //       sort[sortQuery.substring(1)] = -1;
// //     } else {
// //       sort[sortQuery] = 1;
// //     }

// //     const inspections = await Inspection.find({
// //   officerId: req.user._id
// // })
// //       .populate('officerId', 'name email')
// //       .populate('productId', 'productName manufacturer')
// //       .sort(sort)
// //       .limit(limit);

// //     console.log(
// //       `✅ Loaded ${inspections.length} inspections`
// //     );

// //     res.status(200).json({
// //       success: true,
// //       count: inspections.length,
// //       data: inspections
// //     });

// //   } catch (error) {
// //     console.error(
// //       '❌ Get inspections error:',
// //       error
// //     );

// //     next(error);
// //   }
// // };


// // // ============================================================
// // // GET INSPECTION BY CUSTOM INSPECTION ID
// // // ============================================================
// // // @route   GET /api/inspections/:id
// // // @access  Private

// // exports.getInspectionById = async (req, res, next) => {
// //   try {
// //     console.log(
// //       '🔍 Loading inspection:',
// //       req.params.id
// //     );

// //     // IMPORTANT:
// //     // Frontend sends INS-2026-9341,
// //     // so use inspectionId instead of MongoDB _id.
// //     const inspection = await Inspection.findOne({
// //   inspectionId: req.params.id,
// //   officerId: req.user._id

// //     })
// //       .populate('officerId', 'name email')
// //       .populate('productId')
// //       .populate('images')
// //       .populate('declarations')
// //       .populate('violations');

// //     if (!inspection) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Inspection not found'
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       data: inspection
// //     });

// //   } catch (error) {
// //     console.error(
// //       '❌ Get inspection by ID error:',
// //       error
// //     );

// //     next(error);
// //   }
// // };


// // // ============================================================
// // // UPLOAD IMAGE
// // // ============================================================
// // // @route   POST /api/inspections/:id/images
// // // @access  Private

// // exports.uploadImage = async (req, res, next) => {
// //   try {
// //     console.log(
// //       '📷 Uploading image for inspection:',
// //       req.params.id
// //     );

// //     // IMPORTANT:
// //     // Use custom inspectionId.
// //     const inspection = await Inspection.findOne({
// //       inspectionId: req.params.id,
// //       officerId: req.user._id
// //     });

// //     if (!inspection) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Inspection not found'
// //       });
// //     }

// //     if (!req.file) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'No image file provided'
// //       });
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

// //     console.log(
// //       '✅ Image uploaded:',
// //       image.filename
// //     );

// //     res.status(201).json({
// //       success: true,
// //       message: 'Image uploaded successfully',
// //       data: image
// //     });

// //   } catch (error) {
// //     console.error(
// //       '❌ Upload image error:',
// //       error
// //     );

// //     next(error);
// //   }
// // };


// // // ============================================================
// // // TRIGGER AI ANALYSIS
// // // ============================================================
// // // @route   POST /api/inspections/:id/analyze
// // // @access  Private

// // // ============================================================
// // // TRIGGER AI ANALYSIS
// // // ============================================================
// // // @route   POST /api/inspections/:id/analyze
// // // @access  Private

// // exports.analyzeInspection = async (
// //   req,
// //   res,
// //   next
// // ) => {

// //   let inspection;

// //   try {

// //     console.log(
// //       '================================================'
// //     );

// //     console.log(
// //       '🤖 Starting AI analysis:',
// //       req.params.id
// //     );

// //     console.log(
// //       '================================================'
// //     );


// //     // ========================================================
// //     // FIND INSPECTION
// //     // ========================================================

// //     inspection = await Inspection.findOne({
// //       inspectionId: req.params.id,
// //       officerId: req.user._id
// //     });


// //     if (!inspection) {

// //       return res.status(404).json({
// //         success: false,
// //         message: 'Inspection not found'
// //       });

// //     }


// //     // ========================================================
// //     // PREVENT DUPLICATE / CONCURRENT ANALYSIS
// //     // ========================================================

// //     if (inspection.status === 'PROCESSING') {

// //       console.log(
// //         '⏭️ Analysis already running for:',
// //         inspection.inspectionId
// //       );

// //       return res.status(409).json({
// //         success: false,
// //         message:
// //           'Analysis is already in progress for this inspection.',
// //         data: {
// //           inspectionId: inspection.inspectionId,
// //           status: inspection.status
// //         }
// //       });

// //     }


// //     // ========================================================
// //     // MARK AS PROCESSING
// //     // ========================================================

// //     inspection.status = 'PROCESSING';

// //     await inspection.save();

// //     console.log(
// //       '🔄 Inspection status: PROCESSING'
// //     );


// //     // ========================================================
// //     // REMOVE PREVIOUS AI RESULTS
// //     //
// //     // This makes analysis IDEMPOTENT.
// //     //
// //     // If the officer retries/re-runs an inspection,
// //     // old declarations and violations are removed before
// //     // the new AI result is stored.
// //     // ========================================================

// //     console.log(
// //       '🧹 Removing previous AI results...'
// //     );


// //     await Violation.deleteMany({
// //       inspectionId: inspection._id
// //     });


// //     await Declaration.deleteMany({
// //       inspectionId: inspection._id
// //     });


// //     inspection.declarations = [];

// //     inspection.violations = [];


// //     await inspection.save();


// //     console.log(
// //       '✅ Previous AI results cleared'
// //     );


// //     // ========================================================
// //     // AI SERVICE
// //     // ========================================================

// //     console.log(
// //       '📡 Sending images to LegalScan AI...'
// //     );


// //     const aiResult =
// //       await aiService.analyzeImages(
// //         inspection
// //       );


// //     console.log(
// //       '🤖 AI result received'
// //     );


// //     console.log(
// //       '📊 AI violations:',
// //       Array.isArray(aiResult?.violations)
// //         ? aiResult.violations.length
// //         : 0
// //     );


// //     console.log(
// //       '📊 AI declarations:',
// //       Array.isArray(aiResult?.declarations)
// //         ? aiResult.declarations.length
// //         : 0
// //     );

// //     // ========================================================
// // // SAVE AI SUMMARY / CONFIDENCE
// // // ========================================================

// // const aiSummary =
// //   await persistAISummary(
// //     inspection,
// //     aiResult
// //   );

// // console.log(
// //   '📊 AI violations:',
// //   Array.isArray(aiResult?.violations)
// //     ? aiResult.violations.length
// //     : 0
// // );

// // console.log(
// //   '📊 AI declarations:',
// //   Array.isArray(aiResult?.declarations)
// //     ? aiResult.declarations.length
// //     : 0
// // );

// //     // ========================================================
// //     // SAVE DECLARATIONS
// //     // ========================================================

// //     if (
// //       aiResult &&
// //       Array.isArray(aiResult.declarations) &&
// //       aiResult.declarations.length > 0
// //     ) {

// //       console.log(
// //         '💾 Saving declarations...'
// //       );


// //       for (
// //         const dec of aiResult.declarations
// //       ) {

// //         const newDeclaration =
// //           await Declaration.create({

// //             inspectionId:
// //               inspection._id,

// //             field:
// //               dec.field || 'Unknown',

// //             value:
// //               dec.value || '',

// //             confidence:
// //               Number(dec.confidence) || 0,

// //             verificationStatus:
// //               'AI_DETECTED'

// //           });


// //         inspection.declarations.push(
// //           newDeclaration._id
// //         );

// //       }


// //       console.log(
// //         `✅ Saved ${aiResult.declarations.length} declarations`
// //       );

// //     } else {

// //       console.log(
// //         'ℹ️ No declarations detected by AI'
// //       );

// //     }


// //     // ========================================================
// //     // SAVE VIOLATIONS
// //     // ========================================================

// //     if (
// //       aiResult &&
// //       Array.isArray(aiResult.violations) &&
// //       aiResult.violations.length > 0
// //     ) {

// //       console.log(
// //         '💾 Saving violations...'
// //       );


// //       /*
// //        * ------------------------------------------------------
// //        * EXTRA DUPLICATE PROTECTION
// //        *
// //        * Even if AI accidentally returns the same rule twice,
// //        * only one violation per rule + field will be saved.
// //        * ------------------------------------------------------
// //        */

// //       const uniqueViolations = [];

// //       const violationKeys = new Set();


// //       for (
// //         const viol of aiResult.violations
// //       ) {

// //         const ruleId =
// //           viol.rule_id || 'UNKNOWN';

// //         const field =
// //           viol.field || 'General';


// //         const uniqueKey =
// //           `${ruleId}__${field}`;


// //         if (
// //           violationKeys.has(uniqueKey)
// //         ) {

// //           console.log(
// //             `⏭️ Duplicate AI violation skipped: ${uniqueKey}`
// //           );

// //           continue;

// //         }


// //         violationKeys.add(
// //           uniqueKey
// //         );


// //         uniqueViolations.push(
// //           viol
// //         );

// //       }


// //       console.log(
// //         `📋 Unique violations to save: ${uniqueViolations.length}`
// //       );


// //       // ------------------------------------------------------
// //       // Create unique violations
// //       // ------------------------------------------------------

// //       for (
// //         const viol of uniqueViolations
// //       ) {

// //         const newViolation =
// //           await Violation.create({

// //             ruleId:
// //               viol.rule_id ||
// //               'UNKNOWN',

// //             inspectionId:
// //               inspection._id,

// //             field:
// //               viol.field ||
// //               'General',

// //             requirement:
// //               viol.requirement ||
// //               'Must comply with Legal Metrology rules',

// //             detectedValue:
// //               viol.detected_value ||
// //               '',

// //             expectedValue:
// //               viol.expected_value ||
// //               '',

// //             severity:
// //               viol.severity ||
// //               'MEDIUM',

// //             confidence:
// //               Number(viol.confidence) ||
// //               0,

// //             status:
// //               'AI_DETECTED'

// //           });


// //         inspection.violations.push(
// //           newViolation._id
// //         );

// //       }


// //       console.log(
// //         `⚠️ Saved ${uniqueViolations.length} unique violations`
// //       );


// //       // ======================================================
// //       // COMPLIANCE STATUS
// //       // ======================================================

// //       const hasHighSeverity =
// //         uniqueViolations.some(
// //           (v) =>
// //             String(v.severity)
// //               .toUpperCase() === 'HIGH'
// //         );


// //       inspection.complianceStatus =
// //         hasHighSeverity
// //           ? 'REQUIRES_REVIEW'
// //           : 'POTENTIAL_VIOLATION';


// //     } else {

// //       // ======================================================
// //       // NO VIOLATIONS
// //       // ======================================================

// //       inspection.complianceStatus =
// //         'COMPLIANT';


// //       console.log(
// //         '✅ No violations detected'
// //       );

// //     }


// //     // ========================================================
// //     // COMPLETE ANALYSIS
// //     // ========================================================

// //     inspection.status =
// //       'UNDER_REVIEW';


// //     await inspection.save();


// //     console.log(
// //       '================================================'
// //     );

// //     console.log(
// //       '✅ AI ANALYSIS COMPLETED'
// //     );

// //     console.log(
// //       '🆔 Inspection:',
// //       inspection.inspectionId
// //     );

// //     console.log(
// //       '📋 Declarations:',
// //       inspection.declarations.length
// //     );

// //     console.log(
// //       '⚠️ Violations:',
// //       inspection.violations.length
// //     );

// //     console.log(
// //       '📌 Compliance:',
// //       inspection.complianceStatus
// //     );

// //     console.log(
// //       '📌 Status:',
// //       inspection.status
// //     );

// //     console.log(
// //       '================================================'
// //     );

// //     return res.status(200).json({
// //   success: true,

// //   message: 'Analysis completed successfully',

// //   data: {
// //     ...inspection.toObject(),

// //     ai: {
// //       confidence:
// //         aiSummary?.aiConfidence ??
// //         inspection.aiConfidence ??
// //         0,

// //       extractionCoverage:
// //         aiSummary?.extractionCoverage ??
// //         inspection.extractionCoverage ??
// //         0,

// //       productName:
// //         aiSummary?.productName ??
// //         inspection.aiProductName ??
// //         '',

// //       manufacturer:
// //         aiSummary?.manufacturer ??
// //         inspection.aiManufacturer ??
// //         '',

// //       mrp:
// //         aiSummary?.mrp ??
// //         inspection.aiMRP ??
// //         '',

// //       netQuantity:
// //         aiSummary?.netQuantity ??
// //         inspection.aiNetQuantity ??
// //         '',

// //       declarationCount:
// //         aiSummary?.declarationCount ??
// //         inspection.declarations.length,

// //       findingCount:
// //         aiSummary?.findingCount ??
// //         inspection.violations.length,

// //       analyzedAt:
// //         aiSummary?.analyzedAt ??
// //         inspection.aiAnalyzedAt,

// //       version:
// //         aiSummary?.analysisVersion ??
// //         inspection.aiAnalysisVersion ??
// //         'LegalScan-AI-1.0'
// //     }
// //   }
// // });

// //     // ========================================================
// //     // RESPONSE
// //     // ========================================================

// //     return res.status(200).json({

// //       success: true,

// //       message:
// //         'Analysis completed successfully',

// //       data: inspection

// //     });


// //   } catch (error) {

// //     console.error(
// //       '================================================'
// //     );

// //     console.error(
// //       '❌ AI ANALYSIS ERROR'
// //     );

// //     console.error(
// //       error
// //     );

// //     console.error(
// //       '================================================'
// //     );


// //     // ========================================================
// //     // ROLLBACK STATUS
// //     // ========================================================

// //     try {

// //       if (!inspection) {

// //         inspection =
// //           await Inspection.findOne({
// //             inspectionId:
// //               req.params.id
// //           });

// //       }


// //       if (inspection) {

// //         inspection.status =
// //           'DRAFT';


// //         await inspection.save();


// //         console.log(
// //           '🔄 Inspection status rolled back to DRAFT'
// //         );

// //       }

// //     } catch (rollbackError) {

// //       console.error(
// //         '❌ Failed to rollback inspection status:',
// //         rollbackError
// //       );

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
// // AI RESULT HELPERS
// // ============================================================

// const firstNonEmpty = (...values) => {
//   for (const value of values) {
//     if (
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ''
//     ) {
//       return value;
//     }
//   }

//   return '';
// };


// // ------------------------------------------------------------
// // Normalize confidence to 0 - 100
// // ------------------------------------------------------------

// const normalizeConfidence = (value) => {
//   const number = Number(value);

//   if (!Number.isFinite(number)) {
//     return 0;
//   }

//   // AI may return 0.75 or 75
//   if (number <= 1) {
//     return Math.max(
//       0,
//       Math.min(100, number * 100)
//     );
//   }

//   return Math.max(
//     0,
//     Math.min(100, number)
//   );
// };


// // ------------------------------------------------------------
// // Extract field from AI result
// // ------------------------------------------------------------

// const extractAIField = (
//   aiResult,
//   field
// ) => {

//   const extracted =
//     aiResult?.extracted_data ||
//     aiResult?.extractedData ||
//     {};


//   const readValue = (value) => {

//     if (Array.isArray(value)) {

//       const usable =
//         value
//           .map((item) => {

//             if (
//               item &&
//               typeof item === 'object'
//             ) {

//               return firstNonEmpty(
//                 item.value,
//                 item.text,
//                 item.detected_value,
//                 item.detectedValue
//               );
//             }

//             return item;
//           })
//           .find(
//             (item) =>
//               item !== undefined &&
//               item !== null &&
//               String(item).trim() !== ''
//           );

//       return usable || '';
//     }


//     if (
//       value &&
//       typeof value === 'object'
//     ) {

//       return firstNonEmpty(
//         value.value,
//         value.text,
//         value.detected_value,
//         value.detectedValue
//       );
//     }


//     return value || '';
//   };


//   // ------------------------------------------
//   // 1. Top-level extracted_data
//   // ------------------------------------------

//   const topLevel =
//     readValue(
//       extracted[field]
//     );

//   if (topLevel) {
//     return topLevel;
//   }


//   // ------------------------------------------
//   // 2. image_analysis extracted_fields
//   // ------------------------------------------

//   if (
//     Array.isArray(
//       aiResult?.image_analysis
//     )
//   ) {

//     for (
//       const image of aiResult.image_analysis
//     ) {

//       const fields =
//         image?.extracted_fields ||
//         image?.extractedFields ||
//         {};

//       const value =
//         readValue(
//           fields[field]
//         );

//       if (value) {
//         return value;
//       }
//     }
//   }


//   return '';
// };


// // ------------------------------------------------------------
// // Calculate extraction coverage
// // ------------------------------------------------------------

// const calculateExtractionCoverage = (
//   aiResult
// ) => {

//   const extracted =
//     aiResult?.extracted_data ||
//     aiResult?.extractedData ||
//     {};

//   const fields = [
//     'mrp',
//     'net_quantity',
//     'manufacturer'
//   ];

//   let detectedCount = 0;


//   for (const field of fields) {

//     const value =
//       extracted[field];


//     if (Array.isArray(value)) {

//       const found =
//         value.some((item) => {

//           const extractedValue =
//             item &&
//             typeof item === 'object'
//               ? firstNonEmpty(
//                   item.value,
//                   item.text,
//                   item.detected_value,
//                   item.detectedValue
//                 )
//               : item;

//           return (
//             extractedValue !== undefined &&
//             extractedValue !== null &&
//             String(extractedValue).trim() !== ''
//           );
//         });


//       if (found) {
//         detectedCount++;
//       }

//       continue;
//     }


//     if (
//       value &&
//       typeof value === 'object'
//     ) {

//       const extractedValue =
//         firstNonEmpty(
//           value.value,
//           value.text,
//           value.detected_value,
//           value.detectedValue
//         );

//       if (
//         String(extractedValue).trim() !== ''
//       ) {
//         detectedCount++;
//       }

//       continue;
//     }


//     if (
//       value !== undefined &&
//       value !== null &&
//       String(value).trim() !== ''
//     ) {

//       detectedCount++;
//     }
//   }


//   return Number(
//     (
//       (detectedCount / fields.length) *
//       100
//     ).toFixed(2)
//   );
// };


// // ------------------------------------------------------------
// // Normalize AI value into a safe string
// // ------------------------------------------------------------

// const normalizeAIText = (value) => {

//   if (value === undefined || value === null) {
//     return '';
//   }

//   // AI may return:
//   // ["Classic", "crispy"]
//   if (Array.isArray(value)) {

//     const values = value
//       .map((item) => {

//         if (
//           item &&
//           typeof item === 'object'
//         ) {
//           return firstNonEmpty(
//             item.value,
//             item.text,
//             item.detected_value,
//             item.detectedValue
//           );
//         }

//         return item;
//       })
//       .filter(
//         (item) =>
//           item !== undefined &&
//           item !== null &&
//           String(item).trim() !== ''
//       )
//       .map((item) => String(item).trim());

//     return values.join(', ');
//   }

//   // AI may return an object
//   if (
//     value &&
//     typeof value === 'object'
//   ) {
//     return String(
//       firstNonEmpty(
//         value.value,
//         value.text,
//         value.detected_value,
//         value.detectedValue
//       ) || ''
//     ).trim();
//   }

//   return String(value).trim();
// };


// // ------------------------------------------------------------
// // Get AI detected product name
// // ------------------------------------------------------------

// const getAIProductName = (aiResult) => {

//   // First check top-level extracted_data
//   const extracted =
//     aiResult?.extracted_data ||
//     aiResult?.extractedData ||
//     {};

//   const candidates = [
//     extracted.product_name,
//     extracted.productName,
//     extracted.commodity_name,
//     extracted.commodityName,
//     aiResult?.product_name,
//     aiResult?.productName,
//     aiResult?.commodity_name,
//     aiResult?.commodityName
//   ];

//   for (const candidate of candidates) {

//     const value = normalizeAIText(candidate);

//     if (value) {
//       return value;
//     }
//   }


//   // Then check image_analysis[].extracted_fields
//   if (
//     Array.isArray(aiResult?.image_analysis)
//   ) {

//     for (
//       const image of aiResult.image_analysis
//     ) {

//       const fields =
//         image?.extracted_fields ||
//         image?.extractedFields ||
//         {};

//       const imageCandidates = [
//         fields.product_name,
//         fields.productName,
//         fields.commodity_name,
//         fields.commodityName
//       ];

//       for (const candidate of imageCandidates) {

//         const value =
//           normalizeAIText(candidate);

//         if (value) {
//           return value;
//         }
//       }
//     }
//   }


//   return '';
// };


// // ------------------------------------------------------------
// // Build AI summary
// // ------------------------------------------------------------

// const buildAISummary = (
//   aiResult
// ) => {

//   const rawConfidence =
//     aiResult?.overall_confidence ??
//     aiResult?.overallConfidence ??
//     aiResult?.ai_confidence ??
//     aiResult?.aiConfidence ??
//     0;


//   const aiConfidence =
//     normalizeConfidence(
//       rawConfidence
//     );


//   const productName =
//     getAIProductName(
//       aiResult
//     );


//   const manufacturer =
//     extractAIField(
//       aiResult,
//       'manufacturer'
//     );


//   const mrp =
//     extractAIField(
//       aiResult,
//       'mrp'
//     );


//   const netQuantity =
//     extractAIField(
//       aiResult,
//       'net_quantity'
//     );


//   const declarations =
//     Array.isArray(
//       aiResult?.declarations
//     )
//       ? aiResult.declarations
//       : [];


//   const violations =
//     Array.isArray(
//       aiResult?.violations
//     )
//       ? aiResult.violations
//       : [];


//   return {

//     aiConfidence,

//     extractionCoverage:
//       calculateExtractionCoverage(
//         aiResult
//       ),

//     productName,

//     manufacturer,

//     mrp,

//     netQuantity,

//     declarationCount:
//       declarations.length,

//     findingCount:
//       violations.length,

//     analyzedAt:
//       new Date(),

//     analysisVersion:
//       'LegalScan-AI-1.0'
//   };
// };


// // ------------------------------------------------------------
// // Build image quality summary
// // ------------------------------------------------------------

// const buildImageQualitySummary = (aiResult) => {

//   const qualityWarnings =
//     Array.isArray(
//       aiResult?.quality_warnings
//     )
//       ? aiResult.quality_warnings
//       : [];


//   const imageQuality =
//     Array.isArray(
//       aiResult?.image_quality
//     )
//       ? aiResult.image_quality
//       : [];


//   return {
//     qualityWarnings,
//     imageQuality
//   };
// };


// // ------------------------------------------------------------
// // Save AI summary into inspection
// // ------------------------------------------------------------

// const persistAISummary = async (
//   inspection,
//   aiResult
// ) => {

//   const summary =
//     buildAISummary(
//       aiResult
//     );


//   // ----------------------------------------------------------
//   // IMAGE QUALITY SUMMARY
//   // ----------------------------------------------------------

//   const qualitySummary =
//     buildImageQualitySummary(
//       aiResult
//     );


//   await Inspection.updateOne(

//     {
//       _id: inspection._id
//     },

//     {
//       $set: {

//         aiConfidence:
//           summary.aiConfidence,

//         aiOverallConfidence:
//           summary.aiConfidence,

//         extractionCoverage:
//           summary.extractionCoverage,

//         aiProductName:
//           summary.productName,

//         aiManufacturer:
//           summary.manufacturer,

//         aiMRP:
//           summary.mrp,

//         aiNetQuantity:
//           summary.netQuantity,

//         aiAnalyzedAt:
//           summary.analyzedAt,

//         aiAnalysisVersion:
//           summary.analysisVersion,

//         // ----------------------------------------------------
//         // IMAGE QUALITY
//         // ----------------------------------------------------

//         qualityWarnings:
//           qualitySummary.qualityWarnings,

//         imageQuality:
//           qualitySummary.imageQuality

//       }
//     },

//     {
//       strict: false
//     }

//   );


//   // ----------------------------------------------------------
//   // UPDATE CURRENT INSPECTION OBJECT
//   // ----------------------------------------------------------

//   inspection.aiConfidence =
//     summary.aiConfidence;

//   inspection.aiOverallConfidence =
//     summary.aiConfidence;

//   inspection.extractionCoverage =
//     summary.extractionCoverage;

//   inspection.aiProductName =
//     summary.productName;

//   inspection.aiManufacturer =
//     summary.manufacturer;

//   inspection.aiMRP =
//     summary.mrp;

//   inspection.aiNetQuantity =
//     summary.netQuantity;

//   inspection.aiAnalyzedAt =
//     summary.analyzedAt;

//   inspection.aiAnalysisVersion =
//     summary.analysisVersion;


//   // ----------------------------------------------------------
//   // IMAGE QUALITY
//   // ----------------------------------------------------------

//   inspection.qualityWarnings =
//     qualitySummary.qualityWarnings;

//   inspection.imageQuality =
//     qualitySummary.imageQuality;


//   // ----------------------------------------------------------
//   // If AI detected product name,
//   // use it instead of manually entered name.
//   // ----------------------------------------------------------

//   if (
//     summary.productName &&
//     summary.productName.length >= 2 &&
//     !/^(unknown|not clearly detected|not detected)$/i.test(
//       summary.productName
//     )
//   ) {

//     inspection.commodityName =
//       summary.productName;
//   }


//   console.log(
//     '💾 AI SUMMARY SAVED'
//   );

//   console.log(
//     `   AI Confidence       : ${summary.aiConfidence}%`
//   );

//   console.log(
//     `   Extraction Coverage : ${summary.extractionCoverage}%`
//   );

//   console.log(
//     `   Product             : ${
//       summary.productName ||
//       'Not Clearly Detected'
//     }`
//   );

//   console.log(
//     `   Manufacturer        : ${
//       summary.manufacturer ||
//       'Not Clearly Detected'
//     }`
//   );

//   console.log(
//     `   MRP                 : ${
//       summary.mrp ||
//       'Not Clearly Detectable'
//     }`
//   );

//   console.log(
//     `   Net Quantity        : ${
//       summary.netQuantity ||
//       'Not Clearly Detectable'
//     }`
//   );


//   // ----------------------------------------------------------
//   // IMAGE QUALITY LOGGING
//   // ----------------------------------------------------------

//   console.log(
//     `   Quality Warnings    : ${
//       qualitySummary.qualityWarnings.length
//     }`
//   );

//   console.log(
//     `   Images Analyzed     : ${
//       qualitySummary.imageQuality.length
//     }`
//   );


//   qualitySummary.imageQuality.forEach(
//     (quality, index) => {

//       console.log(
//         `   Image ${index + 1} Quality : ${
//           quality?.quality_level ||
//           'UNKNOWN'
//         }`
//       );

//       console.log(
//         `   Image ${index + 1} Blur    : ${
//           quality?.blur_detected
//             ? 'YES'
//             : 'NO'
//         }`
//       );

//       console.log(
//         `   Image ${index + 1} Glare   : ${
//           quality?.glare_detected
//             ? 'YES'
//             : 'NO'
//         }`
//       );

//       console.log(
//         `   Image ${index + 1} Passed  : ${
//           quality?.passed
//             ? 'YES'
//             : 'NO'
//         }`
//       );

//     }
//   );


//   return summary;
// };


// // ============================================================
// // CREATE NEW INSPECTION
// // ============================================================
// // @route   POST /api/inspections
// // @access  Private

// exports.createInspection = async (req, res, next) => {
//   try {

//     console.log(
//       '📝 Creating new inspection...'
//     );

//     console.log(
//       'Request body:',
//       req.body
//     );


//     const {
//       location,
//       productId,
//       officerRemarks,
//       remarks,
//       inspectionType,
//       productCategory,
//       commodityName
//     } = req.body;


//     // Validate location
//     if (
//       !location ||
//       !location.trim()
//     ) {

//       return res.status(400).json({
//         success: false,
//         message:
//           'Inspection location is required'
//       });

//     }


//     // Validate authenticated user
//     if (
//       !req.user ||
//       !req.user._id
//     ) {

//       return res.status(401).json({
//         success: false,
//         message:
//           'User authentication information is missing'
//       });

//     }


//     // Generate custom inspection ID
//     const inspectionId =
//       `INS-${new Date().getFullYear()}-${Math.floor(
//         1000 + Math.random() * 9000
//       )}`;


//     const inspection =
//       await Inspection.create({

//         inspectionId,

//         officerId:
//           req.user._id,

//         location:
//           location.trim(),

//         productId:
//           productId || null,

//         officerRemarks:
//           officerRemarks ||
//           remarks ||
//           '',

//         inspectionType:
//           inspectionType ||
//           'ROUTINE_CHECK',

//         productCategory:
//           productCategory ||
//           '',

//         commodityName:
//           commodityName ||
//           ''

//       });


//     console.log(
//       '✅ Inspection created:',
//       inspection.inspectionId
//     );


//     res.status(201).json({
//       success: true,

//       message:
//         'Inspection created successfully',

//       data:
//         inspection
//     });

//   } catch (error) {

//     console.error(
//       '❌ Create inspection error:',
//       error
//     );


//     if (error.code === 11000) {

//       return res.status(409).json({
//         success: false,

//         message:
//           'Inspection ID already exists. Please try again.'
//       });

//     }


//     next(error);
//   }
// };


// // ============================================================
// // GET ALL INSPECTIONS
// // ============================================================
// // @route   GET /api/inspections
// // @access  Private

// exports.getInspections = async (
//   req,
//   res,
//   next
// ) => {

//   try {

//     console.log(
//       '📋 Loading inspections...'
//     );

//     console.log(
//       'Query:',
//       req.query
//     );


//     const limit =
//       Math.min(
//         parseInt(
//           req.query.limit,
//           10
//         ) || 10,
//         100
//       );


//     const sortQuery =
//       req.query.sort ||
//       '-createdAt';


//     let sort = {};


//     if (
//       sortQuery.startsWith('-')
//     ) {

//       sort[
//         sortQuery.substring(1)
//       ] = -1;

//     } else {

//       sort[
//         sortQuery
//       ] = 1;

//     }


//     const inspections =
//       await Inspection.find({
//         officerId:
//           req.user._id
//       })

//         .populate(
//           'officerId',
//           'name email'
//         )

//         .populate(
//           'productId',
//           'productName manufacturer'
//         )

//         .sort(sort)

//         .limit(limit);


//     console.log(
//       `✅ Loaded ${inspections.length} inspections`
//     );


//     res.status(200).json({

//       success: true,

//       count:
//         inspections.length,

//       data:
//         inspections

//     });

//   } catch (error) {

//     console.error(
//       '❌ Get inspections error:',
//       error
//     );

//     next(error);
//   }
// };


// // ============================================================
// // GET INSPECTION BY CUSTOM INSPECTION ID
// // ============================================================
// // @route   GET /api/inspections/:id
// // @access  Private

// exports.getInspectionById = async (
//   req,
//   res,
//   next
// ) => {

//   try {

//     console.log(
//       '🔍 Loading inspection:',
//       req.params.id
//     );


//     // IMPORTANT:
//     // Frontend sends INS-2026-9341,
//     // so use inspectionId instead of MongoDB _id.

//     const inspection =
//       await Inspection.findOne({

//         inspectionId:
//           req.params.id,

//         officerId:
//           req.user._id

//       })

//         .populate(
//           'officerId',
//           'name email'
//         )

//         .populate(
//           'productId'
//         )

//         .populate(
//           'images'
//         )

//         .populate(
//           'declarations'
//         )

//         .populate(
//           'violations'
//         );


//     if (!inspection) {

//       return res.status(404).json({

//         success: false,

//         message:
//           'Inspection not found'

//       });

//     }


//     res.status(200).json({

//       success: true,

//       data:
//         inspection

//     });

//   } catch (error) {

//     console.error(
//       '❌ Get inspection by ID error:',
//       error
//     );

//     next(error);
//   }
// };


// // ============================================================
// // UPLOAD IMAGE
// // ============================================================
// // @route   POST /api/inspections/:id/images
// // @access  Private

// exports.uploadImage = async (
//   req,
//   res,
//   next
// ) => {

//   try {

//     console.log(
//       '📷 Uploading image for inspection:',
//       req.params.id
//     );


//     // IMPORTANT:
//     // Use custom inspectionId.

//     const inspection =
//       await Inspection.findOne({

//         inspectionId:
//           req.params.id,

//         officerId:
//           req.user._id

//       });


//     if (!inspection) {

//       return res.status(404).json({

//         success: false,

//         message:
//           'Inspection not found'

//       });

//     }


//     if (!req.file) {

//       return res.status(400).json({

//         success: false,

//         message:
//           'No image file provided'

//       });

//     }


//     const {
//       angle
//     } = req.body;


//     const image =
//       await Image.create({

//         inspectionId:
//           inspection._id,

//         imageUrl:
//           `/uploads/${req.file.filename}`,

//         filename:
//           req.file.filename,

//         mimeType:
//           req.file.mimetype,

//         angle:
//           angle ||
//           'UNKNOWN'

//       });


//     inspection.images.push(
//       image._id
//     );


//     await inspection.save();


//     console.log(
//       '✅ Image uploaded:',
//       image.filename
//     );


//     res.status(201).json({

//       success: true,

//       message:
//         'Image uploaded successfully',

//       data:
//         image

//     });

//   } catch (error) {

//     console.error(
//       '❌ Upload image error:',
//       error
//     );

//     next(error);
//   }
// };


// // ============================================================
// // TRIGGER AI ANALYSIS
// // ============================================================
// // @route   POST /api/inspections/:id/analyze
// // @access  Private

// exports.analyzeInspection = async (
//   req,
//   res,
//   next
// ) => {

//   let inspection;


//   try {

//     console.log(
//       '================================================'
//     );

//     console.log(
//       '🤖 Starting AI analysis:',
//       req.params.id
//     );

//     console.log(
//       '================================================'
//     );


//     // ========================================================
//     // FIND INSPECTION
//     // ========================================================

//     inspection =
//       await Inspection.findOne({

//         inspectionId:
//           req.params.id,

//         officerId:
//           req.user._id

//       });


//     if (!inspection) {

//       return res.status(404).json({

//         success: false,

//         message:
//           'Inspection not found'

//       });

//     }


//     // ========================================================
//     // PREVENT DUPLICATE / CONCURRENT ANALYSIS
//     // ========================================================

//     if (
//       inspection.status ===
//       'PROCESSING'
//     ) {

//       console.log(
//         '⏭️ Analysis already running for:',
//         inspection.inspectionId
//       );


//       return res.status(409).json({

//         success: false,

//         message:
//           'Analysis is already in progress for this inspection.',

//         data: {

//           inspectionId:
//             inspection.inspectionId,

//           status:
//             inspection.status

//         }

//       });

//     }


//     // ========================================================
//     // MARK AS PROCESSING
//     // ========================================================

//     inspection.status =
//       'PROCESSING';


//     await inspection.save();


//     console.log(
//       '🔄 Inspection status: PROCESSING'
//     );


//     // ========================================================
//     // REMOVE PREVIOUS AI RESULTS
//     //
//     // This makes analysis IDEMPOTENT.
//     //
//     // If the officer retries/re-runs an inspection,
//     // old declarations and violations are removed before
//     // the new AI result is stored.
//     // ========================================================

//     console.log(
//       '🧹 Removing previous AI results...'
//     );


//     await Violation.deleteMany({

//       inspectionId:
//         inspection._id

//     });


//     await Declaration.deleteMany({

//       inspectionId:
//         inspection._id

//     });


//     inspection.declarations =
//       [];

//     inspection.violations =
//       [];


//     await inspection.save();


//     console.log(
//       '✅ Previous AI results cleared'
//     );


//     // ========================================================
//     // AI SERVICE
//     // ========================================================

//     console.log(
//       '📡 Sending images to LegalScan AI...'
//     );


//     const aiResult =
//       await aiService.analyzeImages(
//         inspection
//       );


//     console.log(
//       '🤖 AI result received'
//     );


//     console.log(
//       '📊 AI violations:',
//       Array.isArray(
//         aiResult?.violations
//       )
//         ? aiResult.violations.length
//         : 0
//     );


//     console.log(
//       '📊 AI declarations:',
//       Array.isArray(
//         aiResult?.declarations
//       )
//         ? aiResult.declarations.length
//         : 0
//     );


//     // ========================================================
//     // SAVE AI SUMMARY / CONFIDENCE
//     // ========================================================

//     const aiSummary =
//       await persistAISummary(
//         inspection,
//         aiResult
//       );


//     console.log(
//       '📊 AI violations:',
//       Array.isArray(
//         aiResult?.violations
//       )
//         ? aiResult.violations.length
//         : 0
//     );


//     console.log(
//       '📊 AI declarations:',
//       Array.isArray(
//         aiResult?.declarations
//       )
//         ? aiResult.declarations.length
//         : 0
//     );


//     // ========================================================
//     // SAVE DECLARATIONS
//     // ========================================================

//     if (
//       aiResult &&
//       Array.isArray(
//         aiResult.declarations
//       ) &&
//       aiResult.declarations.length > 0
//     ) {

//       console.log(
//         '💾 Saving declarations...'
//       );


//       for (
//         const dec of
//         aiResult.declarations
//       ) {

//         const newDeclaration =
//           await Declaration.create({

//             inspectionId:
//               inspection._id,

//             field:
//               dec.field ||
//               'Unknown',

//             value:
//               dec.value ||
//               '',

//             confidence:
//               Number(
//                 dec.confidence
//               ) || 0,

//             verificationStatus:
//               'AI_DETECTED'

//           });


//         inspection.declarations.push(
//           newDeclaration._id
//         );

//       }


//       console.log(
//         `✅ Saved ${aiResult.declarations.length} declarations`
//       );

//     } else {

//       console.log(
//         'ℹ️ No declarations detected by AI'
//       );

//     }


//     // ========================================================
//     // SAVE VIOLATIONS
//     // ========================================================

//     if (
//       aiResult &&
//       Array.isArray(
//         aiResult.violations
//       ) &&
//       aiResult.violations.length > 0
//     ) {

//       console.log(
//         '💾 Saving violations...'
//       );


//       /*
//        * ------------------------------------------------------
//        * EXTRA DUPLICATE PROTECTION
//        *
//        * Even if AI accidentally returns the same rule twice,
//        * only one violation per rule + field will be saved.
//        * ------------------------------------------------------
//        */

//       const uniqueViolations =
//         [];

//       const violationKeys =
//         new Set();


//       for (
//         const viol of
//         aiResult.violations
//       ) {

//         const ruleId =
//           viol.rule_id ||
//           'UNKNOWN';


//         const field =
//           viol.field ||
//           'General';


//         const uniqueKey =
//           `${ruleId}__${field}`;


//         if (
//           violationKeys.has(
//             uniqueKey
//           )
//         ) {

//           console.log(
//             `⏭️ Duplicate AI violation skipped: ${uniqueKey}`
//           );

//           continue;

//         }


//         violationKeys.add(
//           uniqueKey
//         );


//         uniqueViolations.push(
//           viol
//         );

//       }


//       console.log(
//         `📋 Unique violations to save: ${uniqueViolations.length}`
//       );


//       // ------------------------------------------------------
//       // Create unique violations
//       // ------------------------------------------------------

//       for (
//         const viol of
//         uniqueViolations
//       ) {

//         const newViolation =
//           await Violation.create({

//             ruleId:
//               viol.rule_id ||
//               'UNKNOWN',

//             inspectionId:
//               inspection._id,

//             field:
//               viol.field ||
//               'General',

//             requirement:
//               viol.requirement ||
//               'Must comply with Legal Metrology rules',

//             detectedValue:
//               viol.detected_value ||
//               '',

//             expectedValue:
//               viol.expected_value ||
//               '',

//             severity:
//               viol.severity ||
//               'MEDIUM',

//             confidence:
//               Number(
//                 viol.confidence
//               ) || 0,

//             status:
//               'AI_DETECTED'

//           });


//         inspection.violations.push(
//           newViolation._id
//         );

//       }


//       console.log(
//         `⚠️ Saved ${uniqueViolations.length} unique violations`
//       );


//       // ======================================================
//       // COMPLIANCE STATUS
//       // ======================================================

//       const hasHighSeverity =
//         uniqueViolations.some(
//           (v) =>
//             String(
//               v.severity
//             ).toUpperCase() ===
//             'HIGH'
//         );


//       inspection.complianceStatus =
//         hasHighSeverity
//           ? 'REQUIRES_REVIEW'
//           : 'POTENTIAL_VIOLATION';


//     } else {

//       // ======================================================
//       // NO VIOLATIONS
//       // ======================================================

//       inspection.complianceStatus =
//         'COMPLIANT';


//       console.log(
//         '✅ No violations detected'
//       );

//     }


//     // ========================================================
//     // COMPLETE ANALYSIS
//     // ========================================================

//     inspection.status =
//       'UNDER_REVIEW';


//     await inspection.save();


//     console.log(
//       '================================================'
//     );

//     console.log(
//       '✅ AI ANALYSIS COMPLETED'
//     );

//     console.log(
//       '🆔 Inspection:',
//       inspection.inspectionId
//     );

//     console.log(
//       '📋 Declarations:',
//       inspection.declarations.length
//     );

//     console.log(
//       '⚠️ Violations:',
//       inspection.violations.length
//     );

//     console.log(
//       '📌 Compliance:',
//       inspection.complianceStatus
//     );

//     console.log(
//       '📌 Status:',
//       inspection.status
//     );

//     console.log(
//       '================================================'
//     );


//     // ========================================================
//     // FINAL RESPONSE
//     // ========================================================

//     return res.status(200).json({

//       success: true,

//       message:
//         'Analysis completed successfully',

//       data: {

//         ...inspection.toObject(),

//         ai: {

//           confidence:
//             aiSummary?.aiConfidence ??
//             inspection.aiConfidence ??
//             0,


//           extractionCoverage:
//             aiSummary?.extractionCoverage ??
//             inspection.extractionCoverage ??
//             0,


//           productName:
//             aiSummary?.productName ??
//             inspection.aiProductName ??
//             '',


//           manufacturer:
//             aiSummary?.manufacturer ??
//             inspection.aiManufacturer ??
//             '',


//           mrp:
//             aiSummary?.mrp ??
//             inspection.aiMRP ??
//             '',


//           netQuantity:
//             aiSummary?.netQuantity ??
//             inspection.aiNetQuantity ??
//             '',


//           declarationCount:
//             aiSummary?.declarationCount ??
//             inspection.declarations.length,


//           findingCount:
//             aiSummary?.findingCount ??
//             inspection.violations.length,


//           analyzedAt:
//             aiSummary?.analyzedAt ??
//             inspection.aiAnalyzedAt,


//           version:
//             aiSummary?.analysisVersion ??
//             inspection.aiAnalysisVersion ??
//             'LegalScan-AI-1.0',


//           // --------------------------------------------------
//           // IMAGE QUALITY
//           // --------------------------------------------------

//           qualityWarnings:
//             inspection.qualityWarnings ||
//             [],


//           imageQuality:
//             inspection.imageQuality ||
//             []

//         }

//       }

//     });


//   } catch (error) {

//     console.error(
//       '================================================'
//     );

//     console.error(
//       '❌ AI ANALYSIS ERROR'
//     );

//     console.error(
//       error
//     );

//     console.error(
//       '================================================'
//     );


//     // ========================================================
//     // ROLLBACK STATUS
//     // ========================================================

//     try {

//       if (!inspection) {

//         inspection =
//           await Inspection.findOne({

//             inspectionId:
//               req.params.id

//           });

//       }


//       if (inspection) {

//         inspection.status =
//           'DRAFT';


//         await inspection.save();


//         console.log(
//           '🔄 Inspection status rolled back to DRAFT'
//         );

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
// AI RESULT HELPERS
// ============================================================

const firstNonEmpty = (...values) => {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
    ) {
      return value;
    }
  }

  return '';
};


// ------------------------------------------------------------
// Normalize confidence to 0 - 100
// ------------------------------------------------------------

const normalizeConfidence = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  // AI may return 0.75 or 75
  if (number <= 1) {
    return Math.max(
      0,
      Math.min(100, number * 100)
    );
  }

  return Math.max(
    0,
    Math.min(100, number)
  );
};


// ------------------------------------------------------------
// Extract field from AI result
// ------------------------------------------------------------

const extractAIField = (
  aiResult,
  field
) => {
  const extracted =
    aiResult?.extracted_data ||
    aiResult?.extractedData ||
    {};

  const readValue = (value) => {
    if (Array.isArray(value)) {
      const usable =
        value
          .map((item) => {
            if (
              item &&
              typeof item === 'object'
            ) {
              return firstNonEmpty(
                item.value,
                item.text,
                item.detected_value,
                item.detectedValue
              );
            }

            return item;
          })
          .find(
            (item) =>
              item !== undefined &&
              item !== null &&
              String(item).trim() !== ''
          );

      return usable || '';
    }

    if (
      value &&
      typeof value === 'object'
    ) {
      return firstNonEmpty(
        value.value,
        value.text,
        value.detected_value,
        value.detectedValue
      );
    }

    return value || '';
  };


  // ------------------------------------------
  // 1. Top-level extracted_data
  // ------------------------------------------

  const topLevel =
    readValue(
      extracted[field]
    );

  if (topLevel) {
    return topLevel;
  }


  // ------------------------------------------
  // 2. image_analysis extracted_fields
  // ------------------------------------------

  if (
    Array.isArray(
      aiResult?.image_analysis
    )
  ) {
    for (
      const image of aiResult.image_analysis
    ) {
      const fields =
        image?.extracted_fields ||
        image?.extractedFields ||
        {};

      const value =
        readValue(
          fields[field]
        );

      if (value) {
        return value;
      }
    }
  }


  return '';
};


// ------------------------------------------------------------
// Calculate extraction coverage
//
// Primary compliance extraction fields:
// 1. Product / Commodity
// 2. Manufacturer / Packer
// 3. MRP
// 4. Net Quantity
//
// Example:
// Product only = 25%
// Product + MRP = 50%
// Product + MRP + Quantity = 75%
// All four = 100%
// ------------------------------------------------------------

const calculateExtractionCoverage = (
  aiResult
) => {
  const fields = [
    'product',
    'manufacturer',
    'mrp',
    'net_quantity'
  ];

  let detectedCount = 0;


  // ----------------------------------------------------------
  // Product / Commodity
  // ----------------------------------------------------------

  const productValue =
    getAIProductName(aiResult);

  if (
    productValue &&
    String(productValue).trim() !== ''
  ) {
    detectedCount++;
  }


  // ----------------------------------------------------------
  // Manufacturer / MRP / Net Quantity
  // ----------------------------------------------------------

  const otherFields = [
    'manufacturer',
    'mrp',
    'net_quantity'
  ];

  for (
    const field of otherFields
  ) {
    const value =
      extractAIField(
        aiResult,
        field
      );

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
    ) {
      detectedCount++;
    }
  }


  return Number(
    (
      (detectedCount / fields.length) *
      100
    ).toFixed(2)
  );
};


// ------------------------------------------------------------
// Normalize AI value into a safe string
// ------------------------------------------------------------

const normalizeAIText = (value) => {
  if (
    value === undefined ||
    value === null
  ) {
    return '';
  }


  // AI may return:
  // ["Classic", "crispy"]

  if (Array.isArray(value)) {
    const values =
      value
        .map((item) => {
          if (
            item &&
            typeof item === 'object'
          ) {
            return firstNonEmpty(
              item.value,
              item.text,
              item.detected_value,
              item.detectedValue
            );
          }

          return item;
        })
        .filter(
          (item) =>
            item !== undefined &&
            item !== null &&
            String(item).trim() !== ''
        )
        .map(
          (item) =>
            String(item).trim()
        );

    return values.join(', ');
  }


  // AI may return an object

  if (
    value &&
    typeof value === 'object'
  ) {
    return String(
      firstNonEmpty(
        value.value,
        value.text,
        value.detected_value,
        value.detectedValue
      ) || ''
    ).trim();
  }


  return String(value).trim();
};


// ------------------------------------------------------------
// Get AI detected product name
// ------------------------------------------------------------

const getAIProductName = (aiResult) => {
  // First check top-level extracted_data

  const extracted =
    aiResult?.extracted_data ||
    aiResult?.extractedData ||
    {};

  const candidates = [
    extracted.product_name,
    extracted.productName,
    extracted.commodity_name,
    extracted.commodityName,
    aiResult?.product_name,
    aiResult?.productName,
    aiResult?.commodity_name,
    aiResult?.commodityName
  ];


  for (
    const candidate of candidates
  ) {
    const value =
      normalizeAIText(candidate);

    if (value) {
      return value;
    }
  }


  // Then check image_analysis[].extracted_fields

  if (
    Array.isArray(
      aiResult?.image_analysis
    )
  ) {
    for (
      const image of aiResult.image_analysis
    ) {
      const fields =
        image?.extracted_fields ||
        image?.extractedFields ||
        {};

      const imageCandidates = [
        fields.product_name,
        fields.productName,
        fields.commodity_name,
        fields.commodityName
      ];


      for (
        const candidate of imageCandidates
      ) {
        const value =
          normalizeAIText(candidate);

        if (value) {
          return value;
        }
      }
    }
  }


  return '';
};


// ------------------------------------------------------------
// Build AI summary
// ------------------------------------------------------------

const buildAISummary = (
  aiResult
) => {
  const rawConfidence =
    aiResult?.overall_confidence ??
    aiResult?.overallConfidence ??
    aiResult?.ai_confidence ??
    aiResult?.aiConfidence ??
    0;


  const aiConfidence =
    normalizeConfidence(
      rawConfidence
    );


  const productName =
    getAIProductName(
      aiResult
    );


  const manufacturer =
    extractAIField(
      aiResult,
      'manufacturer'
    );


  const mrp =
    extractAIField(
      aiResult,
      'mrp'
    );


  const netQuantity =
    extractAIField(
      aiResult,
      'net_quantity'
    );


  const declarations =
    Array.isArray(
      aiResult?.declarations
    )
      ? aiResult.declarations
      : [];


  const violations =
    Array.isArray(
      aiResult?.violations
    )
      ? aiResult.violations
      : [];


  return {
    aiConfidence,

    extractionCoverage:
      calculateExtractionCoverage(
        aiResult
      ),

    productName,

    manufacturer,

    mrp,

    netQuantity,

    declarationCount:
      declarations.length,

    findingCount:
  buildUniqueLegalViolations(
    Array.isArray(aiResult?.violations)
      ? aiResult.violations
      : []
  ).length,

    analyzedAt:
      new Date(),

    analysisVersion:
      'LegalScan-AI-1.0'
  };
};


// ------------------------------------------------------------
// Build image quality summary
// ------------------------------------------------------------

const buildImageQualitySummary = (
  aiResult
) => {
  const qualityWarnings =
    Array.isArray(
      aiResult?.quality_warnings
    )
      ? aiResult.quality_warnings
      : [];


  const imageQuality =
    Array.isArray(
      aiResult?.image_quality
    )
      ? aiResult.image_quality
      : [];


  return {
    qualityWarnings,
    imageQuality
  };
};


// ------------------------------------------------------------
// Normalize violation key
// ------------------------------------------------------------

const buildViolationKey = (
  violation
) => {
  const ruleId =
    String(
      violation?.rule_id ||
      'UNKNOWN'
    )
      .trim()
      .toUpperCase();

  const field =
    String(
      violation?.field ||
      'General'
    )
      .trim()
      .toLowerCase();

  return `${ruleId}__${field}`;
};


// ------------------------------------------------------------
// Check whether violation is an image-quality finding
// ------------------------------------------------------------

const isImageQualityViolation = (
  violation
) => {
  const ruleId =
    String(
      violation?.rule_id ||
      ''
    )
      .trim()
      .toUpperCase();

  return (
    ruleId.startsWith('IQA-') ||
    ruleId === 'IMAGE_QUALITY' ||
    ruleId === 'IMAGE-QUALITY'
  );
};


const buildUniqueLegalViolations = (violations) => {
  const rawViolations = Array.isArray(violations)
    ? violations
    : [];

  // ------------------------------------------------------
  // Remove image-quality findings
  // These are quality warnings, NOT legal violations.
  // ------------------------------------------------------
  const legalViolations = rawViolations.filter((violation) => {
    const ruleId = String(violation?.rule_id || '')
      .trim()
      .toUpperCase();

    if (
      ruleId.startsWith('IQA-') ||
      ruleId.startsWith('IMAGE_QUALITY') ||
      ruleId.startsWith('IMAGE-QUALITY')
    ) {
      return false;
    }

    return true;
  });

  // ------------------------------------------------------
  // Identify the actual legal requirement behind
  // each AI finding.
  // ------------------------------------------------------
  const getCanonicalRequirement = (violation) => {
    const text = [
      violation?.rule_id,
      violation?.field,
      violation?.requirement
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    // MRP
    if (
      text.includes('mrp') ||
      text.includes('maximum retail price') ||
      text.includes('retail price')
    ) {
      return 'MRP';
    }

    // Net quantity
    if (
      text.includes('net quantity') ||
      text.includes('net weight') ||
      text.includes('net volume')
    ) {
      return 'NET_QUANTITY';
    }

    // Manufacturer / Packer / Importer
    if (
      text.includes('manufacturer') ||
      text.includes('packer') ||
      text.includes('importer')
    ) {
      return 'MANUFACTURER';
    }

    // Consumer care
    if (
      text.includes('consumer care') ||
      text.includes('consumer complaint') ||
      text.includes('customer care') ||
      text.includes('helpline')
    ) {
      return 'CONSUMER_CARE';
    }

    // Date
    if (
      text.includes('month') ||
      text.includes('year') ||
      text.includes('manufacturing date') ||
      text.includes('packing date') ||
      text.includes('date')
    ) {
      return 'DATE';
    }

    return 'OTHER';
  };

  // ------------------------------------------------------
  // Group AI findings by actual requirement
  // ------------------------------------------------------
  const violationGroups = new Map();

  for (const violation of legalViolations) {
    const requirement =
      getCanonicalRequirement(violation);

    if (!violationGroups.has(requirement)) {
      violationGroups.set(requirement, []);
    }

    violationGroups
      .get(requirement)
      .push(violation);
  }

  // ------------------------------------------------------
  // Keep only ONE finding per requirement.
  // Highest confidence finding wins.
  // ------------------------------------------------------
  const uniqueViolations = [];

  for (
    const [requirement, groupedViolations]
    of violationGroups
  ) {

    groupedViolations.sort(
      (a, b) =>
        Number(b?.confidence || 0) -
        Number(a?.confidence || 0)
    );

    const selected = groupedViolations[0];

    let canonicalField = 'general';

    switch (requirement) {
      case 'MRP':
        canonicalField = 'mrp';
        break;

      case 'NET_QUANTITY':
        canonicalField = 'net_quantity';
        break;

      case 'MANUFACTURER':
        canonicalField = 'manufacturer';
        break;

      case 'CONSUMER_CARE':
        canonicalField = 'consumer_care';
        break;

      case 'DATE':
        canonicalField = 'date';
        break;

      case 'OTHER':
        canonicalField =
          String(
            selected?.field || 'general'
          )
            .trim()
            .toLowerCase();
        break;
    }

    uniqueViolations.push({
      ...selected,

      rule_id:
        String(
          selected?.rule_id ||
          'LEGAL-METROLOGY'
        )
          .trim()
          .toUpperCase(),

      field: canonicalField,

      requirement:
        selected?.requirement ||
        `Legal Metrology requirement for ${requirement}`
    });
  }

  console.log(
    '📊 Raw AI violations:',
    rawViolations.length
  );

  console.log(
    '⚖️ Legal violations after IQA filter:',
    legalViolations.length
  );

  console.log(
    '✅ Unique requirement-level violations:',
    uniqueViolations.length
  );

  return uniqueViolations;
};

// ------------------------------------------------------------
// Save AI summary into inspection
// ------------------------------------------------------------

const persistAISummary = async (
  inspection,
  aiResult
) => {
  const violations = Array.isArray(
    aiResult?.violations
  )
    ? aiResult.violations
    : [];
  const summary =
    buildAISummary(
      aiResult
    );

const uniqueLegalViolations =
  buildUniqueLegalViolations(violations);
  // ----------------------------------------------------------
  // IMAGE QUALITY SUMMARY
  // ----------------------------------------------------------

  const qualitySummary =
    buildImageQualitySummary(
      aiResult
    );


  await Inspection.updateOne(
    {
      _id:
        inspection._id
    },
    {
      $set: {
        aiConfidence:
          summary.aiConfidence,

        aiOverallConfidence:
          summary.aiConfidence,

        extractionCoverage:
          summary.extractionCoverage,

        aiProductName:
          summary.productName,

        aiManufacturer:
          summary.manufacturer,

        aiMRP:
          summary.mrp,

        aiNetQuantity:
          summary.netQuantity,

        aiAnalyzedAt:
          summary.analyzedAt,

        aiAnalysisVersion:
          summary.analysisVersion,

        qualityWarnings:
          qualitySummary.qualityWarnings,

        imageQuality:
          qualitySummary.imageQuality
      }
    },
    {
      strict: false
    }
  );


  // ----------------------------------------------------------
  // UPDATE CURRENT INSPECTION OBJECT
  // ----------------------------------------------------------

  inspection.aiConfidence =
    summary.aiConfidence;

  inspection.aiOverallConfidence =
    summary.aiConfidence;

  inspection.extractionCoverage =
    summary.extractionCoverage;

  inspection.aiProductName =
    summary.productName;

  inspection.aiManufacturer =
    summary.manufacturer;

  inspection.aiMRP =
    summary.mrp;

  inspection.aiNetQuantity =
    summary.netQuantity;

  inspection.aiAnalyzedAt =
    summary.analyzedAt;

  inspection.aiAnalysisVersion =
    summary.analysisVersion;


  // ----------------------------------------------------------
  // IMAGE QUALITY
  // ----------------------------------------------------------

  inspection.qualityWarnings =
    qualitySummary.qualityWarnings;

  inspection.imageQuality =
    qualitySummary.imageQuality;


  // ----------------------------------------------------------
  // If AI detected product name,
  // use it instead of manually entered name.
  // ----------------------------------------------------------

  if (
    summary.productName &&
    summary.productName.length >= 2 &&
    !/^(unknown|not clearly detected|not detected)$/i.test(
      summary.productName
    )
  ) {
    inspection.commodityName =
      summary.productName;
  }


  console.log(
    '💾 AI SUMMARY SAVED'
  );

  console.log(
    `   AI Confidence       : ${summary.aiConfidence}%`
  );

  console.log(
    `   Extraction Coverage : ${summary.extractionCoverage}%`
  );

  console.log(
    `   Product             : ${
      summary.productName ||
      'Not Clearly Detected'
    }`
  );

  console.log(
    `   Manufacturer        : ${
      summary.manufacturer ||
      'Not Clearly Detected'
    }`
  );

  console.log(
    `   MRP                 : ${
      summary.mrp ||
      'Not Clearly Detectable'
    }`
  );

  console.log(
    `   Net Quantity        : ${
      summary.netQuantity ||
      'Not Clearly Detectable'
    }`
  );


  // ----------------------------------------------------------
  // IMAGE QUALITY LOGGING
  // ----------------------------------------------------------

  console.log(
    `   Quality Warnings    : ${
      qualitySummary.qualityWarnings.length
    }`
  );

  console.log(
    `   Images Analyzed     : ${
      qualitySummary.imageQuality.length
    }`
  );


  qualitySummary.imageQuality.forEach(
    (quality, index) => {
      console.log(
        `   Image ${index + 1} Quality : ${
          quality?.quality_level ||
          'UNKNOWN'
        }`
      );

      console.log(
        `   Image ${index + 1} Blur    : ${
          quality?.blur_detected
            ? 'YES'
            : 'NO'
        }`
      );

      console.log(
        `   Image ${index + 1} Glare   : ${
          quality?.glare_detected
            ? 'YES'
            : 'NO'
        }`
      );

      console.log(
        `   Image ${index + 1} Passed  : ${
          quality?.passed
            ? 'YES'
            : 'NO'
        }`
      );
    }
  );


  return summary;
};


// ============================================================
// CREATE NEW INSPECTION
// ============================================================
// @route   POST /api/inspections
// @access  Private

exports.createInspection = async (
  req,
  res,
  next
) => {
  try {
    console.log(
      '📝 Creating new inspection...'
    );

    console.log(
      'Request body:',
      req.body
    );


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
    if (
      !location ||
      !location.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Inspection location is required'
      });
    }


    // Validate authenticated user
    if (
      !req.user ||
      !req.user._id
    ) {
      return res.status(401).json({
        success: false,
        message:
          'User authentication information is missing'
      });
    }


    // Generate custom inspection ID
    const inspectionId =
      `INS-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;


    const inspection =
      await Inspection.create({
        inspectionId,

        officerId:
          req.user._id,

        location:
          location.trim(),

        productId:
          productId || null,

        officerRemarks:
          officerRemarks ||
          remarks ||
          '',

        inspectionType:
          inspectionType ||
          'ROUTINE_CHECK',

        productCategory:
          productCategory ||
          '',

        commodityName:
          commodityName ||
          ''
      });


    console.log(
      '✅ Inspection created:',
      inspection.inspectionId
    );


    res.status(201).json({
      success: true,

      message:
        'Inspection created successfully',

      data:
        inspection
    });

  } catch (error) {
    console.error(
      '❌ Create inspection error:',
      error
    );


    if (
      error.code === 11000
    ) {
      return res.status(409).json({
        success: false,

        message:
          'Inspection ID already exists. Please try again.'
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

exports.getInspections = async (
  req,
  res,
  next
) => {
  try {
    console.log(
      '📋 Loading inspections...'
    );

    console.log(
      'Query:',
      req.query
    );


    const limit =
      Math.min(
        parseInt(
          req.query.limit,
          10
        ) || 10,
        100
      );


    const sortQuery =
      req.query.sort ||
      '-createdAt';


    let sort = {};


    if (
      sortQuery.startsWith('-')
    ) {
      sort[
        sortQuery.substring(1)
      ] = -1;

    } else {
      sort[
        sortQuery
      ] = 1;
    }


    const inspections =
      await Inspection.find({
        officerId:
          req.user._id
      })
        .populate(
          'officerId',
          'name email'
        )
        .populate(
          'productId',
          'productName manufacturer'
        )
        .sort(sort)
        .limit(limit);


    console.log(
      `✅ Loaded ${inspections.length} inspections`
    );


    res.status(200).json({
      success: true,

      count:
        inspections.length,

      data:
        inspections
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

exports.getInspectionById = async (
  req,
  res,
  next
) => {
  try {
    console.log(
      '🔍 Loading inspection:',
      req.params.id
    );


    const inspection =
      await Inspection.findOne({
        inspectionId:
          req.params.id,

        officerId:
          req.user._id
      })
        .populate(
          'officerId',
          'name email'
        )
        .populate(
          'productId'
        )
        .populate(
          'images'
        )
        .populate(
          'declarations'
        )
        .populate(
          'violations'
        );


    if (!inspection) {
      return res.status(404).json({
        success: false,
        message:
          'Inspection not found'
      });
    }


    res.status(200).json({
      success: true,
      data:
        inspection
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

exports.uploadImage = async (
  req,
  res,
  next
) => {
  try {
    console.log(
      '📷 Uploading image for inspection:',
      req.params.id
    );


    const inspection =
      await Inspection.findOne({
        inspectionId:
          req.params.id,

        officerId:
          req.user._id
      });


    if (!inspection) {
      return res.status(404).json({
        success: false,
        message:
          'Inspection not found'
      });
    }


    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          'No image file provided'
      });
    }


    const {
      angle
    } = req.body;


    const image =
      await Image.create({
        inspectionId:
          inspection._id,

        imageUrl:
          `/uploads/${req.file.filename}`,

        filename:
          req.file.filename,

        mimeType:
          req.file.mimetype,

        angle:
          angle ||
          'UNKNOWN'
      });


    inspection.images.push(
      image._id
    );


    await inspection.save();


    console.log(
      '✅ Image uploaded:',
      image.filename
    );


    res.status(201).json({
      success: true,

      message:
        'Image uploaded successfully',

      data:
        image
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
      '================================================'
    );

    console.log(
      '🤖 Starting AI analysis:',
      req.params.id
    );

    console.log(
      '================================================'
    );


    // ========================================================
    // FIND INSPECTION
    // ========================================================

    inspection =
      await Inspection.findOne({
        inspectionId:
          req.params.id,

        officerId:
          req.user._id
      });


    if (!inspection) {
      return res.status(404).json({
        success: false,
        message:
          'Inspection not found'
      });
    }


    // ========================================================
    // PREVENT DUPLICATE / CONCURRENT ANALYSIS
    // ========================================================

    if (
      inspection.status ===
      'PROCESSING'
    ) {
      console.log(
        '⏭️ Analysis already running for:',
        inspection.inspectionId
      );


      return res.status(409).json({
        success: false,

        message:
          'Analysis is already in progress for this inspection.',

        data: {
          inspectionId:
            inspection.inspectionId,

          status:
            inspection.status
        }
      });
    }


    // ========================================================
    // MARK AS PROCESSING
    // ========================================================

    inspection.status =
      'PROCESSING';


    await inspection.save();


    console.log(
      '🔄 Inspection status: PROCESSING'
    );


    // ========================================================
    // REMOVE PREVIOUS AI RESULTS
    // ========================================================

    console.log(
      '🧹 Removing previous AI results...'
    );


    await Violation.deleteMany({
      inspectionId:
        inspection._id
    });


    await Declaration.deleteMany({
      inspectionId:
        inspection._id
    });


    inspection.declarations =
      [];

    inspection.violations =
      [];


    await inspection.save();


    console.log(
      '✅ Previous AI results cleared'
    );


    // ========================================================
    // AI SERVICE
    // ========================================================

    console.log(
      '📡 Sending images to LegalScan AI...'
    );


    const aiResult =
      await aiService.analyzeImages(
        inspection
      );


    console.log(
      '🤖 AI result received'
    );


    console.log(
      '📊 AI violations:',
      Array.isArray(
        aiResult?.violations
      )
        ? aiResult.violations.length
        : 0
    );


    console.log(
      '📊 AI declarations:',
      Array.isArray(
        aiResult?.declarations
      )
        ? aiResult.declarations.length
        : 0
    );


    // ========================================================
    // SAVE AI SUMMARY / CONFIDENCE
    // ========================================================

    const aiSummary =
      await persistAISummary(
        inspection,
        aiResult
      );


    // ========================================================
    // SAVE DECLARATIONS
    // ========================================================

    if (
      aiResult &&
      Array.isArray(
        aiResult.declarations
      ) &&
      aiResult.declarations.length > 0
    ) {
      console.log(
        '💾 Saving declarations...'
      );


      for (
        const dec of
        aiResult.declarations
      ) {
        const newDeclaration =
          await Declaration.create({
            inspectionId:
              inspection._id,

            field:
              dec.field ||
              'Unknown',

            value:
              dec.value ||
              '',

            confidence:
              Number(
                dec.confidence
              ) || 0,

            verificationStatus:
              'AI_DETECTED'
          });


        inspection.declarations.push(
          newDeclaration._id
        );
      }


      console.log(
        `✅ Saved ${inspection.declarations.length} declarations`
      );

    } else {
      console.log(
        'ℹ️ No declarations detected by AI'
      );
    }


  // ========================================================
// SAVE VIOLATIONS - DUPLICATE SAFE
// ========================================================

// ========================================================
// SAVE VIOLATIONS - REQUIREMENT LEVEL DEDUPLICATION
// ========================================================

// Get AI violations safely
const rawViolations = Array.isArray(
  aiResult?.violations
)
  ? aiResult.violations
  : [];

console.log(
  '📊 Raw AI violations:',
  rawViolations.length
);


// --------------------------------------------------------
// REMOVE IMAGE QUALITY FINDINGS
// Image-quality findings are NOT Legal Metrology
// violations.
// --------------------------------------------------------

const legalViolations =
  rawViolations.filter((viol) => {

    const ruleId = String(
      viol?.rule_id || ''
    )
      .trim()
      .toUpperCase();

    if (
      ruleId.startsWith('IQA-') ||
      ruleId.startsWith('IMAGE_QUALITY') ||
      ruleId.startsWith('IMAGE-QUALITY')
    ) {
      return false;
    }

    return true;
  });

console.log(
  '⚖️ Legal violations after IQA filter:',
  legalViolations.length
);


// ========================================================
// REQUIREMENT LEVEL DEDUPLICATION
// ========================================================
//
// Multiple AI rules may describe the same underlying
// requirement:
//
// MRP
// NET QUANTITY
// MANUFACTURER / PACKER / IMPORTER
// CONSUMER CARE
// DATE
//
// We keep only ONE finding for each requirement.
// ========================================================

const groupedViolations = {};

for (const viol of legalViolations) {

  const ruleId = String(
    viol?.rule_id || ''
  )
    .trim()
    .toUpperCase();

  const field = String(
    viol?.field || ''
  )
    .trim()
    .toLowerCase();

  const requirementText = String(
    viol?.requirement || ''
  )
    .trim()
    .toLowerCase();

  const combinedText = (
    `${ruleId} ${field} ${requirementText}`
  ).toLowerCase();


  // ------------------------------------------------------
  // DETERMINE CANONICAL REQUIREMENT
  // ------------------------------------------------------

  let requirementKey = 'OTHER';

  let canonicalField = field || 'general';


  // MRP
  if (
    combinedText.includes('mrp') ||
    combinedText.includes(
      'maximum retail price'
    ) ||
    combinedText.includes(
      'retail price'
    )
  ) {

    requirementKey = 'MRP';
    canonicalField = 'mrp';
  }


  // NET QUANTITY
  else if (
    combinedText.includes(
      'net quantity'
    ) ||
    combinedText.includes(
      'net weight'
    ) ||
    combinedText.includes(
      'net volume'
    )
  ) {

    requirementKey =
      'NET_QUANTITY';

    canonicalField =
      'net_quantity';
  }


  // MANUFACTURER / PACKER / IMPORTER
  else if (
    combinedText.includes(
      'manufacturer'
    ) ||
    combinedText.includes(
      'packer'
    ) ||
    combinedText.includes(
      'importer'
    )
  ) {

    requirementKey =
      'MANUFACTURER';

    canonicalField =
      'manufacturer';
  }


  // CONSUMER CARE
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
    )
  ) {

    requirementKey =
      'CONSUMER_CARE';

    canonicalField =
      'consumer_care';
  }


  // DATE
  else if (
    combinedText.includes(
      'month'
    ) ||
    combinedText.includes(
      'year'
    ) ||
    combinedText.includes(
      'manufacturing date'
    ) ||
    combinedText.includes(
      'packing date'
    ) ||
    combinedText.includes(
      'date of manufacture'
    )
  ) {

    requirementKey =
      'DATE';

    canonicalField =
      'date';
  }


  // ------------------------------------------------------
  // LOG GROUPING
  // ------------------------------------------------------

  console.log(
    `🔎 ${ruleId} / ${field} → ${requirementKey}`
  );


  // ------------------------------------------------------
  // KEEP ONLY ONE FINDING PER REQUIREMENT
  //
  // If multiple findings belong to the same requirement,
  // keep the one with the highest confidence.
  // ------------------------------------------------------

  const existing =
    groupedViolations[
      requirementKey
    ];

  if (!existing) {

    groupedViolations[
      requirementKey
    ] = {
      ...viol,
      rule_id: ruleId,
      field: canonicalField
    };

    continue;
  }


  const existingConfidence =
    Number(
      existing.confidence
    ) || 0;

  const currentConfidence =
    Number(
      viol.confidence
    ) || 0;


  if (
    currentConfidence >
    existingConfidence
  ) {

    groupedViolations[
      requirementKey
    ] = {
      ...viol,
      rule_id: ruleId,
      field: canonicalField
    };
  }
}


// --------------------------------------------------------
// FINAL UNIQUE VIOLATIONS
// --------------------------------------------------------

const uniqueViolations =
  Object.values(
    groupedViolations
  );


console.log(
  '✅ Unique legal violations:',
  uniqueViolations.length
);

console.log(
  '📋 Unique violation requirements:',
  uniqueViolations.map(
    (v) =>
      `${v.rule_id} / ${v.field}`
  )
);


// ========================================================
// SAVE ONLY UNIQUE VIOLATIONS
// ========================================================

inspection.violations = [];


for (
  const viol of
  uniqueViolations
) {

  const ruleId = String(
    viol?.rule_id ||
    'UNKNOWN'
  )
    .trim()
    .toUpperCase();


  const field = String(
    viol?.field ||
    'general'
  )
    .trim()
    .toLowerCase();


  const newViolation =
    await Violation.create({

      ruleId,

      inspectionId:
        inspection._id,

      field,

      requirement:
        viol?.requirement ||
        'Must comply with Legal Metrology rules',

      detectedValue:
        viol?.detected_value ||
        '',

      expectedValue:
        viol?.expected_value ||
        '',

      severity:
        String(
          viol?.severity ||
          'MEDIUM'
        ).toUpperCase(),

      confidence:
        Number(
          viol?.confidence
        ) || 0,

      status:
        'AI_DETECTED'

    });


  inspection.violations.push(
    newViolation._id
  );


  console.log(
    `💾 Saved violation: ${ruleId} / ${field}`
  );
}


// ========================================================
// FINAL COMPLIANCE STATUS
// ========================================================

const hasHighSeverity =
  uniqueViolations.some(
    (v) =>
      String(
        v?.severity || ''
      )
        .toUpperCase() ===
      'HIGH'
  );


const hasAnyViolation =
  uniqueViolations.length >
  0;


if (
  !hasAnyViolation
) {

  inspection.complianceStatus =
    'COMPLIANT';

} else if (
  hasHighSeverity
) {

  inspection.complianceStatus =
    'REQUIRES_REVIEW';

} else {

  inspection.complianceStatus =
    'POTENTIAL_VIOLATION';
}


console.log(
  '⚠️ Final violations saved:',
  inspection.violations.length
);

// --------------------------------------------------------
// // SAVE ONLY UNIQUE VIOLATIONS
// // --------------------------------------------------------

// inspection.violations = [];

// for (const viol of uniqueViolations) {

//   const ruleId = String(
//     viol.rule_id
//   )
//     .trim()
//     .toUpperCase();

//   const field = String(
//     viol.field
//   )
//     .trim()
//     .toLowerCase();

//   const newViolation = await Violation.create({

//     ruleId,

//     inspectionId:
//       inspection._id,

//     field,

//     requirement:
//       viol.requirement ||
//       'Must comply with Legal Metrology rules',

//     detectedValue:
//       viol.detected_value || '',

//     expectedValue:
//       viol.expected_value || '',

//     severity:
//       String(
//         viol.severity || 'MEDIUM'
//       ).toUpperCase(),

//     confidence:
//       Number(viol.confidence) || 0,

//     status:
//       'AI_DETECTED'

//   });

//   inspection.violations.push(
//     newViolation._id
//   );

//   console.log(
//     `💾 Saved violation: ${ruleId} / ${field}`
//   );
// }


// // --------------------------------------------------------
// // COMPLIANCE STATUS
// // --------------------------------------------------------

// const hasHighSeverity =
//   uniqueViolations.some(
//     (v) =>
//       String(v.severity)
//         .toUpperCase() === 'HIGH'
//   );

// const hasAnyViolation =
//   uniqueViolations.length > 0;

// if (!hasAnyViolation) {

//   inspection.complianceStatus =
//     'COMPLIANT';

// } else if (hasHighSeverity) {

//   inspection.complianceStatus =
//     'REQUIRES_REVIEW';

// } else {

//   inspection.complianceStatus =
//     'POTENTIAL_VIOLATION';
// }

// console.log(
//   '⚠️ Final violations saved:',
//   inspection.violations.length
// );

      
    // ========================================================
    // COMPLETE ANALYSIS
    // ========================================================

    inspection.status =
      'UNDER_REVIEW';


    await inspection.save();


    console.log(
      '================================================'
    );

    console.log(
      '✅ AI ANALYSIS COMPLETED'
    );

    console.log(
      '🆔 Inspection:',
      inspection.inspectionId
    );

    console.log(
      '📋 Declarations:',
      inspection.declarations.length
    );

    console.log(
      '⚠️ Legal Violations:',
      inspection.violations.length
    );

    console.log(
      '📌 Compliance:',
      inspection.complianceStatus
    );

    console.log(
      '📌 Status:',
      inspection.status
    );

    console.log(
      '================================================'
    );


    // ========================================================
    // FINAL RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,

      message:
        'Analysis completed successfully',

      data: {
        ...inspection.toObject(),

        ai: {
          confidence:
            aiSummary?.aiConfidence ??
            inspection.aiConfidence ??
            0,

          extractionCoverage:
            aiSummary?.extractionCoverage ??
            inspection.extractionCoverage ??
            0,

          productName:
            aiSummary?.productName ??
            inspection.aiProductName ??
            '',

          manufacturer:
            aiSummary?.manufacturer ??
            inspection.aiManufacturer ??
            '',

          mrp:
            aiSummary?.mrp ??
            inspection.aiMRP ??
            '',

          netQuantity:
            aiSummary?.netQuantity ??
            inspection.aiNetQuantity ??
            '',

          declarationCount:
            aiSummary?.declarationCount ??
            inspection.declarations.length,

          findingCount:
            inspection.violations.length,

          analyzedAt:
            aiSummary?.analyzedAt ??
            inspection.aiAnalyzedAt,

          version:
            aiSummary?.analysisVersion ??
            inspection.aiAnalysisVersion ??
            'LegalScan-AI-1.0',

          qualityWarnings:
            inspection.qualityWarnings ||
            [],

          imageQuality:
            inspection.imageQuality ||
            []
        }
      }
    });

  } catch (error) {
    console.error(
      '================================================'
    );

    console.error(
      '❌ AI ANALYSIS ERROR'
    );

    console.error(
      error
    );

    console.error(
      '================================================'
    );


    // ========================================================
    // ROLLBACK STATUS
    // ========================================================

    try {
      if (!inspection) {
        inspection =
          await Inspection.findOne({
            inspectionId:
              req.params.id
          });
      }


      if (inspection) {
        inspection.status =
          'DRAFT';


        await inspection.save();


        console.log(
          '🔄 Inspection status rolled back to DRAFT'
        );
      }

    } catch (
      rollbackError
    ) {
      console.error(
        '❌ Failed to rollback inspection status:',
        rollbackError
      );
    }


    next(error);
  }
};
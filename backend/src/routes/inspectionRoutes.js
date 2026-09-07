// // const express = require('express');
// // const router = express.Router();
// // const upload = require('../middleware/uploadMiddleware');
// // const { protect } = require('../middleware/authMiddleware');
// // const {
// //   createInspection,
// //   getInspections,
// //   getInspectionById,
// //   uploadImage,
// //   analyzeInspection
// // } = require('../controllers/inspectionController');

// // router.route('/')
// //   .post(protect, createInspection)
// //   .get(protect, getInspections);

// // router.route('/:id')
// //   .get(protect, getInspectionById);

// // router.post('/:id/images', protect, upload.single('image'), uploadImage);
// // router.post('/:id/analyze', protect, analyzeInspection);

// // module.exports = router;


// const express = require('express');

// const router = express.Router();

// const upload = require('../middleware/uploadMiddleware');
// const { protect } = require('../middleware/authMiddleware');

// const {
//   createInspection,
//   getInspections,
//   getInspectionById,
//   uploadImage,
//   analyzeInspection
// } = require('../controllers/inspectionController');

// // GET all inspections
// // POST new inspection
// router
//   .route('/')
//   .get(protect, getInspections)
//   .post(protect, createInspection);

// // GET inspection by ID
// router
//   .route('/:id')
//   .get(protect, getInspectionById);

// // Upload inspection image
// router.post(
//   '/:id/images',
//   protect,
//   upload.single('image'),
//   uploadImage
// );

// // Start AI analysis
// router.post(
//   '/:id/analyze',
//   protect,
//   analyzeInspection
// );

// module.exports = router;


const express = require('express');

const router = express.Router();

const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

const {
  createInspection,
  getInspections,
  getInspectionById,
  uploadImage,
  analyzeInspection
} = require('../controllers/inspectionController');

router.get('/', protect, getInspections);

router.post('/', protect, createInspection);

router.get('/:id', protect, getInspectionById);

router.post(
  '/:id/images',
  protect,
  upload.single('image'),
  uploadImage
);

router.post(
  '/:id/analyze',
  protect,
  analyzeInspection
);

module.exports = router;
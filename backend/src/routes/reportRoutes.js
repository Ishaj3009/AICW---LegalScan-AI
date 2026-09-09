// // const express = require('express');
// // const router = express.Router();
// // const { generateReport } = require('../controllers/reportController');
// // const { protect } = require('../middleware/authMiddleware');

// // router.post('/:inspectionId/generate', protect, generateReport);

// // module.exports = router;


// const express = require('express');

// const {
//   generateReport
// } = require('../controllers/reportController');

// const router = express.Router();


// // Generate inspection report
// router.post(
//   '/:inspectionId/generate',
//   generateReport
// );


// module.exports = router;

const express = require('express');

const {
  generateReport,
  getReport,
  getReportsByInspection,
  getAllReports
} = require('../controllers/reportController');

const router = express.Router();


// ============================================================
// GET ALL REPORTS
// GET /api/reports
// ============================================================

router.get(
  '/',
  getAllReports
);


// ============================================================
// GET REPORTS FOR INSPECTION
// GET /api/reports/inspection/:inspectionId
// ============================================================

router.get(
  '/inspection/:inspectionId',
  getReportsByInspection
);


// ============================================================
// GET SINGLE REPORT
// GET /api/reports/:reportId
// ============================================================

router.get(
  '/:reportId',
  getReport
);


// ============================================================
// GENERATE REPORT
// POST /api/reports/:inspectionId/generate
// ============================================================

router.post(
  '/:inspectionId/generate',
  generateReport
);


module.exports = router;
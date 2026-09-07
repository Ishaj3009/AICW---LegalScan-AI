// // const Inspection = require('../models/Inspection');
// // const Violation = require('../models/Violation');

// // // @desc    Get dashboard metrics
// // // @route   GET /api/analytics/dashboard
// // // @access  Private
// // exports.getDashboardStats = async (req, res, next) => {
// //   try {
// //     const totalInspections = await Inspection.countDocuments();
// //     const compliantCount = await Inspection.countDocuments({ complianceStatus: 'COMPLIANT' });
// //     const potentialViolationsCount = await Inspection.countDocuments({ complianceStatus: 'POTENTIAL_VIOLATION' });
// //     const pendingReviewsCount = await Inspection.countDocuments({ complianceStatus: 'REQUIRES_REVIEW' });

// //     res.json({
// //       success: true,
// //       data: {
// //         totalInspections,
// //         compliantCount,
// //         potentialViolationsCount,
// //         pendingReviewsCount
// //       }
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // // @desc    Get violation analytics
// // // @route   GET /api/analytics/violations
// // // @access  Private
// // exports.getViolationAnalytics = async (req, res, next) => {
// //   try {
// //     const violationsBySeverity = await Violation.aggregate([
// //       { $group: { _id: '$severity', count: { $sum: 1 } } }
// //     ]);
    
// //     const topViolatedRules = await Violation.aggregate([
// //       { $group: { _id: '$ruleId', count: { $sum: 1 } } },
// //       { $sort: { count: -1 } },
// //       { $limit: 5 }
// //     ]);

// //     res.json({
// //       success: true,
// //       data: {
// //         violationsBySeverity,
// //         topViolatedRules
// //       }
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };


// const Inspection = require('../models/Inspection');
// const Violation = require('../models/Violation');

// // @desc    Get dashboard metrics
// // @route   GET /api/analytics/dashboard
// // @access  Private
// exports.getDashboardStats = async (req, res, next) => {
//   try {
//     console.log('📊 Loading dashboard analytics...');

//     const totalInspections = await Inspection.countDocuments();

//     const compliantCount = await Inspection.countDocuments({
//       complianceStatus: 'COMPLIANT'
//     });

//     const potentialViolationsCount = await Inspection.countDocuments({
//       complianceStatus: 'POTENTIAL_VIOLATION'
//     });

//     const pendingReviewsCount = await Inspection.countDocuments({
//       complianceStatus: 'REQUIRES_REVIEW'
//     });

//     const responseData = {
//       totalInspections,
//       compliantCount,
//       potentialViolationsCount,
//       pendingReviewsCount
//     };

//     console.log('✅ Dashboard analytics loaded:', responseData);

//     res.status(200).json({
//       success: true,
//       data: responseData
//     });

//   } catch (error) {
//     console.error('❌ Dashboard analytics error:', error);

//     res.status(500).json({
//       success: false,
//       message: 'Failed to load dashboard analytics',
//       error: error.message
//     });
//   }
// };


// // @desc    Get violation analytics
// // @route   GET /api/analytics/violations
// // @access  Private
// exports.getViolationAnalytics = async (req, res, next) => {
//   try {
//     console.log('📊 Loading violation analytics...');

//     const violationsBySeverity = await Violation.aggregate([
//       {
//         $group: {
//           _id: '$severity',
//           count: {
//             $sum: 1
//           }
//         }
//       },
//       {
//         $sort: {
//           count: -1
//         }
//       }
//     ]);

//     const topViolatedRules = await Violation.aggregate([
//       {
//         $group: {
//           _id: '$ruleId',
//           count: {
//             $sum: 1
//           }
//         }
//       },
//       {
//         $sort: {
//           count: -1
//         }
//       },
//       {
//         $limit: 5
//       }
//     ]);

//     const responseData = {
//       violationsBySeverity,
//       topViolatedRules
//     };

//     console.log('✅ Violation analytics loaded:', responseData);

//     res.status(200).json({
//       success: true,
//       data: responseData
//     });

//   } catch (error) {
//     console.error('❌ Violation analytics error:', error);

//     res.status(500).json({
//       success: false,
//       message: 'Failed to load violation analytics',
//       error: error.message
//     });
//   }
// };

const Inspection = require('../models/Inspection');
const Violation = require('../models/Violation');

// ============================================================
// GET DASHBOARD METRICS
// GET /api/analytics/dashboard
// Access: Private
// ============================================================

exports.getDashboardStats = async (req, res, next) => {
  try {
    console.log('📊 Loading dashboard analytics...');

    // --------------------------------------------------------
    // BASIC INSPECTION COUNTS
    // --------------------------------------------------------

    const totalInspections =
      await Inspection.countDocuments();

    const compliantCount =
      await Inspection.countDocuments({
        complianceStatus: 'COMPLIANT'
      });

    const potentialViolationsCount =
      await Inspection.countDocuments({
        complianceStatus: 'POTENTIAL_VIOLATION'
      });

    const pendingReviewsCount =
      await Inspection.countDocuments({
        complianceStatus: 'REQUIRES_REVIEW'
      });


    // --------------------------------------------------------
    // COMPLIANCE RATE
    // --------------------------------------------------------

    const complianceRate =
      totalInspections > 0
        ? Math.round(
            (compliantCount / totalInspections) * 100
          )
        : 0;


    // --------------------------------------------------------
    // WEEKLY ENFORCEMENT TRENDS
    // --------------------------------------------------------
    // Get inspections from the last 7 days
    // and group them by date.
    // --------------------------------------------------------

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 6
    );

    sevenDaysAgo.setHours(0, 0, 0, 0);


    const trends = await Inspection.aggregate([

      // Only inspections from last 7 days
      {
        $match: {
          createdAt: {
            $gte: sevenDaysAgo
          }
        }
      },

      // Group by date
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },

          // Count compliant inspections
          compliant: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    '$complianceStatus',
                    'COMPLIANT'
                  ]
                },
                1,
                0
              ]
            }
          },

          // Count potential violations
          violations: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    '$complianceStatus',
                    'POTENTIAL_VIOLATION'
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },

      // Sort dates
      {
        $sort: {
          _id: 1
        }
      }
    ]);


    // --------------------------------------------------------
    // FORMAT DATA FOR FRONTEND / RECHARTS
    // --------------------------------------------------------

    const formattedTrends =
      trends.map((item) => ({
        name: item._id,
        compliant: item.compliant,
        violations: item.violations
      }));


    // --------------------------------------------------------
    // FINAL RESPONSE
    // --------------------------------------------------------

    const responseData = {

      totalInspections,

      compliantCount,

      potentialViolationsCount,

      pendingReviewsCount,

      complianceRate,

      trends: formattedTrends

    };


    console.log(
      '✅ Dashboard analytics loaded:',
      responseData
    );


    res.status(200).json({
      success: true,
      data: responseData
    });


  } catch (error) {

    console.error(
      '❌ Dashboard analytics error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard analytics',
      error: error.message
    });

  }
};


// ============================================================
// GET VIOLATION ANALYTICS
// GET /api/analytics/violations
// Access: Private
// ============================================================

exports.getViolationAnalytics = async (
  req,
  res,
  next
) => {

  try {

    console.log(
      '📊 Loading violation analytics...'
    );


    // --------------------------------------------------------
    // VIOLATIONS BY SEVERITY
    // --------------------------------------------------------

    const violationsBySeverity =
      await Violation.aggregate([

        {
          $group: {

            _id: '$severity',

            count: {
              $sum: 1
            }

          }
        },

        {
          $sort: {
            count: -1
          }
        }

      ]);


    // --------------------------------------------------------
    // TOP VIOLATED RULES
    // --------------------------------------------------------

    const topViolatedRules =
      await Violation.aggregate([

        {
          $group: {

            _id: '$ruleId',

            count: {
              $sum: 1
            }

          }
        },

        {
          $sort: {
            count: -1
          }
        },

        {
          $limit: 5
        }

      ]);


    // --------------------------------------------------------
    // FINAL RESPONSE
    // --------------------------------------------------------

    const responseData = {

      violationsBySeverity,

      topViolatedRules

    };


    console.log(
      '✅ Violation analytics loaded:',
      responseData
    );


    res.status(200).json({

      success: true,

      data: responseData

    });


  } catch (error) {

    console.error(
      '❌ Violation analytics error:',
      error
    );


    res.status(500).json({

      success: false,

      message:
        'Failed to load violation analytics',

      error: error.message

    });

  }
};
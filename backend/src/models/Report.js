// // const mongoose = require('mongoose');

// // const reportSchema = new mongoose.Schema(
// //   {
// //     reportId: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //       index: true
// //     },

// //     inspectionId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'Inspection',
// //       required: true,
// //       index: true
// //     },

// //     inspectionNumber: {
// //       type: String,
// //       required: true,
// //       index: true
// //     },

// //     reportType: {
// //       type: String,
// //       enum: ['COMPLIANCE', 'VIOLATION', 'INSPECTION'],
// //       default: 'INSPECTION'
// //     },

// //     complianceStatus: {
// //       type: String,
// //       enum: [
// //         'COMPLIANT',
// //         'POTENTIAL_VIOLATION',
// //         'REQUIRES_REVIEW',
// //         'UNDER_REVIEW'
// //       ],
// //       default: 'REQUIRES_REVIEW'
// //     },

// //     pdfFileName: {
// //       type: String,
// //       default: ''
// //     },

// //     pdfPath: {
// //       type: String,
// //       default: ''
// //     },

// //     pdfUrl: {
// //       type: String,
// //       default: ''
// //     },

// //     generatedBy: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'User'
// //     },

// //     generatedAt: {
// //       type: Date,
// //       default: Date.now
// //     }
// //   },
// //   {
// //     timestamps: true
// //   }
// // );

// // module.exports = mongoose.model('Report', reportSchema);

// const mongoose = require('mongoose');

// const reportSchema = new mongoose.Schema(
//   {
//     reportId: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true
//     },

//     inspectionId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Inspection',
//       required: true,
//       index: true
//     },

//     inspectionNumber: {
//       type: String,
//       required: true,
//       index: true
//     },

//     reportType: {
//       type: String,
//       enum: ['INSPECTION', 'COMPLIANCE', 'VIOLATION'],
//       default: 'INSPECTION'
//     },

//     complianceStatus: {
//       type: String,
//       enum: [
//         'COMPLIANT',
//         'POTENTIAL_VIOLATION',
//         'REQUIRES_REVIEW'
//       ],
//       default: 'REQUIRES_REVIEW'
//     },

//     pdfFileName: {
//       type: String,
//       default: ''
//     },

//     pdfPath: {
//       type: String,
//       default: ''
//     },

//     pdfUrl: {
//       type: String,
//       default: ''
//     },

//     generatedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User'
//     },

//     generatedAt: {
//       type: Date,
//       default: Date.now
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// module.exports = mongoose.model('Report', reportSchema);

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    inspectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inspection',
      required: true,
      index: true
    },

    inspectionNumber: {
      type: String,
      required: true,
      index: true
    },

    reportType: {
      type: String,
      enum: [
        'INSPECTION',
        'COMPLIANCE',
        'VIOLATION'
      ],
      default: 'INSPECTION'
    },

    complianceStatus: {
      type: String,
      enum: [
        'COMPLIANT',
        'POTENTIAL_VIOLATION',
        'REQUIRES_REVIEW'
      ],
      default: 'REQUIRES_REVIEW'
    },

    pdfFileName: {
      type: String,
      default: ''
    },

    pdfPath: {
      type: String,
      default: ''
    },

    pdfUrl: {
      type: String,
      default: ''
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    generatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  'Report',
  reportSchema
);
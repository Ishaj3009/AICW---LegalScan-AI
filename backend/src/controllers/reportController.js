// // // const PDFDocument = require('pdfkit');
// // // const fs = require('fs');
// // // const path = require('path');
// // // const Inspection = require('../models/Inspection');

// // // exports.generateReport = async (req, res) => {
// // //   try {
// // //     const inspectionId = req.params.inspectionId;
// // //    const inspection = await Inspection.findOne({
// // //   inspectionId: inspectionId
// // // })
// // //       .populate('productId')
// // //       .populate('violations');

// // //     if (!inspection) {
// // //       return res.status(404).json({ success: false, message: 'Inspection not found' });
// // //     }

// // //     const reportsDir = path.join(__dirname, '../../../reports');
// // //     if (!fs.existsSync(reportsDir)) {
// // //       fs.mkdirSync(reportsDir, { recursive: true });
// // //     }

// // //     const reportName = `Report-${inspection.inspectionId}.pdf`;
// // //     const reportPath = path.join(reportsDir, reportName);

// // //     const doc = new PDFDocument();
// // //     doc.pipe(fs.createWriteStream(reportPath));

// // //     doc.fontSize(20).text('LEGALSCAN AI', { align: 'center' });
// // //     doc.fontSize(16).text('LEGAL METROLOGY INSPECTION REPORT', { align: 'center' });
// // //     doc.moveDown();

// // //     doc.fontSize(12).text(`Inspection ID: ${inspection.inspectionId}`);
// // //     doc.text(`Date: ${inspection.inspectionDate}`);
// // //     doc.text(`Location: ${inspection.location}`);
// // //     doc.moveDown();

// // //     doc.fontSize(14).text('PRODUCT INFORMATION');
// // //     if (inspection.productId) {
// // //       doc.fontSize(12).text(`Name: ${inspection.productId.productName}`);
// // //       doc.text(`Brand: ${inspection.productId.brand}`);
// // //     }
// // //     doc.moveDown();

// // //     doc.fontSize(14).text('POTENTIAL VIOLATIONS');
// // //     inspection.violations.forEach((v, index) => {
// // //       doc.fontSize(12).text(`${index + 1}. [${v.severity}] ${v.ruleId} - ${v.requirement}`);
// // //       doc.text(`Detected: ${v.detectedValue}, Status: ${v.status}`);
// // //       doc.moveDown();
// // //     });

// // //     doc.end();

// // //     res.json({ success: true, data: { pdfUrl: `/reports/${reportName}` } });
// // //   } catch (error) {
// // //     res.status(500).json({ success: false, message: error.message });
// // //   }
// // // };


// // const PDFDocument = require('pdfkit');
// // const fs = require('fs');
// // const path = require('path');

// // const Inspection = require('../models/Inspection');
// // const Report = require('../models/Report');


// // // ============================================================
// // // GENERATE REPORT
// // // POST /api/reports/:inspectionId/generate
// // // ============================================================

// // exports.generateReport = async (req, res) => {
// //   try {
// //     const inspectionNumber = req.params.inspectionId;

// //     console.log('');
// //     console.log('==============================================');
// //     console.log('📄 GENERATING LEGALSCAN REPORT');
// //     console.log('==============================================');
// //     console.log('Inspection:', inspectionNumber);


// //     // ----------------------------------------------------------
// //     // FIND INSPECTION USING CUSTOM INSPECTION ID
// //     // ----------------------------------------------------------

// //     const inspection = await Inspection.findOne({
// //       inspectionId: inspectionNumber
// //     })
// //       .populate('officerId', 'name email employeeId department')
// //       .populate('productId')
// //       .populate({
// //         path: 'images'
// //       })
// //       .populate({
// //         path: 'declarations'
// //       })
// //       .populate({
// //         path: 'violations',
// //         populate: {
// //           path: 'evidenceId'
// //         }
// //       });


// //     if (!inspection) {
// //       console.log('❌ Inspection not found');

// //       return res.status(404).json({
// //         success: false,
// //         message: `Inspection ${inspectionNumber} not found`
// //       });
// //     }


// //     console.log('✅ Inspection found');
// //     console.log('Images:', inspection.images?.length || 0);
// //     console.log('Declarations:', inspection.declarations?.length || 0);
// //     console.log('Violations:', inspection.violations?.length || 0);


// //     // ----------------------------------------------------------
// //     // REPORT DIRECTORY
// //     // ----------------------------------------------------------

// //     const reportsDir = path.resolve(
// //       __dirname,
// //       '../../../reports'
// //     );

// //     if (!fs.existsSync(reportsDir)) {
// //       fs.mkdirSync(reportsDir, {
// //         recursive: true
// //       });
// //     }


// //     // ----------------------------------------------------------
// //     // GENERATE REPORT ID
// //     // ----------------------------------------------------------

// //     const reportId =
// //       `RPT-${new Date().getFullYear()}-${Date.now()
// //         .toString()
// //         .slice(-6)}`;


// //     const reportName =
// //       `Report-${inspection.inspectionId}.pdf`;

// //     const reportPath =
// //       path.join(reportsDir, reportName);


// //     // ----------------------------------------------------------
// //     // CREATE PDF
// //     // ----------------------------------------------------------

// //     const doc = new PDFDocument({
// //       size: 'A4',
// //       margin: 50
// //     });

// //     const stream =
// //       fs.createWriteStream(reportPath);

// //     doc.pipe(stream);


// //     // ----------------------------------------------------------
// //     // HEADER
// //     // ----------------------------------------------------------

// //     doc
// //       .fontSize(22)
// //       .font('Helvetica-Bold')
// //       .text(
// //         'LEGALSCAN AI',
// //         {
// //           align: 'center'
// //         }
// //       );

// //     doc
// //       .moveDown(0.3)
// //       .fontSize(15)
// //       .font('Helvetica')
// //       .text(
// //         'LEGAL METROLOGY INSPECTION REPORT',
// //         {
// //           align: 'center'
// //         }
// //       );

// //     doc.moveDown();

// //     doc
// //       .fontSize(10)
// //       .text(
// //         'AI-Assisted Packaged Commodity Compliance Inspection'
// //       );

// //     doc.moveDown();


// //     // ----------------------------------------------------------
// //     // REPORT DETAILS
// //     // ----------------------------------------------------------

// //     doc
// //       .fontSize(14)
// //       .font('Helvetica-Bold')
// //       .text('REPORT DETAILS');

// //     doc.moveDown(0.5);

// //     doc
// //       .fontSize(10)
// //       .font('Helvetica');

// //     doc.text(`Report ID: ${reportId}`);
// //     doc.text(`Inspection ID: ${inspection.inspectionId}`);
// //     doc.text(
// //       `Inspection Date: ${
// //         inspection.inspectionDate
// //           ? new Date(
// //               inspection.inspectionDate
// //             ).toLocaleDateString('en-IN')
// //           : '-'
// //       }`
// //     );

// //     doc.text(
// //       `Location: ${inspection.location || '-'}`
// //     );

// //     doc.text(
// //       `Inspection Type: ${
// //         inspection.inspectionType || '-'
// //       }`
// //     );

// //     doc.moveDown();


// //     // ----------------------------------------------------------
// //     // OFFICER
// //     // ----------------------------------------------------------

// //     doc
// //       .fontSize(14)
// //       .font('Helvetica-Bold')
// //       .text('INSPECTION OFFICER');

// //     doc.moveDown(0.5);

// //     doc
// //       .fontSize(10)
// //       .font('Helvetica');

// //     doc.text(
// //       `Name: ${
// //         inspection.officerId?.name || '-'
// //       }`
// //     );

// //     doc.text(
// //       `Employee ID: ${
// //         inspection.officerId?.employeeId || '-'
// //       }`
// //     );

// //     doc.text(
// //       `Department: ${
// //         inspection.officerId?.department || '-'
// //       }`
// //     );

// //     doc.moveDown();


// //     // ----------------------------------------------------------
// //     // PRODUCT INFORMATION
// //     // ----------------------------------------------------------

// //     doc
// //       .fontSize(14)
// //       .font('Helvetica-Bold')
// //       .text('PRODUCT INFORMATION');

// //     doc.moveDown(0.5);

// //     doc
// //       .fontSize(10)
// //       .font('Helvetica');

// //     doc.text(
// //       `Commodity Name: ${
// //         inspection.commodityName ||
// //         inspection.productId?.productName ||
// //         '-'
// //       }`
// //     );

// //     doc.text(
// //       `Category: ${
// //         inspection.productCategory ||
// //         '-'
// //       }`
// //     );

// //     if (inspection.productId) {
// //       doc.text(
// //         `Brand: ${
// //           inspection.productId.brand || '-'
// //         }`
// //       );
// //     }

// //     doc.moveDown();


// //     // ----------------------------------------------------------
// //     // COMPLIANCE STATUS
// //     // ----------------------------------------------------------

// //     doc
// //       .fontSize(14)
// //       .font('Helvetica-Bold')
// //       .text('COMPLIANCE STATUS');

// //     doc.moveDown(0.5);

// //     doc
// //       .fontSize(12)
// //       .font('Helvetica-Bold')
// //       .text(
// //         inspection.complianceStatus ||
// //         'REQUIRES_REVIEW'
// //       );

// //     doc.moveDown();


// //     // ----------------------------------------------------------
// //     // DECLARATIONS
// //     // ----------------------------------------------------------

// //     doc
// //       .fontSize(14)
// //       .font('Helvetica-Bold')
// //       .text('DETECTED DECLARATIONS');

// //     doc.moveDown(0.5);

// //     if (
// //       inspection.declarations &&
// //       inspection.declarations.length > 0
// //     ) {

// //       inspection.declarations.forEach(
// //         (declaration, index) => {

// //           doc
// //             .fontSize(10)
// //             .font('Helvetica-Bold')
// //             .text(
// //               `${index + 1}. ${
// //                 declaration.field ||
// //                 declaration.name ||
// //                 'Declaration'
// //               }`
// //             );

// //           doc
// //             .font('Helvetica')
// //             .text(
// //               `Detected Value: ${
// //                 declaration.value ||
// //                 declaration.detectedValue ||
// //                 '-'
// //               }`
// //             );

// //           doc.moveDown(0.3);
// //         }
// //       );

// //     } else {

// //       doc
// //         .fontSize(10)
// //         .font('Helvetica')
// //         .text(
// //           'No declarations were reliably detected by the AI pipeline.'
// //         );
// //     }

// //     doc.moveDown();


// //     // ----------------------------------------------------------
// //     // VIOLATIONS
// //     // ----------------------------------------------------------

// //     doc
// //       .fontSize(14)
// //       .font('Helvetica-Bold')
// //       .text('VIOLATIONS / REVIEW FINDINGS');

// //     doc.moveDown(0.5);


// //     if (
// //       inspection.violations &&
// //       inspection.violations.length > 0
// //     ) {

// //       inspection.violations.forEach(
// //         (violation, index) => {

// //           doc
// //             .fontSize(11)
// //             .font('Helvetica-Bold')
// //             .text(
// //               `${index + 1}. ${
// //                 violation.ruleId
// //               }`
// //             );

// //           doc
// //             .fontSize(10)
// //             .font('Helvetica');

// //           doc.text(
// //             `Field: ${
// //               violation.field || '-'
// //             }`
// //           );

// //           doc.text(
// //             `Requirement: ${
// //               violation.requirement || '-'
// //             }`
// //           );

// //           doc.text(
// //             `Detected Value: ${
// //               violation.detectedValue || '-'
// //             }`
// //           );

// //           doc.text(
// //             `Expected Value: ${
// //               violation.expectedValue || '-'
// //             }`
// //           );

// //           doc.text(
// //             `Severity: ${
// //               violation.severity || '-'
// //             }`
// //           );

// //           doc.text(
// //             `Confidence: ${
// //               violation.confidence != null
// //                 ? `${violation.confidence}%`
// //                 : '-'
// //             }`
// //           );

// //           doc.text(
// //             `Status: ${
// //               violation.status || '-'
// //             }`
// //           );

// //           if (violation.officerRemark) {
// //             doc.text(
// //               `Officer Remark: ${
// //                 violation.officerRemark
// //               }`
// //             );
// //           }

// //           doc.moveDown();
// //         }
// //       );

// //     } else {

// //       doc
// //         .fontSize(10)
// //         .font('Helvetica')
// //         .text(
// //           'No violations or review findings recorded.'
// //         );
// //     }


// //     // ----------------------------------------------------------
// //     // OFFICER REMARKS
// //     // ----------------------------------------------------------

// //     doc.moveDown();

// //     doc
// //       .fontSize(14)
// //       .font('Helvetica-Bold')
// //       .text('OFFICER REMARKS');

// //     doc.moveDown(0.5);

// //     doc
// //       .fontSize(10)
// //       .font('Helvetica')
// //       .text(
// //         inspection.officerRemarks ||
// //         'No remarks provided.'
// //       );


// //     // ----------------------------------------------------------
// //     // FOOTER
// //     // ----------------------------------------------------------

// //     doc.moveDown(2);

// //     doc
// //       .fontSize(8)
// //       .fillColor('gray')
// //       .text(
// //         'Generated by LegalScan AI — AI-assisted Legal Metrology Compliance System',
// //         {
// //           align: 'center'
// //         }
// //       );

// //     doc
// //       .text(
// //         `Generated on: ${new Date().toLocaleString(
// //           'en-IN'
// //         )}`,
// //         {
// //           align: 'center'
// //         }
// //       );


// //     // ----------------------------------------------------------
// //     // FINISH PDF
// //     // ----------------------------------------------------------

// //     doc.end();


// //     // ----------------------------------------------------------
// //     // WAIT FOR PDF TO FINISH WRITING
// //     // ----------------------------------------------------------

// //     await new Promise(
// //       (resolve, reject) => {

// //         stream.on('finish', resolve);
// //         stream.on('error', reject);

// //       }
// //     );


// //     // ----------------------------------------------------------
// //     // SAVE REPORT IN MONGODB
// //     // ----------------------------------------------------------

// //     const report = await Report.create({

// //       reportId,

// //       inspectionId:
// //         inspection._id,

// //       inspectionNumber:
// //         inspection.inspectionId,

// //       reportType:
// //         'INSPECTION',

// //       complianceStatus:
// //         inspection.complianceStatus,

// //       pdfFileName:
// //         reportName,

// //       pdfPath:
// //         reportPath,

// //       pdfUrl:
// //         `/reports/${reportName}`,

// //       generatedBy:
// //         req.user?._id || inspection.officerId?._id,

// //       generatedAt:
// //         new Date()

// //     });


// //     console.log('✅ PDF generated:', reportPath);
// //     console.log('✅ Report saved:', report.reportId);

// //     console.log('==============================================');


// //     return res.status(201).json({

// //       success: true,

// //       message:
// //         'Inspection report generated successfully',

// //       data: {

// //         reportId:
// //           report.reportId,

// //         inspectionId:
// //           inspection.inspectionId,

// //         complianceStatus:
// //           report.complianceStatus,

// //         pdfUrl:
// //           report.pdfUrl,

// //         generatedAt:
// //           report.generatedAt

// //       }

// //     });

// //   } catch (error) {

// //     console.error(
// //       '❌ Report generation error:',
// //       error
// //     );

// //     return res.status(500).json({

// //       success: false,

// //       message:
// //         'Failed to generate inspection report',

// //       error:
// //         error.message

// //     });
// //   }
// // };

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
//       enum: [
//         'INSPECTION',
//         'COMPLIANCE',
//         'VIOLATION'
//       ],
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

// module.exports = mongoose.model(
//   'Report',
//   reportSchema
// );

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const Inspection = require('../models/Inspection');
const Report = require('../models/Report');


// ============================================================
// REPORT DIRECTORY
// ============================================================

const REPORTS_DIR = path.resolve(
  __dirname,
  '../../../reports'
);


// ============================================================
// ENSURE REPORT DIRECTORY EXISTS
// ============================================================

const ensureReportsDirectory = () => {
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, {
      recursive: true
    });
  }
};


// ============================================================
// GENERATE UNIQUE REPORT ID
// ============================================================

const createReportId = () => {
  const year = new Date().getFullYear();

  const randomNumber = Math.floor(
    100000 + Math.random() * 900000
  );

  return `RPT-${year}-${randomNumber}`;
};


// ============================================================
// SAFE VALUE
// ============================================================

const safeValue = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return '-';
  }

  return String(value);
};


// ============================================================
// FORMAT DATE
// ============================================================

const formatDate = (date) => {
  if (!date) {
    return '-';
  }

  try {
    return new Date(date).toLocaleString(
      'en-IN',
      {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    );
  } catch (error) {
    return safeValue(date);
  }
};


// ============================================================
// FIND UPLOADED IMAGE
// ============================================================

const findImagePath = (filename) => {

  if (!filename) {
    return null;
  }

  const safeFilename = path.basename(
    filename
  );

  const possibleDirectories = [
    path.resolve(
      __dirname,
      '../../../uploads'
    ),

    path.resolve(
      __dirname,
      '../../uploads'
    ),

    path.resolve(
      process.cwd(),
      'uploads'
    ),

    path.resolve(
      process.cwd(),
      '../uploads'
    )
  ];

  for (
    const directory of possibleDirectories
  ) {

    const filePath = path.join(
      directory,
      safeFilename
    );

    if (
      fs.existsSync(filePath) &&
      fs.statSync(filePath).isFile()
    ) {
      return filePath;
    }
  }

  return null;
};


// ============================================================
// ADD SECTION TITLE
// ============================================================

const addSectionTitle = (
  doc,
  title
) => {

  doc
    .moveDown(0.7)
    .fontSize(14)
    .font('Helvetica-Bold')
    .text(title);

  doc
    .moveDown(0.25)
    .font('Helvetica');
};


// ============================================================
// GENERATE REPORT
// ============================================================
//
// POST
// /api/reports/:inspectionId/generate
//
// ============================================================

exports.generateReport = async (
  req,
  res
) => {

  try {

    const inspectionNumber =
      req.params.inspectionId;


    console.log('');
    console.log(
      '================================================'
    );
    console.log(
      '📄 GENERATING LEGALSCAN AI REPORT'
    );
    console.log(
      'Inspection:',
      inspectionNumber
    );
    console.log(
      '================================================'
    );


    // ========================================================
    // FIND INSPECTION
    // ========================================================

    const inspection =
      await Inspection
        .findOne({
          inspectionId:
            inspectionNumber
        })
        .populate(
          'officerId',
          'name email employeeId department role'
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
        .populate({
          path: 'violations',
          populate: {
            path: 'evidenceId'
          }
        });


    if (!inspection) {

      console.log(
        '❌ Inspection not found:',
        inspectionNumber
      );

      return res.status(404).json({

        success: false,

        message:
          `Inspection ${inspectionNumber} not found`

      });

    }


    console.log(
      '✅ Inspection found'
    );

    console.log(
      'Images:',
      inspection.images?.length || 0
    );

    console.log(
      'Declarations:',
      inspection.declarations?.length || 0
    );

    console.log(
      'Violations:',
      inspection.violations?.length || 0
    );


    // ========================================================
    // ENSURE REPORT DIRECTORY
    // ========================================================

    ensureReportsDirectory();


    // ========================================================
    // CREATE REPORT DETAILS
    // ========================================================

    const reportId =
      createReportId();

    const reportName =
      `Report-${inspection.inspectionId}.pdf`;

    const reportPath =
      path.join(
        REPORTS_DIR,
        reportName
      );

    const reportUrl =
      `/reports/${reportName}`;


    console.log(
      'Report ID:',
      reportId
    );

    console.log(
      'Report path:',
      reportPath
    );


    // ========================================================
    // CREATE PDF DOCUMENT
    // ========================================================

    const doc =
      new PDFDocument({
        size: 'A4',
        margin: 50
      });


    const stream =
      fs.createWriteStream(
        reportPath
      );


    doc.pipe(stream);


    // ========================================================
    // HEADER
    // ========================================================

    doc
      .fontSize(22)
      .font('Helvetica-Bold')
      .text(
        'LEGALSCAN AI',
        {
          align: 'center'
        }
      );


    doc
      .moveDown(0.3)
      .fontSize(15)
      .font('Helvetica-Bold')
      .text(
        'LEGAL METROLOGY INSPECTION REPORT',
        {
          align: 'center'
        }
      );


    doc
      .moveDown(0.3)
      .fontSize(9)
      .font('Helvetica')
      .text(
        'AI-Assisted Packaged Commodity Compliance Inspection',
        {
          align: 'center'
        }
      );


    doc.moveDown();


    // ========================================================
    // REPORT DETAILS
    // ========================================================

    addSectionTitle(
      doc,
      'REPORT DETAILS'
    );


    doc
      .fontSize(10)
      .font('Helvetica');


    doc.text(
      `Report ID: ${reportId}`
    );

    doc.text(
      `Inspection ID: ${safeValue(
        inspection.inspectionId
      )}`
    );

    doc.text(
      `Inspection Date: ${formatDate(
        inspection.inspectionDate
      )}`
    );

    doc.text(
      `Location: ${safeValue(
        inspection.location
      )}`
    );

    doc.text(
      `Inspection Type: ${safeValue(
        inspection.inspectionType
      )}`
    );

    doc.text(
      `Inspection Status: ${safeValue(
        inspection.status
      )}`
    );


    // ========================================================
    // OFFICER INFORMATION
    // ========================================================

    addSectionTitle(
      doc,
      'INSPECTION OFFICER'
    );


    const officer =
      inspection.officerId;


    if (officer) {

      doc.text(
        `Name: ${safeValue(
          officer.name
        )}`
      );

      doc.text(
        `Employee ID: ${safeValue(
          officer.employeeId
        )}`
      );

      doc.text(
        `Department: ${safeValue(
          officer.department
        )}`
      );

      doc.text(
        `Role: ${safeValue(
          officer.role
        )}`
      );

      doc.text(
        `Email: ${safeValue(
          officer.email
        )}`
      );

    } else {

      doc.text(
        'Officer information not available.'
      );

    }


    // ========================================================
    // PRODUCT INFORMATION
    // ========================================================

    addSectionTitle(
      doc,
      'PRODUCT INFORMATION'
    );


    const product =
      inspection.productId;


    doc.text(
      `Commodity Name: ${safeValue(
        inspection.commodityName ||
        product?.productName
      )}`
    );

    doc.text(
      `Product Category: ${safeValue(
        inspection.productCategory
      )}`
    );


    if (product) {

      doc.text(
        `Brand: ${safeValue(
          product.brand
        )}`
      );

      doc.text(
        `Product ID: ${safeValue(
          product._id
        )}`
      );

    }


    // ========================================================
    // COMPLIANCE STATUS
    // ========================================================

    addSectionTitle(
      doc,
      'COMPLIANCE STATUS'
    );


    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(
        safeValue(
          inspection.complianceStatus ||
          'REQUIRES_REVIEW'
        )
      );


    // ========================================================
    // DETECTED DECLARATIONS
    // ========================================================

    addSectionTitle(
      doc,
      'DETECTED DECLARATIONS'
    );


    const declarations =
      inspection.declarations || [];


    if (
      declarations.length === 0
    ) {

      doc
        .fontSize(10)
        .font('Helvetica')
        .text(
          'No declarations were reliably detected by the AI pipeline.'
        );

    } else {

      declarations.forEach(
        (declaration, index) => {

          const field =
            declaration.field ||
            declaration.name ||
            declaration.declarationType ||
            'Declaration';

          const value =
            declaration.value ||
            declaration.detectedValue ||
            declaration.text ||
            '-';


          doc
            .fontSize(10)
            .font('Helvetica-Bold')
            .text(
              `${index + 1}. ${safeValue(
                field
              )}`
            );


          doc
            .font('Helvetica')
            .text(
              `Detected Value: ${safeValue(
                value
              )}`
            );


          if (
            declaration.confidence !==
            undefined &&
            declaration.confidence !==
            null
          ) {

            let confidence =
              Number(
                declaration.confidence
              );


            if (
              confidence <= 1
            ) {
              confidence =
                confidence * 100;
            }


            doc.text(
              `Confidence: ${confidence.toFixed(
                1
              )}%`
            );

          }


          doc.moveDown(0.3);

        }
      );

    }


    // ========================================================
    // VIOLATIONS / REVIEW FINDINGS
    // ========================================================

    addSectionTitle(
      doc,
      'VIOLATIONS / REVIEW FINDINGS'
    );


    const violations =
      inspection.violations || [];


    if (
      violations.length === 0
    ) {

      doc
        .fontSize(10)
        .font('Helvetica')
        .text(
          'No violations or review findings recorded.'
        );

    } else {

      violations.forEach(
        (violation, index) => {

          doc
            .fontSize(11)
            .font('Helvetica-Bold')
            .text(
              `${index + 1}. ${safeValue(
                violation.ruleId
              )}`
            );


          doc
            .fontSize(10)
            .font('Helvetica');


          doc.text(
            `Field: ${safeValue(
              violation.field
            )}`
          );


          doc.text(
            `Requirement: ${safeValue(
              violation.requirement
            )}`
          );


          doc.text(
            `Detected Value: ${safeValue(
              violation.detectedValue
            )}`
          );


          doc.text(
            `Expected Value: ${safeValue(
              violation.expectedValue
            )}`
          );


          doc.text(
            `Severity: ${safeValue(
              violation.severity
            )}`
          );


          if (
            violation.confidence !==
            undefined &&
            violation.confidence !==
            null
          ) {

            let confidence =
              Number(
                violation.confidence
              );


            if (
              confidence <= 1
            ) {
              confidence =
                confidence * 100;
            }


            doc.text(
              `Confidence: ${confidence.toFixed(
                1
              )}%`
            );

          } else {

            doc.text(
              'Confidence: -'
            );

          }


          doc.text(
            `Status: ${safeValue(
              violation.status
            )}`
          );


          if (
            violation.officerRemark
          ) {

            doc.text(
              `Officer Remark: ${violation.officerRemark}`
            );

          }


          doc.moveDown(0.5);

        }
      );

    }


    // ========================================================
    // OFFICER REMARKS
    // ========================================================

    addSectionTitle(
      doc,
      'OFFICER REMARKS'
    );


    doc
      .fontSize(10)
      .font('Helvetica')
      .text(
        inspection.officerRemarks ||
        'No remarks provided.'
      );


    // ========================================================
    // EVIDENCE IMAGES
    // ========================================================

    const images =
      inspection.images || [];


    if (
      images.length > 0
    ) {

      addSectionTitle(
        doc,
        'INSPECTION EVIDENCE'
      );


      images.forEach(
        (image, index) => {

          try {

            const filename =
              image.filename ||
              (
                image.imageUrl
                  ? image.imageUrl
                      .split('/')
                      .pop()
                  : null
              );


            const imagePath =
              findImagePath(
                filename
              );


            if (!imagePath) {

              doc
                .fontSize(9)
                .font('Helvetica')
                .text(
                  `Evidence Image ${
                    index + 1
                  }: File not found`
                );

              doc.moveDown(0.3);

              return;

            }


            doc
              .fontSize(10)
              .font('Helvetica-Bold')
              .text(
                `Evidence Image ${
                  index + 1
                }`
              );


            doc
              .fontSize(9)
              .font('Helvetica')
              .text(
                `Angle: ${safeValue(
                  image.angle
                )}`
              );


            doc.moveDown(0.2);


            doc.image(
              imagePath,
              {
                fit: [
                  480,
                  280
                ],
                align: 'center'
              }
            );


            doc.moveDown(0.5);

          } catch (imageError) {

            console.error(
              '⚠️ Evidence image error:',
              imageError.message
            );


            doc
              .fontSize(9)
              .font('Helvetica')
              .text(
                `Evidence Image ${
                  index + 1
                }: Could not embed image`
              );

          }

        }
      );

    }


    // ========================================================
    // IMPORTANT NOTE
    // ========================================================

    addSectionTitle(
      doc,
      'IMPORTANT NOTE'
    );


    doc
      .fontSize(9)
      .font('Helvetica')
      .text(
        'This report is generated using the LegalScan AI inspection system. AI-detected findings are intended to assist the inspecting officer. Findings should be reviewed against the applicable Legal Metrology requirements before enforcement action.'
      );


    // ========================================================
    // FOOTER
    // ========================================================

    doc.moveDown(1);


    doc
      .fontSize(8)
      .fillColor('gray')
      .text(
        'Generated by LegalScan AI — AI-Assisted Legal Metrology Compliance System',
        {
          align: 'center'
        }
      );


    doc
      .text(
        `Generated on: ${formatDate(
          new Date()
        )}`,
        {
          align: 'center'
        }
      );


    // ========================================================
    // FINISH PDF
    // ========================================================

    doc.end();


    // ========================================================
    // WAIT UNTIL PDF IS COMPLETELY WRITTEN
    // ========================================================

    await new Promise(
      (resolve, reject) => {

        stream.on(
          'finish',
          resolve
        );

        stream.on(
          'error',
          reject
        );

      }
    );


    // ========================================================
    // SAVE REPORT METADATA IN MONGODB
    // ========================================================

    const report =
      await Report.create({

        reportId,

        inspectionId:
          inspection._id,

        inspectionNumber:
          inspection.inspectionId,

        reportType:
          'INSPECTION',

        complianceStatus:
          inspection.complianceStatus ||
          'REQUIRES_REVIEW',

        pdfFileName:
          reportName,

        pdfPath:
          reportPath,

        pdfUrl:
          reportUrl,

        generatedBy:
          req.user?._id ||
          inspection.officerId?._id ||
          null,

        generatedAt:
          new Date()

      });


    console.log('');
    console.log(
      '================================================'
    );
    console.log(
      '✅ REPORT GENERATED SUCCESSFULLY'
    );
    console.log(
      'Report ID:',
      report.reportId
    );
    console.log(
      'PDF:',
      reportPath
    );
    console.log(
      'URL:',
      reportUrl
    );
    console.log(
      '================================================'
    );
    console.log('');


    // ========================================================
    // SEND RESPONSE
    // ========================================================

    return res.status(201).json({

      success: true,

      message:
        'Inspection report generated successfully',

      data: {

        reportId:
          report.reportId,

        inspectionId:
          inspection.inspectionId,

        complianceStatus:
          report.complianceStatus,

        pdfFileName:
          report.pdfFileName,

        pdfUrl:
          report.pdfUrl,

        generatedAt:
          report.generatedAt

      }

    });


  } catch (error) {

    console.error('');
    console.error(
      '================================================'
    );

    console.error(
      '❌ REPORT GENERATION ERROR'
    );

    console.error(
      error
    );

    console.error(
      '================================================'
    );
    console.error('');


    return res.status(500).json({

      success: false,

      message:
        'Failed to generate inspection report',

      error:
        error.message

    });

  }

};


// ============================================================
// GET SINGLE REPORT
// ============================================================
//
// GET /api/reports/:reportId
//
// ============================================================

exports.getReport = async (
  req,
  res
) => {

  try {

    const report =
      await Report
        .findOne({
          reportId:
            req.params.reportId
        })
        .populate(
          'inspectionId'
        )
        .populate(
          'generatedBy',
          'name email employeeId department role'
        );


    if (!report) {

      return res.status(404).json({

        success: false,

        message:
          'Report not found'

      });

    }


    return res.status(200).json({

      success: true,

      data:
        report

    });


  } catch (error) {

    console.error(
      '❌ Get report error:',
      error
    );


    return res.status(500).json({

      success: false,

      message:
        'Failed to fetch report',

      error:
        error.message

    });

  }

};


// ============================================================
// GET REPORTS BY INSPECTION
// ============================================================
//
// GET /api/reports/inspection/:inspectionId
//
// ============================================================

exports.getReportsByInspection = async (
  req,
  res
) => {

  try {

    const reports =
      await Report
        .find({
          inspectionNumber:
            req.params.inspectionId
        })
        .sort({
          generatedAt: -1
        })
        .populate(
          'generatedBy',
          'name email employeeId department role'
        );


    return res.status(200).json({

      success: true,

      count:
        reports.length,

      data:
        reports

    });


  } catch (error) {

    console.error(
      '❌ Get inspection reports error:',
      error
    );


    return res.status(500).json({

      success: false,

      message:
        'Failed to fetch inspection reports',

      error:
        error.message

    });

  }

};


// ============================================================
// GET ALL REPORTS
// ============================================================
//
// GET /api/reports
//
// ============================================================

exports.getAllReports = async (
  req,
  res
) => {

  try {

    const reports =
      await Report
        .find()
        .sort({
          generatedAt: -1
        })
        .populate(
          'generatedBy',
          'name email employeeId department role'
        )
        .populate(
          'inspectionId',
          'inspectionId commodityName productCategory location complianceStatus status inspectionDate'
        );


    return res.status(200).json({

      success: true,

      count:
        reports.length,

      data:
        reports

    });


  } catch (error) {

    console.error(
      '❌ Get all reports error:',
      error
    );


    return res.status(500).json({

      success: false,

      message:
        'Failed to fetch reports',

      error:
        error.message

    });

  }

};
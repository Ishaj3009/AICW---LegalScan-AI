// const mongoose = require('mongoose');

// const violationSchema = new mongoose.Schema({
//   ruleId: { type: String, required: true },
//   inspectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspection', required: true },
//   field: { type: String, required: true },
//   requirement: { type: String, required: true },
//   detectedValue: { type: String },
//   expectedValue: { type: String },
//   severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], required: true },
//   confidence: { type: Number },
//   evidenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' }, // Or a separate Evidence model, using Image for simplicity as they upload images
//   status: { type: String, enum: ['AI_DETECTED', 'CONFIRMED', 'REJECTED'], default: 'AI_DETECTED' },
//   officerRemark: { type: String }
// }, { timestamps: true });

// module.exports = mongoose.model('Violation', violationSchema);


const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema(
  {
    ruleId: {
      type: String,
      required: true,
      trim: true
    },

    inspectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inspection',
      required: true,
      index: true
    },

    field: {
      type: String,
      required: true,
      trim: true
    },

    requirement: {
      type: String,
      required: true,
      trim: true
    },

    detectedValue: {
      type: String,
      default: '',
      trim: true
    },

    expectedValue: {
      type: String,
      default: '',
      trim: true
    },

    severity: {
      type: String,
      enum: [
        'LOW',
        'MEDIUM',
        'HIGH',
        'CRITICAL'
      ],
      required: true
    },

    confidence: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    evidenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image'
    },

    status: {
      type: String,
      enum: [
        'AI_DETECTED',
        'CONFIRMED',
        'REJECTED'
      ],
      default: 'AI_DETECTED'
    },

    officerRemark: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);


// ============================================================
// PREVENT DUPLICATE VIOLATIONS
// ============================================================
//
// One LegalScan violation is uniquely identified by:
//
// inspectionId + ruleId + field
//
// Example:
//
// INS-2026-5120
// + LM-PC-MRP-001
// + mrp
//
// can exist only once.
//
// This prevents duplicate violations when:
// - FRONT and BACK both produce the same finding
// - AI analysis is accidentally triggered twice
// - Multiple requests attempt to save the same finding
// ============================================================

violationSchema.index(
  {
    inspectionId: 1,
    ruleId: 1,
    field: 1
  },
  {
    unique: true,
    name: 'unique_inspection_rule_field'
  }
);


// ============================================================
// MODEL
// ============================================================

module.exports =
  mongoose.model(
    'Violation',
    violationSchema
  );
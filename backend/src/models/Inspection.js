// const mongoose = require('mongoose');

// const inspectionSchema = new mongoose.Schema({
//   inspectionId: { type: String, required: true, unique: true },
//   officerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//   inspectionDate: { type: Date, default: Date.now },
//   location: { type: String, required: true },
//   status: { 
//     type: String, 
//     enum: ['DRAFT', 'PROCESSING', 'UNDER_REVIEW', 'COMPLETED'], 
//     default: 'DRAFT' 
//   },
//   complianceStatus: { 
//     type: String, 
//     enum: ['COMPLIANT', 'POTENTIAL_VIOLATION', 'REQUIRES_REVIEW'], 
//     default: 'REQUIRES_REVIEW' 
//   },
//   images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
//   declarations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Declaration' }],
//   violations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Violation' }],
//   officerRemarks: { type: String }
// }, { timestamps: true });

// module.exports = mongoose.model('Inspection', inspectionSchema);


const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({

  inspectionId: {
    type: String,
    required: true,
    unique: true
  },

  officerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Optional link to an existing Product
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },

  // Product information entered during a new inspection
  commodityName: {
    type: String,
    trim: true
  },

  productCategory: {
    type: String,
    trim: true
  },

  inspectionType: {
    type: String,
    trim: true
  },

  inspectionDate: {
    type: Date,
    default: Date.now
  },

  location: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: [
      'DRAFT',
      'PROCESSING',
      'UNDER_REVIEW',
      'COMPLETED'
    ],
    default: 'DRAFT'
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

  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image'
    }
  ],

  declarations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Declaration'
    }
  ],

  violations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Violation'
    }
  ],

  officerRemarks: {
    type: String
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  'Inspection',
  inspectionSchema
);
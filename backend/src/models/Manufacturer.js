const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema(
  {
    manufacturerId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      default: 'Unknown Location',
      trim: true
    },

    license: {
      type: String,
      default: '',
      trim: true
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },

    complianceScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
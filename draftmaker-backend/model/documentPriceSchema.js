const mongoose = require("mongoose");

const documentPriceSchema = new mongoose.Schema(
  {
    formId: {
      type: String,
      
    },
    documentType: {
      type: String,
      required: true,
      trim: true,
    },
    draftCharge: {
      type: Number,
      required: true,
      min: 0,
    },
    pdfCharge: {
      type: Number,
      required: true,
      min: 0,
    },
    homeDropCharge: {
      type: Number,
      required: true,
      min: 0,
    },
    hasDraftNotaryCharge: {
      type: Boolean,
      default: false,
    },
    draftNotaryCharge: {
      type: Number,
      default: 0,
      min: 0,
    },
    hasPdfNotaryCharge: {
      type: Boolean,
      default: false,
    },
    pdfNotaryCharge: {
      type: Number,
      default: 0,
      min: 0,
    },
    hasHomeDropNotaryCharge: {
      type: Boolean,
      default: false,
    },
    homeDropNotaryCharge: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const DocumentPrice = mongoose.model("DocumentPrice", documentPriceSchema);

module.exports = DocumentPrice;

const mongoose = require("mongoose");

const documentPriceSchema = new mongoose.Schema(
  {
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
    isVisible:{type:Boolean,default:true}
  },
  {
    timestamps: true,
  }
);

const DocumentPrice = mongoose.model("DocumentPrice", documentPriceSchema);

module.exports = DocumentPrice;

// models/uploadDocumentModel.js
const mongoose = require("mongoose");

const uploadDocumentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  userMobile: {
    type: String,
    required: true,
    trim: true,
  },
  documents: [
    {
      type: String,
      required: true,
    },
  ],
  totalDocuments: {
    type: Number,
    required: true,
  },
  documentStatus: { type: String, default: "Pending" },
  bookingId: {
    type: String,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UploadDocument", uploadDocumentSchema);

const mongoose = require("mongoose");

const gapPeriodSchema = new mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  reason: {
    type: String,
  },
});

const gapCertificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    relation: {
      type: String,
      default: "S/o",
    },
    relationName: {
      type: String,
    },
    age: {
      type: Number,
    },
    address: {
      type: String,
    },
    aadhaarNo: {
      type: String,
    },
    authority: {
      type: String,
    },
    place: {
      type: String,
    },
    day: {
      type: String,
    },
    month: {
      type: String,
    },
    year: {
      type: String,
    },

    gapPeriods: {
      type: [gapPeriodSchema],
      default: [],
    },
    bookingId: {
      type: String,
    },
    documentType: {
      type: String,
    },
    formId: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    doumentStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    paymentDetails: {
      paymentId: {
        type: String,
      },
      paidAmount: {
        type: Number,
      },
      serviceType: {
        type: String,
      },
      serviceName: {
        type: String,
      },
      includesNotary: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const gapPeriod = mongoose.model("GapPeriod", gapCertificateSchema);

module.exports = gapPeriod;

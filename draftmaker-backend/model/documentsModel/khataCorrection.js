const mongoose = require("mongoose");

const dualApplicantSchema = new mongoose.Schema(
  {
    name1: {
      type: String,
    },
    relation1: {
      type: String,
    },
    age1: {
      type: Number,
    },
    address1: {
      type: String,
    },
    aadhaar1: {
      type: String,
    },

    name2: {
      type: String,
    },
    relation2: {
      type: String,
    },
    age2: {
      type: Number,
    },
    address2: {
      type: String,
    },
    aadhaar2: {
      type: String,
    },

    propertyAddress: {
      type: String,
    },
    wardNumber: {
      type: String,
    },
    zone: {
      type: String,
    },
    authority: {
      type: String,
    },
    khataNo: {
      type: String,
    },
    sasNumber: {
      type: String,
    },

    authorizedPerson: {
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
    bookingId: {
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

const khataCorrection = mongoose.model("khataCorrection", dualApplicantSchema);

module.exports = khataCorrection;

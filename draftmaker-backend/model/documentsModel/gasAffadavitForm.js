const mongoose = require("mongoose");

const gasFormDataSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    fatherName: {
      type: String,
    },

    relation: {
      type: String,
    },
    age: {
      type: Number,
    },
    permanentAddress: {
      type: String,
    },
    aadhaarNo: {
      type: String,
    },
    gasCompanyName: {
      type: String,
    },
    serviceAddress: {
      type: String,
    },
    connectionDate: {
      type: String,
    },
    consumerNumber: {
      type: String,
    },
    subscriptionVoucher: {
      type: String,
    },
    cylinderCount: {
      type: Number,
    },
    regulatorCount: {
      type: Number,
    },
    depositAmount: {
      type: Number,
    },
    previousAddress: {
      type: String,
    },
    reason: {
      type: String,
      default: "shifting",
    },
    lostItem: {
      type: String,
      default: "subscription",
    },
    place: {
      type: String,
    },
    day: {
      type: Number,
    },
    month: {
      type: String,
    },
    year: {
      type: Number,
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

const GasFormData = mongoose.model("GasFormData", gasFormDataSchema);

module.exports = GasFormData;

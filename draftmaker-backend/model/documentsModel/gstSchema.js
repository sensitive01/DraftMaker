// models/TenantAgreementForm.js
const mongoose = require("mongoose");

const tenantAgreementFormSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
    },
    aadhaarNo: {
      type: String,
    },
    ownerAddress: {
      type: String,
    },
    premisesAddress: {
      type: String,
    },
    tenantName: {
      type: String,
    },
    companyName: {
      type: String,

      default: "",
    },
    officeAddress: {
      type: String,

      default: "",
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
    documentType: {
      type: String,
    },
    formId: {
      type: String,
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

const gstModelSchema = mongoose.model("gstSchema", tenantAgreementFormSchema);

module.exports = gstModelSchema;

const mongoose = require("mongoose");

const residenceSchema = new mongoose.Schema({
  country: { type: String },
  periodFrom: { type: String },
  periodTo: { type: String },
  pageNos: { type: String },
});

const passportAffidavitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    relationType: {
      type: String, // e.g., "S/o", "D/o", "W/o"
    },
    guardianName: {
      type: String,
    },
    age: {
      type: Number,
    },
    permanentAddress: {
      type: String,
    },
    presentAddress: {
      type: String,
    },
    aadhaarNo: {
      type: String,
    },
    passportNo: {
      type: String,
    },
    incidentDetails: {
      type: String,
    },
    travelled: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },
    travelDetails: {
      type: String,
    },
    trConcessions: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },
    concessionDetails: {
      type: String,
    },
    nonResidentIndian: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },
    passportObjection: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },
    objectionDetails: {
      type: String,
    },
    deported: {
      type: String,
      enum: ["YES", "NO"],
      default: "NO",
    },
    deportationDetails: {
      type: String,
    },
    date: {
      type: String,
    },
    place: {
      type: String,
    },
    useNameAsSignature: {
      type: Boolean,
      default: false,
    },
    residences: {
      type: [residenceSchema],
      default: [],
    },
    bookingId: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    doumentStatus: {
      type: String,
      default: "Pending",
    },
    documentType: {
      type: String,
    },
    formId: {
      type: String,
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

const passportAnnaxure = mongoose.model(
  "PassportAffidavit",
  passportAffidavitSchema
);

module.exports = passportAnnaxure;

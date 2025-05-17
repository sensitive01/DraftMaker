const mongoose = require("mongoose");

const coparcenerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  relationship: {
    type: String,
  },
  address: {
    type: String,
  },
});

const hufDeclarationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Mr",
    },
    name: {
      type: String,
    },
    relationTo: {
      type: String,
    },
    relationName: {
      type: String,
    },
    age: {
      type: Number,
    },

    address: {
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      state: { type: String },
      pinCode: {
        type: String,
      },
    },

    aadhaarNo: {
      type: String,
    },

    hufName: {
      type: String,
    },
    hufExistenceDate: {
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

    coparceners: {
      type: [coparcenerSchema],
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
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    userName: {
      type: String,
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

const hufData = mongoose.model("HufDeclaration", hufDeclarationSchema);

module.exports = hufData;

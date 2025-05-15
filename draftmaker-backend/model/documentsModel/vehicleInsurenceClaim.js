const mongoose = require("mongoose");

const vehicleAccidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    name: {
      type: String,
    },
    relation: {
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

    vehicleNo: {
      type: String,
    },
    vehicleModel: {
      type: String,
    },
    engineNo: {
      type: String,
    },
    chassisNo: {
      type: String,
    },

    insurer: {
      type: String,
    },
    policyNo: {
      type: String,
    },
    policyStart: {
      type: String,
    },
    policyEnd: {
      type: String,
    },

    driverName: {
      type: String,
    },
    accidentDetails: {
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

module.exports = mongoose.model("VehicleAccident", vehicleAccidentSchema);

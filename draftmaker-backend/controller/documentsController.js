const dualNameCorrection = require("../model/documentsModel/dualNameCorrection");
const documentPriceData = require("../model/documentPriceSchema");
const nameCorrection = require("../model/documentsModel/nameChangeSchema")

function generateBookingId() {
  const prefix = "DM";
  const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
  return `${prefix}${randomNumber}`;
}

const saveDualNameCorrection = async (req, res) => {
  try {
    const { formData } = req.body;

    const documentName = await documentPriceData.findOne({
      formId: "DM-DNC-1",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }

    const bookingId = generateBookingId();

    const newData = new dualNameCorrection({
      ...formData,
      bookingId,
    });

    const savedData = await newData.save();

    res.status(201).json({
      message: "Dual name correction data saved successfully",
      bookingId,
      documentType: documentName.documentType,
      username: formData.fullName,
      mobileNumber: formData.mobileNumber,
      documentDetails: documentName,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to save dual name correction data",
      error: err.message,
    });
  }
};

const updateDualNamePaymentData = async (req, res) => {
  try {
    console.log("Welcome to update bookings", req.body);

    const {
      bookingId,
      paymentId,
      amount,
      serviceType,
      serviceName,
      includesNotary,
      status, 
    } = req.body.data;

    const updatedData = await dualNameCorrection.findOneAndUpdate(
      { bookingId },
      {
        paymentStatus: status,
        paymentDetails: {
          paymentId,
          paidAmount: amount,
          serviceType,
          serviceName,
          includesNotary,
        },
      },
      { new: true }
    );

    if (!updatedData) {
      return res
        .status(404)
        .json({ message: "Booking not found for the given ID." });
    }

    res.status(200).json({
      message: "Payment details updated successfully.",
      data: updatedData,
    });
  } catch (err) {
    console.error("Error in updating payment details:", err);
    res.status(500).json({
      message: "Failed to update payment details.",
      error: err.message,
    });
  }
};

const getAllBookingData = async (req, res) => {
  try {
    const bookingData = await dualNameCorrection.find(
      {},
      {
        paymentDetails: 1,
        fullName: 1,
        mobileNumber: 1,
        doumentStatus: 1,
        paymentStatus: 1,
        createdAt: 1,
        bookingId: 1,
      }
    );

    const formattedData = bookingData.map((item) => {
      const date = new Date(item.createdAt);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return {
        ...item._doc,
        createdAt: `${day}-${month}-${year}`,
      };
    });

    console.log("Formatted Booking Data", formattedData);

    res.status(200).json({
      message: "Booking data fetched successfully",
      data: formattedData,
    });
  } catch (err) {
    console.log("Error in getting all booking data", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const saveNameCorrection = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({ formId: "DM-NC-2" });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new nameCorrection({
      ...document,
      bookingId,
    });
    const savedData = await newData.save();
    res.status(201).json({
      message: "Dual name correction data saved successfully",
      bookingId,
      documentType: documentName.documentType,
      username: document.fullName,
      mobileNumber: document.mobileNumber,
      documentDetails: documentName,
    });
  } catch (err) {
    console.log("Error in create name correction", err);
    res.status(500).json({
      message: "Failed to save dual name correction data",
      error: err.message,
    });
  }
};

const saveNameCorrectionPaymentData = async (req, res) => {
  try {
    // ✅ Ensure the request body and data are present
    if (!req.body || !req.body.data) {
      return res.status(400).json({ message: "Invalid request data." });
    }

    const {
      bookingId,
      paymentId,
      amount,
      serviceType,
      serviceName,
      includesNotary,
      status,
    } = req.body.data;

    // ✅ Check if bookingId exists
    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID is required." });
    }

    console.log("Updating bookingId:", bookingId);
    console.log("Updating with:", {
      paymentId,
      amount,
      serviceType,
      serviceName,
      includesNotary,
      status,
    });

    // ✅ Use $set to avoid overwriting the entire object
    const updatedData = await nameCorrection.findOneAndUpdate(
      { bookingId },
      {
        $set: {
          paymentStatus: status,
          "paymentDetails.paymentId": paymentId,
          "paymentDetails.paidAmount": amount,
          "paymentDetails.serviceType": serviceType,
          "paymentDetails.serviceName": serviceName,
          "paymentDetails.includesNotary": includesNotary,
        },
      },
      { new: true }
    );

    if (!updatedData) {
      return res
        .status(404)
        .json({ message: "Booking not found for the given ID." });
    }

    console.log("✅ Payment data updated for booking:", bookingId);

    res.status(200).json({
      message: "Payment details updated successfully.",
      data: updatedData,
    });
  } catch (err) {
    console.error("❌ Error in updating payment details:", err);
    res.status(500).json({
      message: "Failed to update payment details.",
      error: err.message,
    });
  }
};


module.exports = {
  saveNameCorrection,
  saveNameCorrectionPaymentData,

  saveDualNameCorrection,
  updateDualNamePaymentData,
  getAllBookingData,
};

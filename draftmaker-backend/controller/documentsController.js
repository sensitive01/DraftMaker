const documentPriceData = require("../model/documentPriceSchema");

const dualNameCorrection = require("../model/documentsModel/dualNameCorrection");
const nameCorrection = require("../model/documentsModel/nameChangeSchema");
const dobCorrection = require("../model/documentsModel/dobCorrectionSchema");
const GasFormData = require("../model/documentsModel/gasAffadavitForm");
const documentLost = require("../model/documentsModel/documentLost");
const dobParentNameCorrection = require("../model/documentsModel/dobParentNameCorrection");
const birthCertificateNameCorrection = require("../model/documentsModel/birthCerificateNameCorrection");
const gstSchema = require("../model/documentsModel/gstSchema");
const metriculationLost = require("../model/documentsModel/metriculationLost");
const khataCorrection = require("../model/documentsModel/khataCorrection");
const vehicleInsurence = require("../model/documentsModel/vehicleInsurenceClaim");
const hufSchema = require("../model/documentsModel/hufCorrection");
const gapPeriodSchema = require("../model/documentsModel/gapPeriod");
const passportAnnaxure = require("../model/documentsModel/passwordAnnaxure");
const passportNameChange = require("../model/documentsModel/passportNameChange");
const adressAffadavit = require("../model/documentsModel/adressAffadavit");
const commercialSchema = require("../model/documentsModel/commercialData");
const recidentialSchema = require("../model/documentsModel/recidentialData");

const getAllBookingData = async (req, res) => {
  try {
    const dualNameData = await dualNameCorrection.find(
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

    const nameChangeData = await nameCorrection.find(
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
    const dobCorrectionData = await nameCorrection.find(
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
    const gasFormData = await GasFormData.find(
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
    const docLostData = await documentLost.find(
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
    const dobNameCorrectionParent = await dobParentNameCorrection.find(
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
    const bcNameCorrectionData = await birthCertificateNameCorrection.find(
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
    const gstNocData = await gstSchema.find(
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
    const metriculationLostData = await metriculationLost.find(
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
    const khataCorrectionData = await khataCorrection.find(
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
    const vehicleInsurenceData = await vehicleInsurence.find(
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

    const hufData = await hufSchema.find(
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
    const gapPeriodData = await gapPeriodSchema.find(
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

    const passportAnnaxureData = await passportAnnaxure.find(
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

    const passportNameChangeData = await passportNameChange.find(
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

    const adressAffadavitData = await adressAffadavit.find(
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

    const commercialData = await commercialSchema.find(
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

    const recidentialData = await recidentialSchema.find(
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

    // Merge the arrays correctly
    const allBookingData = [
      ...dualNameData,
      ...nameChangeData,
      ...dobCorrectionData,
      ...gasFormData,
      ...docLostData,
      ...dobNameCorrectionParent,
      ...bcNameCorrectionData,
      ...gstNocData,
      ...metriculationLostData,
      ...khataCorrectionData,
      ...vehicleInsurenceData,
      ...hufData,
      ...gapPeriodData,
      ...passportAnnaxureData,
      ...passportNameChangeData,
      ...adressAffadavitData,
      ...commercialData,
      ...recidentialData
    ];

    const formattedData = allBookingData.map((item) => {
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

// const getAllBookingData = async (req, res) => {
//   try {

//     let bookingData = []

//     const dualNameData = await dualNameCorrection.find(
//       {},
//       {
//         paymentDetails: 1,
//         fullName: 1,
//         mobileNumber: 1,
//         doumentStatus: 1,
//         paymentStatus: 1,
//         createdAt: 1,
//         bookingId: 1,
//       }
//     );
//     bookingData.push(dualNameData)

//     const nameChangeData = await nameCorrection.find(
//       {},
//       {
//         paymentDetails: 1,
//         fullName: 1,
//         mobileNumber: 1,
//         doumentStatus: 1,
//         paymentStatus: 1,
//         createdAt: 1,
//         bookingId: 1,
//       }
//     );

//     bookingData.push(nameChangeData)

//     const formattedData = bookingData.map((item) => {
//       const date = new Date(item.createdAt);
//       const day = String(date.getDate()).padStart(2, "0");
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const year = date.getFullYear();

//       return {
//         ...item._doc,
//         createdAt: `${day}-${month}-${year}`,
//       };
//     });

//     console.log("Formatted Booking Data", formattedData);

//     res.status(200).json({
//       message: "Booking data fetched successfully",
//       data: formattedData,
//     });
//   } catch (err) {
//     console.log("Error in getting all booking data", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

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

const createDobCorrection = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-DOBC-3",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new dobCorrection({
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

const saveDobCorrectionPaymentData = async (req, res) => {
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
    const updatedData = await dobCorrection.findOneAndUpdate(
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

const createGasCorrection = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-GAS-5",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new GasFormData({
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

const saveGasCorrectionPaymentData = async (req, res) => {
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
    const updatedData = await GasFormData.findOneAndUpdate(
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

const createDocumentLost = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-DOC-LOST-5",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new documentLost({
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

const saveDocumentLostPaymentData = async (req, res) => {
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
    const updatedData = await documentLost.findOneAndUpdate(
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

const createDobParentNameCorrection = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({ formId: "DM-NC-2" });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new dobParentNameCorrection({
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

const saveDobParentNameCorrection = async (req, res) => {
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
    const updatedData = await dobParentNameCorrection.findOneAndUpdate(
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

const createBirthCertificateNameCorrection = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-BC-MNC-7",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new birthCertificateNameCorrection({
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

const saveBirthCertificateNameCorrection = async (req, res) => {
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
    const updatedData = await birthCertificateNameCorrection.findOneAndUpdate(
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

const saveGstData = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-GST-8",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new gstSchema({
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

const saveGstPaymentData = async (req, res) => {
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
    const updatedData = await gstSchema.findOneAndUpdate(
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

const createMetriculationLostData = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-MAL-9",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new metriculationLost({
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

const updateMetriculationLostPaymentData = async (req, res) => {
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
    const updatedData = await metriculationLost.findOneAndUpdate(
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

const createKhataCorrectionData = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-KH-10",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new khataCorrection({
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

const updateKhataCorrectionPaymentData = async (req, res) => {
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
    const updatedData = await khataCorrection.findOneAndUpdate(
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

const createVehicleInsurenceData = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-VIC-11",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new vehicleInsurence({
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

const updateVehicleInsurencePaymentData = async (req, res) => {
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
    const updatedData = await vehicleInsurence.findOneAndUpdate(
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

const createHufData = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-HUF-12",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new hufSchema({
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

const updateHufPaymentData = async (req, res) => {
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
    const updatedData = await hufSchema.findOneAndUpdate(
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

const createGapPeriodData = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-GP-13",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new gapPeriodSchema({
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

const updateGapPeriodData = async (req, res) => {
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
    const updatedData = await gapPeriodSchema.findOneAndUpdate(
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

const createPasswordAnnaxureData = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-PAF-14",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new passportAnnaxure({
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

const updatePasswordAnnaxureData = async (req, res) => {
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
    const updatedData = await passportAnnaxure.findOneAndUpdate(
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

const createPassportNameChangeData = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-PNC-15",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new passportNameChange({
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

const updatePassportNameChangePaymentData = async (req, res) => {
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
    const updatedData = await passportNameChange.findOneAndUpdate(
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

const createAdressAffadavitData = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-AAF-16",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new adressAffadavit({
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

const updateAdressAffadavitPaymentData = async (req, res) => {
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
    const updatedData = await adressAffadavit.findOneAndUpdate(
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

const createCommercialData = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-CFD-17",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new commercialSchema({
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

const updateCommercialPaymentData = async (req, res) => {
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
    const updatedData = await commercialSchema.findOneAndUpdate(
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

const createRecidentialData = async (req, res) => {
  try {
    console.log("Welcome to create name correction", req.body);
    const { document } = req.body;
    const documentName = await documentPriceData.findOne({
      formId: "DM-RFD-18",
    });

    if (!documentName) {
      return res.status(404).json({ message: "Document type not found" });
    }
    const bookingId = generateBookingId();
    const newData = new recidentialSchema({
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

const updateRecidentialPaymentData = async (req, res) => {
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
    const updatedData = await recidentialSchema.findOneAndUpdate(
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
  updateRecidentialPaymentData,
  createRecidentialData,
  createCommercialData,
  updateCommercialPaymentData,
  createAdressAffadavitData,
  updateAdressAffadavitPaymentData,
  createPassportNameChangeData,
  updatePassportNameChangePaymentData,
  createPasswordAnnaxureData,
  updatePasswordAnnaxureData,
  updateGapPeriodData,
  createGapPeriodData,
  updateHufPaymentData,
  createHufData,
  createVehicleInsurenceData,
  updateVehicleInsurencePaymentData,
  createKhataCorrectionData,
  updateKhataCorrectionPaymentData,
  createMetriculationLostData,
  updateMetriculationLostPaymentData,
  saveGstPaymentData,
  saveGstData,
  createBirthCertificateNameCorrection,
  saveBirthCertificateNameCorrection,
  createDocumentLost,
  saveDocumentLostPaymentData,
  createGasCorrection,
  saveGasCorrectionPaymentData,

  createDobCorrection,
  saveDobCorrectionPaymentData,

  saveNameCorrection,
  saveNameCorrectionPaymentData,

  saveDualNameCorrection,
  updateDualNamePaymentData,
  getAllBookingData,

  saveDobParentNameCorrection,
  createDobParentNameCorrection,
};

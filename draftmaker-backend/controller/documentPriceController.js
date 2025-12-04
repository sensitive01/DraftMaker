const DocumentPrice = require("../model/documentPriceSchema");
const stampDutySchema = require("../model/stampDutyModel");
const deliveryChargeModel = require("../model/deliveryChargeModel");
const EstampPayment = require("../model/eStampPaymentSchema");

const sendEmail = require("../utils/sendEmail")

const getAllDocumentPrices = async (req, res) => {
  try {
    const prices = await DocumentPrice.find();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllDocumentPricesAdmin = async (req, res) => {
  try {
    const prices = await DocumentPrice.find();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

function generateBookingId() {
  const prefix = "DMSD";
  const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
  return `${prefix}${randomNumber}`;
}

const createDocumentPrice = async (req, res) => {
  try {
    console.log("Welcome to createDocumentPrice", req.body);
    const {
      documentType,
      draftCharge,
      pdfCharge,
      homeDropCharge,
      hasDraftNotaryCharge,
      draftNotaryCharge,
      hasPdfNotaryCharge,
      pdfNotaryCharge,
      hasHomeDropNotaryCharge,
      homeDropNotaryCharge,
    } = req.body.documents;

    if (
      !documentType ||
      draftCharge == null ||
      pdfCharge == null ||
      homeDropCharge == null
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const formattedType = documentType
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const newPrice = new DocumentPrice({
      documentType: formattedType,
      draftCharge,
      pdfCharge,
      homeDropCharge,
      hasDraftNotaryCharge,
      draftNotaryCharge,
      hasPdfNotaryCharge,
      pdfNotaryCharge,
      hasHomeDropNotaryCharge,
      homeDropNotaryCharge,
    });

    await newPrice.save();
    res.status(201).json(newPrice);
  } catch (error) {
    res.status(500).json({ message: "Failed to create document price", error });
  }
};

const updateDocumentPrice = async (req, res) => {
  try {
    console.log("Welcome to update the data", req.body);
    const { id } = req.params;
    const updatedData = req.body.documents;

    if (updatedData.documentType) {
      updatedData.documentType = updatedData.documentType
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    console.log("updatedData", updatedData);

    const updatedPrice = await DocumentPrice.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPrice) {
      return res.status(404).json({ message: "Document price not found" });
    }

    res.status(200).json(updatedPrice);
  } catch (error) {
    res.status(500).json({ message: "Failed to update document price", error });
  }
};

const deleteDocumentPrice = async (req, res) => {
  try {
    console.log("Welcome to delete the document price");
    const { id } = req.params;

    const deleted = await DocumentPrice.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Document price not found" });
    }

    res
      .status(200)
      .json({ message: "Document price deleted successfully", data: deleted });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete document price", error });
  }
};

const createStampDocumentPrice = async (req, res) => {
  try {
    const { document } = req.body;

    if (!document) {
      return res.status(400).json({ message: "No document data provided" });
    }

    const cleanedData = {
      documentType: document.documentType?.trim(),
      articleNo: document.articleNo?.trim(),
      calculationType: document.calculationType || "fixed",
      fixedAmount: document.fixedAmount || 0,
      percentage: document.percentage || 0,
      minAmount: document.minAmount || 0,
      maxAmount: document.maxAmount || 0,
      status: document.status !== undefined ? document.status : true,
      serviceCharge: document.serviceCharge,
    };

    const createdDoc = await stampDutySchema.create(cleanedData);

    res.status(201).json({
      message: "Stamp duty document saved successfully",
      data: createdDoc,
    });
  } catch (err) {
    console.error("Error saving stamp duty document:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getStampDocumentPrice = async (req, res) => {
  try {
    const stampPriceData = await stampDutySchema.find();
    console.log("stampPriceData", stampPriceData);

    res.status(200).json({
      message: "Stamp duty documents fetched successfully",
      data: stampPriceData,
    });
  } catch (err) {
    console.error("Error in getting the stamp Price data", err);
    res.status(500).json({
      message: "Failed to fetch stamp duty documents",
      error: err.message,
    });
  }
};

const getStampDocumentPriceAdmin = async (req, res) => {
  try {
    const stampPriceData = await stampDutySchema.find();
    console.log("stampPriceData", stampPriceData);

    res.status(200).json({
      message: "Stamp duty documents fetched successfully",
      data: stampPriceData,
    });
  } catch (err) {
    console.error("Error in getting the stamp Price data", err);
    res.status(500).json({
      message: "Failed to fetch stamp duty documents",
      error: err.message,
    });
  }
};

const updateStampDocumentPrice = async (req, res) => {
  try {
    const { documentData } = req.body;
    const { documentId } = req.params;

    console.log("documents", documentData, documentId);

    if (!documentId) {
      return res.status(400).json({ message: "Document ID is required" });
    }

    const updatedDocument = await stampDutySchema.findByIdAndUpdate(
      documentId,
      {
        ...documentData,
        documentType: documentData.documentType?.trim(),
        articleNo: documentData.articleNo?.trim(),
        serviceCharge: documentData.serviceCharge,
      },
      { new: true, runValidators: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({
      message: "Stamp duty document updated successfully",
      data: updatedDocument,
    });
  } catch (err) {
    console.error("Error in updating the data", err);
    res.status(500).json({
      message: "Failed to update stamp duty document",
      error: err.message,
    });
  }
};

const updateStampDocumentStatus = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { currentStatus } = req.body;

    console.log("Documents", documentId, currentStatus);

    if (typeof currentStatus !== "boolean") {
      return res
        .status(400)
        .json({ message: "Invalid status value. Must be boolean." });
    }

    const updatedDoc = await stampDutySchema.findByIdAndUpdate(
      documentId,
      { status: currentStatus },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({
      message: `Document status updated to ${
        currentStatus ? "Active" : "Inactive"
      }`,
      data: updatedDoc,
    });
  } catch (err) {
    console.error("Error in updating the status", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const addServiceItem = async (req, res) => {
  try {
    const { document } = req.body;
    const newService = await deliveryChargeModel.create({
      ...document,
      serviceName: document.serviceName?.trim(),
      description: document.description?.trim(),
      deliveryTime: document.deliveryTime?.trim(),
    });
    res
      .status(201)
      .json({ message: "Service added successfully", data: newService });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getAllServiceItems = async (req, res) => {
  try {
    const services = await deliveryChargeModel.find();
    res
      .status(200)
      .json({ message: "Services fetched successfully", data: services });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch services", error: err.message });
  }
};

const getAllServiceItemsAdmin = async (req, res) => {
  try {
    const services = await deliveryChargeModel.find();
    res
      .status(200)
      .json({ message: "Services fetched successfully", data: services });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch services", error: err.message });
  }
};

const updateServiceItem = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { documentData } = req.body;
    console.log("serviceId", serviceId, "documentData", documentData);
    const updatedService = await deliveryChargeModel.findByIdAndUpdate(
      serviceId,
      {
        ...documentData,
        serviceName: documentData.serviceName?.trim(),
        description: documentData.description?.trim(),
        deliveryTime: documentData.deliveryTime?.trim(),
      },
      { new: true, runValidators: true }
    );
    if (!documentData) {
      return res.status(404).json({ message: "Service not found" });
    }
    res
      .status(200)
      .json({ message: "Service updated successfully", data: updatedService });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const updateServiceItemStatus = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { currentStatus } = req.body;
    console.log("currentStatus", currentStatus);

    const updatedService = await deliveryChargeModel.findByIdAndUpdate(
      documentId,
      { status: currentStatus },
      { new: true }
    );
    console.log("updatedService", updatedService);
    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({
      message: `Service status updated to ${
        currentStatus ? "Active" : "Inactive"
      }`,
      data: updatedService,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update status", error: err.message });
  }
};

const getStampDeiveryChargeData = async (req, res) => {
  try {
    const stampData = await stampDutySchema.find({ status: true });
    const deliveryChargeData = await deliveryChargeModel.find({ status: true });

    res.status(200).json({
      message: "Stamp duty and delivery charge data fetched successfully",
      stampDuty: stampData,
      deliveryCharges: deliveryChargeData,
    });
  } catch (err) {
    console.error("Error in getting the delivery and stamp data", err);
    res.status(500).json({
      message: "Failed to fetch stamp duty and delivery charge data",
      error: err.message,
    });
  }
};

const createPendingEstampOrder = async (req, res) => {
  try {
    const { orderData } = req.body;
    console.log("Creating Pending Order", orderData);

    const bookingId = generateBookingId();

    const newOrder = new EstampPayment({
      ...orderData,
      bookingId,
      paymentStatus: "pending",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Pending e-stamp order created",
      orderId: bookingId,
      data: newOrder,
    });
  } catch (err) {
    console.error("Error creating pending order", err);
    res.status(500).json({
      success: false,
      message: "Failed to create pending order",
      error: err.message,
    });
  }
};

const saveTheEstampData = async (req, res) => {
  try {
    const { orderData } = req.body;
    console.log("OrderData", orderData);
    const bookingId = generateBookingId();

    const newPayment = new EstampPayment(orderData);
    newPayment.bookingId = bookingId;
    await newPayment.save();

    await sendEmail("draftmakerinfo@gmail.com", "eStamp", {
      bookingId: bookingId,
      agreementName: orderData.documentType,
      dateTime: newPayment.createdAt,
      userName: orderData.requestorName,
      mobile: orderData.mobileNumber,
      paymentId: orderData.razorpayPaymentId,
      paymentStatus: orderData.paymentStatus,
      amount: orderData.totalAmount,
    });
    console.log(`sending the email ${orderData.documentType}`)

    res.status(201).json({
      success: true,
      message: "E-stamp payment data saved successfully",
      data: newPayment,
    });
  } catch (err) {
    console.error("Error in saving the data", err);
    res.status(500).json({
      success: false,
      message: "Failed to save e-stamp payment data",
      error: err.message,
    });
  }
};

const getEstampBookingData = async (req, res) => {
  try {
    const eStampData = await EstampPayment.find().sort({ createdAt: -1 }); // Latest first

    res.status(200).json({
      success: true,
      message: "E-stamp booking data fetched successfully",
      data: eStampData,
    });
  } catch (err) {
    console.log("Error in getting the booking data", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch e-stamp booking data",
      error: err.message,
    });
  }
};
const getIndividualStampBookingData = async (req, res) => {
  try {
    const { stampBookingId } = req.params;
    const eStampData = await EstampPayment.findOne({ _id: stampBookingId });

    res.status(200).json({
      success: true,
      message: "E-stamp booking data fetched successfully",
      data: eStampData,
    });
  } catch (err) {
    console.log("Error in getting the booking data", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch e-stamp booking data",
      error: err.message,
    });
  }
};

const updateIndividualStampBookingDataStatus = async (req, res) => {
  try {
    const { stampBookingId } = req.params;
    const { status } = req.body;

    // Update the documentStatus field
    const eStampData = await EstampPayment.findByIdAndUpdate(
      stampBookingId,
      { documentStatus: status },
      { new: true } // Return the updated document
    );

    if (!eStampData) {
      return res.status(404).json({
        success: false,
        message: "E-stamp booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "E-stamp booking status updated successfully",
      data: eStampData,
    });
  } catch (err) {
    console.log("Error in updating the booking data", err);
    res.status(500).json({
      success: false,
      message: "Failed to update e-stamp booking status",
      error: err.message,
    });
  }
};
const createPendingOrder = async (req, res) => {
  try {
    const { orderData } = req.body;  // data from frontend
    const bookingId = generateBookingId(); // function to generate unique ID

    const newPayment = new EstampPayment(orderData);
    newPayment.bookingId = bookingId;
    newPayment.paymentStatus = "pending"; // pending because payment not done yet
    await newPayment.save();

    // Return bookingId to frontend
    res.status(201).json({
      success: true,
      message: "Pending order created successfully",
      bookingId,
      data: newPayment,
    });
  } catch (err) {
    console.error("Error creating pending order", err);
    res.status(500).json({
      success: false,
      message: "Failed to create pending order",
      error: err.message,
    });
  }
};

module.exports = {
  updateIndividualStampBookingDataStatus,
  getIndividualStampBookingData,
  getEstampBookingData,
  getStampDeiveryChargeData,
  updateServiceItemStatus,
  updateServiceItem,
  getAllServiceItems,
  addServiceItem,
  updateStampDocumentStatus,
  updateStampDocumentPrice,
  getStampDocumentPrice,
  createStampDocumentPrice,
  getAllDocumentPrices,
  createDocumentPrice,
  updateDocumentPrice,
  deleteDocumentPrice,
  saveTheEstampData,
  getAllDocumentPricesAdmin,
  getStampDocumentPriceAdmin,
  getAllServiceItemsAdmin,
  createPendingEstampOrder
};

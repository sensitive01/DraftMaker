const DocumentPrice = require("../model/documentPriceSchema");

const getAllDocumentPrices = async (req, res) => {
  try {
    const prices = await DocumentPrice.find();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createDocumentPrice = async (req, res) => {
  try {
    console.log("Welcome to createDocumentPrice", req.body);
    const { documentType, draftCharge, pdfCharge, homeDropCharge } = req.body.documents;

    if (!documentType || draftCharge == null || pdfCharge == null || homeDropCharge == null) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const formattedType = documentType
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const newPrice = new DocumentPrice({
      documentType: formattedType,
      draftCharge,
      pdfCharge,
      homeDropCharge,
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
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    const updatedPrice = await DocumentPrice.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

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
    console.log("Welcome to toggle the document visibility");
    const { id } = req.params;

    const document = await DocumentPrice.findById(id);
    if (!document) {
      return res.status(404).json({ message: "Document price not found" });
    }

    const updated = await DocumentPrice.findByIdAndUpdate(
      id,
      { isVisible: !document.isVisible },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: `Document visibility toggled to ${updated.isVisible ? "visible" : "hidden"}`,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle document visibility", error });
  }
};


module.exports={
    getAllDocumentPrices,
    createDocumentPrice,
    updateDocumentPrice,
    deleteDocumentPrice

}
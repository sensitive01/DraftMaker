const express = require("express")
const documentPriceRouter = express()
const documentPriceController = require("../controller/documentPriceController")

documentPriceRouter.get("/get-all-document-price",documentPriceController.getAllDocumentPrices)
documentPriceRouter.post("/create-document-price",documentPriceController.createDocumentPrice)
documentPriceRouter.put("/update-document-price/:id",documentPriceController.updateDocumentPrice)
documentPriceRouter.delete("/delete-document-price/:id",documentPriceController.deleteDocumentPrice)

documentPriceRouter.post("/create-stamp-duty-price",documentPriceController.createStampDocumentPrice)
documentPriceRouter.get("/get-stamp-duty-price",documentPriceController.getStampDocumentPrice)
documentPriceRouter.put("/update-stamp-duty-price/:documentId",documentPriceController.updateStampDocumentPrice)
documentPriceRouter.put("/update-stamp-duty-status/:documentId",documentPriceController.updateStampDocumentStatus)


documentPriceRouter.post("/create-delivery-charge-price",documentPriceController.addServiceItem)
documentPriceRouter.get("/get-delivery-charge-price",documentPriceController.getAllServiceItems)
documentPriceRouter.put("/update-delivery-charge-price/:documentId",documentPriceController.updateServiceItem)
documentPriceRouter.put("/update-delivery-charge-status/:documentId",documentPriceController.updateServiceItemStatus)


documentPriceRouter.get("/get-stamp-delivery-price-data",documentPriceController.getStampDeiveryChargeData)









module.exports = documentPriceRouter
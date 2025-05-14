const express = require("express")
const documentPriceRouter = express()
const documentPriceController = require("../controller/documentPriceController")

documentPriceRouter.get("/get-all-document-price",documentPriceController.getAllDocumentPrices)
documentPriceRouter.post("/create-document-price",documentPriceController.createDocumentPrice)
documentPriceRouter.put("/update-document-price/:id",documentPriceController.updateDocumentPrice)
documentPriceRouter.delete("/delete-document-price/:id",documentPriceController.deleteDocumentPrice)






module.exports = documentPriceRouter
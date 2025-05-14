const express = require("express")
const documentRouter = express()
const documentController = require("../controller/documentsController")

// documentRouter.get("/get-documents-name-data",documentController.getDocumentNameData)
documentRouter.get("/get-all-booking-data",documentController.getAllBookingData)

documentRouter.post("/save-dual-name-correction-data",documentController.saveDualNameCorrection)
documentRouter.put("/update-dual-name-payment-data",documentController.updateDualNamePaymentData)

documentRouter.post("/save-name-correction-data",documentController.saveNameCorrection)
documentRouter.put("/update-name-correction-payment-data",documentController.saveNameCorrectionPaymentData)


// documentRouter.post("/save-dob-correction-data",documentController.createDobCorrection)
// documentRouter.put("/update-dob-correction-payment-data",documentController.saveDobCorrectionPaymentData)










module.exports = documentRouter
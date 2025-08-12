const express = require("express")
const documentRouter = express()
const documentController = require("../controller/documentsController")

documentRouter.get("/get-documents-name-data",documentController.getDocumentNameData)
documentRouter.get("/get-dashboard-statistics",documentController.getDashboardStatistics)
documentRouter.get("/get-all-booking-data",documentController.getAllBookingData)
documentRouter.get("/get-booking-table-document-details/:bookingId",documentController.getBookingDataPreview)

documentRouter.get("/get-document-names",documentController.getDocumentNames)
documentRouter.get("/get-uploaded-document-data",documentController.getUploadedDocumentData)
documentRouter.get("/get-uploaded-document-details/:bookingId",documentController.getUploadedBookingDetailsPreview)





documentRouter.post("/track-my-document-status",documentController.trackMyDocumentStatus)

documentRouter.get("/get-aggrement-preview-data/:bookingId",documentController.getDocumentFormData)
documentRouter.put("/update-booking-status/:bookingId",documentController.updateBookingStatus)



documentRouter.post("/save-dual-name-correction-data",documentController.saveDualNameCorrection)
documentRouter.put("/update-dual-name-payment-data",documentController.updateDualNamePaymentData)

documentRouter.post("/save-name-correction-data",documentController.saveNameCorrection)
documentRouter.put("/update-name-correction-payment-data",documentController.saveNameCorrectionPaymentData)


documentRouter.post("/save-dob-correction-data",documentController.createDobCorrection)
documentRouter.put("/update-dob-correction-payment-data",documentController.saveDobCorrectionPaymentData)

documentRouter.post("/save-gas-correction-data",documentController.createGasCorrection)
documentRouter.put("/update-gas-correction-payment-data",documentController.saveGasCorrectionPaymentData)



documentRouter.post("/save-document-lost-data",documentController.createDocumentLost)
documentRouter.put("/update-document-lost-payment-data",documentController.saveDocumentLostPaymentData)



documentRouter.post("/save-dob-parent-name-correction",documentController.createDobParentNameCorrection)
documentRouter.put("/update-dob-parent-name-correction",documentController.saveDobParentNameCorrection)



documentRouter.post("/save-birth-certificate-name-correction",documentController.createBirthCertificateNameCorrection)
documentRouter.put("/update-birth-certificate-name-correction",documentController.saveBirthCertificateNameCorrection)


documentRouter.post("/save-gst-data",documentController.saveGstData)
documentRouter.put("/update-gst-payment-data",documentController.saveGstPaymentData)


documentRouter.post("/save-metriculation-lost-data",documentController.createMetriculationLostData)
documentRouter.put("/update-metriculation-lost-payment-data",documentController.updateMetriculationLostPaymentData)


documentRouter.post("/save-khata-corrcetion-data",documentController.createKhataCorrectionData)
documentRouter.put("/update-khata-correction-payment-data",documentController.updateKhataCorrectionPaymentData)


documentRouter.post("/save-vehicle-insurence-data",documentController.createVehicleInsurenceData)
documentRouter.put("/update-vehicle-insurence-payment-data",documentController.updateVehicleInsurencePaymentData)


documentRouter.post("/save-huf-data",documentController.createHufData)
documentRouter.put("/update-huf-payment-data",documentController.updateHufPaymentData)

documentRouter.post("/save-gap-period-data",documentController.createGapPeriodData)
documentRouter.put("/update-gap-period-payment-data",documentController.updateGapPeriodData)


documentRouter.post("/save-password-annaxure-data",documentController.createPasswordAnnaxureData)
documentRouter.put("/update-password-annaxure-payment-data",documentController.updatePasswordAnnaxureData)

documentRouter.post("/save-passport-name-change-data",documentController.createPassportNameChangeData)
documentRouter.put("/update-passport-name-change-payment-data",documentController.updatePassportNameChangePaymentData)

documentRouter.post("/save-adress-affadavit-data",documentController.createAdressAffadavitData)
documentRouter.put("/update-adress-affadavit-payment-data",documentController.updateAdressAffadavitPaymentData)


documentRouter.post("/save-commercial-data",documentController.createCommercialData)
documentRouter.put("/update-commercial-payment-data",documentController.updateCommercialPaymentData)


documentRouter.post("/save-recidential-data",documentController.createRecidentialData)
documentRouter.put("/update-recidential-payment-data",documentController.updateRecidentialPaymentData)


documentRouter.post("/upload-document-data",documentController.uploadDocumentData)
documentRouter.put("/update-uploaded-document-status/:documentId",documentController.updateUploadedDocumentStatus)





// ...........................................................................................................................

documentRouter.get("/get-document-preview-data/:bookingId",documentController.getDocumentPreviewData)
documentRouter.put("/update-document-data/:bookingId",documentController.updateDocumentPreviewData)












module.exports = documentRouter
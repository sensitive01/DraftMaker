const express = require("express")
const messageRouter = express()
const messageController = require("../controller/messageController")


messageRouter.post("/get-otp",messageController.getOtp)
messageRouter.post("/verify-otp",messageController.verifyOtp)
messageRouter.post("/send-message",messageController.sendMessage)
messageRouter.get("/get-message-count",messageController.getMessageCount)
messageRouter.get("/get-all-message-data",messageController.getAllMessageData)
messageRouter.put("/update-message-data/:messageId",messageController.updateMessageData)







module.exports = messageRouter
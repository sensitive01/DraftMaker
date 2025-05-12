const express = require("express")
const signupRoute = express()
const signupController = require("../controller/signupController")

signupRoute.get("/",signupController.registerAdmin)

module.exports = signupRoute
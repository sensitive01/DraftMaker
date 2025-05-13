const express = require("express")
const loginRoute = express()
const loginController = require("../controller/loginController")

loginRoute.post("/login",loginController.adminLoginController)
loginRoute.post("/change-password",loginController.adminChangePassword)


module.exports = loginRoute
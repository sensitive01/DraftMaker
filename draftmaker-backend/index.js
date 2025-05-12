// index.js

const express = require("express");
const dbConnect = require("./config/database/dbConnect");
const cors  = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;
const adminSignUp = require("./routes/adminSignUpRoute");
const adminLogin = require("./routes/adminAuthRoute")

// Middleware
app.use(express.json());
app.use(cors())
dbConnect();


app.use("/", adminSignUp);
app.use("/admin", adminLogin);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

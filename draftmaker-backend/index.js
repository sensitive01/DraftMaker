const express = require("express");
const dbConnect = require("./config/database/dbConnect");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const { encrypt, decrypt } = require("./utils/ccAvanue");

const adminSignUp = require("./routes/adminSignUpRoute");
const adminLogin = require("./routes/adminAuthRoute");
const documentPrice = require("./routes/documentPriceRoute");
const documentRouter = require("./routes/documentsRoutes");
const messageRouter = require("./routes/messageRoutes");
const paymentRoutes = require("./routes/ccavenueRoutes");

// ✅ Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://draft-maker.vercel.app",
  " https://draft-maker.vercel.app/admin/login",
  "http://draftmaker.in",
  "https://draftmaker.in",
  "https://api.draftmaker.in",
  "https://secure.ccavenue.com",
  "https://api.ccavenue.com",
  "https://api.draftmaker.in/payment/response"

];

// ✅ CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or Postman)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Body parser middleware
app.use(express.json());

// Connect to DB
dbConnect();

// Routes
app.use("/", adminSignUp);
app.use("/admin", adminLogin);
app.use("/document-price", documentPrice);
app.use("/documents", documentRouter);
app.use("/message", messageRouter);
app.use("/payment", paymentRoutes);




// ✅ CORS error handler
app.use((err, req, res, next) => {
  if (err instanceof Error && err.message === "Not allowed by CORS") {
    return res
      .status(403)
      .json({ message: "CORS error: This origin is not allowed" });
  }
  next(err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

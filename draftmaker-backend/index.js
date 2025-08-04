const express = require("express");
const dbConnect = require("./config/database/dbConnect");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://draft-maker.vercel.app",
  "https://draftmaker.in",
];

// ✅ CORS Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin.trim())) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Middleware
app.use(express.json());

// Connect DB
dbConnect();

// ✅ API Routes
const adminSignUp = require("./routes/adminSignUpRoute");
const adminLogin = require("./routes/adminAuthRoute");
const documentPrice = require("./routes/documentPriceRoute");
const documentRouter = require("./routes/documentsRoutes");
const messageRouter = require("./routes/messageRoutes");

app.use("/", adminSignUp);
app.use("/admin", adminLogin);
app.use("/document-price", documentPrice);
app.use("/documents", documentRouter);
app.use("/message", messageRouter);

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ✅ CORS error handler
app.use((err, req, res, next) => {
  if (err instanceof Error && err.message === "Not allowed by CORS") {
    return res
      .status(403)
      .json({ message: "CORS error: This origin is not allowed" });
  }
  next(err);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

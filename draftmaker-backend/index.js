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
const uploadRoutes = require("./routes/uploadedRoute")

// ✅ Allowed frontend origins
const allowedOrigins = [
  // Local development
  "http://localhost:5173",
  "http://localhost:3000",

  // Production domains
  "https://draft-maker.vercel.app",
  "http://draftmaker.in",
  "https://draftmaker.in",
  "https://www.draftmaker.in",
  "https://api.draftmaker.in",

  // CCAvenue domains
  "https://secure.ccavenue.com",
  "https://test.ccavenue.com",
  "https://test.ccavenue.tech",
  "https://login.ccavenue.com",
  "https://api.ccavenue.com"
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check against allowed origins
    if (allowedOrigins.includes(origin) ||
      origin.endsWith('.ccavenue.com') ||
      origin.endsWith('.ccavenue.tech')) {
      return callback(null, true);
    }


    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'x-cc-request-type',
    'x-cc-merchant-id',
    'x-cc-access-code',
    'x-cc-auth-token'
  ],
  exposedHeaders: [
    'Content-Range',
    'X-Total-Count'
  ],
  maxAge: 86400 // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Log CORS and request info for debugging
app.use((req, res, next) => {


  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
    res.header('Access-Control-Max-Age', '86400');
    return res.status(200).end();
  }

  next();
});


// Body parser middleware - must be before any route handlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded

// Connect to DB
dbConnect();

// Log all requests (for debugging)
app.use((req, res, next) => {







  next();
});

// Routes
app.use("/", adminSignUp);
app.use("/admin", adminLogin);
app.use("/document-price", documentPrice);
app.use("/documents", documentRouter);
app.use("/message", messageRouter);
app.use("/payment", paymentRoutes);
// app.use('/upload', uploadRoutes); 




// ✅ CORS error handler
app.use((err, req, res, next) => {
  if (err instanceof Error && err.message.startsWith('Not allowed by CORS')) {
   
    return res.status(403).json({
      success: false,
      message: 'CORS error: This origin is not allowed',
      error: err.message,
      allowedOrigins: allowedOrigins
    });
  }
  next(err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

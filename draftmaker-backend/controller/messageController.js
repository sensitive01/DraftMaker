const messageSchema = require("../model/messages/messageModel");

const getOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    console.log("Mobile:", mobile);

    const otp = Math.floor(10000 + Math.random() * 90000);

    req.app.locals.otps = req.app.locals.otps || {};
    req.app.locals.otps[mobile] = otp;

    setTimeout(() => {
      delete req.app.locals.otps[mobile];
      console.log(`OTP for ${mobile} expired`);
    }, 60 * 1000);

    console.log(`Generated OTP for ${mobile}: ${otp}`);

    res.status(200).json({
      success: true,
      message: "OTP generated successfully",
      otp: otp,
    });
  } catch (err) {
    console.log("Error in getting the OTP", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    console.log(`Verifying OTP for mobile: ${mobile}, received OTP: ${otp}`);

    const storedOtp = req.app.locals.otps && req.app.locals.otps[mobile];

    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
    }

    if (parseInt(otp) === storedOtp) {
      delete req.app.locals.otps[mobile];

      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (err) {
    console.log("Error in verifying OTP:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    console.log(name, email, mobile, message);

    // Create new contact document
    const newMessage = new messageSchema({
      name,
      email,
      mobile,
      message,
    });

    // Save to DB
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
      data: newMessage,
    });
  } catch (err) {
    console.log("Error in saving the message", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMessageCount = async (req, res) => {
  try {
    const messageCount = await messageSchema.countDocuments({ isSeen: false });

    res.status(200).json({
      success: true,
      count: messageCount,
    });
  } catch (err) {
    console.log("Error in getting the chat count", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllMessageData = async (req, res) => {
  try {
    const messageData = await messageSchema.find();

    res.status(200).json({
      success: true,
      data: messageData,
    });
  } catch (err) {
    console.log("Error in getting the chat count", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateMessageData = async (req, res) => {
  try {
    const { messageId } = req.params;
    console.log("Updating message ID:", messageId);


    const updatedMessage = await messageSchema.findByIdAndUpdate(
      {_id:messageId},
      { isSeen: true },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message marked as seen",
      data: updatedMessage,
    });

  } catch (err) {
    console.log("Error in updating the message data", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  updateMessageData,
  getAllMessageData,
  getMessageCount,
  getOtp,
  verifyOtp,
  sendMessage,
};

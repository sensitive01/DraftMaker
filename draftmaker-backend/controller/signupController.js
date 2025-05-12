const bcrypt = require("bcryptjs");
const User = require("../model/signUpSchema");
const {
  DRAFT_MAKER_ADMIN_EMAIL,
  DRAFT_MAKER_ADMIN_PASSWORD,
} = require("../config/variables/variables");

const registerAdmin = async () => {
  try {
    console.log("werlcome",  DRAFT_MAKER_ADMIN_PASSWORD,DRAFT_MAKER_ADMIN_EMAIL)
    const existingAdmin = await User.findOne({
      email: DRAFT_MAKER_ADMIN_EMAIL,
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(DRAFT_MAKER_ADMIN_PASSWORD, 10);

      const adminUser = new User({
        username: "Admin",
        email: DRAFT_MAKER_ADMIN_EMAIL, 
        mobile: "0000000000",
        password: hashedPassword,
        termsAccepted: true,
        isAdmin: true, 
      });

      await adminUser.save();
      console.log("Admin user registered.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error registering admin:", error);
  }
};

module.exports = {
    registerAdmin
    
};

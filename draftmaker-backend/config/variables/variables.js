require("dotenv").config()



module.exports = {
    MONGO_USERNAME:process.env.MONGO_USERNAME,
    MONGO_PASSWORD:process.env.MONGO_PASSWORD,
    MONGO_DATABASE_NAME:process.env.MONGO_DATABASE_NAME,
    DRAFT_MAKER_ADMIN_EMAIL :process.env. DRAFT_MAKER_ADMIN_EMAIL,
    DRAFT_MAKER_ADMIN_PASSWORD : process.env.DRAFT_MAKER_ADMIN_PASSWORD,
    JWT_SECRET:process.env.JWT_SECRET
} 
const mongoose = require("mongoose");
const { logger } = require("../utils/Logger");
require("dotenv").config();


exports.dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser :true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        logger("✅ Database connected successfully");
    })
    .catch((err)=>{
        logger("❌ Database connection failed");
        console.error(err);
        process.exit(1);
    })
}









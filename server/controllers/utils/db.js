//brew services restart mongodb-community

const mongoose = require("mongoose");

// const URL = "mongodb://127.0.0.1:27017/mern_admin";
const URL = process.env.MONGODB_URL;

// mongoose.connect(URI);

const connectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connection successfully to DB");
    } catch (error) {
        console.log("Database connection failed");
        process.exit(0);
    }
}

module.exports = connectDB;
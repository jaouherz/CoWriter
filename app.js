require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB is connected!"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/test", (req, res) => {
    res.send("✅ Test route is working!");
});

app.get("/", (req, res) => {
    res.send("📖 CoWriter API is running...");
});
app.use("/users", userRoutes);
app.use('/auth', authRoutes);

module.exports = app;

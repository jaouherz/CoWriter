const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
    token: { type: String },
    isActivated: { type: Boolean, default: false },
    teamLeader: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
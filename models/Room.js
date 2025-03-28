const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pendingMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    visibility: { type: String, enum: ["public", "private"], default: "public" },
}, { timestamps: true });

module.exports = mongoose.model("Room", RoomSchema);

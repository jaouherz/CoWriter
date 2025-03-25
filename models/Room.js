const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const RoomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        code: { type: String, unique: true, default: () => uuidv4().slice(0, 8) },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        deadline: { type: Date, required: true },
        story: { type: mongoose.Schema.Types.ObjectId, ref: "Story", default: null }
    },
    { timestamps: true }
);

RoomSchema.statics.generateRoomCode = function () {
    return uuidv4().slice(0, 8);
};

module.exports = mongoose.model("Room", RoomSchema);

const mongoose = require("mongoose");
const ChapterVersionSchema = new mongoose.Schema({
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    votes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("ChapterVersion", ChapterVersionSchema);

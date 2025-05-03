const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    chapterNumber: { type: Number, required: true },
    confirmedVersion: { type: mongoose.Schema.Types.ObjectId, ref: "ChapterVersion", default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Chapter", ChapterSchema);

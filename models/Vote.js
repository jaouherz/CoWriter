const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
    chapterVersion: { type: mongoose.Schema.Types.ObjectId, ref: "ChapterVersion", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });


module.exports = mongoose.model("Vote", VoteSchema);
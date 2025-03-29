const Chapter = require("../models/Chapter");
const Book = require("../models/Book");
const Vote = require("../models/Vote");
const ChapterVersion = require("../models/ChapterVersion");
class ChapterService {
    static async startBook(bookId) {
        const firstChapter = new Chapter({ book: bookId, chapterNumber: 1 });
        await firstChapter.save();
        return { message: "Book started! Chapter 1 is open for submissions." };
    }

    static async submitChapterVersion(chapterId, content, createdBy) {
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) throw new Error("Chapter not found!");

        const newVersion = new ChapterVersion({ chapter: chapterId, content, createdBy });
        await newVersion.save();
        return newVersion;
    }

    static async voteForVersion(versionId, userId) {
        const version = await ChapterVersion.findById(versionId);
        if (!version) throw new Error("Chapter version not found!");

        const existingVote = await Vote.findOne({ chapterVersion: versionId, user: userId });
        if (existingVote) throw new Error("User already voted for this version!");

        const vote = new Vote({ chapterVersion: versionId, user: userId });
        await vote.save();

        version.votes += 1;
        await version.save();

        return { message: "Vote recorded successfully!", votes: version.votes };
    }

    static async confirmChapter(chapterId) {
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) throw new Error("Chapter not found!");

        const now = new Date();
        if (chapter.voteDeadline && now < chapter.voteDeadline) {
            throw new Error("Voting is still ongoing for this chapter.");
        }

        const versions = await ChapterVersion.find({ chapter: chapterId });
        if (versions.length === 0) throw new Error("No versions submitted!");

        const bestVersion = versions.reduce((max, v) => (v.votes > max.votes ? v : max), versions[0]);
        if (!bestVersion) throw new Error("No version received votes!");

        chapter.confirmedVersion = bestVersion._id;
        await chapter.save();

        const book = await Book.findById(chapter.book);

        if (!book.chapters.includes(chapter._id)) {
            book.chapters.push(chapter._id);
            await book.save();
        }

        if (!book.lastChapterDeclared) {
            const nextChapter = new Chapter({ book: chapter.book, chapterNumber: chapter.chapterNumber + 1 });
            await nextChapter.save();

            book.chapters.push(nextChapter._id);
            await book.save();
        }

        return { message: `Chapter ${chapter.chapterNumber} confirmed! Next chapter created.`, bestVersion };
    }

    static async getChaptersByBook(bookId) {
        return await Chapter.find({ book: bookId, confirmed: true }).populate("createdBy", "name");
    }

    static async getChapterById(chapterId) {
        return await Chapter.findById(chapterId).populate("createdBy", "name");
    }

    static async getChapterVersions(chapterId) {
        return await ChapterVersion.find({ chapter: chapterId }).populate("createdBy", "name");
    }

    static async getCurrentVotingSession(bookId) {
        return await Vote.find({ book: bookId }).populate("chapterVersion", "content").populate("user", "name");
    }
}

module.exports = ChapterService;

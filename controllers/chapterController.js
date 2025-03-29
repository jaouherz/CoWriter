const ChapterService = require("../services/chapterService");

class ChapterController {
    static async submitChapterVersion(req, res) {
        try {
            const { chapterId, content, createdBy } = req.body;
            const version = await ChapterService.submitChapterVersion(chapterId, content, createdBy);
            res.status(201).json({ message: "Chapter version submitted!", version });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async voteForVersion(req, res) {
        try {
            const { versionId, userId } = req.body;
            const result = await ChapterService.voteForVersion(versionId, userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async confirmChapter(req, res) {
        try {
            const { chapterId } = req.body;
            const result = await ChapterService.confirmChapter(chapterId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getChaptersByBook(req, res) {
        try {
            const { bookId } = req.params;
            const chapters = await ChapterService.getChaptersByBook(bookId);
            res.status(200).json(chapters);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getChapterById(req, res) {
        try {
            const { chapterId } = req.params;
            const chapter = await ChapterService.getChapterById(chapterId);
            res.status(200).json(chapter);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getChapterVersions(req, res) {
        try {
            const { chapterId } = req.params;
            const versions = await ChapterService.getChapterVersions(chapterId);
            res.status(200).json(versions);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async getCurrentVotingSession(req, res) {
        try {
            const { bookId } = req.params;
            const votingSession = await ChapterService.getCurrentVotingSession(bookId);
            res.status(200).json(votingSession);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ChapterController;

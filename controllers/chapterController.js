const ChapterService = require("../services/chapterService");

class ChapterController {
    static async addChapter(req,res){
        try {
            const{bookId,title,createdBy,chapterDeadline}=req.body;
            if (!bookId || !createdBy) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            const chapter=await ChapterService.createChapter(bookId,title,createdBy,chapterDeadline);
            res.send(chapter)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
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
            console.log("versionId mel controller "+versionId)
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
    static async getVotesByUser(req,res){
        try {
            const { userId }=req.params
            const votes=await ChapterService.getVotesByUser(userId);
            res.status(200).json(votes);
        }
        catch (error){
            res.status(400).json({error:error.message});
        }
    }

    static async getChapterById(req, res) {
        try {
            const { chapterId } = req.params;
            const chapter = await ChapterService.getChapterById(chapterId);
            if (!chapter) {
                return res.status(404).json({ error: "Chapter not found" });
            }
            if (chapter.chapterDeadline && new Date(chapter.chapterDeadline) < new Date()) {
                await ChapterService.confirmChapter(chapterId);
                const updatedChapter = await ChapterService.getChapterById(chapterId);

                return res.status(200).json(updatedChapter);
            }

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

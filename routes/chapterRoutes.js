const express = require("express");
const router = express.Router();
const ChapterController = require("../controllers/chapterController");


router.post("/submit-version", ChapterController.submitChapterVersion);
router.post("/addChapter", ChapterController.addChapter);
router.post("/vote", ChapterController.voteForVersion);
router.post("/confirm", ChapterController.confirmChapter);
router.get("/book/:bookId", ChapterController.getChaptersByBook);
router.get("/voteByUser/:userId",ChapterController.getVotesByUser)
router.get("/:chapterId", ChapterController.getChapterById);

router.get("/:chapterId/versions", ChapterController.getChapterVersions);

router.get("/book/:bookId/voting", ChapterController.getCurrentVotingSession);
module.exports = router;

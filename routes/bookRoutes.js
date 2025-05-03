const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");
const upload = require("../middlewares/uploadMiddleware");

router.post("/create",upload.single('coverImage'), BookController.createBook);



router.post("/mark-last", BookController.markLastChapter);
router.post("/mark-completed", BookController.markBookAsCompleted);
router.get("/room/:roomId", BookController.getBooksByRoom);
router.get("/:bookId", BookController.getBookById);

module.exports = router;

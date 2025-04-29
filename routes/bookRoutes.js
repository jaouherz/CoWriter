const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");

router.post("/create", BookController.createBook);

router.get("/room/:roomId", BookController.getBooksByRoom);

router.get("/:bookId", BookController.getBookById);

router.post("/mark-last", BookController.markLastChapter);
router.post("/mark-completed", BookController.markBookAsCompleted);
module.exports = router;

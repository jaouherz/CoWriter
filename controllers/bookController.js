const BookService = require("../services/bookService");

class BookController {
    static async createBook(req, res) {
        try {
            const { title, type, roomId, createdBy, firstChapterContent,description } = req.body;
            const book = await BookService.createBook(title, type, roomId, createdBy,description, firstChapterContent);
            res.status(201).json({ message: "Book created successfully!", book });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }static async markBookAsCompleted(req, res) {
        try {
            const { bookId, userId } = req.body;
            const book = await BookService.markBookAsCompleted(bookId, userId);
            res.status(200).json({ message: "Book marked as completed.", book });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getBooksByRoom(req, res) {
        try {
            const { roomId } = req.params;
            const books = await BookService.getBooksByRoom(roomId);
            res.status(200).json(books);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getBookById(req, res) {
        try {
            const { bookId } = req.params;
            const book = await BookService.getBookById(bookId);
            res.status(200).json(book);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async markLastChapter(req, res) {
        try {
            const { bookId, userId } = req.body;
            const book = await BookService.markLastChapter(bookId, userId);
            res.status(200).json({ message: "The next chapter is marked as the last.", book });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = BookController;

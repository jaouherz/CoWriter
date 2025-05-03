const Book = require("../models/Book");
const Chapter = require("../models/Chapter");
const Room = require("../models/Room");
const RoomService=require("./roomService")
const ChapterVersion  = require("../models/ChapterVersion");

class BookService {
    static async createBook(title, type, roomId, createdBy, firstChapterContent,description,coverImage) {
        const room = await RoomService.getRoomById(roomId);
        if (!room) throw new Error("Room not found!");

        // if (room.createdBy.id !== createdBy.id) {
        //     throw new Error("Only the room creator can create books.");
        // }

        const existingUncompletedBook = await Book.findOne({ room: roomId, completed: false });
        if (existingUncompletedBook) {
            throw new Error("You cannot create a new book until all previous books are marked as completed.");
        }

        const book = new Book({ title, type,description, room: roomId, createdBy, chapters: [],coverImage });
        await book.save();

        const firstChapter = new Chapter({ book: book._id, chapterNumber: 1 });
        await firstChapter.save();

        const firstChapterVersion = new ChapterVersion({
            chapter: firstChapter._id,
            content: firstChapterContent,
            createdBy: createdBy,
            votes: 0
        });
        await firstChapterVersion.save();

        firstChapter.confirmedVersion = firstChapterVersion._id;
        await firstChapter.save();

        book.chapters.push(firstChapter._id);
        await book.save();

        const secondChapter = new Chapter({ book: book._id, chapterNumber: 2 });
        await secondChapter.save();

        book.chapters.push(secondChapter._id);
        await book.save();

        return book;
    }



    static async getBooksByRoom(roomId) {
        return await Book.find({ room: roomId }).populate("chapters").populate("createdBy", "name");
    }

    static async getBookById(bookId) {
        return await Book.findById(bookId).populate("chapters").populate("createdBy", "name");
    }

    static async markLastChapter(bookId, userId) {
        const book = await Book.findById(bookId);
        if (!book) throw new Error("Book not found!");

        const room = await Room.findById(book.room);
        if (room.createdBy.toString() !== userId.toString()) {
            throw new Error("Only the room creator can mark the last chapter.");
        }

        book.lastChapterDeclared = true;
        await book.save();
        return book;
    }
    static async markBookAsCompleted(bookId, userId) {
        const book = await Book.findById(bookId);
        if (!book) throw new Error("Book not found!");
        if (book.createdBy.toString() !== userId.toString()) {
            throw new Error("Only the book creator can mark it as completed.");
        }

        book.completed = true;
        await book.save();
        return book;
    }
}

module.exports = BookService;

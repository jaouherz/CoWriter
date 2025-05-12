const Book = require("../models/Book");
const Chapter = require("../models/Chapter");
const Room = require("../models/Room");
const RoomService=require("./roomService")
const ChapterService=require("./chapterService")
const UserService=require("./UserService")
const ChapterVersion  = require("../models/ChapterVersion");

class BookService {
    static async createBook(title, type, roomId, createdBy, firstChapterContent,description,coverImage) {
        const room = await RoomService.getRoomById(roomId);
        if (!room) throw new Error("Room not found!");
        const user=await UserService.getUserById(createdBy)
        if (!user) throw new Error("User not found!");


        const existingUncompletedBook = await Book.findOne({ room: roomId, completed: false });
        if (existingUncompletedBook) {
            throw new Error("You cannot create a new book until all previous books are marked as completed.");
        }

        const book = new Book({ title, type, description, room, createdBy: user._id, chapters: [], coverImage });
        await book.save();
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 2);
        const firstChapter=await ChapterService.createChapter(book._id, "test test", user._id,deadline);
        const firstChapterVersion=await ChapterService.submitChapterVersion(firstChapter._id,firstChapterContent,user._id)

        firstChapter.confirmedVersion = firstChapterVersion._id;
        await firstChapter.save();



        await ChapterService.createChapter(book._id, "Chapter 2", user._id);


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
    static async getAllBooks(){
        return await Book.find().populate("chapters").populate("createdBy", "name");
    }
}

module.exports = BookService;

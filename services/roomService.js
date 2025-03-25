const Room = require("../models/Room");
const User = require("../models/User");

class RoomService {
    static async createRoom(name, createdBy, deadline) {
        const existingRoom = await Room.findOne({ name });
        if (existingRoom) throw new Error("Room name already exists!");

        const newRoom = new Room({
            name,
            createdBy,
            deadline,
        });

        return await newRoom.save();
    }

    static async joinRoom(userId, code) {
        const room = await Room.findOne({ code });
        if (!room) throw new Error("Invalid room code!");

        if (room.users.includes(userId)) throw new Error("You are already in this room!");

        room.users.push(userId);
        await room.save();

        return room;
    }

    static async getAllRooms() {
        return await Room.find().populate("createdBy", "name").populate("users", "name");
    }

    static async getRoomById(roomId) {
        return await Room.findById(roomId).populate("createdBy", "name").populate("users", "name");
    }
}

module.exports = RoomService;
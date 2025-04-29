const Room = require("../models/Room");
const fs = require('fs');

class RoomService {
    static async generateUniqueCode() {
        let code;
        let isUnique = false;

        while (!isUnique) {
            code = Math.random().toString(36).substring(2, 8).toUpperCase(); // Example: "A1B2C3"
            const existingRoom = await Room.findOne({ code });
            if (!existingRoom) isUnique = true;
        }

        return code;
    }

    static async createRoom(name, createdBy, visibility = 'public',coverImage,description) {
        const code = await this.generateUniqueCode();

        const newRoom = new Room({
            name,
            code,
            createdBy,
            users: [createdBy],
            coverImage,
            description,
            visibility,
            pendingMembers: [],
        });

        return await newRoom.save();
    }
    static async acceptJoinRequest(roomCode, userId) {
        const room = await Room.findOne({ code: roomCode });

        if (!room) throw new Error("Room not found!");
        if (!room.pendingMembers.includes(userId)) {
            throw new Error("User is not in the pending list!");
        }
        room.users.push(userId);
        room.pendingMembers = room.pendingMembers.filter(user => user.toString() !== userId.toString());
        await room.save();

        return room;
    }

    static async joinRoom(userId, code) {
        const room = await Room.findOne({ code });
        if (!room) throw new Error("Invalid room code!");

        if (room.visibility === "public") {
            if (room.users.includes(userId)) throw new Error("You are already in this room!");

            room.users.push(userId);
            await room.save();
            return room;
        }

        if (room.visibility === "private") {
            if (room.pendingMembers.includes(userId)) {
                throw new Error("You are already waiting for approval!");
            }

            room.pendingMembers.push(userId);
            await room.save();
            return room;
        }

        return null;
    }
    static async getAllRooms() {
        return await Room.find().populate("createdBy", "name").populate("users", "name");
    }

    static async getRoomById(roomId) {
        return await Room.findById(roomId).populate("createdBy", "name").populate("users", "name");
    }
    static async getMyRoom(userId){
        return Room.find({
            $or: [
                {creaatedBy: userId},
                {users: userId}
            ]}).populate("createdBy", "name").populate("users", "name");
    }
    static async canVote(roomCode, userId) {
        const room = await Room.findOne({ code: roomCode });

        if (!room) throw new Error("Room not found!");
        if (room.visibility === "public") return true;
        if (room.users.includes(userId)) return true;

        return false;
    }
    static async banUserFromRoom(roomCode, userId) {
        const room = await Room.findOne({ code: roomCode });

        if (!room) throw new Error("Room not found!");
        room.users = room.users.filter(user => user.toString() !== userId.toString());
        room.pendingMembers = room.pendingMembers.filter(user => user.toString() !== userId.toString());
        await room.save();

        return room;
    }
    static async getPendingUsers(roomCode) {
        const room = await Room.findOne({ code: roomCode });

        if (!room) throw new Error("Room not found!");
        return room.pendingMembers;
    }
}

module.exports = RoomService;
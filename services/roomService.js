const Room = require("../models/Room");
const User = require("../models/User");

class RoomService {
    // Generate unique 6-character room code
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

    // Create a new room
    static async createRoom(name, createdBy, visibility = 'public') {
        const code = await this.generateUniqueCode();

        const newRoom = new Room({
            name,
            code,
            createdBy,
            users: [createdBy],
            visibility,  // Added visibility here
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

        // Public room: anyone can join
        if (room.visibility === "public") {
            // Check if user is already in the room
            if (room.users.includes(userId)) throw new Error("You are already in this room!");

            room.users.push(userId);
            await room.save();
            return room;
        }

        // Private room: user needs approval from the creator
        if (room.visibility === "private") {
            // Check if the user is already in the pending list
            if (room.pendingMembers.includes(userId)) {
                throw new Error("You are already waiting for approval!");
            }

            room.pendingMembers.push(userId);
            await room.save();
            return room; // Join request is sent
        }

        return null;
    }
    // Get all rooms
    static async getAllRooms() {
        return await Room.find().populate("createdBy", "name").populate("users", "name");
    }

    static async getRoomById(roomId) {
        return await Room.findById(roomId).populate("createdBy", "name").populate("users", "name");
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
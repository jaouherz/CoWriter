const RoomService = require("../services/roomService");

class RoomController {
    static async createRoom(req, res) {
        try {
            const { name, createdBy, visibility } = req.body;
            const room = await RoomService.createRoom(name, createdBy, visibility);
            res.status(201).json({ message: "Room created sucdcessfully!", room });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    static async joinRoom(req, res) {
        try {
            const { userId, code } = req.body;
            const room = await RoomService.joinRoom(userId, code);
            res.status(200).json({ message: "Joined room successfully!", room });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllRooms(req, res) {
        try {
            const rooms = await RoomService.getAllRooms();
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getRoomById(req, res) {
        try {
            const { roomId } = req.params;
            const room = await RoomService.getRoomById(roomId);
            if (!room) return res.status(404).json({ error: "Room not found!" });

            res.status(200).json(room);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async acceptJoinRequest(req, res) {
        try {
            const { roomCode, userId } = req.body;
            const room = await RoomService.acceptJoinRequest(roomCode, userId);
            res.status(200).json({ message: "User joined the room successfully!", room });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async banUserFromRoom(req, res) {
        try {
            const { roomCode, userId } = req.body;
            const room = await RoomService.banUserFromRoom(roomCode, userId);
            res.status(200).json({ message: "User has been banned from the room!", room });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async getPendingUsers(req, res) {
        try {
            const { roomCode } = req.params;
            const pendingUsers = await RoomService.getPendingUsers(roomCode);
            res.status(200).json({ pendingUsers });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = RoomController;
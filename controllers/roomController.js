const RoomService = require("../services/roomService");

class RoomController {
    static async createRoom(req, res) {
        try {
            const { name, createdBy, deadline } = req.body;
            const room = await RoomService.createRoom(name, createdBy, deadline);
            res.status(201).json(room);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async joinRoom(req, res) {
        try {
            const { userId, code } = req.body;
            const room = await RoomService.joinRoom(userId, code);
            res.status(200).json(room);
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
}

module.exports = RoomController;

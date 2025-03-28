const express = require("express");
const RoomController = require("../controllers/roomController");

const router = express.Router();
// Create a new room
router.post("/create", RoomController.createRoom);

// Join a room by code
router.post("/join", RoomController.joinRoom);

// Get all rooms
router.get("/", RoomController.getAllRooms);

// Get a room by ID
router.get("/:roomId", RoomController.getRoomById);

// Accept a join request (only for the room creator)
router.post("/accept-join-request", RoomController.acceptJoinRequest);

// Ban a user from the room (only for the room creator)
router.post("/ban-user", RoomController.banUserFromRoom);

// Get pending users for a specific room
router.get("/:roomCode/pending-users", RoomController.getPendingUsers);

module.exports = router;

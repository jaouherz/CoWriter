const express = require("express");
const RoomController = require("../controllers/roomController");

const router = express.Router();
router.post("/create", RoomController.createRoom);

router.post("/join", RoomController.joinRoom);

router.get("/", RoomController.getAllRooms);

router.get("/:roomId", RoomController.getRoomById);

router.post("/accept-join-request", RoomController.acceptJoinRequest);

router.post("/ban-user", RoomController.banUserFromRoom);

router.get("/:roomCode/pending-users", RoomController.getPendingUsers);

module.exports = router;

const express = require("express");
const RoomController = require("../controllers/roomController");

const router = express.Router();

router.post("/create", RoomController.createRoom);
router.post("/join", RoomController.joinRoom);
router.get("/", RoomController.getAllRooms);
router.get("/:roomId", RoomController.getRoomById);

module.exports = router;

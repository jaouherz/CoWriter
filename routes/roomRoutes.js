const express = require("express");
const RoomController = require("../controllers/roomController");
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();
router.post("/create",upload.single('coverImage'), RoomController.createRoom);

router.post("/join", RoomController.joinRoom);

router.get("/all", RoomController.getAllRooms);

router.get("/:roomId", RoomController.getRoomById);

router.get("/myrooms/:id",RoomController.getMyrooms)

router.post("/accept-join-request", RoomController.acceptJoinRequest);

router.post("/ban-user", RoomController.banUserFromRoom);

router.get("/:roomCode/pending-users", RoomController.getPendingUsers);
router.get('/stats/room-user-count', RoomController.getRoomsUserCount);

module.exports = router;

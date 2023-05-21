import express from "express";
import {  getRoom, updateRoom,deleteRoom,getRooms, createRoom ,updateRoomAvailability} from "../controllers/rooms.js";

const router=express.Router();

router.post("/:hotelid",createRoom)
router.put("/:id",updateRoom)
router.put("/availability/:id",updateRoomAvailability)
router.delete("/:id/:hotelid",deleteRoom)
router.get("/:id",getRoom)
router.get("/",getRooms)

export default router;
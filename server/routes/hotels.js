import express from "express";
import { createHotel, getHotel, updateHotel,deleteHotel,getHotels,countByCity, countByType,getHotelRooms} from "../controllers/hotels.js";


const router=express.Router();

router.post("/",createHotel);
router.put("/:id",updateHotel)
router.delete("/:id",deleteHotel)
router.get("/find/:id",getHotel)
router.get("/",getHotels)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)


export default router;
import express from "express";
import {  getUser, updateUser,deleteUser,getUsers } from "../controllers/users.js";
import { verifyToken } from "../utils/verify.js";

const router=express.Router();

router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("Yoe are logged in!")
})
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)
router.get("/:id",getUser)
router.get("/",getUsers)

export default router;
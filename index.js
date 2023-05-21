import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from '../hotel/server/routes/auth.js';
import hotelsRoute from '../hotel/server/routes/hotels.js';
import roomsRoute from '../hotel/server/routes/rooms.js';
import usersRoute from '../hotel/server/routes/users.js';
import cors from 'cors'
const app=express();
const PORT=process.env.PORT || 8000;
dotenv.config();

const Connection=async()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to db");
  } catch (error) {
    throw(error);
  }
};
mongoose.connection.on('connected',()=>{
    console.log("db connected");
})
mongoose.connection.on('disconnected',()=>{
    console.log("db disconnected");
})

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500;
  const errorMess=err.message || "Something went wrong!"
  return res.status(errorStatus).json(errorMess);
})
app.listen(PORT,()=>{
    Connection();
    console.log('app is listening on port 8000')})
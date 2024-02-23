import express from "express";
import {getUser,updateProfile} from "../controllers/user.js"

const usersRoute = express.Router();

usersRoute.get("/getProfile",getUser);
usersRoute.put("/updateProfile",updateProfile);

export default usersRoute;
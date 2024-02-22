import express from "express";
import {getUser} from "../controllers/user.js"

const usersRoute = express.Router();

usersRoute.get("/getProfile",getUser)

export default usersRoute;
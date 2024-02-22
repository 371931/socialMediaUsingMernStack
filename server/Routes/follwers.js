import express from "express";
import { getFollowers,postFollowers,deleteFollowers } from "../controllers/followers.js";

const follwersRoute = express.Router();

follwersRoute.get("/getFollwers",getFollowers);
follwersRoute.post("/followed",postFollowers);
follwersRoute.delete("/unFollowed",deleteFollowers);

export default follwersRoute;
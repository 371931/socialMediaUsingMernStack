import express from "express";
import { getComments,addComments } from "../controllers/comments.js";

const commentRoute = express.Router();

commentRoute.get("/allComments",getComments);
commentRoute.post("/addComment",addComments);

export default commentRoute;
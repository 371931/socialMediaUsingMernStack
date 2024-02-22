import express from "express";
import { getLikes,likePost,removeLike } from "../controllers/likes.js";

const likesRouter = express.Router();

likesRouter.get("/getLikes",getLikes);
likesRouter.post("/likePost", likePost);
likesRouter.delete("/removeLike", removeLike);

export default likesRouter;
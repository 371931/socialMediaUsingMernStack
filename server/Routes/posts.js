import express from "express";
import { getPosts, addPost } from "../controllers/posts.js";
const postRouter = express.Router();

postRouter.get("/allPosts",getPosts);
postRouter.post("/addPost",addPost);

export default postRouter;
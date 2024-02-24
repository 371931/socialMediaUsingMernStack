import express from "express";
import { getPosts, addPost, deletePost } from "../controllers/posts.js";
const postRouter = express.Router();

postRouter.get("/allPosts",getPosts);
postRouter.post("/addPost",addPost);
postRouter.delete("/deletePost",deletePost);

export default postRouter;
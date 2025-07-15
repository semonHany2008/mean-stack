import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "./posts.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { verifyRole } from "../../middlewares/verifyRole.js";

export const postsRoutes = express.Router();

postsRoutes.get("/posts", verifyToken, verifyRole, getPosts);

postsRoutes.post("/post", verifyToken, verifyRole, addPost);

postsRoutes.put("/post/:id", verifyToken, verifyRole, updatePost);

postsRoutes.delete("/post/:id", verifyToken, verifyRole, deletePost);

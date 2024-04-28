import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newPost,getPost,updatePost,deletePost,getPostById,addComment } from "../controllers/blog.js";

const router=express.Router();

router.post("/new",isAuthenticated, newPost);

router.get("/all",isAuthenticated,getPost);

router.get("/:id",isAuthenticated,getPostById);

router.put("/:id",isAuthenticated, updatePost);

router.put("/comment/:id",isAuthenticated, addComment);

router.delete("/:id",isAuthenticated, deletePost);

export default router;
import express from "express";
import { getMyProfile, login, logout, register,getUserById } from "../controllers/user.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);
 
router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

router.get("/:id",isAuthenticated, getUserById);

export default router;
import express from "express";
import {
  login,
  logout,
  signup,
  getMe,
  getProfile,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.get("/profile", protectRoute, getProfile);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;

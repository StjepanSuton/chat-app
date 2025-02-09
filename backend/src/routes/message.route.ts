import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getMessages,
  getUsersForSidebar,
  markConversationSeen,
  sendMessage,
} from "../controllers/message.controller.js";
const router = express.Router();

router.get("/conversations", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.patch("/mark-seen", protectRoute, markConversationSeen);

export default router;

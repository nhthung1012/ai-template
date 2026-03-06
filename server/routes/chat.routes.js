const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const authOptional = require("../middleware/authOptional.middleware")
const upload = require("../middleware/upload.middleware")
const {
  sendMessage,
  getUserConversations,
  getConversationDetail,
  renameConversation,
  deleteConversation
} = require("../controllers/chat.controller")

const router = express.Router()

router.post("/message", authOptional, upload.array("files", 5), sendMessage)
router.get("/conversations", authMiddleware, getUserConversations)
router.get("/conversation/:id", authMiddleware, getConversationDetail)
router.put("/conversation/:id", authMiddleware, renameConversation)
router.delete("/conversation/:id", authMiddleware, deleteConversation)

module.exports = router
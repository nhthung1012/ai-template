const Conversation = require("../models/Conversation")
const Message = require("../models/Message")
const File = require("../models/File")

const {
  generateAIResponse,
  generateTitle,
  generateFakeResponse,
  generateFakeTitle
} = require("../services/ai.service")

exports.sendMessage = async (req, res) => {
  try {
    let { conversationId, content } = req.body
    const file = req.file || null

    if (!content && !file) {
      return res.status(400).json({ message: "Content or file is required" })
    }

    const isGuest = !req.user
    let isNewConversation = false
    let history = []
    let savedFile = null

    /*
    CREATE CONVERSATION
    */

    if (!isGuest) {
      if (!conversationId) {
        const conversation = await Conversation.create({
          title: "New Chat",
          user: req.user.userId
        })

        conversationId = conversation._id
        isNewConversation = true
      }
    }

    /*
    SAVE FILES (only logged user)
    */

    if (!isGuest && file) {
      savedFile = await File.create({
        user: req.user.userId,
        conversation: conversationId,
        fileName: file.filename,
        originalName: file.originalname,
        path: `uploads/${file.filename}`,
        mimeType: file.mimetype,
        size: file.size
      })
    }

    /*
    SAVE USER MESSAGE
    */

    if (!isGuest) {
      await Message.create({
        conversation: conversationId,
        role: "USER",
        content: content || "",
        file: savedFile || null
      })

      history = await Message.find({
        conversation: conversationId
      })
        .sort({ createdAt: 1 })
        .limit(20)
    }

    /*
    BUILD HISTORY
    */

    const formatted = isGuest
      ? [{ role: "user", content: content || "" }]
      : history.map(msg => ({
          role: msg.role.toLowerCase(),
          content: msg.content
        }))

    /*
    GENERATE AI
    */

    let aiReply

    if (process.env.USE_FAKE_AI === "true") {
      aiReply = await generateFakeResponse(formatted)
    } else {
      aiReply = await generateAIResponse(formatted, file)
    }

    /*
    SAVE AI MESSAGE
    */

    if (!isGuest) {
      await Message.create({
        conversation: conversationId,
        role: "ASSISTANT",
        content: aiReply
      })
    }

    /*
    GENERATE TITLE
    */

    let title = null

    if (isGuest || isNewConversation) {

      if (process.env.USE_FAKE_AI === "true") {
        title = await generateFakeTitle(content || "File discussion")
      } else {
        title = await generateTitle(content || "File discussion")
      }

      if (!isGuest) {
        await Conversation.findByIdAndUpdate(conversationId, { title })
      }
    }

    res.json({
      conversationId: isGuest ? null : conversationId,
      title,
      reply: aiReply,
      guest: isGuest
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

exports.getUserConversations = async (req, res) => {
  const conversations = await Conversation.find({
    user: req.user.userId
  }).sort({ updatedAt: -1 })

  res.json(conversations)
}

exports.getConversationDetail = async (req, res) => {
  const { id } = req.params

  const conversation = await Conversation.findOne({
    _id: id,
    user: req.user.userId
  })

  if (!conversation)
    return res.status(404).json({ message: "Not found" })

  const messages = await Message.find({
    conversation: id
  }).sort({ createdAt: 1 })

  res.json({ conversation, messages })
}

exports.deleteConversation = async (req, res) => {
  const { id } = req.params

  const conversation = await Conversation.findOne({
    _id: id,
    user: req.user.userId
  })

  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found" })
  }

  await Message.deleteMany({ conversation: id })

  await Conversation.findByIdAndDelete(id)

  res.json({ message: "Conversation deleted successfully" })
}

exports.renameConversation = async (req, res) => {
  const { id } = req.params
  const { title } = req.body

  if (!title) {
    return res.status(400).json({ message: "Title is required" })
  }

  const conversation = await Conversation.findOneAndUpdate(
    { _id: id, user: req.user.userId },
    { 
      title,
      updatedAt: new Date()
    },
    { new: true }
  )

  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found" })
  }

  res.json(conversation)
}
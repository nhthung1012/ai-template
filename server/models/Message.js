const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true
    },
    role: {
      type: String,
      enum: ["USER", "ASSISTANT"],
      required: true
    },
    content: String,
    file: String
  },
  { timestamps: true }
)

module.exports = mongoose.model("Message", messageSchema)
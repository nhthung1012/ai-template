const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema(
  {
    title: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Conversation", conversationSchema)
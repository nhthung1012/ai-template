import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ChatState, Message, Conversation } from "./types"

const initialState: ChatState = {
  messages: [],
  conversations: [],
  conversationId: null,
  uploadedFiles: [] as File[],
  loading: false
}

const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {

    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload
    },

    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload)
    },

    setConversationId(state, action: PayloadAction<string | null>) {
      state.conversationId = action.payload
    },

    setConversations(
      state,
      action: PayloadAction<Conversation[]>
    ) {
      state.conversations = action.payload
    },

    removeConversation(state, action: PayloadAction<string>) {

      state.conversations = state.conversations.filter(
        (c) => c._id !== action.payload
      )

      if (state.conversationId === action.payload) {
        state.conversationId = null
        state.messages = []
      }
    },

    updateConversationTitle(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {

      const conv = state.conversations.find(
        (c) => c._id === action.payload.id
      )

      if (conv) {
        conv.title = action.payload.title
      }

    },

    addUploadedFile(state, action: PayloadAction<File>) {
      state.uploadedFiles.push(action.payload)
    },

    removeUploadedFile(state, action: PayloadAction<number>) {
      state.uploadedFiles.splice(action.payload, 1)
    },

    clearUploadedFiles(state) {
      state.uploadedFiles = []
    },

    resetChat() {
      return initialState
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }

  }
})

export const {
  setMessages,
  addMessage,
  setConversationId,
  setConversations,
  removeConversation,
  updateConversationTitle,

  addUploadedFile,
  removeUploadedFile,
  clearUploadedFiles,

  resetChat,
  setLoading
} = chatSlice.actions

export default chatSlice.reducer
import api from "../../services/axios"

export const chatApi = {

  sendMessage: async (
    content: string,
    conversationId?: string,
    file?: File
  ) => {

    const formData = new FormData()

    formData.append("content", content)

    if (conversationId) {
      formData.append("conversationId", conversationId)
    }

    if (file) {
      formData.append("file", file)
    }

    const res = await api.post("/chat/message", formData)

    return res.data
  },

  getConversations: async () => {
    const res = await api.get("/chat/conversations")
    return res.data
  },

  getConversation: async (id: string) => {
    const res = await api.get(`/chat/conversation/${id}`)
    return res.data
  },

  renameConversation: async (id: string, title: string) => {
    const res = await api.put(`/chat/conversation/${id}`, { title })
    return res.data
  },

  deleteConversation: async (id: string) => {
    const res = await api.delete(`/chat/conversation/${id}`)
    return res.data
  },

  uploadFile: async (file: File, conversationId: string) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("conversationId", conversationId)

    const res = await api.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    return res.data
  }

}
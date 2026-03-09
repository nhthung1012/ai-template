import { chatApi } from "@/features/chat/chatApi"
import {
  addMessage,
  addUploadedFile,
  clearUploadedFiles,
  setConversations,
  setConversationId,
  setLoading,
  setMessages,
  removeConversation
} from "./chatSlice"

export const sendMessage =
  (message: string, file?: File) =>
  async (dispatch: any, getState: any) => {

    const { conversationId } = getState().chat
    const previewUrl = file ? URL.createObjectURL(file) : undefined

    // USER MESSAGE
    dispatch(addMessage({
      role: "USER",
      content: message,
      file: file
        ? {
            name: file.name,
            type: file.type,
            preview: previewUrl
          }
        : null
    }))

    dispatch(clearUploadedFiles())
    dispatch(setLoading(true))

    try {

      const res = await chatApi.sendMessage(
        message,
        conversationId ?? undefined,
        file ?? undefined
      )

      const { reply, conversationId: newConversationId } = res

      dispatch(addMessage({
        role: "ASSISTANT",
        content: reply
      }))

      dispatch(setConversationId(newConversationId))

    } catch (error) {

      console.error("Send message error", error)

    } finally {

      dispatch(setLoading(false))

    }
}

export const loadConversations = () => async (dispatch: any) => {
  
    const token = localStorage.getItem("token")

    if (!token) return

  try {

    dispatch(setLoading(true))

    const res = await chatApi.getConversations()

    dispatch(setConversations(res))

  } catch (error) {

    console.error("Load conversations error", error)

  } finally {

    dispatch(setLoading(false))

  }
}

export const loadConversation =
  (id: string) =>
  async (dispatch: any) => {

    try {

      dispatch(setLoading(true))

      const res = await chatApi.getConversation(id)

      dispatch(setMessages(res.messages))

      dispatch(setConversationId(res.conversation._id))

    } catch (error) {

      console.error("Load conversation error", error)

    } finally {

      dispatch(setLoading(false))

    }
}

export const deleteConversation =
  (id: string) =>
  async (dispatch: any) => {

    try {
      await chatApi.deleteConversation(id)

      dispatch(removeConversation(id))

    } catch (error) {

      console.error("Delete conversation error", error)

    }
}

export const uploadFile =
  (file: File) =>
  async (dispatch: any, getState: any) => {

    let { conversationId } = getState().chat

    try {

      dispatch(setLoading(true))

      const res = await chatApi.uploadFile(file, conversationId)

      const { file: uploadedFile, conversationId: newConversationId } = res

      // nếu backend tạo conversation mới
      if (!conversationId && newConversationId) {

        dispatch(setConversationId(newConversationId))

        dispatch(loadConversations())
      }
      console.log("Uploaded file", res)
      dispatch(addUploadedFile(uploadedFile))

    } catch (error) {

      console.error("Upload file error", error)

    } finally {

      dispatch(setLoading(false))

    }

}
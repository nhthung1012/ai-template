export interface Message {
  role: "USER" | "ASSISTANT"
  content: string
  file?: UploadedFile | null
}

export interface Conversation {
  _id: string
  title: string
  updatedAt?: string
}

export interface ChatState {

  messages: Message[]

  conversations: Conversation[]

  conversationId: string | null

  uploadedFile: File | null

  loading: boolean
}

export interface UploadedFile {
  name: string
  type: string
  preview?: string
  url?: string
}
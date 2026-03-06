export interface Message {
  role: "USER" | "ASSISTANT"
  content: string
  file?: UploadedFile | File
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

  uploadedFiles: File[]

  loading: boolean
}

export interface UploadedFile {
  _id: string
  fileName: string
  originalName: string
  path: string
  mimeType: string
  size: number
}
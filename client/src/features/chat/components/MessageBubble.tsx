import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Message } from "../types"
import { File as FileIcon } from "lucide-react"

interface Props {
  message: Message
}

export default function MessageBubble({ message }: Props) {

  const isUser = message.role === "USER"
  const file = message.file

  const renderFile = () => {

    if (!file) return null

    const isLocal = file instanceof File

    const fileName = isLocal ? file.name : file.originalName
    const mimeType = isLocal ? file.type : file.mimeType

    const src = isLocal
      ? URL.createObjectURL(file)
      : `http://localhost:5000${file.path}`

    const isImage = mimeType?.startsWith("image/")

    if (isImage) {
      return (
        <img
          src={src}
          alt={fileName}
          className="max-w-[220px] rounded-lg border mb-2"
        />
      )
    }

    return (
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs mb-2
        ${isUser
          ? "bg-blue-500 text-white"
          : "bg-gray-100 text-gray-800"}
        `}
      >
        <FileIcon size={14} />
        <span className="truncate">{fileName}</span>
      </div>
    )
  }

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm
        ${isUser
          ? "bg-blue-600 text-white"
          : "bg-white border text-gray-800"}
        `}
      >

        {renderFile()}

        {isUser ? (
          message.content
        ) : (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}

      </div>

    </div>
  )
}
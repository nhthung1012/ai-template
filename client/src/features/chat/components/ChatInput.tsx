import { useState, useRef } from "react"
import { Plus, X, File } from "lucide-react"
import { addUploadedFile, removeUploadedFile } from "../chatSlice"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"

type Props = {
  onSend: (message: string, files: File[]) => void
}

export default function ChatInput({ onSend }: Props) {

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState("")

  const dispatch = useAppDispatch()

  const uploadedFiles = useAppSelector(
    (state) => state.chat.uploadedFiles
  )

  const handleSend = () => {

    if (!text.trim() && uploadedFiles.length === 0) return

    const filesToSend = [...uploadedFiles]

    onSend(text, filesToSend)

    setText("")
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0]

    if (!file) return

    dispatch(addUploadedFile(file))

    e.target.value = ""
  }

  return (
    <div className="border-t p-4">

      {/* FILE PREVIEW */}

      {uploadedFiles.length > 0 && (

        <div className="flex flex-wrap gap-2 mb-3">

          {uploadedFiles.map((file, index) => (

            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
            >
              <File size={16} />

              <span className="text-sm truncate max-w-[150px]">
                {file.name}
              </span>

              <button
                onClick={() => dispatch(removeUploadedFile(index))}
                className="text-gray-500 hover:text-black"
              >
                <X size={14} />
              </button>

            </div>

          ))}

        </div>

      )}

      {/* INPUT AREA */}

      <div className="flex gap-2">

        <button
          onClick={handleFileClick}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <Plus size={20} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <textarea
          className="flex-1 border rounded-lg p-3 resize-none"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
        />

        <button
          onClick={handleSend}
          className="bg-black text-white px-4 rounded-lg"
        >
          Send
        </button>

      </div>

    </div>
  )
}
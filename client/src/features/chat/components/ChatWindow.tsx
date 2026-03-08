import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { sendMessage } from "@/features/chat/chatThunks"

import ChatInput from "./ChatInput"
import MessageBubble from "./MessageBubble"

export default function ChatWindow() {

  const dispatch = useAppDispatch()

  const { messages, loading } = useAppSelector((state) => state.chat)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (text: string, file?: File) => {
    dispatch(sendMessage(text, file))
  }

  return (
    <div className="flex flex-col flex-1">

      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {loading && (
          <MessageBubble
            message={{ role: "ASSISTANT", content: "..." }}
          />
        )}

        <div ref={bottomRef} />

      </div>

      <div className="p-4 bg-white">
        <ChatInput onSend={handleSend} />
      </div>

    </div>
  )
}
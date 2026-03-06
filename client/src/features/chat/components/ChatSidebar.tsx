import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"

import { useAppSelector, useAppDispatch } from "@/app/hooks"
import {
  setConversationId,
  setMessages
} from "@/features/chat/chatSlice"

import { loadConversation, deleteConversation } from "@/features/chat/chatThunks"

import type { Conversation } from "../types"

export default function ChatSidebar() {

  const dispatch = useAppDispatch()

  const conversations = useAppSelector(
    state => state.chat.conversations
  )

  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState("")

  const startRename = (conv: Conversation) => {
    setEditingId(conv._id)
    setTitle(conv.title)
  }

  const resetChat = () => {
    dispatch(setConversationId(null))
    dispatch(setMessages([]))
  }

  return (
    <div className="w-72 border-r bg-gray-50 flex flex-col">

      {/* New Chat */}
      <button
        onClick={resetChat}
        className="flex items-center gap-2 m-3 px-3 py-2 bg-black text-white rounded-lg"
      >
        <Plus size={16} />
        New Chat
      </button>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">

        {(conversations ?? []).map((conv: Conversation) => {

          const isEditing = editingId === conv._id

          return (
            <div
              key={conv._id}
              className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-200"
            >

              <div
                className="flex-1 cursor-pointer text-sm"
                onClick={() => dispatch(loadConversation(conv._id))}
              >

                {isEditing ? (
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white border px-2 py-1 rounded"
                    autoFocus
                  />
                ) : (
                  <span className="truncate">
                    {conv.title || "New Chat"}
                  </span>
                )}

              </div>

              <div className="hidden group-hover:flex items-center gap-2">

                <button
                  onClick={() => startRename(conv)}
                  className="text-gray-500 hover:text-black"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => dispatch(deleteConversation(conv._id))}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}
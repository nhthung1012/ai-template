import { useEffect } from "react"
import { useAppDispatch } from "@/app/hooks"
import { loadConversations } from "./chatThunks"

import ChatSidebar from "./components/ChatSidebar"
import ChatWindow from "./components/ChatWindow"

export default function ChatLayout() {

  const dispatch = useAppDispatch()

  useEffect(() => {dispatch(loadConversations())}, [])

  return (
    <div className="flex h-full">

      <ChatSidebar />
      <ChatWindow />

    </div>
  )
}
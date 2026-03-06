import { useState } from "react"
import Chat from "@/features/chat/ChatLayout"
import Header from "@/components/layout/Header"
import LoginModal from "@/features/auth/LoginModal"

function ChatPage() {

  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <div className="flex h-screen bg-white overflow-hidden">

      <div className="flex flex-col flex-1 min-h-0">

        <Header onSignUpClick={() => setIsLoginOpen(true)} />

        <div className="flex-1 min-h-0">

          <Chat />

        </div>

      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

    </div>
  )
}

export default ChatPage
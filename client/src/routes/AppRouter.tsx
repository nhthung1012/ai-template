import { BrowserRouter, Routes, Route } from "react-router-dom"
import ChatPage from "@/pages/ChatPage"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<ChatPage />} />

        <Route
          path="/chat/:conversationId"
          element={<ChatPage />}
        />

      </Routes>
    </BrowserRouter>
  )
}
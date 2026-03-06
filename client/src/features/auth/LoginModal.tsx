import { useState } from "react"
import { X } from "lucide-react"

import { loginUser, signupUser } from "./authThunks"
import { useAppDispatch } from "@/app/hooks"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {

  const dispatch = useAppDispatch()

  const [error, setError] = useState("")
  const [mode, setMode] = useState<"login" | "signup">("login")

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")  
  const [password, setPassword] = useState("")

  if (!isOpen) return null

  const handleSubmit = async () => {
    try {

      setError("")

      if (mode === "login") {
        await dispatch(loginUser(email, password))
      } else {
        await dispatch(signupUser(email, password, fullName))
      }

      handleClose()

    } catch (err) {

      setError((err as Error).message)

    }
  }

  const handleClose = () => {
    setMode("login")
    setError("")
    setEmail("")
    setPassword("")
    setFullName("")
    onClose()
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full mx-4 p-8 relative">

        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-8">
          {mode === "login" ? "Sign in" : "Create account"}
        </h2>

        {mode === "signup" && (
          <input
            type="text"
            placeholder="Full name"
            className="w-full border rounded-lg p-3 mb-4"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full"
        >
          {mode === "login" ? "Login" : "Sign up"}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        <p className="text-sm text-center mt-6">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            className="text-blue-600 ml-2 font-semibold"
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
          >
            {mode === "login" ? "Sign up" : "Login"}
          </button>
        </p>

      </div>
    </div>
  )
}
import AppRouter from "./routes/AppRouter"

import { useEffect } from "react"
import { useAppDispatch } from "./app/hooks"
import { loadUser } from "@/features/auth/authThunks"

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {

    const token = localStorage.getItem("token")

    if (token) {
      dispatch(loadUser())
    }

  }, [])

  return <AppRouter />
}
export default App
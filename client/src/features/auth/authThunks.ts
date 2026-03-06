import { authApi } from "./authApi"
import {
  setUser,
  setToken,
  setLoading,
  logout
} from "./authSlice"
import { loadConversations } from "@/features/chat/chatThunks"

export const loginUser =
  (email: string, password: string) =>
  async (dispatch: any) => {

    try {

      dispatch(setLoading(true))

      const res = await authApi.login(email, password)

      const { user, token } = res

      dispatch(setToken(token))

      dispatch(setUser(user))

      dispatch(loadConversations())

    } catch (error) {

      console.error("Login failed", error)

    } finally {

      dispatch(setLoading(false))

    }
  }

  export const signupUser =
  (email: string, password: string, fullName: string) =>
  async (dispatch: any) => {

    try {

      dispatch(setLoading(true))

      const res = await authApi.register(email, password, fullName)

      const { user, token } = res

      dispatch(setToken(token))

      dispatch(setUser(user))

    } catch (error) {

      console.error("Signup failed", error)

    } finally {

      dispatch(setLoading(false))

    }
  }

  export const loadUser = () => async (dispatch: any) => {

  try {

    const res = await authApi.getProfile()

    dispatch(setUser(res.user))

  } catch {

    dispatch(logout())

  }

}
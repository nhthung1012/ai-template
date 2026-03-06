import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthState, User } from "./types"

const initialState: AuthState = {

  user: null,

  token: localStorage.getItem("token"),

  loading: false,

  isAuthenticated: !!localStorage.getItem("token")
}

const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers: {

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },

    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.isAuthenticated = true
    },

    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      localStorage.setItem("token", action.payload)
    },

    logout(state) {

      state.user = null
      state.token = null
      state.isAuthenticated = false

      localStorage.removeItem("token")
    }

  }

})

export const {
  setLoading,
  setUser,
  setToken,
  logout
} = authSlice.actions

export default authSlice.reducer
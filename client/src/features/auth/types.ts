export interface User {
  _id: string
  email: string
  fullName: string
}

export interface AuthState {

  user: User | null

  token: string | null

  loading: boolean

  isAuthenticated: boolean
}
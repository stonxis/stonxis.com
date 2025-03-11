import { api } from "@/lib/axios"

export const loginAdmin = async (email: string, password: string) => {
  const response = await api.post('/admin/login', { email, password })
  return response.data
}

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await api.post('/refresh-token', { refreshToken })
  return response.data
}
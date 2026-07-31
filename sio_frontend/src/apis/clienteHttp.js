// sio_frontend/src/apis/clienteHttp.js
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const TOKEN_KEY = 'sio_token'

const clienteHttp = axios.create({ baseURL: API_BASE })

clienteHttp.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default clienteHttp
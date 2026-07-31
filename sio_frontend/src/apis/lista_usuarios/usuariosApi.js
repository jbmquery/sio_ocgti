//sio_frontend/src/apis/lista_usuarios/usuariosApi.js
import axios from 'axios'

// Ajusta esta URL si tu backend corre en otro host/puerto.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const TOKEN_KEY = 'sio_token' // misma clave que usa authService.js

const cliente = axios.create({
  baseURL: `${API_BASE}/api/lista-usuarios`,
})

// Adjunta el JWT guardado por el login (misma convención que usa AuthContext/authService).
cliente.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function obtenerUsuarios() {
  const { data } = await cliente.get('')
  return data
}

export async function crearUsuario(payload) {
  const { data } = await cliente.post('', payload)
  return data
}

export async function actualizarUsuario(idUsuario, payload) {
  const { data } = await cliente.put(`/${idUsuario}`, payload)
  return data
}

export async function eliminarUsuario(idUsuario) {
  const { data } = await cliente.delete(`/${idUsuario}`)
  return data
}
//sio_frontend/src/apis/categorias/categoriasApi.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TOKEN_KEY = 'sio_token';

const cliente = axios.create({ baseURL: `${API_BASE}/api` });

cliente.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Categorias
export const obtenerCategorias = async () => (await cliente.get('/categorias')).data;
export const crearCategoria = async (data) => (await cliente.post('/categorias', data)).data;
export const actualizarCategoria = async (id, data) => (await cliente.put(`/categorias/${id}`, data)).data;
export const eliminarCategoria = async (id) => (await cliente.delete(`/categorias/${id}`)).data;

// Sub Categorias
export const obtenerSubCategorias = async () => (await cliente.get('/sub-categorias')).data;
export const crearSubCategoria = async (data) => (await cliente.post('/sub-categorias', data)).data;
export const actualizarSubCategoria = async (id, data) => (await cliente.put(`/sub-categorias/${id}`, data)).data;
export const eliminarSubCategoria = async (id) => (await cliente.delete(`/sub-categorias/${id}`)).data;

// Ss Categorias
export const obtenerSsCategorias = async () => (await cliente.get('/ss-categorias')).data;
export const crearSsCategoria = async (data) => (await cliente.post('/ss-categorias', data)).data;
export const actualizarSsCategoria = async (id, data) => (await cliente.put(`/ss-categorias/${id}`, data)).data;
export const eliminarSsCategoria = async (id) => (await cliente.delete(`/ss-categorias/${id}`)).data;
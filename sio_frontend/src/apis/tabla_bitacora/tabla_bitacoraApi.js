// sio_frontend/src/apis/tabla_bitacora/tabla_bitacoraApi.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TOKEN_KEY = 'sio_token';

const cliente = axios.create({ baseURL: `${API_BASE}/api` });

cliente.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Estados
export const obtenerEstados = async () => (await cliente.get('/estados')).data;
export const crearEstado = async (data) => (await cliente.post('/estados', data)).data;
export const actualizarEstado = async (id, data) => (await cliente.put(`/estados/${id}`, data)).data;
export const eliminarEstado = async (id) => (await cliente.delete(`/estados/${id}`)).data;

// Medios
export const obtenerMedios = async () => (await cliente.get('/medios')).data;
export const crearMedio = async (data) => (await cliente.post('/medios', data)).data;
export const actualizarMedio = async (id, data) => (await cliente.put(`/medios/${id}`, data)).data;
export const eliminarMedio = async (id) => (await cliente.delete(`/medios/${id}`)).data;

// Tipos
export const obtenerTipos = async () => (await cliente.get('/tipos')).data;
export const crearTipo = async (data) => (await cliente.post('/tipos', data)).data;
export const actualizarTipo = async (id, data) => (await cliente.put(`/tipos/${id}`, data)).data;
export const eliminarTipo = async (id) => (await cliente.delete(`/tipos/${id}`)).data;

// Tipo Solicitudes
export const obtenerTipoSolicitudes = async () => (await cliente.get('/tipo-solicitudes')).data;
export const crearTipoSolicitud = async (data) => (await cliente.post('/tipo-solicitudes', data)).data;
export const actualizarTipoSolicitud = async (id, data) => (await cliente.put(`/tipo-solicitudes/${id}`, data)).data;
export const eliminarTipoSolicitud = async (id) => (await cliente.delete(`/tipo-solicitudes/${id}`)).data;

// Prioridades
export const obtenerPrioridades = async () => (await cliente.get('/prioridades')).data;
export const crearPrioridad = async (data) => (await cliente.post('/prioridades', data)).data;
export const actualizarPrioridad = async (id, data) => (await cliente.put(`/prioridades/${id}`, data)).data;
export const eliminarPrioridad = async (id) => (await cliente.delete(`/prioridades/${id}`)).data;
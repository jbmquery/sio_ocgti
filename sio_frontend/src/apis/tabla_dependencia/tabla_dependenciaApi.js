// sio_frontend/src/apis/tabla_bitacora/tabla_dependenciaApi.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TOKEN_KEY = 'sio_token';

const cliente = axios.create({ baseURL: `${API_BASE}/api` });

cliente.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Ubicación Geográfica (Ubigeos)
export const obtenerUbigeos = async () => (await cliente.get('/ubigeos')).data;
export const crearUbigeo = async (data) => (await cliente.post('/ubigeos', data)).data;
export const actualizarUbigeo = async (id, data) => (await cliente.put(`/ubigeos/${id}`, data)).data;
export const eliminarUbigeo = async (id) => (await cliente.delete(`/ubigeos/${id}`)).data;

// Predios
export const obtenerPredios = async () => (await cliente.get('/predios')).data;
export const crearPredio = async (data) => (await cliente.post('/predios', data)).data;
export const actualizarPredio = async (id, data) => (await cliente.put(`/predios/${id}`, data)).data;
export const eliminarPredio = async (id) => (await cliente.delete(`/predios/${id}`)).data;

// Pabellones
export const obtenerPabellones = async () => (await cliente.get('/pabellones')).data;
export const crearPabellon = async (data) => (await cliente.post('/pabellones', data)).data;
export const actualizarPabellon = async (id, data) => (await cliente.put(`/pabellones/${id}`, data)).data;
export const eliminarPabellon = async (id) => (await cliente.delete(`/pabellones/${id}`)).data;

// Dependencias
export const obtenerDependencias = async () => (await cliente.get('/dependencias')).data;
export const crearDependencia = async (data) => (await cliente.post('/dependencias', data)).data;
export const actualizarDependencia = async (id, data) => (await cliente.put(`/dependencias/${id}`, data)).data;
export const eliminarDependencia = async (id) => (await cliente.delete(`/dependencias/${id}`)).data;

// Carreras Profesionales
export const obtenerCarreras = async () => (await cliente.get('/carreras')).data;
export const crearCarrera = async (data) => (await cliente.post('/carreras', data)).data;
export const actualizarCarrera = async (id, data) => (await cliente.put(`/carreras/${id}`, data)).data;
export const eliminarCarrera = async (id) => (await cliente.delete(`/carreras/${id}`)).data;

// Tipos de Área
export const obtenerTiposArea = async () => (await cliente.get('/tipos-area')).data;
export const crearTipoArea = async (data) => (await cliente.post('/tipos-area', data)).data;
export const actualizarTipoArea = async (id, data) => (await cliente.put(`/tipos-area/${id}`, data)).data;
export const eliminarTipoArea = async (id) => (await cliente.delete(`/tipos-area/${id}`)).data;

// Ambientes
export const obtenerAmbientes = async () => (await cliente.get('/ambientes')).data;
export const crearAmbiente = async (data) => (await cliente.post('/ambientes', data)).data;
export const actualizarAmbiente = async (id, data) => (await cliente.put(`/ambientes/${id}`, data)).data;
export const eliminarAmbiente = async (id) => (await cliente.delete(`/ambientes/${id}`)).data;

// Áreas
export const obtenerAreas = async () => (await cliente.get('/areas')).data;
export const crearArea = async (data) => (await cliente.post('/areas', data)).data;
export const actualizarArea = async (id, data) => (await cliente.put(`/areas/${id}`, data)).data;
export const eliminarArea = async (id) => (await cliente.delete(`/areas/${id}`)).data;
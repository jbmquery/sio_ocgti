//sio_frontend/src/apis/login/authApi.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Llama a POST /api/auth/login
 * @param {{correo: string, clave: string}} credenciales
 */
export async function loginRequest({ correo, clave }) {
  const respuesta = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, clave }),
  });

  const data = await respuesta.json();

  if (!respuesta.ok) {
    // El backend manda { error: "..." } cuando algo falla
    throw new Error(data.error || 'No se pudo iniciar sesión');
  }

  return data; // { token, usuario }
}

/**
 * Llama a GET /api/auth/me para revalidar la sesión (por ejemplo al recargar la página)
 * @param {string} token
 */
export async function meRequest(token) {
  const respuesta = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(data.error || 'Sesión inválida');
  }

  return data; // { usuario }
}

/**
 * Llama a POST /api/auth/logout (opcional, JWT es stateless igual se limpia en el frontend)
 * @param {string} token
 */
export async function logoutRequest(token) {
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    // Si el backend no responde igual cerramos sesión en el cliente
  }
}
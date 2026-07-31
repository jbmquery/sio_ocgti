//sio_frontend/src/services/login/authService.js
import { loginRequest, meRequest, logoutRequest } from '../../apis/login/authApi';

const TOKEN_KEY = 'sio_token';

export const authService = {
  async login(correo, clave) {
    const { token, usuario } = await loginRequest({ correo, clave });
    localStorage.setItem(TOKEN_KEY, token);
    return usuario;
  },

  async logout() {
    const token = this.getToken();
    if (token) {
      await logoutRequest(token);
    }
    localStorage.removeItem(TOKEN_KEY);
  },

  async validarSesion() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const { usuario } = await meRequest(token);
      return usuario;
    } catch {
      // Token vencido o inválido
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
};
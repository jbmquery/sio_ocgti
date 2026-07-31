//sio_frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/login/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  // Al montar la app, si hay un token guardado, revalida la sesión contra el backend.
  // Esto es lo que permite "mantener la sesión" al recargar la página.
  useEffect(() => {
    (async () => {
      const usuarioValidado = await authService.validarSesion();
      setUsuario(usuarioValidado);
      setCargandoSesion(false);
    })();
  }, []);

  async function login(correo, clave) {
    const usuarioLogueado = await authService.login(correo, clave);
    setUsuario(usuarioLogueado);
    return usuarioLogueado;
  }

  async function logout() {
    await authService.logout();
    setUsuario(null);
  }

  const value = {
    usuario,
    estaAutenticado: !!usuario,
    cargandoSesion,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  }
  return context;
}
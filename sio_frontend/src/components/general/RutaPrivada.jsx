/* sio_frontend/src/components/general/RutaPrivada.jsx */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Envuelve cualquier ruta que requiera sesión iniciada.
 * Mientras se revalida el token muestra un loader breve;
 * si no hay sesión válida, redirige a /login.
 */
function RutaPrivada({ children }) {
  const { estaAutenticado, cargandoSesion } = useAuth();

  if (cargandoSesion) {
    return (
      <div className="min-h-screen grid place-items-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaPrivada;
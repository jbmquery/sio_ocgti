{
  /* sio_frontend/src/App.jsx */
}
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import RutaPrivada from "./components/general/RutaPrivada";
import Login_page from "./pages/Login_page";
import Dashboard_page from "./pages/Dashboard_page";
import Lista_usuarios_page from "./pages/Lista_usuarios_page";
import Categorias_page from "./pages/Categorias_page";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login_page />} />

        <Route
          path="/dashboard"
          element={
            <RutaPrivada>
              <Dashboard_page />
            </RutaPrivada>
          }
        />

        <Route
          path="/usuarios/lista"
          element={
            <RutaPrivada>
              <Lista_usuarios_page />
            </RutaPrivada>
          }
        />

        <Route
          path="/configuraciones/cat-subcat-sscat"
          element={
            <RutaPrivada>
              <Categorias_page />
            </RutaPrivada>
          }
        />

        {/* Placeholder temporal para rutas del sidebar aún no implementadas */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

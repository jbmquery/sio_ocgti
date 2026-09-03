{/* sio_frontend/src/App.jsx */}
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import RutaPrivada from "./components/general/RutaPrivada";

import Login_page from "./pages/Login_page";
import Dashboard_page from "./pages/Dashboard_page";
import Lista_usuarios_page from "./pages/Lista_usuarios_page";
import Categorias_page from "./pages/Categorias_page";
import Tabla_bitacora_page from "./pages/Tabla_bitacora_page";
import Tabla_dependencia_page from "./pages/Tabla_dependencia_page";
// Descomentar cuando crees la vista de técnicos:
// import Tabla_tecnicos_page from "./pages/Tabla_tecnicos_page";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login_page />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RutaPrivada>
              <Dashboard_page />
            </RutaPrivada>
          }
        />

        {/* Usuarios */}
        <Route
          path="/usuarios/lista"
          element={
            <RutaPrivada>
              <Lista_usuarios_page />
            </RutaPrivada>
          }
        />

        {/* Configuraciones */}
        <Route
          path="/configuraciones/cat-subcat-sscat"
          element={
            <RutaPrivada>
              <Categorias_page />
            </RutaPrivada>
          }
        />
        <Route
          path="/configuraciones/config-bitacora"
          element={
            <RutaPrivada>
              <Tabla_bitacora_page />
            </RutaPrivada>
          }
        />
        <Route
          path="/configuraciones/config-dependencia"
          element={
            <RutaPrivada>
              <Tabla_dependencia_page />
            </RutaPrivada>
          }
        />
        {/* Agrega aquí la ruta cuando implementes la página:
        <Route
          path="/configuraciones/config-tecnicos"
          element={
            <RutaPrivada>
              <Tabla_tecnicos_page />
            </RutaPrivada>
          }
        /> 
        */}

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
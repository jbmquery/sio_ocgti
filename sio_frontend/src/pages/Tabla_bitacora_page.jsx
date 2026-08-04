//sio_frontend/src/pages/Tabla_bitacora_page.jsx
import React, { useState } from 'react';
import NavbarComponent from '../components/general/navbar_component';
import SiderbarComponent from '../components/general/siderbar_component';
import Estados_table from '../components/tabla_bitacora/estados_table';
import Medios_table from '../components/tabla_bitacora/medios_table';
import Tipos_table from '../components/tabla_bitacora/tipos_table';
import TipoSolicitudes_table from '../components/tabla_bitacora/tipo_solicitudes_table';
import Prioridades_table from '../components/tabla_bitacora/prioridades_table';

function Tabla_bitacora_page() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-base-200">
      <NavbarComponent onToggleSidebar={() => setSidebarAbierto((v) => !v)} />

      <div className="flex">
        <SiderbarComponent open={sidebarAbierto} onClose={() => setSidebarAbierto(false)} />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-base-content">Gestión de Tablas Bitácora</h1>
            <p className="text-sm text-slate-400">
              Gestión de las tablas de Estados, Medios, Tipos, Tipos de Solicitudes y Prioridades.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <Estados_table />
            <Medios_table />
            <Tipos_table />
            <TipoSolicitudes_table />
            <Prioridades_table />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Tabla_bitacora_page;
//sio_frontend/src/pages/Tabla_dependencia_page.jsx
import React, { useState } from 'react';
import NavbarComponent from '../components/general/navbar_component';
import SiderbarComponent from '../components/general/siderbar_component';

import UbicacionGeografica_table from '../components/tabla_dependencia/ubicacion_geografica_table';
import Predios_table from '../components/tabla_dependencia/predios_table';
import Pabellones_table from '../components/tabla_dependencia/pabellones_table';
import Dependencias_table from '../components/tabla_dependencia/dependencias_table';
import CarrerasProfesionales_table from '../components/tabla_dependencia/carreras_profesionales_table';
import TiposArea_table from '../components/tabla_dependencia/tipos_area_table';
import Ambientes_table from '../components/tabla_dependencia/ambientes_table';
import Area_table from '../components/tabla_dependencia/area_table';

function Tabla_dependencia_page() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-base-200">
      <NavbarComponent onToggleSidebar={() => setSidebarAbierto((v) => !v)} />

      <div className="flex">
        <SiderbarComponent open={sidebarAbierto} onClose={() => setSidebarAbierto(false)} />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-base-content">
              Gestión de Ambientes y Dependencias
            </h1>
            <p className="text-sm text-slate-400">
              Mantenimiento de Ubicaciones, Predios, Pabellones, Dependencias, Carreras, Tipos de Área y Ambientes.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <UbicacionGeografica_table />
            <Predios_table />
            <Pabellones_table />
            <Dependencias_table />
            <CarrerasProfesionales_table />
            <Area_table />
            <TiposArea_table />
            <Ambientes_table />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Tabla_dependencia_page;
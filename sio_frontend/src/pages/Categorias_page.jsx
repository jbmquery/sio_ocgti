import React, { useState } from 'react';
import NavbarComponent from '../components/general/navbar_component';
import SiderbarComponent from '../components/general/siderbar_component';
import Categorias_table from '../components/categorias/Categorias_table';
import SubCategorias_table from '../components/categorias/SubCategorias_table';
import SsCategorias_table from '../components/categorias/SsCategorias_table';

function Categorias_page() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-base-200">
      <NavbarComponent onToggleSidebar={() => setSidebarAbierto((v) => !v)} />

      <div className="flex">
        <SiderbarComponent open={sidebarAbierto} onClose={() => setSidebarAbierto(false)} />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-base-content">Gestión de Categorías</h1>
            <p className="text-sm text-slate-400">
              Gestión de las tablas de Categorías - SubCategorías - SsCategorías.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <Categorias_table />
            <SubCategorias_table />
            <SsCategorias_table />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Categorias_page;
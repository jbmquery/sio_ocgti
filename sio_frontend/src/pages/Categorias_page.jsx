//sio_frontend/src/pages/Lista_usuarios_page.jsx
import React, { useState } from 'react'
import { Users, Wrench } from 'lucide-react'
import NavbarComponent from '../components/general/navbar_component'
import SiderbarComponent from '../components/general/siderbar_component'
import Usuarios_tab from '../components/lista_usuarios/Usuarios_tab'
import Tecnicos_tab from '../components/lista_usuarios/Tecnicos_tab'

function Categorias_page() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false)
  const [tabActiva, setTabActiva] = useState('usuarios')

  return (
    <div className="min-h-screen bg-base-200">
      <NavbarComponent onToggleSidebar={() => setSidebarAbierto((v) => !v)} />

      <div className="flex">
        <SiderbarComponent open={sidebarAbierto} onClose={() => setSidebarAbierto(false)} />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-base-content">Gestión de Categorías</h1>
            <p className="text-sm text-slate-400">
              Gestión de las tablas de Categorías - SubCategorias - SsCategorias.
            </p>
          </div>

          {/* Cuerpo*/}


        </main>
      </div>
    </div>
  )
}

export default Categorias_page
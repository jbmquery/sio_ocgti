//sio_frontend/src/pages/Lista_usuarios_page.jsx
import React, { useState } from 'react'
import { Users, Wrench } from 'lucide-react'
import NavbarComponent from '../components/general/navbar_component'
import SiderbarComponent from '../components/general/siderbar_component'
import Usuarios_tab from '../components/lista_usuarios/Usuarios_tab'
import Tecnicos_tab from '../components/lista_usuarios/Tecnicos_tab'

function Lista_usuarios_page() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false)
  const [tabActiva, setTabActiva] = useState('usuarios')

  return (
    <div className="min-h-screen bg-base-200">
      <NavbarComponent onToggleSidebar={() => setSidebarAbierto((v) => !v)} />

      <div className="flex">
        <SiderbarComponent open={sidebarAbierto} onClose={() => setSidebarAbierto(false)} />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-base-content">Gestión de Usuarios</h1>
            <p className="text-sm text-slate-400">
              Resumen de los usuarios y técnicos registrados en el sistema.
            </p>
          </div>

          {/* Tabs */}
          <div role="tablist" className="tabs tabs-bordered mb-6">
            <button
              role="tab"
              className={`tab gap-2 ${tabActiva === 'usuarios' ? 'tab-active font-medium' : ''}`}
              onClick={() => setTabActiva('usuarios')}
            >
              <Users size={16} />
              Usuarios
            </button>
            <button
              role="tab"
              className={`tab gap-2 ${tabActiva === 'tecnicos' ? 'tab-active font-medium' : ''}`}
              onClick={() => setTabActiva('tecnicos')}
            >
              <Wrench size={16} />
              Técnicos
            </button>
          </div>

          {tabActiva === 'usuarios' ? <Usuarios_tab /> : <Tecnicos_tab />}
        </main>
      </div>
    </div>
  )
}

export default Lista_usuarios_page
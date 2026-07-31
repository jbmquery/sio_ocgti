{/* sio_frontend/src/pages/Dashboard_page.jsx */}
import React, { useState } from 'react'
import { Boxes, FileSignature, BookText, ShieldAlert, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import NavbarComponent from '../components/general/navbar_component'
import SiderbarComponent from '../components/general/siderbar_component'

// Datos de ejemplo — reemplazar cuando el backend esté disponible
const resumen = [
  {
    titulo: 'Inventario',
    valor: '1,284',
    detalle: 'equipos registrados',
    tendencia: '+3.2%',
    positivo: true,
    icon: Boxes,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    titulo: 'Firma Electrónica',
    valor: '312',
    detalle: 'documentos firmados este mes',
    tendencia: '+8.1%',
    positivo: true,
    icon: FileSignature,
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    titulo: 'Bitácora',
    valor: '96',
    detalle: 'eventos registrados hoy',
    tendencia: '-1.4%',
    positivo: false,
    icon: BookText,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    titulo: 'Incidencias de Spam',
    valor: '17',
    detalle: 'casos abiertos',
    tendencia: '+5 nuevos',
    positivo: false,
    icon: ShieldAlert,
    color: 'text-error',
    bg: 'bg-error/10',
  },
]

const actividadReciente = [
  { texto: 'Se registró un nuevo equipo en Inventario — Laptop Dell Latitude 5440', tiempo: 'Hace 12 min' },
  { texto: 'Firma electrónica completada — Resolución N° 0451-2026-UNFV', tiempo: 'Hace 40 min' },
  { texto: 'Nueva incidencia de spam reportada por el área de Admisión', tiempo: 'Hace 1 h' },
  { texto: 'Actualización de bitácora — Mantenimiento de switch principal', tiempo: 'Hace 3 h' },
]

function Dashboard_page() {
  const [sidebarAbierto, setSidebarAbierto] = useState(false)

  return (
    <div className="min-h-screen bg-base-200">
      <NavbarComponent onToggleSidebar={() => setSidebarAbierto((v) => !v)} />

      <div className="flex">
        <SiderbarComponent open={sidebarAbierto} onClose={() => setSidebarAbierto(false)} />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-base-content">Panel General</h1>
            <p className="text-sm text-slate-400">
              Resumen de la actividad del Área de Sistemas — OCGTI, Universidad Nacional Federico Villarreal.
            </p>
          </div>

          {/* Tarjetas de resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {resumen.map((item) => {
              const Icon = item.icon
              const TendIcon = item.positivo ? ArrowUpRight : ArrowDownRight
              return (
                <div
                  key={item.titulo}
                  className="card bg-base-100 border border-white/15 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="card-body p-5">
                    <div className="flex items-start justify-between">
                      <div className={`w-11 h-11 rounded-xl grid place-items-center ${item.bg}`}>
                        <Icon size={20} className={item.color} />
                      </div>
                      <span
                        className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                          item.positivo ? 'text-success' : 'text-error'
                        }`}
                      >
                        <TendIcon size={14} />
                        {item.tendencia}
                      </span>
                    </div>
                    <p className="mt-3 text-2xl font-display font-bold text-base-content">{item.valor}</p>
                    <p className="text-sm text-slate-500">{item.titulo}</p>
                    <p className="text-xs text-slate-400">{item.detalle}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Actividad reciente + estado del sistema */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
            <div className="lg:col-span-2 card bg-base- border border-base-300 shadow-sm">
              <div className="card-body p-5">
                <h2 className="font-display font-semibold text-base-content mb-1">Actividad reciente</h2>
                <p className="text-xs text-slate-400 mb-3">Últimos eventos registrados en el sistema</p>
                <ul className="divide-y divide-base-300">
                  {actividadReciente.map((a, i) => (
                    <li key={i} className="py-3 flex items-start justify-between gap-4">
                      <span className="text-sm text-base-content">{a.texto}</span>
                      <span className="text-xs text-slate-400 whitespace-nowrap">{a.tiempo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card bg-neutral text-base-400 border border-white/10 shadow-sm cyber-grid-bg">
              <div className="card-body p-5">
                <h2 className="font-display font-semibold mb-1 ">Estado del sistema</h2>
                <p className="text-xs text-slate-400 mb-4">Módulos operativos</p>
                <div className="space-y-3">
                  {['Inventario', 'Firma Electrónica', 'Bitácora', 'Anti-Spam'].map((mod) => (
                    <div key={mod} className="flex items-center justify-between text-sm">
                      <span className="text-slate-200">{mod}</span>
                      <span className="badge badge-success badge-sm gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-success-content/80" />
                        Activo
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard_page
{/* sio_frontend/src/components/general/siderbar_component.jsx */}
import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home,
  Boxes,
  FileSignature,
  BookText,
  ShieldAlert,
  Wrench,
  Users,
  History,
  Settings,
} from 'lucide-react'

// Ítem simple de una sola línea (sin submenú)
function ItemSimple({ to, icon: Icon, label }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
            isActive
              ? 'bg-warning/15 text-warning font-medium'
              : 'text-slate-300 hover:bg-warning/15 hover:text-warning'
          }`
        }
      >
        <Icon size={17} />
        {label}
      </NavLink>
    </li>
  )
}

// Bloque colapsable con título (Operativos / Administrativo)
function GrupoBloque({ titulo, children }) {
  return (
    <div className="mb-1">
      <p className="px-3 pt-4 pb-1 text-[11px] font-display font-semibold uppercase tracking-wider text-slate-500">
        {titulo}
      </p>
      <ul className="menu menu-sm p-0 gap-0.5">{children}</ul>
    </div>
  )
}

// Submenú desplegable (ej: Usuarios -> Lista de Usuarios / Permisos)
function SubMenu({ icon: Icon, label, items }) {
  return (
    <li>
      <details>
        <summary className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-warning/15 hover:text-warning">
          <Icon size={17} />
          {label}
        </summary>
        <ul className="ml-1 border-l border-white/10 pl-2">
          {items.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-[13px] ${
                    isActive
                      ? 'text-secondary font-medium'
                      : 'text-slate-400 hover:bg-base-100/10 hover:text-warning'
                  }`
                }
              >
                {it.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </details>
    </li>
  )
}

/**
 * Sidebar global de SIO-OCGTI.
 * Props:
 * - open: boolean, controla la visibilidad en mobile (off-canvas)
 * - onClose: función para cerrar el sidebar en mobile al navegar
 */
function SiderbarComponent({ open = true, onClose }) {
  return (
    <>
      {/* Overlay solo en mobile cuando el sidebar está abierto */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-16 lg:top-16 h-[calc(100vh-4rem)] w-64 bg-neutral border-r border-white/10
        z-40 overflow-y-auto transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <nav className="px-3 pb-8">
          <ul className="menu menu-sm p-0 gap-0.5 pt-3">
            <ItemSimple to="/dashboard" icon={Home} label="Inicio" />
          </ul>

          <GrupoBloque titulo="Operativos">
            <ItemSimple to="/inventario" icon={Boxes} label="Inventario" />
            <ItemSimple to="/firma-electronica" icon={FileSignature} label="Firma Electrónica" />
            <ItemSimple to="/bitacora" icon={BookText} label="Bitácora" />
            <ItemSimple to="/incidencias-spam" icon={ShieldAlert} label="Incidencias de Spam" />
            <ItemSimple to="/tecnicos" icon={Wrench} label="Técnicos" />
          </GrupoBloque>

          <GrupoBloque titulo="Administrativo">
            <SubMenu
              icon={Users}
              label="Usuarios"
              items={[
                { to: '/usuarios/lista', label: 'Lista de Usuarios' },
                { to: '/usuarios/permisos', label: 'Permisos' },
              ]}
            />
            <SubMenu
              icon={History}
              label="Históricos"
              items={[
                { to: '/historicos/inventario', label: 'Inventario' },
                { to: '/historicos/firma-electronica', label: 'Firma Electrónica' },
              ]}
            />
            <SubMenu
              icon={Settings}
              label="Configuraciones"
              items={[
                { to: '/configuraciones/cat-subcat-sscat', label: 'Cat - Subcat - SsCat' },
                { to: '/configuraciones/config-tecnicos', label: 'Tablas Tecnicos' },
                { to: '/configuraciones/config-bitacora', label: 'Tablas Bitacora' },
                { to: '/configuraciones/config-ambientes', label: 'Tablas Ambientes' },
                { to: '/configuraciones/config-otros', label: 'Otros' },
              ]}
            />
          </GrupoBloque>
        </nav>
      </aside>
    </>
  )
}

export default SiderbarComponent
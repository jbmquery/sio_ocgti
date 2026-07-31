//src/components/general/navbar_component.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, User, LogOut, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Devuelve algo como: "Lunes, 20 de julio de 2026"
function useFechaHoy() {
  const hoy = new Date();
  const texto = hoy.toLocaleDateString("es-PE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  // Capitaliza el día de la semana
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/**
 * Navbar global de SIO-OCGTI.
 * Props:
 * - onToggleSidebar: función para abrir/cerrar el sidebar en mobile
 *
 * El usuario mostrado ahora viene del AuthContext (sesión real),
 * ya no está hardcodeado.
 */
function NavbarComponent({ onToggleSidebar }) {
  const fechaHoy = useFechaHoy();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const nombreCompleto = usuario ? `${usuario.nombres} ${usuario.ape_pat}` : "Sistema OCGTI";
  const iniciales = usuario
    ? `${usuario.nombres?.[0] ?? ""}${usuario.ape_pat?.[0] ?? ""}`.toUpperCase()
    : "SO";
  const rol = usuario?.tipo ?? "Administrador";

  async function handleCerrarSesion() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="navbar bg-neutral text-base-100 border-b border-white/10 px-3 sm:px-6 h-16 min-h-16 sticky top-0 z-40">
      {/* Zona izquierda: botón mobile + logo */}
      <div className="flex-1 flex items-center gap-2">
        <button
          className="btn btn-ghost btn-square lg:hidden text-base-500"
          onClick={onToggleSidebar}
          aria-label="Abrir menú"
        >
          <Menu size={22} />
        </button>

        <Link to="/dashboard" className="flex items-center gap-2.5 group">
          <h1 className="font-display text-2xl font-bold text-white mt-1">
            SIO<span className="text-warning">.OCGTI</span>
          </h1>
        </Link>
      </div>

      {/* Zona derecha: fecha, notificaciones, usuario */}
      <div className="flex-none flex items-center gap-1 sm:gap-3">
        {/* Fecha del día — solo visible desde tablet en adelante */}
        <div className="hidden md:flex flex-col items-end leading-tight mr-2">
          <span className="text-xs text-slate-300">{fechaHoy}</span>
          <span className="text-[11px] font-bold text-success/80">Sesión activa</span>
        </div>

        <div className="divider divider-horizontal mx-0 hidden md:flex before:bg-white/10 after:bg-white/10" />

        {/* Notificaciones */}
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-ghost btn-circle text-base-500"
          >
            <div className="indicator">
              <Bell size={20} />
              <span className="badge badge-xs badge-error indicator-item" />
            </div>
          </button>
          <div
            tabIndex={0}
            className="dropdown-content z-50 mt-3 w-72 rounded-box bg-base-100 text-base-content shadow-xl border border-base-300 p-2"
          >
            <p className="px-2 py-1.5 text-sm font-semibold font-display">
              Notificaciones
            </p>
            <div className="divider my-0" />
            <p className="px-2 py-3 text-sm text-slate-400">
              Por ahora no hay notificaciones nuevas.
            </p>
          </div>
        </div>

        {/* Usuario + desplegable */}
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-ghost gap-2 px-1.5 sm:px-2 text-base-500"
          >
            <div className="w-9 h-9 rounded-full bg-secondary text-secondary-content grid place-items-center font-display font-semibold text-sm">
              {iniciales}
            </div>
            <div className="hidden lg:flex flex-col items-start leading-tight">
              <span className="text-sm font-medium">{nombreCompleto}</span>
              <span className="text-[11px] text-slate-300">{rol}</span>
            </div>
            <ChevronDown size={16} className="hidden lg:block opacity-70" />
          </button>

          <ul
            tabIndex={0}
            className="dropdown-content z-50 mt-3 menu w-56 rounded-box bg-base-100 text-base-content shadow-xl border border-base-300 p-2"
          >
            <li>
              <Link to="/perfil" className="gap-2">
                <User size={16} /> Ver Perfil
              </Link>
            </li>
            <li>
              <Link to="/notificaciones" className="gap-2">
                <Bell size={16} /> Notificaciones
              </Link>
            </li>
            <div className="divider my-1" />
            <li>
              <button onClick={handleCerrarSesion} className="gap-2 text-error w-full text-left">
                <LogOut size={16} /> Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default NavbarComponent;
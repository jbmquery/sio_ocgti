//sio_frontend/src/pages/Login_page.jsx
import React, { useState } from 'react'
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useLogin } from '../hooks/login/useLogin'

function Login_page() {
  const [mostrarClave, setMostrarClave] = useState(false)
  const { form, cargando, handleChange, handleSubmit } = useLogin()

  return (
    <div className="min-h-screen bg-neutral relative flex items-center justify-center p-4 overflow-hidden">
      {/* Fondo cybernético */}
      <div className="absolute inset-0 cyber-grid-bg opacity-60" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-warning/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Marca institucional */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-warning/15 border border-warning/30 grid place-items-center mb-3">
            <ShieldCheck size={26} className="text-warning" />
          </div>
          <p className="text-xs tracking-widest uppercase text-slate-400">
            Universidad Nacional Federico Villarreal
          </p>
          <h1 className="font-display text-2xl font-bold text-white mt-1">
            SIO<span className="text-warning">.OCGTI</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Sistema Integrado de Operaciones</p>
        </div>

        {/* Tarjeta de login */}
        <div className="card bg-base-100/95 backdrop-blur border border-white/10 shadow-2xl">
          <div className="card-body p-6 sm:p-8">
            <h2 className="font-display text-lg font-semibold text-base-content">Iniciar sesión</h2>
            <p className="text-sm text-slate-500 mb-5">Ingresa tus credenciales institucionales.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="form-control w-full">
                <span className="label-text text-xs font-medium text-slate-500 mb-1">Correo institucional</span>
                <label className="input input-bordered flex items-center gap-2">
                  <Mail size={16} className="text-slate-400" />
                  <input
                    type="email"
                    name="correo"
                    required
                    placeholder="usuario@unfv.edu.pe"
                    className="grow"
                    value={form.correo}
                    onChange={handleChange}
                  />
                </label>
              </label>

              <label className="form-control w-full">
                <span className="label-text text-xs font-medium text-slate-500 mb-1">Contraseña</span>
                <label className="input input-bordered flex items-center gap-2">
                  <Lock size={16} className="text-slate-400" />
                  <input
                    type={mostrarClave ? 'text' : 'password'}
                    name="clave"
                    required
                    placeholder="••••••••"
                    className="grow"
                    value={form.clave}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarClave((v) => !v)}
                    className="text-slate-400 hover:text-slate-600"
                    aria-label="Mostrar contraseña"
                  >
                    {mostrarClave ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </label>
              </label>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-xs checkbox-warning" />
                  <span className="text-slate-500">Recordarme</span>
                </label>
                <a href="#" className="link link-hover text-warning">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button type="submit" className="btn btn-primary mt-1" disabled={cargando}>
                {cargando ? <span className="loading loading-spinner loading-sm" /> : 'Ingresar'}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-500 mt-5">
          Acceso restringido al personal autorizado del Área de Sistemas — OCGTI © 2026
        </p>
      </div>
    </div>
  )
}

export default Login_page
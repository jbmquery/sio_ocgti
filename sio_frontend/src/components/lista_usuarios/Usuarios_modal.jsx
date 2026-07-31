//sio_frontend/src/components/lista_usuarios/Usuarios_modal.jsx
import React, { useEffect, useState } from 'react'
import { X, Save, Trash2, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import { crearUsuario, actualizarUsuario, eliminarUsuario } from '../../apis/lista_usuarios/usuariosApi'

const FORM_VACIO = {
  nombres: '',
  ape_pat: '',
  ape_mat: '',
  celular: '',
  fecha_nacimiento: '',
  domicilio: '',
  correo_institucional: '',
  tipo: 'ADMINISTRATIVO',
}

/**
 * Modal tipo "sidebar" (drawer) que se desliza de derecha a izquierda.
 * Props:
 * - abierto: boolean
 * - onClose: () => void
 * - usuarioSeleccionado: objeto del usuario si es modo Actualizar, o null si es modo Nuevo
 * - onGuardado: () => void  -> se llama tras crear/actualizar/eliminar con éxito, para refrescar la tabla
 */
function Usuarios_modal({ abierto, onClose, usuarioSeleccionado, onGuardado }) {
  const esActualizar = Boolean(usuarioSeleccionado)
  const [form, setForm] = useState(FORM_VACIO)
  const [guardando, setGuardando] = useState(false)
  const [confirmandoEliminar, setConfirmandoEliminar] = useState(false)

  useEffect(() => {
    if (usuarioSeleccionado) {
      setForm({
        nombres: (usuarioSeleccionado.nombres || '').toUpperCase(),
        ape_pat: (usuarioSeleccionado.ape_pat || '').toUpperCase(),
        ape_mat: (usuarioSeleccionado.ape_mat || '').toUpperCase(),
        celular: usuarioSeleccionado.celular || '',
        fecha_nacimiento: usuarioSeleccionado.fecha_nacimiento || '',
        domicilio: (usuarioSeleccionado.domicilio || '').toUpperCase(),
        correo_institucional: usuarioSeleccionado.correo_institucional || '',
        tipo: usuarioSeleccionado.tipo || 'ADMINISTRATIVO',
        estado: usuarioSeleccionado.estado,
      })
    } else {
      setForm(FORM_VACIO)
    }
    setConfirmandoEliminar(false)
  }, [usuarioSeleccionado, abierto])

  // Usuario derivado del correo institucional (solo vista previa, el backend lo vuelve a calcular).
  const usuarioPreview = (() => {
    if (esActualizar) return usuarioSeleccionado.usuario
    const correo = form.correo_institucional || ''
    return correo.includes('@') ? correo.split('@')[0].toLowerCase() : ''
  })()

  function actualizarCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  async function manejarGuardar(e) {
    e.preventDefault()
    if (!form.nombres || !form.ape_pat || !form.correo_institucional) {
      toast.error('Nombres, apellido paterno y correo institucional son obligatorios')
      return
    }

    setGuardando(true)
    try {
      if (esActualizar) {
        await actualizarUsuario(usuarioSeleccionado.id_usuario, form)
        toast.success('Usuario actualizado correctamente')
      } else {
        await crearUsuario(form)
        toast.success('Usuario creado correctamente')
      }
      onGuardado()
      onClose()
    } catch (err) {
      const mensaje = err?.response?.data?.error || 'Ocurrió un error al guardar el usuario'
      toast.error(mensaje)
    } finally {
      setGuardando(false)
    }
  }

  async function manejarEliminar() {
    setGuardando(true)
    try {
      await eliminarUsuario(usuarioSeleccionado.id_usuario)
      toast.success('Usuario eliminado correctamente')
      onGuardado()
      onClose()
    } catch (err) {
      const mensaje = err?.response?.data?.error || 'No se pudo eliminar el usuario'
      toast.error(mensaje)
    } finally {
      setGuardando(false)
      setConfirmandoEliminar(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      {abierto && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />
      )}

      {/* Drawer: entra de derecha a izquierda */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-base-100 border-l border-white/15
        shadow-xl z-50 overflow-y-auto transition-transform duration-300
        ${abierto ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <form onSubmit={manejarGuardar} className="flex flex-col h-full">
          {/* Encabezado */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
            <h2 className="font-display text-lg font-bold text-base-content">
              {esActualizar ? 'Actualizar usuario' : 'Nuevo usuario'}
            </h2>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
              <X size={18} />
            </button>
          </div>

          {/* Campos */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Nombres *</span></label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={form.nombres}
                  onChange={(e) => actualizarCampo('nombres', e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Apellido paterno *</span></label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={form.ape_pat}
                  onChange={(e) => actualizarCampo('ape_pat', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Apellido materno</span></label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={form.ape_mat}
                  onChange={(e) => actualizarCampo('ape_mat', e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Celular</span></label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={form.celular}
                  onChange={(e) => actualizarCampo('celular', e.target.value)}
                />
              </div>
            </div>

            {esActualizar && (
              <div className="form-control">
                <label className="label"><span className="label-text">Fecha de creación</span></label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={usuarioSeleccionado.fecha_creacion || '—'}
                  disabled
                />
              </div>
            )}

            <div className="form-control">
              <label className="label"><span className="label-text">Fecha de nacimiento</span></label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={form.fecha_nacimiento || ''}
                onChange={(e) => actualizarCampo('fecha_nacimiento', e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Domicilio</span></label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={form.domicilio}
                onChange={(e) => actualizarCampo('domicilio', e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Correo institucional *</span></label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={form.correo_institucional}
                onChange={(e) => actualizarCampo('correo_institucional', e.target.value)}
                placeholder="jblanco@unfv.edu.pe"
                required
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Usuario (autogenerado)</span></label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-200"
                value={usuarioPreview}
                disabled
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Estado</span></label>
                {esActualizar ? (
                  <select
                    className="select select-bordered w-full"
                    value={form.estado ? 'true' : 'false'}
                    onChange={(e) => actualizarCampo('estado', e.target.value === 'true')}
                  >
                    <option value="true">Activo</option>
                    <option value="false">Desactivo</option>
                  </select>
                ) : (
                  <input type="text" className="input input-bordered w-full bg-base-200" value="Activo" disabled />
                )}
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text">Tipo *</span></label>
                <select
                  className="select select-bordered w-full"
                  value={form.tipo}
                  onChange={(e) => actualizarCampo('tipo', e.target.value)}
                  required
                >
                  <option value="ADMINISTRATIVO">ADMINISTRATIVO</option>
                  <option value="TECNICO">TECNICO</option>
                </select>
              </div>
            </div>
          </div>

          {/* Confirmación de eliminación */}
          {confirmandoEliminar && (
            <div className="mx-5 mb-3 rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
              <p className="mb-2">¿Estás seguro que deseas eliminar a este usuario? Esta acción es permanente.</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn btn-error btn-sm"
                  onClick={manejarEliminar}
                  disabled={guardando}
                >
                  Sí, eliminar
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setConfirmandoEliminar(false)}
                  disabled={guardando}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="flex items-center gap-2 px-5 py-4 border-t border-base-300">
            <button type="submit" className="btn btn-primary gap-2" disabled={guardando || confirmandoEliminar}>
              <Save size={16} />
              {esActualizar ? 'ACTUALIZAR' : 'GUARDAR'}
            </button>

            {esActualizar && (
              <button
                type="button"
                className="btn btn-error btn-outline gap-2"
                onClick={() => setConfirmandoEliminar(true)}
                disabled={guardando}
              >
                <Trash2 size={16} />
                ELIMINAR
              </button>
            )}

            <button type="button" className="btn btn-ghost gap-2 ml-auto" onClick={onClose} disabled={guardando}>
              <RotateCcw size={16} />
              CANCELAR
            </button>
          </div>
        </form>
      </aside>
    </>
  )
}

export default Usuarios_modal
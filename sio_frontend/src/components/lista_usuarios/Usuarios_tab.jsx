//sio_frontend/src/components/lista_usuarios/Usuarios_tab.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Search, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { obtenerUsuarios } from '../../apis/lista_usuarios/usuariosApi'
import Usuarios_modal from './Usuarios_modal'

const COLUMNAS_BUSQUEDA = ['nombres', 'ape_pat', 'ape_mat', 'correo_institucional', 'usuario']

function Usuarios_tab() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [modalAbierto, setModalAbierto] = useState(false)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)

  async function cargarUsuarios() {
    setCargando(true)
    try {
      const data = await obtenerUsuarios()
      setUsuarios(data)
    } catch (err) {
      toast.error('No se pudo cargar la lista de usuarios')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  // Filtrado 100% local: se carga todo una vez y se filtra en memoria.
  const usuariosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()

    return usuarios.filter((u) => {
      const coincideTexto =
        texto === '' ||
        COLUMNAS_BUSQUEDA.some((col) => (u[col] || '').toString().toLowerCase().includes(texto))

      const coincideEstado =
        filtroEstado === 'todos' ||
        (filtroEstado === 'activo' && u.estado) ||
        (filtroEstado === 'desactivo' && !u.estado)

      return coincideTexto && coincideEstado
    })
  }, [usuarios, busqueda, filtroEstado])

  function abrirNuevo() {
    setUsuarioSeleccionado(null)
    setModalAbierto(true)
  }

  function abrirActualizar(usuario) {
    setUsuarioSeleccionado(usuario)
    setModalAbierto(true)
  }

  return (
    <div>
      {/* Buscador + filtro + nuevo */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <label className="input input-bordered flex items-center gap-2 flex-1">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            className="grow"
            placeholder="Buscar por nombres, apellidos, correo o usuario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </label>

        <select
          className="select select-bordered w-full sm:w-44"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="todos">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="desactivo">Desactivo</option>
        </select>

        <button className="btn btn-primary gap-2 w-full sm:w-auto" onClick={abrirNuevo}>
          <Plus size={16} />
          Nuevo
        </button>
      </div>

      {/* Tabla */}
      <div className="card bg-base-100 border border-white/15 shadow-sm overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-slate-400">
              <th>Nombres</th>
              <th>Ap. Paterno</th>
              <th>Ap. Materno</th>
              <th>Fecha creación</th>
              <th>Correo institucional</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {cargando && (
              <tr>
                <td colSpan={8} className="text-center py-8">
                  <span className="loading loading-spinner loading-md text-primary" />
                </td>
              </tr>
            )}

            {!cargando && usuariosFiltrados.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-sm text-slate-400">
                  No se encontraron usuarios con esos criterios.
                </td>
              </tr>
            )}

            {!cargando &&
              usuariosFiltrados.map((u) => (
                <tr
                  key={u.id_usuario}
                  className="hover cursor-pointer"
                  onClick={() => abrirActualizar(u)}
                >
                  <td>{u.nombres}</td>
                  <td>{u.ape_pat}</td>
                  <td>{u.ape_mat || '—'}</td>
                  <td>{u.fecha_creacion || '—'}</td>
                  <td>{u.correo_institucional}</td>
                  <td>{u.usuario}</td>
                  <td>
                    <span className={`badge badge-sm ${u.estado ? 'badge-success' : 'badge-error'}`}>
                      {u.estado ? 'Activo' : 'Desactivo'}
                    </span>
                  </td>
                  <td>{u.tipo}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Usuarios_modal
        abierto={modalAbierto}
        onClose={() => setModalAbierto(false)}
        usuarioSeleccionado={usuarioSeleccionado}
        onGuardado={cargarUsuarios}
      />
    </div>
  )
}

export default Usuarios_tab
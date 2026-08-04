//sio_frontend/src/components/tabla_bitacora/estados_modal.jsx
import React, { useEffect, useState } from 'react';
import { X, Save, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { crearEstado, actualizarEstado, eliminarEstado } from '../../apis/tabla_bitacora/tabla_bitacoraApi';

export default function Estados_modal({ abierto, onClose, itemSelect, onGuardado }) {
  const [nomEstado, setNomEstado] = useState('');
  const [descEstado, setDescEstado] = useState('');
  const [guardando, setGuardando] = useState(false);
  const esActualizar = Boolean(itemSelect);

  useEffect(() => {
    setNomEstado(itemSelect ? itemSelect.nom_estado : '');
    setDescEstado(itemSelect?.desc_estado ? itemSelect.desc_estado : '');
  }, [itemSelect, abierto]);

  const manejarGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      const payload = { nom_estado: nomEstado, desc_estado: descEstado };
      if (esActualizar) {
        await actualizarEstado(itemSelect.id_estado, payload);
        toast.success("Actualizado");
      } else {
        await crearEstado(payload);
        toast.success("Creado");
      }
      onGuardado(); onClose();
    } catch (err) { toast.error(err.response?.data?.error || "Error al guardar"); }
    finally { setGuardando(false); }
  };

  const manejarEliminar = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar?")) return;
    setGuardando(true);
    try {
      await eliminarEstado(itemSelect.id_estado);
      toast.success("Eliminado");
      onGuardado(); onClose();
    } catch (err) { toast.error(err.response?.data?.error || "Error al eliminar"); }
    finally { setGuardando(false); }
  };

  return (
    <>
      {abierto && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}
      <aside className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-base-100 border-l border-white/15 shadow-xl z-50 transition-transform duration-300 ${abierto ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <form onSubmit={manejarGuardar} className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
            <h2 className="font-display font-bold">{esActualizar ? 'Actualizar' : 'Nuevo Estado'}</h2>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle"><X size={18} /></button>
          </div>
          <div className="flex-1 p-5 space-y-4">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Nombre del Estado *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={nomEstado} onChange={(e) => setNomEstado(e.target.value.toUpperCase())} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Descripción</span></div>
              <input type="text" className="input input-bordered w-full uppercase" value={descEstado} onChange={(e) => setDescEstado(e.target.value.toUpperCase())} />
            </label>
          </div>
          <div className="flex items-center gap-2 px-5 py-4 border-t border-base-300">
            <button type="submit" className="btn btn-primary gap-2" disabled={guardando}><Save size={16} /> GUARDAR</button>
            {esActualizar && <button type="button" onClick={manejarEliminar} className="btn btn-error btn-outline gap-2" disabled={guardando}><Trash2 size={16} /> ELIMINAR</button>}
            <button type="button" className="btn btn-ghost ml-auto" onClick={onClose}><RotateCcw size={16} /> CANCELAR</button>
          </div>
        </form>
      </aside>
    </>
  );
}
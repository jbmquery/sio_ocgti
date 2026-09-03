//sio_frontend/src/components/tabla_dependencia/tipos_area_modal.jsx
import React, { useEffect, useState } from 'react';
import { X, Save, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { crearTipoArea, actualizarTipoArea, eliminarTipoArea } from '../../apis/tabla_dependencia/tabla_dependenciaApi';

export default function TiposArea_modal({ abierto, onClose, itemSelect, onGuardado }) {
  const [form, setForm] = useState({ nom_tipo_area: '', categoria_area: '' });
  const [guardando, setGuardando] = useState(false);
  const esActualizar = Boolean(itemSelect);

  useEffect(() => {
    if (itemSelect) {
      setForm({ nom_tipo_area: itemSelect.nom_tipo_area || '', categoria_area: itemSelect.categoria_area || '' });
    } else {
      setForm({ nom_tipo_area: '', categoria_area: '' });
    }
  }, [itemSelect, abierto]);

  const manejarGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (esActualizar) {
        await actualizarTipoArea(itemSelect.id_tipo_area, form);
        toast.success("Tipo de Área actualizado");
      } else {
        await crearTipoArea(form);
        toast.success("Tipo de Área creado");
      }
      onGuardado(); onClose();
    } catch (err) { toast.error(err.response?.data?.error || "Error al guardar"); }
    finally { setGuardando(false); }
  };

  const manejarEliminar = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este Tipo de Área?")) return;
    setGuardando(true);
    try {
      await eliminarTipoArea(itemSelect.id_tipo_area);
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
            <h2 className="font-display font-bold">{esActualizar ? 'Actualizar' : 'Nuevo'} Tipo de Área</h2>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle"><X size={18} /></button>
          </div>
          <div className="flex-1 p-5 space-y-4">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Nombre Tipo de Área *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={form.nom_tipo_area} onChange={(e) => setForm({ ...form, nom_tipo_area: e.target.value.toUpperCase() })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Categoría de Área *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" placeholder="Ej. ACADÉMICO / ADMINISTRATIVO" required value={form.categoria_area} onChange={(e) => setForm({ ...form, categoria_area: e.target.value.toUpperCase() })} />
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
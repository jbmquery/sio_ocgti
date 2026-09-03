//sio_frontend/src/components/tabla_dependencia/pabellones_modal.jsx
import React, { useEffect, useState } from 'react';
import { X, Save, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { crearPabellon, actualizarPabellon, eliminarPabellon } from '../../apis/tabla_dependencia/tabla_dependenciaApi';

export default function Pabellones_modal({ abierto, onClose, itemSelect, predios, onGuardado }) {
  const [form, setForm] = useState({ nom_pabellon: '', id_predio: '' });
  const [guardando, setGuardando] = useState(false);
  const esActualizar = Boolean(itemSelect);

  useEffect(() => {
    if (itemSelect) {
      setForm({ nom_pabellon: itemSelect.nom_pabellon || '', id_predio: itemSelect.id_predio || '' });
    } else {
      setForm({ nom_pabellon: '', id_predio: predios[0]?.id_predio || '' });
    }
  }, [itemSelect, abierto, predios]);

  const manejarGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (esActualizar) {
        await actualizarPabellon(itemSelect.id_pabellon, form);
        toast.success("Pabellón actualizado");
      } else {
        await crearPabellon(form);
        toast.success("Pabellón creado");
      }
      onGuardado(); onClose();
    } catch (err) { toast.error(err.response?.data?.error || "Error al guardar"); }
    finally { setGuardando(false); }
  };

  const manejarEliminar = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este Pabellón?")) return;
    setGuardando(true);
    try {
      await eliminarPabellon(itemSelect.id_pabellon);
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
            <h2 className="font-display font-bold">{esActualizar ? 'Actualizar' : 'Nuevo'} Pabellón</h2>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle"><X size={18} /></button>
          </div>
          <div className="flex-1 p-5 space-y-4">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Predio *</span></div>
              <select className="select select-bordered" required value={form.id_predio} onChange={(e) => setForm({ ...form, id_predio: e.target.value })}>
                <option value="" disabled>Seleccione Predio</option>
                {predios.map(p => <option key={p.id_predio} value={p.id_predio}>{p.codigo_predio ? `[${p.codigo_predio}] ` : ''}{p.direccion}</option>)}
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Nombre del Pabellón *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={form.nom_pabellon} onChange={(e) => setForm({ ...form, nom_pabellon: e.target.value.toUpperCase() })} />
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
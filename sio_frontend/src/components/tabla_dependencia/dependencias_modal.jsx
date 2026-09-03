//sio_frontend/src/components/tabla_dependencia/dependencias_modal.jsx
import React, { useEffect, useState } from 'react';
import { X, Save, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { crearDependencia, actualizarDependencia, eliminarDependencia } from '../../apis/tabla_dependencia/tabla_dependenciaApi';

export default function Dependencias_modal({ abierto, onClose, itemSelect, predios, onGuardado }) {
  const [form, setForm] = useState({ siglas_dependencia: '', nom_dependencia: '', correo_electronico: '', id_predio_sede: '' });
  const [guardando, setGuardando] = useState(false);
  const esActualizar = Boolean(itemSelect);

  useEffect(() => {
    if (itemSelect) {
      setForm({
        siglas_dependencia: itemSelect.siglas_dependencia || '',
        nom_dependencia: itemSelect.nom_dependencia || '',
        correo_electronico: itemSelect.correo_electronico || '',
        id_predio_sede: itemSelect.id_predio_sede || ''
      });
    } else {
      setForm({ siglas_dependencia: '', nom_dependencia: '', correo_electronico: '', id_predio_sede: '' });
    }
  }, [itemSelect, abierto]);

  const manejarGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (esActualizar) {
        await actualizarDependencia(itemSelect.id_dependencia, form);
        toast.success("Dependencia actualizada");
      } else {
        await crearDependencia(form);
        toast.success("Dependencia creada");
      }
      onGuardado(); onClose();
    } catch (err) { toast.error(err.response?.data?.error || "Error al guardar"); }
    finally { setGuardando(false); }
  };

  const manejarEliminar = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar esta Dependencia?")) return;
    setGuardando(true);
    try {
      await eliminarDependencia(itemSelect.id_dependencia);
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
            <h2 className="font-display font-bold">{esActualizar ? 'Actualizar' : 'Nueva'} Dependencia</h2>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle"><X size={18} /></button>
          </div>
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Siglas</span></div>
              <input type="text" className="input input-bordered w-full uppercase" value={form.siglas_dependencia} onChange={(e) => setForm({ ...form, siglas_dependencia: e.target.value.toUpperCase() })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Nombre de Dependencia *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={form.nom_dependencia} onChange={(e) => setForm({ ...form, nom_dependencia: e.target.value.toUpperCase() })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Correo Electrónico</span></div>
              <input type="email" className="input input-bordered w-full" value={form.correo_electronico} onChange={(e) => setForm({ ...form, correo_electronico: e.target.value })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Sede Principal (Predio)</span></div>
              <select className="select select-bordered" value={form.id_predio_sede} onChange={(e) => setForm({ ...form, id_predio_sede: e.target.value })}>
                <option value="">Ninguna</option>
                {predios.map(p => <option key={p.id_predio} value={p.id_predio}>{p.codigo_predio ? `[${p.codigo_predio}] ` : ''}{p.direccion}</option>)}
              </select>
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
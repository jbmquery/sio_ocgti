//sio_frontend/src/components/tabla_dependencia/predios_modal.jsx
import React, { useEffect, useState } from 'react';
import { X, Save, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { crearPredio, actualizarPredio, eliminarPredio } from '../../apis/tabla_dependencia/tabla_dependenciaApi';

export default function Predios_modal({ abierto, onClose, itemSelect, ubigeos, onGuardado }) {
  const [form, setForm] = useState({ codigo_predio: '', direccion: '', referencia: '', id_ubigeo: '' });
  const [guardando, setGuardando] = useState(false);
  const esActualizar = Boolean(itemSelect);

  useEffect(() => {
    if (itemSelect) {
      setForm({
        codigo_predio: itemSelect.codigo_predio || '',
        direccion: itemSelect.direccion || '',
        referencia: itemSelect.referencia || '',
        id_ubigeo: itemSelect.id_ubigeo || ''
      });
    } else {
      setForm({ codigo_predio: '', direccion: '', referencia: '', id_ubigeo: ubigeos[0]?.id_ubigeo || '' });
    }
  }, [itemSelect, abierto, ubigeos]);

  const manejarGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (esActualizar) {
        await actualizarPredio(itemSelect.id_predio, form);
        toast.success("Predio actualizado");
      } else {
        await crearPredio(form);
        toast.success("Predio creado");
      }
      onGuardado(); onClose();
    } catch (err) { toast.error(err.response?.data?.error || "Error al guardar"); }
    finally { setGuardando(false); }
  };

  const manejarEliminar = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este Predio?")) return;
    setGuardando(true);
    try {
      await eliminarPredio(itemSelect.id_predio);
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
            <h2 className="font-display font-bold">{esActualizar ? 'Actualizar' : 'Nuevo'} Predio</h2>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle"><X size={18} /></button>
          </div>
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Código Predio</span></div>
              <input type="text" className="input input-bordered w-full uppercase" value={form.codigo_predio} onChange={(e) => setForm({ ...form, codigo_predio: e.target.value.toUpperCase() })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Dirección *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value.toUpperCase() })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Referencia</span></div>
              <textarea className="textarea textarea-bordered w-full uppercase" value={form.referencia} onChange={(e) => setForm({ ...form, referencia: e.target.value.toUpperCase() })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Ubigeo *</span></div>
              <select className="select select-bordered" required value={form.id_ubigeo} onChange={(e) => setForm({ ...form, id_ubigeo: e.target.value })}>
                <option value="" disabled>Seleccione</option>
                {ubigeos.map(u => <option key={u.id_ubigeo} value={u.id_ubigeo}>{u.departamento} - {u.provincia} - {u.distrito}</option>)}
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
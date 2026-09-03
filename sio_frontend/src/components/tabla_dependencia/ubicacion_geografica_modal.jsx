//sio_frontend/src/components/tabla_dependencia/ubicacion_geografica_modal.jsx
import React, { useEffect, useState } from 'react';
import { X, Save, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { crearUbigeo, actualizarUbigeo, eliminarUbigeo } from '../../apis/tabla_dependencia/tabla_dependenciaApi';

export default function UbicacionGeografica_modal({ abierto, onClose, itemSelect, onGuardado }) {
  const [form, setForm] = useState({ codigo_ubigeo: '', distrito: '', provincia: '', departamento: '', pais: 'PERU' });
  const [guardando, setGuardando] = useState(false);
  const esActualizar = Boolean(itemSelect);

  useEffect(() => {
    if (itemSelect) {
      setForm({
        codigo_ubigeo: itemSelect.codigo_ubigeo || '',
        distrito: itemSelect.distrito || '',
        provincia: itemSelect.provincia || '',
        departamento: itemSelect.departamento || '',
        pais: itemSelect.pais || 'PERU',
      });
    } else {
      setForm({ codigo_ubigeo: '', distrito: '', provincia: '', departamento: '', pais: 'PERU' });
    }
  }, [itemSelect, abierto]);

  const manejarGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (esActualizar) {
        await actualizarUbigeo(itemSelect.id_ubigeo, form);
        toast.success("Ubigeo actualizado");
      } else {
        await crearUbigeo(form);
        toast.success("Ubigeo creado");
      }
      onGuardado(); onClose();
    } catch (err) { toast.error(err.response?.data?.error || "Error al guardar"); }
    finally { setGuardando(false); }
  };

  const manejarEliminar = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este registro?")) return;
    setGuardando(true);
    try {
      await eliminarUbigeo(itemSelect.id_ubigeo);
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
            <h2 className="font-display font-bold">{esActualizar ? 'Actualizar' : 'Nueva'} Ubicación Geográfica</h2>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle"><X size={18} /></button>
          </div>
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Código Ubigeo</span></div>
              <input type="text" className="input input-bordered w-full uppercase" value={form.codigo_ubigeo} onChange={(e) => setForm({ ...form, codigo_ubigeo: e.target.value.toUpperCase() })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Distrito *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={form.distrito} onChange={(e) => setForm({ ...form, distrito: e.target.value.toUpperCase() })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Provincia *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={form.provincia} onChange={(e) => setForm({ ...form, provincia: e.target.value.toUpperCase() })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Departamento *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={form.departamento} onChange={(e) => setForm({ ...form, departamento: e.target.value.toUpperCase() })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">País</span></div>
              <input type="text" className="input input-bordered w-full uppercase" value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value.toUpperCase() })} />
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
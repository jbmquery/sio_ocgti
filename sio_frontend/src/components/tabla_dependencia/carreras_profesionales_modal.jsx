//sio_frontend/src/components/tabla_dependencia/carreras_profesionales_modal.jsx
import React, { useEffect, useState } from 'react';
import { X, Save, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { crearCarrera, actualizarCarrera, eliminarCarrera } from '../../apis/tabla_dependencia/tabla_dependenciaApi';

export default function CarrerasProfesionales_modal({ abierto, onClose, itemSelect, dependencias, onGuardado }) {
  const [form, setForm] = useState({ nom_carrera: '', siglas_carrera: '', id_dependencia: '' });
  const [guardando, setGuardando] = useState(false);
  const esActualizar = Boolean(itemSelect);

  useEffect(() => {
    if (itemSelect) {
      setForm({
        nom_carrera: itemSelect.nom_carrera || '',
        siglas_carrera: itemSelect.siglas_carrera || '',
        id_dependencia: itemSelect.id_dependencia || ''
      });
    } else {
      setForm({ nom_carrera: '', siglas_carrera: '', id_dependencia: dependencias[0]?.id_dependencia || '' });
    }
  }, [itemSelect, abierto, dependencias]);

  const manejarGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (esActualizar) {
        await actualizarCarrera(itemSelect.id_carrera, form);
        toast.success("Carrera actualizada");
      } else {
        await crearCarrera(form);
        toast.success("Carrera creada");
      }
      onGuardado(); onClose();
    } catch (err) { toast.error(err.response?.data?.error || "Error al guardar"); }
    finally { setGuardando(false); }
  };

  const manejarEliminar = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar esta Carrera?")) return;
    setGuardando(true);
    try {
      await eliminarCarrera(itemSelect.id_carrera);
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
            <h2 className="font-display font-bold">{esActualizar ? 'Actualizar' : 'Nueva'} Carrera Profesional</h2>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle"><X size={18} /></button>
          </div>
          <div className="flex-1 p-5 space-y-4">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Dependencia *</span></div>
              <select className="select select-bordered" required value={form.id_dependencia} onChange={(e) => setForm({ ...form, id_dependencia: e.target.value })}>
                <option value="" disabled>Seleccione Dependencia</option>
                {dependencias.map(d => <option key={d.id_dependencia} value={d.id_dependencia}>{d.nom_dependencia}</option>)}
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Siglas Carrera</span></div>
              <input type="text" className="input input-bordered w-full uppercase" value={form.siglas_carrera} onChange={(e) => setForm({ ...form, siglas_carrera: e.target.value.toUpperCase() })} />
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Nombre de la Carrera *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={form.nom_carrera} onChange={(e) => setForm({ ...form, nom_carrera: e.target.value.toUpperCase() })} />
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
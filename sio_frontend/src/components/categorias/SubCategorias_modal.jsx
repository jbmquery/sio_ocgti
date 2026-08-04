//sio_frontend/src/components/categorias/SubCategorias_modal.jsx
import React, { useEffect, useState } from 'react';
import { X, Save, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { crearSubCategoria, actualizarSubCategoria, eliminarSubCategoria } from '../../apis/categorias/categoriasApi';

export default function SubCategorias_modal({ abierto, onClose, itemSelect, cats, onGuardado }) {
  const [form, setForm] = useState({ id_cat: '', nom_sub_cat: '' });
  const [guardando, setGuardando] = useState(false);
  const esActualizar = Boolean(itemSelect);

  useEffect(() => {
    if (itemSelect) setForm({ id_cat: itemSelect.id_cat, nom_sub_cat: itemSelect.nom_sub_cat });
    else setForm({ id_cat: cats[0]?.id_cat || '', nom_sub_cat: '' });
  }, [itemSelect, abierto, cats]);

  const manejarGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (esActualizar) {
        await actualizarSubCategoria(itemSelect.id_sub_cat, form);
        toast.success("Actualizado");
      } else {
        await crearSubCategoria(form);
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
      await eliminarSubCategoria(itemSelect.id_sub_cat);
      toast.success("Eliminado");
      onGuardado(); onClose();
    } catch (err) { toast.error(err.response?.data?.error || "Error al eliminar"); }
    finally { setGuardando(false); }
  };

  return (
    <>
      {abierto && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}
      <aside className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-base-100 border-l border-white/15 shadow-xl z-50 transition-transform duratio-300 ${abierto ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <form onSubmit={manejarGuardar} className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
            <h2 className="font-display font-bold">{esActualizar ? 'Actualizar' : 'Nueva SubCategoría'}</h2>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle"><X size={18} /></button>
          </div>
          <div className="flex-1 p-5 space-y-4">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Categoría *</span></div>
              <select className="select select-bordered" required value={form.id_cat} onChange={(e) => setForm({ ...form, id_cat: e.target.value })}>
                <option value="" disabled>Seleccione</option>
                {cats.map(c => <option key={c.id_cat} value={c.id_cat}>{c.nom_cat}</option>)}
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">SubCategoría *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={form.nom_sub_cat} onChange={(e) => setForm({ ...form, nom_sub_cat: e.target.value.toUpperCase() })} />
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
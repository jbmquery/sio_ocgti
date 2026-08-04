//sio_frontend/src/components/categorias/SsCategorias_modal.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { X, Save, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { crearSsCategoria, actualizarSsCategoria, eliminarSsCategoria } from '../../apis/categorias/categoriasApi';

export default function SsCategorias_modal({ abierto, onClose, itemSelect, cats, subCats, onGuardado }) {
  const [form, setForm] = useState({ id_cat: '', id_sub_cat: '', nom_ss_cat: '' });
  const [guardando, setGuardando] = useState(false);
  const esActualizar = Boolean(itemSelect);

  // Filtrar las SubCategorías según la Categoría seleccionada
  const subCatsFiltradas = useMemo(() => {
    return subCats.filter(sc => String(sc.id_cat) === String(form.id_cat));
  }, [form.id_cat, subCats]);

  useEffect(() => {
    if (itemSelect) {
      setForm({ id_cat: itemSelect.id_cat, id_sub_cat: itemSelect.id_sub_cat, nom_ss_cat: itemSelect.nom_ss_cat });
    } else {
      setForm({ id_cat: '', id_sub_cat: '', nom_ss_cat: '' });
    }
  }, [itemSelect, abierto]);

  const manejarGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (esActualizar) {
        await actualizarSsCategoria(itemSelect.id_ss_cat, form);
        toast.success("Actualizado");
      } else {
        await crearSsCategoria(form);
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
      await eliminarSsCategoria(itemSelect.id_ss_cat);
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
            <h2 className="font-display font-bold">{esActualizar ? 'Actualizar' : 'Nueva SsCategoría'}</h2>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle"><X size={18} /></button>
          </div>
          <div className="flex-1 p-5 space-y-4">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Categoría *</span></div>
              <select className="select select-bordered" required value={form.id_cat} onChange={(e) => setForm({ ...form, id_cat: e.target.value, id_sub_cat: '' })}>
                <option value="" disabled>Seleccione</option>
                {cats.map(c => <option key={c.id_cat} value={c.id_cat}>{c.nom_cat}</option>)}
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">SubCategoría *</span></div>
              <select className="select select-bordered" required value={form.id_sub_cat} onChange={(e) => setForm({ ...form, id_sub_cat: e.target.value })} disabled={!form.id_cat}>
                <option value="" disabled>Seleccione</option>
                {subCatsFiltradas.map(sc => <option key={sc.id_sub_cat} value={sc.id_sub_cat}>{sc.nom_sub_cat}</option>)}
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">SsCategoría *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={form.nom_ss_cat} onChange={(e) => setForm({ ...form, nom_ss_cat: e.target.value.toUpperCase() })} />
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
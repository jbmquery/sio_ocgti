//sio_frontend/src/components/tabla_dependencia/ambientes_modal.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { X, Save, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import { crearAmbiente, actualizarAmbiente, eliminarAmbiente } from '../../apis/tabla_dependencia/tabla_dependenciaApi';

export default function Ambientes_modal({ abierto, onClose, itemSelect, predios, pabellones, dependencias, areas, tiposArea, onGuardado }) {
  const [form, setForm] = useState({
    nom_ambiente: '',
    piso: '',
    id_predio: '',
    id_pabellon: '',
    id_dependencia: '',
    id_area: '',
    id_tipo_area: ''
  });
  const [guardando, setGuardando] = useState(false);
  const esActualizar = Boolean(itemSelect);

  // Filtrar pabellones según el predio seleccionado
  const pabellonesFiltrados = useMemo(() => {
    if (!form.id_predio) return [];
    return pabellones.filter(p => String(p.id_predio) === String(form.id_predio));
  }, [form.id_predio, pabellones]);

  const tiposAreaFiltrados = useMemo(() => {
    if (!form.id_area) return [];
    return tiposArea.filter(t => String(t.id_area) === String(form.id_area));
  }, [form.id_area, tiposArea]);

  useEffect(() => {
    if (itemSelect) {
      setForm({
        nom_ambiente: itemSelect.nom_ambiente || '',
        piso: itemSelect.piso || '',
        id_predio: itemSelect.id_predio || '',
        id_pabellon: itemSelect.id_pabellon || '',
        id_dependencia: itemSelect.id_dependencia || '',
        id_area: itemSelect.id_area || '',
        id_tipo_area: itemSelect.id_tipo_area || ''
      });
    } else {
      setForm({
        nom_ambiente: '',
        piso: '',
        id_predio: predios[0]?.id_predio || '',
        id_pabellon: '',
        id_dependencia: '',
        id_area: areas[0]?.id_area || '',
        id_tipo_area: ''
      });
    }
  }, [itemSelect, abierto, predios, areas, tiposArea]);

  const manejarGuardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (esActualizar) {
        await actualizarAmbiente(itemSelect.id_ambiente, form);
        toast.success("Ambiente actualizado");
      } else {
        await crearAmbiente(form);
        toast.success("Ambiente creado");
      }
      onGuardado(); onClose();
    } catch (err) { toast.error(err.response?.data?.error || "Error al guardar"); }
    finally { setGuardando(false); }
  };

  const manejarEliminar = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este Ambiente?")) return;
    setGuardando(true);
    try {
      await eliminarAmbiente(itemSelect.id_ambiente);
      toast.success("Eliminado");
      onGuardado(); onClose();
    } catch (err) { toast.error(err.response?.data?.error || "Error al eliminar"); }
    finally { setGuardando(false); }
  };

  return (
    <>
      {abierto && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}
      <aside className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-base-100 border-l border-white/15 shadow-xl z-50 transition-transform duration-300 ${abierto ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <form onSubmit={manejarGuardar} className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
            <h2 className="font-display font-bold">{esActualizar ? 'Actualizar' : 'Nuevo'} Ambiente</h2>
            <button type="button" onClick={onClose} className="btn btn-ghost btn-sm btn-circle"><X size={18} /></button>
          </div>
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Nombre del Ambiente *</span></div>
              <input type="text" className="input input-bordered w-full uppercase" required value={form.nom_ambiente} onChange={(e) => setForm({ ...form, nom_ambiente: e.target.value.toUpperCase() })} />
            </label>
            
            <div className="grid grid-cols-2 gap-3">
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Piso</span></div>
                <input type="text" className="input input-bordered w-full uppercase" placeholder="Ej. 1, 5, SÓTANO" value={form.piso} onChange={(e) => setForm({ ...form, piso: e.target.value.toUpperCase() })} />
              </label>
              <label className="form-control w-full">
                <div className="label"><span className="label-text">Área *</span></div>
                <select className="select select-bordered" required value={form.id_area} onChange={(e) => setForm({ ...form, id_area: e.target.value, id_tipo_area: '' })}>
                  <option value="" disabled>Seleccione</option>
                  {areas.map(a => <option key={a.id_area} value={a.id_area}>{a.nom_area}</option>)}
                </select>
              </label>
            </div>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Tipo de Área *</span></div>
              <select className="select select-bordered" required value={form.id_tipo_area} onChange={(e) => setForm({ ...form, id_tipo_area: e.target.value })} disabled={!form.id_area}>
                <option value="" disabled>Seleccione</option>
                {tiposAreaFiltrados.map(t => <option key={t.id_tipo_area} value={t.id_tipo_area}>{t.nom_tipo_area}</option>)}
              </select>
            </label>

            <label className="form-control w-full">
              <div className="label"><span className="label-text">Predio *</span></div>
              <select className="select select-bordered" required value={form.id_predio} onChange={(e) => setForm({ ...form, id_predio: e.target.value, id_pabellon: '' })}>
                <option value="" disabled>Seleccione Predio</option>
                {predios.map(p => <option key={p.id_predio} value={p.id_predio}>{p.codigo_predio ? `[${p.codigo_predio}] ` : ''}{p.direccion}</option>)}
              </select>
            </label>

            <label className="form-control w-full">
              <div className="label"><span className="label-text">Pabellón (Opcional)</span></div>
              <select className="select select-bordered" value={form.id_pabellon} onChange={(e) => setForm({ ...form, id_pabellon: e.target.value })} disabled={!form.id_predio}>
                <option value="">Sin Pabellón</option>
                {pabellonesFiltrados.map(p => <option key={p.id_pabellon} value={p.id_pabellon}>{p.nom_pabellon}</option>)}
              </select>
            </label>
            <label className="form-control w-full">
              <div className="label"><span className="label-text">Dependencia Asignada (Opcional)</span></div>
              <select className="select select-bordered" value={form.id_dependencia} onChange={(e) => setForm({ ...form, id_dependencia: e.target.value })}>
                <option value="">Sin Dependencia</option>
                {dependencias.map(d => <option key={d.id_dependencia} value={d.id_dependencia}>[ {d.siglas_dependencia} ] - {d.nom_dependencia}</option>)}
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
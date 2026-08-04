//sio_frontend/src/components/categorias/SsCategorias_table.jsx
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { obtenerSsCategorias, obtenerCategorias, obtenerSubCategorias } from '../../apis/categorias/categoriasApi';
import SsCategorias_modal from './SsCategorias_modal';

export default function SsCategorias_table() {
  const [data, setData] = useState([]);
  const [cats, setCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const cargar = async () => {
    try {
      setData(await obtenerSsCategorias());
      setCats(await obtenerCategorias());
      setSubCats(await obtenerSubCategorias());
    } catch { toast.error("Error al cargar SsCategorías"); }
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => { setItemSelect(null); setModalAbierto(true); };
  const abrirActualizar = (item) => { setItemSelect(item); setModalAbierto(true); };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-display font-semibold text-lg">Tabla SsCategorías</h2>
        <button className="btn btn-primary btn-sm gap-2" onClick={abrirNuevo}><Plus size={16} /> Nuevo</button>
      </div>
      <div className="card bg-base-100 border border-white/15 shadow-sm overflow-x-auto max-h-120">
        <table className="table">
          <thead><tr className="text-xs uppercase text-slate-400"><th>Categoría</th><th>Sub Categoría</th><th>Ss Categoría</th></tr></thead>
          <tbody>
            {data.map(i => (
              <tr key={i.id_ss_cat} className="hover cursor-pointer" onClick={() => abrirActualizar(i)}>
                <td>{i.nom_cat}</td>
                <td>{i.nom_sub_cat}</td>
                <td>{i.nom_ss_cat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SsCategorias_modal abierto={modalAbierto} onClose={() => setModalAbierto(false)} itemSelect={itemSelect} cats={cats} subCats={subCats} onGuardado={cargar} />
    </div>
  );
}
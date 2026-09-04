//sio_frontend/src/components/tabla_dependencia/tipos_area_table.jsx
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { obtenerTiposArea } from '../../apis/tabla_dependencia/tabla_dependenciaApi';
import TiposArea_modal from './tipos_area_modal';

export default function TiposArea_table() {
  const [data, setData] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const cargar = async () => {
    try { setData(await obtenerTiposArea()); }
    catch { toast.error("Error al cargar Tipos de Área"); }
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => { setItemSelect(null); setModalAbierto(true); };
  const abrirActualizar = (item) => { setItemSelect(item); setModalAbierto(true); };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-display font-semibold text-lg">Tabla Tipos de Área</h2>
        <button className="btn btn-primary btn-sm gap-2" onClick={abrirNuevo}><Plus size={16} /> Nuevo</button>
      </div>
      <div className="card bg-base-100 border border-white/15 shadow-sm overflow-x-auto max-h-120">
        <table className="table">
          <thead><tr className="text-xs uppercase text-slate-400"><th>Tipo de Área</th><th>Área</th></tr></thead>
          <tbody>
            {data.map(i => (
              <tr key={i.id_tipo_area} className="hover cursor-pointer" onClick={() => abrirActualizar(i)}>
                <td>{i.nom_tipo_area}</td>
                <td>{i.nom_area}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TiposArea_modal abierto={modalAbierto} onClose={() => setModalAbierto(false)} itemSelect={itemSelect} onGuardado={cargar} />
    </div>
  );
}
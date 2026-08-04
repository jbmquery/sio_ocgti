//sio_frontend/src/components/tabla_bitacora/medios_table.jsx
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { obtenerMedios } from '../../apis/tabla_bitacora/tabla_bitacoraApi';
import Medios_modal from './medios_modal';

export default function Medios_table() {
  const [data, setData] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const cargar = async () => {
    try { setData(await obtenerMedios()); }
    catch { toast.error("Error al cargar Medios"); }
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => { setItemSelect(null); setModalAbierto(true); };
  const abrirActualizar = (item) => { setItemSelect(item); setModalAbierto(true); };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-display font-semibold text-lg">Medios</h2>
        <button className="btn btn-primary btn-sm gap-2" onClick={abrirNuevo}><Plus size={16} /> Nuevo</button>
      </div>
      <div className="card bg-base-100 border border-white/15 shadow-sm overflow-x-auto max-h-120">
        <table className="table">
          <thead><tr className="text-xs uppercase text-slate-400"><th>Medio</th><th>Descripción</th></tr></thead>
          <tbody>
            {data.map(i => (
              <tr key={i.id_medio} className="hover cursor-pointer" onClick={() => abrirActualizar(i)}>
                <td>{i.nom_medio}</td>
                <td>{i.desc_medio || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Medios_modal abierto={modalAbierto} onClose={() => setModalAbierto(false)} itemSelect={itemSelect} onGuardado={cargar} />
    </div>
  );
}
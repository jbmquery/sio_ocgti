//sio_frontend/src/components/tabla_bitacora/tipo_solicitudes_table.jsx
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { obtenerTipoSolicitudes } from '../../apis/tabla_bitacora/tabla_bitacoraApi';
import TipoSolicitudes_modal from './tipo_solicitudes_modal';

export default function TipoSolicitudes_table() {
  const [data, setData] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const cargar = async () => {
    try { setData(await obtenerTipoSolicitudes()); }
    catch { toast.error("Error al cargar Tipo de Solicitudes"); }
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => { setItemSelect(null); setModalAbierto(true); };
  const abrirActualizar = (item) => { setItemSelect(item); setModalAbierto(true); };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-display font-semibold text-lg">Tipo de Solicitante</h2>
        <button className="btn btn-primary btn-sm gap-2" onClick={abrirNuevo}><Plus size={16} /> Nuevo</button>
      </div>
      <div className="card bg-base-100 border border-white/15 shadow-sm overflow-x-auto max-h-120">
        <table className="table">
          <thead><tr className="text-xs uppercase text-slate-400"><th>Tipo de Solicitud</th></tr></thead>
          <tbody>
            {data.map(i => (
              <tr key={i.id_solicitud} className="hover cursor-pointer" onClick={() => abrirActualizar(i)}>
                <td>{i.nom_solicitud}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TipoSolicitudes_modal abierto={modalAbierto} onClose={() => setModalAbierto(false)} itemSelect={itemSelect} onGuardado={cargar} />
    </div>
  );
}
//sio_frontend/src/components/tabla_dependencia/pabellones_table.jsx
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { obtenerPabellones, obtenerPredios } from '../../apis/tabla_dependencia/tabla_dependenciaApi';
import Pabellones_modal from './pabellones_modal';

export default function Pabellones_table() {
  const [data, setData] = useState([]);
  const [predios, setPredios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const cargar = async () => {
    try {
      setData(await obtenerPabellones());
      setPredios(await obtenerPredios());
    } catch { toast.error("Error al cargar Pabellones"); }
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => { setItemSelect(null); setModalAbierto(true); };
  const abrirActualizar = (item) => { setItemSelect(item); setModalAbierto(true); };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-display font-semibold text-lg">Tabla Pabellones</h2>
        <button className="btn btn-primary btn-sm gap-2" onClick={abrirNuevo}><Plus size={16} /> Nuevo</button>
      </div>
      <div className="card bg-base-100 border border-white/15 shadow-sm overflow-x-auto max-h-120">
        <table className="table">
          <thead><tr className="text-xs uppercase text-slate-400"><th>Predio</th><th>Pabellón</th></tr></thead>
          <tbody>
            {data.map(i => (
              <tr key={i.id_pabellon} className="hover cursor-pointer" onClick={() => abrirActualizar(i)}>
                <td>{i.codigo_predio ? `[${i.codigo_predio}] ` : ''}{i.direccion_predio}</td>
                <td>{i.nom_pabellon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pabellones_modal abierto={modalAbierto} onClose={() => setModalAbierto(false)} itemSelect={itemSelect} predios={predios} onGuardado={cargar} />
    </div>
  );
}
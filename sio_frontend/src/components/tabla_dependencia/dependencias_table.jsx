//sio_frontend/src/components/tabla_dependencia/dependencias_table.jsx
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { obtenerDependencias, obtenerPredios } from '../../apis/tabla_dependencia/tabla_dependenciaApi';
import Dependencias_modal from './dependencias_modal';

export default function Dependencias_table() {
  const [data, setData] = useState([]);
  const [predios, setPredios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const cargar = async () => {
    try {
      setData(await obtenerDependencias());
      setPredios(await obtenerPredios());
    } catch { toast.error("Error al cargar Dependencias"); }
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => { setItemSelect(null); setModalAbierto(true); };
  const abrirActualizar = (item) => { setItemSelect(item); setModalAbierto(true); };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-display font-semibold text-lg">Tabla Dependencias</h2>
        <button className="btn btn-primary btn-sm gap-2" onClick={abrirNuevo}><Plus size={16} /> Nuevo</button>
      </div>
      <div className="card bg-base-100 border border-white/15 shadow-sm overflow-x-auto max-h-120">
        <table className="table">
          <thead><tr className="text-xs uppercase text-slate-400"><th>Siglas</th><th>Dependencia</th><th>Correo</th><th>Sede Principal</th></tr></thead>
          <tbody>
            {data.map(i => (
              <tr key={i.id_dependencia} className="hover cursor-pointer" onClick={() => abrirActualizar(i)}>
                <td>{i.siglas_dependencia || '-'}</td>
                <td>{i.nom_dependencia}</td>
                <td>{i.correo_electronico || '-'}</td>
                <td>{i.direccion_sede || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dependencias_modal abierto={modalAbierto} onClose={() => setModalAbierto(false)} itemSelect={itemSelect} predios={predios} onGuardado={cargar} />
    </div>
  );
}
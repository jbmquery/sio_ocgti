//sio_frontend/src/components/tabla_dependencia/carreras_profesionales_table.jsx
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { obtenerCarreras, obtenerDependencias } from '../../apis/tabla_dependencia/tabla_dependenciaApi';
import CarrerasProfesionales_modal from './carreras_profesionales_modal';

export default function CarrerasProfesionales_table() {
  const [data, setData] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const cargar = async () => {
    try {
      setData(await obtenerCarreras());
      setDependencias(await obtenerDependencias());
    } catch { toast.error("Error al cargar Carreras Profesionales"); }
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => { setItemSelect(null); setModalAbierto(true); };
  const abrirActualizar = (item) => { setItemSelect(item); setModalAbierto(true); };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-display font-semibold text-lg">Tabla Carreras Profesionales</h2>
        <button className="btn btn-primary btn-sm gap-2" onClick={abrirNuevo}><Plus size={16} /> Nuevo</button>
      </div>
      <div className="card bg-base-100 border border-white/15 shadow-sm overflow-x-auto max-h-120">
        <table className="table">
          <thead><tr className="text-xs uppercase text-slate-400"><th>Dependencia</th><th>Siglas</th><th>Carrera</th></tr></thead>
          <tbody>
            {data.map(i => (
              <tr key={i.id_carrera} className="hover cursor-pointer" onClick={() => abrirActualizar(i)}>
                <td>{i.nom_dependencia}</td>
                <td>{i.siglas_carrera || '-'}</td>
                <td>{i.nom_carrera}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CarrerasProfesionales_modal abierto={modalAbierto} onClose={() => setModalAbierto(false)} itemSelect={itemSelect} dependencias={dependencias} onGuardado={cargar} />
    </div>
  );
}
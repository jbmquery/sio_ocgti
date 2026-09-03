//sio_frontend/src/components/tabla_dependencia/predios_table.jsx
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { obtenerPredios, obtenerUbigeos } from '../../apis/tabla_dependencia/tabla_dependenciaApi';
import Predios_modal from './predios_modal';

export default function Predios_table() {
  const [data, setData] = useState([]);
  const [ubigeos, setUbigeos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);

  const cargar = async () => {
    try {
      setData(await obtenerPredios());
      setUbigeos(await obtenerUbigeos());
    } catch { toast.error("Error al cargar Predios"); }
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => { setItemSelect(null); setModalAbierto(true); };
  const abrirActualizar = (item) => { setItemSelect(item); setModalAbierto(true); };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-display font-semibold text-lg">Tabla Predios</h2>
        <button className="btn btn-primary btn-sm gap-2" onClick={abrirNuevo}><Plus size={16} /> Nuevo</button>
      </div>
      <div className="card bg-base-100 border border-white/15 shadow-sm overflow-x-auto max-h-120">
        <table className="table">
          <thead><tr className="text-xs uppercase text-slate-400"><th>Código</th><th>Dirección</th><th>Referencia</th><th>Distrito</th></tr></thead>
          <tbody>
            {data.map(i => (
              <tr key={i.id_predio} className="hover cursor-pointer" onClick={() => abrirActualizar(i)}>
                <td>{i.codigo_predio || '-'}</td>
                <td>{i.direccion}</td>
                <td>{i.referencia || '-'}</td>
                <td>{i.distrito || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Predios_modal abierto={modalAbierto} onClose={() => setModalAbierto(false)} itemSelect={itemSelect} ubigeos={ubigeos} onGuardado={cargar} />
    </div>
  );
}
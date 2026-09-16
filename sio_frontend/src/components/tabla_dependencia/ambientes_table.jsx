//sio_frontend/src/components/tabla_dependencia/ambientes_table.jsx
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  obtenerAmbientes, obtenerPredios, obtenerPabellones,
  obtenerDependencias, obtenerAreas, obtenerTiposArea
} from '../../apis/tabla_dependencia/tabla_dependenciaApi';
import Ambientes_modal from './ambientes_modal';

export default function Ambientes_table() {
  const [data, setData] = useState([]);
  const [predios, setPredios] = useState([]);
  const [pabellones, setPabellones] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [tiposArea, setTiposArea] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);
  const [areas, setAreas] = useState([]);

  const cargar = async () => {
    try {
      const ambientesData = await obtenerAmbientes();
      console.log("Datos de Ambientes:", ambientesData); // <-- Agrega esta línea
      setData(await obtenerAmbientes());
      setPredios(await obtenerPredios());
      setPabellones(await obtenerPabellones());
      setDependencias(await obtenerDependencias());
      setAreas(await obtenerAreas());
      setTiposArea(await obtenerTiposArea());
    } catch { toast.error("Error al cargar Ambientes"); }
  };

  useEffect(() => { cargar(); }, []);

  const abrirNuevo = () => { setItemSelect(null); setModalAbierto(true); };
  const abrirActualizar = (item) => { setItemSelect(item); setModalAbierto(true); };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-display font-semibold text-lg">Tabla Ambientes</h2>
        <button className="btn btn-primary btn-sm gap-2" onClick={abrirNuevo}><Plus size={16} /> Nuevo</button>
      </div>
      <div className="card bg-base-100 border border-white/15 shadow-sm overflow-x-auto max-h-120">
        <table className="table">
          <thead><tr className="text-xs uppercase text-slate-400"><th>Ambiente</th><th>Piso</th><th>Área</th><th>Tipo de Área</th><th>Predio</th><th>Pabellón</th><th>Dependencia</th></tr></thead>
          <tbody>
            {data.map(i => (
              <tr key={i.id_ambiente} className="hover cursor-pointer" onClick={() => abrirActualizar(i)}>
                <td>{i.nom_ambiente}</td>
                <td>{i.piso || '-'}</td>
                <td>{i.nom_area || '-'}</td>
                <td>{i.nom_tipo_area || '-'}</td>
                <td>{i.codigo_predio || '-'}</td>
                <td>{i.nom_pabellon || '-'}</td>
                <td>{i.siglas_dependencia || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Ambientes_modal
        abierto={modalAbierto}
        onClose={() => setModalAbierto(false)}
        itemSelect={itemSelect}
        predios={predios}
        pabellones={pabellones}
        dependencias={dependencias}
        areas={areas}
        tiposArea={tiposArea}
        onGuardado={cargar}
      />
    </div>
  );
}
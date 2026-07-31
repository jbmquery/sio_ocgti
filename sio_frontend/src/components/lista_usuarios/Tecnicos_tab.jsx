//sio_frontend/src/components/lista_usuarios/Tecnicos_tab.jsx
import React from 'react'
import { Wrench } from 'lucide-react'

function Tecnicos_tab() {
  return (
    <div className="card bg-base-100 border border-white/15 shadow-sm">
      <div className="card-body items-center text-center py-16">
        <Wrench size={28} className="text-slate-400 mb-2" />
        <h3 className="font-display font-semibold text-base-content">Técnicos</h3>
        <p className="text-sm text-slate-400 max-w-md">
          Esta pestaña está pendiente de definir. Cuando me pases los detalles (campos, tabla,
          endpoints) la construyo siguiendo el mismo patrón que Usuarios_tab.
        </p>
      </div>
    </div>
  )
}

export default Tecnicos_tab
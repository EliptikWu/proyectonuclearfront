import React from 'react';
import { CheckCircle } from 'lucide-react';

const SelectedAulaInfo = ({ selectedAulaInfo, sedesMap }) => {
  if (!selectedAulaInfo) return null;

  return (
    <div className="mb-4 p-3 sm:p-4 bg-indigo-800 rounded-lg border border-indigo-600">
      <div className="flex items-center mb-2">
        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
        <h4 className="text-sm font-medium text-white">Información del Aula Seleccionada:</h4>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs text-indigo-200">
        <span><strong>Nombre:</strong> {selectedAulaInfo.nombre}</span>
        <span><strong>Capacidad:</strong> {selectedAulaInfo.capacidad} estudiantes</span>
        <span><strong>Tipo:</strong> {selectedAulaInfo.tipo}</span>
        <span><strong>Sede:</strong> {sedesMap[selectedAulaInfo.sedeId]}</span>
        {selectedAulaInfo.descripcionEstado && (
          <span className="xs:col-span-2"><strong>Estado:</strong> {selectedAulaInfo.descripcionEstado}</span>
        )}
      </div>
    </div>
  );
};

export default SelectedAulaInfo;

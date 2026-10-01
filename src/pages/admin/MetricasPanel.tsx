import React from 'react';
import { Users, Clock, CheckCircle, HeartHandshake } from 'lucide-react';

interface MetricasProps {
  total: number;
  pendientes: number;
  confirmados: number;
  presentados: number;
}

export const MetricasPanel: React.FC<MetricasProps> = ({
  total,
  pendientes,
  confirmados,
  presentados,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
          <Users className="w-4 h-4 text-blue-600" />
          <span>Total inscritos</span>
        </div>
        <span className="text-2xl font-bold text-slate-900">{total}</span>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
          <Clock className="w-4 h-4 text-amber-500" />
          <span>Pendientes</span>
        </div>
        <span className="text-2xl font-bold text-slate-900">{pendientes}</span>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
          <CheckCircle className="w-4 h-4 text-blue-500" />
          <span>Confirmados</span>
        </div>
        <span className="text-2xl font-bold text-slate-900">{confirmados}</span>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
          <HeartHandshake className="w-4 h-4 text-green-500" />
          <span>Presentados</span>
        </div>
        <span className="text-2xl font-bold text-slate-900">{presentados}</span>
      </div>
    </div>
  );
};

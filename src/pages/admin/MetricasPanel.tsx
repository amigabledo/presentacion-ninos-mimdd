import React from 'react';
import { Users, Heart, Baby } from 'lucide-react';
import type { PresentacionNino } from '@/types';

interface MetricasProps {
  registros: PresentacionNino[];
}

export const MetricasPanel: React.FC<MetricasProps> = ({ registros }) => {
  const total = registros.length;
  const conAmbosPadres = registros.filter(
    (r) => r.nombre_padre && r.nombre_padre !== 'N/A' && r.nombre_madre && r.nombre_madre !== 'N/A'
  ).length;
  const bebes = registros.filter((r) => {
    const edad = (r.edad_nino || '').toLowerCase();
    return edad.includes('mes') || edad.includes('días') || edad.includes('dia');
  }).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1.5">
          <Users className="w-4 h-4 text-sky-600" />
          <span>Total niños inscritos</span>
        </div>
        <span className="text-3xl font-extrabold text-slate-900">{total}</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1.5">
          <Heart className="w-4 h-4 text-purple-600" />
          <span>Familias con ambos padres</span>
        </div>
        <span className="text-3xl font-extrabold text-slate-900">{conAmbosPadres}</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1.5">
          <Baby className="w-4 h-4 text-emerald-600" />
          <span>Lactantes (meses o días)</span>
        </div>
        <span className="text-3xl font-extrabold text-slate-900">{bebes}</span>
      </div>
    </div>
  );
};

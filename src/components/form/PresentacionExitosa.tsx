import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, UserPlus } from 'lucide-react';
import type { PresentacionFormData } from '@/types';

interface PresentacionExitosaProps {
  data: PresentacionFormData;
  onReset: () => void;
}

export const PresentacionExitosa: React.FC<PresentacionExitosaProps> = ({ data, onReset }) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignorar fallo de confetti
    }
  }, []);

  return (
    <div className="text-center py-6 sm:py-8 space-y-6">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Registro completado con éxito
        </h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Usted ha completado satisfactoriamente la inscripción para la presentación de{' '}
          <strong className="text-slate-900">{data.nombre_nino}</strong>.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2 text-slate-700">
        <div className="flex justify-between border-b border-slate-200 pb-1.5">
          <span className="text-slate-500">Niño o niña:</span>
          <span className="font-semibold text-slate-900">{data.nombre_nino}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-1.5">
          <span className="text-slate-500">Edad aproximada:</span>
          <span className="font-semibold text-slate-900">{data.edad_nino}</span>
        </div>
        <div className="flex justify-between border-b border-slate-200 pb-1.5">
          <span className="text-slate-500">Padre:</span>
          <span className="font-semibold text-slate-900">{data.nombre_padre}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Madre:</span>
          <span className="font-semibold text-slate-900">{data.nombre_madre}</span>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/40 text-xs font-semibold text-slate-700 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Registrar a otro niño o niña</span>
        </button>
      </div>
    </div>
  );
};

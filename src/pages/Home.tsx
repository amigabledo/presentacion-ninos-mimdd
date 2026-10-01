import React, { useState } from 'react';
import { FormularioPresentacion } from '@/components/form/FormularioPresentacion';
import { PresentacionExitosa } from '@/components/form/PresentacionExitosa';
import type { PresentacionFormData } from '@/types';
import { Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const [registroExitosoData, setRegistroExitosoData] = useState<PresentacionFormData | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100 flex flex-col">
      {/* Barra superior institucional limpia sin botones administrativos */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-200/80 flex items-center justify-center p-1 shadow-xs">
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="Logo Monte de Dios"
                  width="36"
                  height="36"
                  fetchPriority="high"
                  className="w-full h-full object-contain"
                />
              </picture>
            </div>
            <div>
              <span className="text-sm sm:text-base font-bold text-slate-900 block leading-tight tracking-tight">
                Monte de Dios
              </span>
              <span className="text-xs text-slate-500 block leading-tight mt-0.5">
                Presentación de niños
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal del formulario */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Inscripción para presentación</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Presentación de niños
          </h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
            Aquí puede completar los datos para la presentación de su niño o niña.
          </p>
        </div>

        {/* Tarjeta del formulario */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-6 sm:p-8">
          {registroExitosoData ? (
            <PresentacionExitosa
              data={registroExitosoData}
              onReset={() => setRegistroExitosoData(null)}
            />
          ) : (
            <FormularioPresentacion onSuccess={(data) => setRegistroExitosoData(data)} />
          )}
        </div>
      </main>

      {/* Pie de página institucional */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 space-y-1">
        <p>Presentación de niños</p>
        <p>Ministerio Internacional Monte de Dios</p>
      </footer>
    </div>
  );
};

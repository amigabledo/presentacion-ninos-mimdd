import React, { useState } from 'react';
import { FormularioPresentacion } from '@/components/form/FormularioPresentacion';
import { PresentacionExitosa } from '@/components/form/PresentacionExitosa';
import type { PresentacionFormData } from '@/types';

export const Home: React.FC = () => {
  const [registroExitosoData, setRegistroExitosoData] = useState<PresentacionFormData | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf4fe] via-[#f7f2fe] to-[#eff6fe] flex flex-col relative overflow-hidden">
      {/* Elementos decorativos de fondo estilo flyer en nubes pastel */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-purple-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-sky-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-fuchsia-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Barra superior institucional */}
      <header className="bg-white/85 backdrop-blur-md border-b border-sky-100/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-center">
          <div className="flex items-center justify-center gap-3 text-center">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-sky-100 flex items-center justify-center p-1 shadow-xs shrink-0">
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
                Ministerio Internacional Monte de Dios
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal del formulario */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:py-12 relative z-10">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-[#a855f7]">Presentación </span>
            <span className="text-[#3b82f6]">de niños</span>
          </h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Complete los datos para la
            <br />
            presentación de su niño o niña
            <br />
            el domingo 25/octubre/2026:
          </p>
        </div>

        {/* Tarjeta del formulario con marco redondeado estilo flyer */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-900/5 border-2 border-sky-200/80 p-6 sm:p-8">
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
    </div>
  );
};

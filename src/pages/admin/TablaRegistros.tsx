import React from 'react';
import type { PresentacionNino, EstadoPresentacion } from '@/types';
import { MessageCircle } from 'lucide-react';

interface TablaProps {
  cargando: boolean;
  registros: PresentacionNino[];
  onCambiarEstado: (id: string, nuevoEstado: EstadoPresentacion) => void;
}

export const TablaRegistros: React.FC<TablaProps> = ({
  cargando,
  registros,
  onCambiarEstado,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50/80 text-slate-700 font-bold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Niño o niña</th>
              <th className="py-3 px-4">Edad / Nacimiento</th>
              <th className="py-3 px-4">Padre</th>
              <th className="py-3 px-4">Madre</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cargando ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  Cargando registros
                </td>
              </tr>
            ) : registros.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No se encontraron registros
                </td>
              </tr>
            ) : (
              registros.map((r) => {
                const telPadreDigits = r.telefono_padre.replace(/\D/g, '');
                const telMadreDigits = r.telefono_madre.replace(/\D/g, '');
                return (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{r.nombre_nino}</td>
                    <td className="py-3 px-4">
                      <span className="block font-medium text-slate-800">{r.edad_nino}</span>
                      <span className="text-[11px] text-slate-400">{r.fecha_nacimiento}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="block font-medium text-slate-800">{r.nombre_padre}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-slate-500">{r.telefono_padre}</span>
                        {telPadreDigits && (
                          <a
                            href={`https://wa.me/1${telPadreDigits}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-600 hover:text-green-700"
                            title="WhatsApp padre"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="block font-medium text-slate-800">{r.nombre_madre}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-slate-500">{r.telefono_madre}</span>
                        {telMadreDigits && (
                          <a
                            href={`https://wa.me/1${telMadreDigits}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-600 hover:text-green-700"
                            title="WhatsApp madre"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={r.estado}
                        onChange={(e) =>
                          onCambiarEstado(r.id, e.target.value as EstadoPresentacion)
                        }
                        className="px-2 py-1 rounded bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 focus:outline-none"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="presentado">Presentado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

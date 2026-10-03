import React from 'react';
import type { PresentacionNino, EstadoPresentacion } from '@/types';
import { MessageCircle, Calendar, User, Phone, Baby } from 'lucide-react';

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
  if (cargando) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 p-8 text-center text-slate-400 text-xs shadow-xs">
        Cargando registros
      </div>
    );
  }

  if (registros.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 p-8 text-center text-slate-400 text-xs shadow-xs">
        No se encontraron registros
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Vista para móviles (tarjetas individuales limpias sin desborde) */}
      <div className="sm:hidden space-y-3">
        {registros.map((r) => {
          const telPadreDigits = r.telefono_padre.replace(/\D/g, '');
          const telMadreDigits = r.telefono_madre.replace(/\D/g, '');
          return (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Baby className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">
                      {r.nombre_nino}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {r.edad_nino} • {r.fecha_nacimiento}
                    </span>
                  </div>
                </div>

                <select
                  value={r.estado}
                  onChange={(e) =>
                    onCambiarEstado(r.id, e.target.value as EstadoPresentacion)
                  }
                  className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="presentado">Presentado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              {/* Datos de los padres en móvil */}
              <div className="grid grid-cols-1 gap-2 text-xs">
                {/* Padre */}
                <div className="p-2.5 rounded-xl bg-sky-50/60 border border-sky-100/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-sky-700 font-bold block uppercase tracking-wider">
                      Padre
                    </span>
                    <span className="font-medium text-slate-800 block">{r.nombre_padre}</span>
                    <span className="text-slate-500 text-[11px]">{r.telefono_padre}</span>
                  </div>
                  {telPadreDigits && (
                    <a
                      href={`https://wa.me/1${telPadreDigits}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white border border-sky-200 text-emerald-600 hover:bg-emerald-50 transition-colors shadow-xs"
                      title="WhatsApp padre"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Madre */}
                <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-purple-700 font-bold block uppercase tracking-wider">
                      Madre
                    </span>
                    <span className="font-medium text-slate-800 block">{r.nombre_madre}</span>
                    <span className="text-slate-500 text-[11px]">{r.telefono_madre}</span>
                  </div>
                  {telMadreDigits && (
                    <a
                      href={`https://wa.me/1${telMadreDigits}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-white border border-purple-200 text-emerald-600 hover:bg-emerald-50 transition-colors shadow-xs"
                      title="WhatsApp madre"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-1 text-right">
                Registrado el {new Date(r.created_at).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Vista para tablet y escritorio (tabla completa organizada) */}
      <div className="hidden sm:block bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
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
              {registros.map((r) => {
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
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

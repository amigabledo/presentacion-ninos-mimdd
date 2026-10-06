import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPresentaciones } from '@/lib/presentacionesService';
import type { PresentacionNino } from '@/types';
import { MetricasPanel } from './MetricasPanel';
import { TablaRegistros } from './TablaRegistros';
import { Search, RefreshCw, LogOut, User, FileSpreadsheet, FileText } from 'lucide-react';
import { exportarExcel, exportarPDF } from '@/lib/exportUtils';

export const GestionPanel: React.FC = () => {
  const [registros, setRegistros] = useState<PresentacionNino[]>([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [cargando, setCargando] = useState(true);
  const [usuarioActual, setUsuarioActual] = useState('Administrador');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('mimdd_admin_auth');
    if (!auth) {
      navigate('/gestion/login');
      return;
    }
    try {
      const parsed = JSON.parse(auth);
      if (parsed.user === 'kramos') {
        setUsuarioActual('Katherine Ramos');
      } else if (parsed.user === 'marcos') {
        setUsuarioActual('Marcos');
      } else {
        setUsuarioActual(parsed.user || 'Administrador');
      }
    } catch {
      // Ignorar
    }
    cargarDatos();
  }, [navigate]);

  const cargarDatos = async () => {
    setCargando(true);
    const data = await fetchPresentaciones();
    setRegistros(data);
    setCargando(false);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('mimdd_admin_auth');
    navigate('/gestion/login');
  };

  const filtrados = registros.filter((r) => {
    const texto = filtroTexto.toLowerCase();
    return (
      r.nombre_nino.toLowerCase().includes(texto) ||
      r.nombre_padre.toLowerCase().includes(texto) ||
      r.nombre_madre.toLowerCase().includes(texto) ||
      r.telefono_padre.includes(filtroTexto) ||
      r.telefono_madre.includes(filtroTexto)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center p-1 shadow-xs">
              <img src="/logo.png" alt="Logo Monte de Dios" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block leading-tight">
                Ministerio Internacional Monte de Dios
              </span>
              <span className="text-xs text-slate-500 block leading-tight">
                Gestión de presentación de niños
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>{usuarioActual}</span>
            </div>

            <button
              onClick={() => exportarExcel(filtrados)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 shadow-xs transition-colors"
              title="Exportar archivo de Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Exportar Excel</span>
            </button>

            <button
              onClick={() => exportarPDF(filtrados)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-700 hover:bg-rose-100 shadow-xs transition-colors"
              title="Exportar reporte en PDF"
            >
              <FileText className="w-3.5 h-3.5 text-rose-600" />
              <span>Exportar PDF</span>
            </button>

            <button
              onClick={cargarDatos}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Actualizar datos"
            >
              <RefreshCw className={`w-4 h-4 ${cargando ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleCerrarSesion}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        <MetricasPanel registros={registros} />

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por niño, padres o teléfono"
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium self-end sm:self-center">
            Mostrando {filtrados.length} de {registros.length} inscritos
          </div>
        </div>

        <TablaRegistros
          cargando={cargando}
          registros={filtrados}
        />
      </main>
    </div>
  );
};

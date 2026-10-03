import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPresentaciones, actualizarEstadoPresentacion } from '@/lib/presentacionesService';
import type { PresentacionNino, EstadoPresentacion } from '@/types';
import { MetricasPanel } from './MetricasPanel';
import { TablaRegistros } from './TablaRegistros';
import { Search, Upload, RefreshCw, LogOut, User } from 'lucide-react';

export const GestionPanel: React.FC = () => {
  const [registros, setRegistros] = useState<PresentacionNino[]>([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
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

  const handleCambiarEstado = async (id: string, nuevoEstado: EstadoPresentacion) => {
    await actualizarEstadoPresentacion(id, nuevoEstado);
    setRegistros((prev) =>
      prev.map((r) => (r.id === id ? { ...r, estado: nuevoEstado } : r))
    );
  };

  const exportarCSV = () => {
    if (registros.length === 0) return;
    const encabezados = [
      'Niño o niña',
      'Fecha nacimiento',
      'Edad',
      'Padre',
      'Teléfono padre',
      'Madre',
      'Teléfono madre',
      'Estado',
      'Fecha registro',
    ];

    const filas = registros.map((r) => [
      `"${r.nombre_nino.replace(/"/g, '""')}"`,
      r.fecha_nacimiento,
      `"${r.edad_nino}"`,
      `"${r.nombre_padre.replace(/"/g, '""')}"`,
      r.telefono_padre,
      `"${r.nombre_madre.replace(/"/g, '""')}"`,
      r.telefono_madre,
      r.estado,
      new Date(r.created_at).toLocaleDateString(),
    ]);

    const csvContent =
      '\uFEFF' + [encabezados.join(','), ...filas.map((f) => f.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `presentaciones_ninos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filtrados = registros.filter((r) => {
    const matchTexto =
      r.nombre_nino.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      r.nombre_padre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      r.nombre_madre.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      r.telefono_padre.includes(filtroTexto) ||
      r.telefono_madre.includes(filtroTexto);
    const matchEstado = filtroEstado === 'todos' || r.estado === filtroEstado;
    return matchTexto && matchEstado;
  });

  const total = registros.length;
  const pendientes = registros.filter((r) => r.estado === 'pendiente').length;
  const confirmados = registros.filter((r) => r.estado === 'confirmado').length;
  const presentados = registros.filter((r) => r.estado === 'presentado').length;

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
              onClick={exportarCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
              title="Exportar archivo CSV con flecha hacia arriba"
            >
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span>Exportar</span>
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
        <MetricasPanel
          total={total}
          pendientes={pendientes}
          confirmados={confirmados}
          presentados={presentados}
        />

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por niño, padres o teléfono"
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none w-full sm:w-auto"
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="confirmado">Confirmados</option>
              <option value="presentado">Presentados</option>
              <option value="cancelado">Cancelados</option>
            </select>
          </div>
        </div>

        <TablaRegistros
          cargando={cargando}
          registros={filtrados}
          onCambiarEstado={handleCambiarEstado}
        />
      </main>
    </div>
  );
};

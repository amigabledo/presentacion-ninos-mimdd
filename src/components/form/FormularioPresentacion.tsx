import React, { useState } from 'react';
import type { PresentacionFormData } from '@/types';
import { calcularEdad, formatearTelefono } from '@/lib/utils';
import { crearPresentacion } from '@/lib/presentacionesService';
import { Loader2, Calendar, User, Phone, Baby, CheckCircle2 } from 'lucide-react';

interface FormularioProps {
  onSuccess: (data: PresentacionFormData) => void;
}

export const FormularioPresentacion: React.FC<FormularioProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<PresentacionFormData>({
    nombre_nino: '',
    fecha_nacimiento: '',
    edad_nino: '',
    nombre_padre: '',
    telefono_padre: '',
    nombre_madre: '',
    telefono_madre: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fecha = e.target.value;
    const edadCalculada = calcularEdad(fecha);
    setFormData((prev) => ({
      ...prev,
      fecha_nacimiento: fecha,
      edad_nino: edadCalculada || prev.edad_nino,
    }));
  };

  const handleTelefonoPadreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      telefono_padre: formatearTelefono(e.target.value),
    }));
  };

  const handleTelefonoMadreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      telefono_madre: formatearTelefono(e.target.value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (
      !formData.nombre_nino.trim() ||
      !formData.fecha_nacimiento ||
      !formData.edad_nino.trim() ||
      !formData.nombre_padre.trim() ||
      !formData.telefono_padre.trim() ||
      !formData.nombre_madre.trim() ||
      !formData.telefono_madre.trim()
    ) {
      setErrorMessage('Todos los campos son obligatorios para continuar.');
      return;
    }

    const telPadreDigitos = formData.telefono_padre.replace(/\D/g, '');
    if (telPadreDigitos.length < 10) {
      setErrorMessage('Por favor ingrese los 10 dígitos del teléfono del padre.');
      return;
    }

    const telMadreDigitos = formData.telefono_madre.replace(/\D/g, '');
    if (telMadreDigitos.length < 10) {
      setErrorMessage('Por favor ingrese los 10 dígitos del teléfono de la madre.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await crearPresentacion(formData);
      if (res.success) {
        onSuccess(formData);
      } else {
        setErrorMessage(res.error || 'Ocurrió un error al enviar el formulario.');
      }
    } catch {
      setErrorMessage('Ocurrió un error de conexión al enviar el registro.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-500">Inscripción</span>
        <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
          Todos los campos son obligatorios
        </span>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Datos del niño o niña */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Baby className="w-4 h-4 text-[#a855f7]" />
          <h2 className="text-sm font-bold text-slate-800">
            Datos del niño o niña
          </h2>
        </div>

        <div>
          <label htmlFor="nombre_nino" className="block text-xs font-semibold text-slate-700 mb-1">
            Nombre del niño o niña <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="nombre_nino"
              type="text"
              required
              value={formData.nombre_nino}
              onChange={(e) => setFormData((prev) => ({ ...prev, nombre_nino: e.target.value }))}
              placeholder="Nombre completo del niño o niña"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fecha_nacimiento" className="block text-xs font-semibold text-slate-700 mb-1">
              Fecha de nacimiento <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="fecha_nacimiento"
                type="date"
                required
                max={new Date().toISOString().split('T')[0]}
                value={formData.fecha_nacimiento}
                onChange={handleFechaChange}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="edad_nino" className="block text-xs font-semibold text-slate-700 mb-1">
              Edad del niño o niña <span className="text-red-500">*</span>
            </label>
            <input
              id="edad_nino"
              type="text"
              required
              value={formData.edad_nino}
              onChange={(e) => setFormData((prev) => ({ ...prev, edad_nino: e.target.value }))}
              placeholder="Se calcula al seleccionar fecha"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30 focus:border-[#3b82f6] transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Datos de los padres */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <User className="w-4 h-4 text-[#3b82f6]" />
          <h2 className="text-sm font-bold text-slate-800">
            Datos de los padres
          </h2>
        </div>

        {/* Datos del padre */}
        <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-3">
          <span className="text-xs font-bold text-sky-950 block">
            Datos del padre
          </span>
          <div>
            <label htmlFor="nombre_padre" className="block text-xs font-medium text-slate-700 mb-1">
              Nombre completo del padre <span className="text-red-500">*</span>
            </label>
            <input
              id="nombre_padre"
              type="text"
              required
              value={formData.nombre_padre}
              onChange={(e) => setFormData((prev) => ({ ...prev, nombre_padre: e.target.value }))}
              placeholder="Nombre y apellidos del padre"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sky-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label htmlFor="telefono_padre" className="block text-xs font-medium text-slate-700 mb-1">
              Teléfono del padre <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="telefono_padre"
                type="tel"
                required
                minLength={14}
                maxLength={14}
                value={formData.telefono_padre}
                onChange={handleTelefonoPadreChange}
                placeholder="(809) 000-0000"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-sky-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Datos de la madre */}
        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
          <span className="text-xs font-bold text-purple-950 block">
            Datos de la madre
          </span>
          <div>
            <label htmlFor="nombre_madre" className="block text-xs font-medium text-slate-700 mb-1">
              Nombre completo de la madre <span className="text-red-500">*</span>
            </label>
            <input
              id="nombre_madre"
              type="text"
              required
              value={formData.nombre_madre}
              onChange={(e) => setFormData((prev) => ({ ...prev, nombre_madre: e.target.value }))}
              placeholder="Nombre y apellidos de la madre"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-purple-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label htmlFor="telefono_madre" className="block text-xs font-medium text-slate-700 mb-1">
              Teléfono de la madre <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="telefono_madre"
                type="tel"
                required
                minLength={14}
                maxLength={14}
                value={formData.telefono_madre}
                onChange={handleTelefonoMadreChange}
                placeholder="(809) 000-0000"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-purple-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] hover:from-[#2563eb] hover:to-[#9333ea] text-white font-semibold text-sm shadow-md shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Guardando información</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Enviar registro</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

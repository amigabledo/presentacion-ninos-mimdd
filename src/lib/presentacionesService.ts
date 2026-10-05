import { supabase } from './supabase';
import type { PresentacionNino, PresentacionFormData, EstadoPresentacion } from '@/types';

const STORAGE_KEY = 'mimdd_presentaciones_locales';

export async function crearPresentacion(data: PresentacionFormData): Promise<{ success: boolean; error: string | null }> {
  try {
    const payload = {
      nombre_nino: data.nombre_nino.trim(),
      fecha_nacimiento: data.fecha_nacimiento,
      edad_nino: data.edad_nino.trim(),
      nombre_padre: data.nombre_padre.trim(),
      telefono_padre: data.telefono_padre.trim(),
      nombre_madre: data.nombre_madre.trim(),
      telefono_madre: data.telefono_madre.trim(),
      estado: 'pendiente',
    };

    const { error } = await supabase.from('presentaciones_ninos').insert([payload]);

    if (error) {
      console.warn('Fallo insercion directa en Supabase, guardando localmente:', error.message);
      guardarEnLocal(payload);
      return { success: true, error: null };
    }

    try {
      const endpoint = window.location.hostname.includes('pages.dev')
        ? '/api/presentacion'
        : 'https://registro-nuevos-servidores.pages.dev/api/presentacion';

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((e) => console.warn('Aviso de envío a Google Sheets:', e));
    } catch (ignore) {}

    return { success: true, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error inesperado';
    return { success: false, error: msg };
  }
}

export async function fetchPresentaciones(): Promise<PresentacionNino[]> {
  try {
    const { data, error } = await supabase
      .from('presentaciones_ninos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data as PresentacionNino[];
    }
  } catch {
    // Continuar con respaldo local
  }

  return obtenerDeLocal();
}

export async function actualizarEstadoPresentacion(
  id: string,
  estado: EstadoPresentacion,
  notas?: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const updatePayload: { estado: EstadoPresentacion; notas?: string } = { estado };
    if (notas !== undefined) {
      updatePayload.notas = notas;
    }

    const { error } = await supabase
      .from('presentaciones_ninos')
      .update(updatePayload)
      .eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al actualizar registro';
    return { success: false, error: msg };
  }
}

function guardarEnLocal(item: Record<string, unknown>) {
  try {
    const guardados = obtenerDeLocal();
    const nuevo: PresentacionNino = {
      id: `local-${Date.now()}`,
      nombre_nino: String(item.nombre_nino),
      fecha_nacimiento: String(item.fecha_nacimiento),
      edad_nino: String(item.edad_nino),
      nombre_padre: String(item.nombre_padre),
      telefono_padre: String(item.telefono_padre),
      nombre_madre: String(item.nombre_madre),
      telefono_madre: String(item.telefono_madre),
      estado: 'pendiente',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([nuevo, ...guardados]));
  } catch {
    // Ignorar fallo de almacenamiento
  }
}

function obtenerDeLocal(): PresentacionNino[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

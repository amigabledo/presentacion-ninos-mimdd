export type EstadoPresentacion = 'pendiente' | 'confirmado' | 'presentado' | 'cancelado';

export interface PresentacionNino {
  id: string;
  nombre_nino: string;
  fecha_nacimiento: string;
  edad_nino: string;
  nombre_padre: string;
  telefono_padre: string;
  nombre_madre: string;
  telefono_madre: string;
  notas?: string | null;
  estado: EstadoPresentacion;
  created_at: string;
  updated_at: string;
}

export interface PresentacionFormData {
  nombre_nino: string;
  fecha_nacimiento: string;
  edad_nino: string;
  nombre_padre: string;
  telefono_padre: string;
  nombre_madre: string;
  telefono_madre: string;
}

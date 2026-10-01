export function cn(...inputs: (string | boolean | null | undefined)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export function calcularEdad(fechaNacimiento: string): string {
  if (!fechaNacimiento) return '';

  const partes = fechaNacimiento.split('-');
  if (partes.length !== 3) return '';

  const fechaNac = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
  const hoy = new Date();

  if (isNaN(fechaNac.getTime()) || fechaNac > hoy) return '';

  let anios = hoy.getFullYear() - fechaNac.getFullYear();
  let meses = hoy.getMonth() - fechaNac.getMonth();
  let dias = hoy.getDate() - fechaNac.getDate();

  if (dias < 0) {
    meses -= 1;
    const ultimoDiaMesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
    dias += ultimoDiaMesAnterior;
  }

  if (meses < 0) {
    anios -= 1;
    meses += 12;
  }

  if (anios === 0) {
    if (meses === 0) {
      return dias <= 1 ? '1 día de nacido' : `${dias} días de nacido`;
    }
    const txtMes = meses === 1 ? '1 mes' : `${meses} meses`;
    return txtMes;
  }

  const txtAnio = anios === 1 ? '1 año' : `${anios} años`;
  if (meses > 0) {
    const txtMes = meses === 1 ? '1 mes' : `${meses} meses`;
    return `${txtAnio} y ${txtMes}`;
  }

  return txtAnio;
}

export function formatearTelefono(val: string): string {
  const digits = val.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

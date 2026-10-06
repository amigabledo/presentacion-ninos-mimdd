import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { PresentacionNino } from '@/types';

export function exportarExcel(registros: PresentacionNino[]): void {
  const rows = registros.map((r) => ({
    'Marca temporal': r.created_at ? new Date(r.created_at).toLocaleString('es-DO') : '',
    'Nombre del niño o niña': r.nombre_nino,
    'Fecha de nacimiento': r.fecha_nacimiento,
    'Edad del niño': r.edad_nino,
    'Nombre del padre': r.nombre_padre,
    'Teléfono del padre': r.telefono_padre,
    'Nombre de la madre': r.nombre_madre,
    'Teléfono de la madre': r.telefono_madre,
    'Notas y observaciones': r.notas || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  worksheet['!cols'] = [
    { wch: 20 }, // Marca temporal
    { wch: 28 }, // Nombre niño
    { wch: 18 }, // Fecha nacimiento
    { wch: 16 }, // Edad
    { wch: 26 }, // Nombre padre
    { wch: 18 }, // Teléfono padre
    { wch: 26 }, // Nombre madre
    { wch: 18 }, // Teléfono madre
    { wch: 32 }, // Notas
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Presentaciones');

  const fechaStr = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `presentaciones_ninos_${fechaStr}.xlsx`);
}

export function exportarPDF(registros: PresentacionNino[]): void {
  const doc = new jsPDF({ orientation: 'landscape', format: 'a4' });

  // Encabezado institucional
  doc.setFontSize(15);
  doc.setTextColor(3, 105, 161);
  doc.text('Ministerio Internacional Monte de Dios', 14, 15);

  doc.setFontSize(11);
  doc.setTextColor(51, 65, 85);
  doc.text('Inscripción para presentación de niños', 14, 22);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  const fechaStr = new Date().toLocaleDateString('es-DO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Generado el: ${fechaStr} | Total de inscritos: ${registros.length}`, 14, 28);

  const tableHead = [[
    'Niño o niña',
    'Nacimiento',
    'Edad',
    'Padre',
    'Teléfono padre',
    'Madre',
    'Teléfono madre',
    'Notas y observaciones',
  ]];

  const tableBody = registros.map((r) => [
    r.nombre_nino,
    r.fecha_nacimiento,
    r.edad_nino,
    r.nombre_padre,
    r.telefono_padre,
    r.nombre_madre,
    r.telefono_madre,
    r.notas || '-',
  ]);

  autoTable(doc, {
    startY: 32,
    head: tableHead,
    body: tableBody,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2.5,
      textColor: [30, 41, 59],
      valign: 'middle',
    },
    headStyles: {
      fillColor: [3, 105, 161],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'left',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 44 },
      1: { cellWidth: 24 },
      2: { cellWidth: 24 },
      3: { cellWidth: 38 },
      4: { cellWidth: 28 },
      5: { cellWidth: 38 },
      6: { cellWidth: 28 },
      7: { cellWidth: 'auto' },
    },
    margin: { left: 14, right: 14 },
  });

  const fechaDoc = new Date().toISOString().slice(0, 10);
  doc.save(`presentaciones_ninos_${fechaDoc}.pdf`);
}

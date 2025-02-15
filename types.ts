export interface EntidadPresupuestaria {
  subJurisdiccion: string;
  ejecutado: number;
  entidad: string;
  jurisdiccion: string;
  presupuestado: number;
  codigoSubjurisdiccion: number;
  ejercicio: number;
}

export interface IngresoEgresoPIB {
  ingreso: number;
  pib: number;
  gasto: number;
  ejercicio: number;
}

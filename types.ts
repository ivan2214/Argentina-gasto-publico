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

export interface AQueSeDestinaElGasto {
  finalidad: string;
  ejecutado: number;
  funcion: string;
  presupuestado: number;
  ejercicio: number;
}

export interface DondeSeGasta {
  codigo: string;
  ejecutado: number;
  provincia: string;
  presupuestado: number;
  ejercicio: number;
}
export interface GeoData {
  objects: Objects;
  type: string;
  transform: Transform;
  arcs: number[][][];
}

interface Transform {
  translate: number[];
  scale: number[];
}

interface Objects {
  departamentos: Departamentos;
  provincias: Provincias;
}

interface Provincias {
  type: string;
  geometries: Geometry2[];
}

interface Geometry2 {
  type: string;
  properties: Properties2;
  arcs: (number[] | number)[][];
}

interface Properties2 {
  PROVINCIA: string;
}

interface Departamentos {
  type: string;
  geometries: Geometry[];
}

interface Geometry {
  properties: Properties;
  type: null | string;
  id: string;
  arcs?: number[][];
}

interface Properties {
  a: string;
  c: string;
  d: string;
  p_id: string;
  p: string;
}

export interface DeDondeVienenLosRecursos {
	tipo: string;
	estimado: number;
	recaudado: number;
	concepto: string;
	subconcepto: string;
	clase: string;
	ejercicio: number;
}

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
	type: "Topology";
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
	type: "GeometryCollection";
	geometries: Geometry2[];
}

interface Geometry2 {
	type: "Polygon | MultiPolygon";
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

export interface GeojsonProvincias {
	type: string;
	features: Feature[];
}

export interface Feature {
	type: string;
	properties: Properties;
	geometry: Geometry;
}

interface Geometry {
	type: string | null;
	coordinates: (number[] | number)[][][];
}

interface Properties {
	PROVINCIA: string;
}

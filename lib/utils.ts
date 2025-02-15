import { type ClassValue, clsx } from "clsx";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function removeAccents(str: string) {
	return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export const formatNumber = (num: ValueType) =>
	new Intl.NumberFormat("es-AR", {
		notation: "compact",
		maximumFractionDigits: 2,
	}).format(num as number);

export function hexToRgb(hex: string): string {
	// Crear una copia de la cadena para evitar modificar el parámetro directamente
	const hexColor = hex.replace("#", "");

	// Verificar si el formato es 6 dígitos (RR GG BB)
	if (hexColor.length === 6) {
		const r = Number.parseInt(hexColor.substring(0, 2), 16);
		const g = Number.parseInt(hexColor.substring(2, 4), 16);
		const b = Number.parseInt(hexColor.substring(4, 6), 16);
		return `rgb(${r}, ${g}, ${b})`;
	}

	// Si el formato no es válido, devolver un color por defecto
	return "rgb(0, 0, 0)";
}

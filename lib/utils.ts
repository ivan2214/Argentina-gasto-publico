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

export function hexToRgba(hex: string, opacity: number) {
	// Remueve el "#" si existe
	const newHex = hex.replace(/^#/, "");

	// Convierte hex a valores RGB
	const r = Number.parseInt(newHex.substring(0, 2), 16);
	const g = Number.parseInt(newHex.substring(2, 4), 16);
	const b = Number.parseInt(newHex.substring(4, 6), 16);

	// Retorna el valor en rgba
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

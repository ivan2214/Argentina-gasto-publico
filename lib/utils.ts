import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeAccents(str: string) {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export const formatNumber = (num: number) =>
  new Intl.NumberFormat("es-AR", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(num);

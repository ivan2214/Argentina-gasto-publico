import type { TotalBudget } from "@/components/BudgetComparisonChart";
import type { EntidadPresupuestaria } from "@/types";

export function processSpendingData(data: EntidadPresupuestaria[]) {
	if (!data || data.length === 0) {
		return {
			topSpenders: [],
			totals: { totalEjecutado: 0, totalPresupuestado: 0, ejercicio: 0 },
		};
	}

	// Ordenar por presupuesto ejecutado y tomar el top 10
	const topSpenders = data
		.sort((a, b) => (b.ejecutado ?? 0) - (a.ejecutado ?? 0))
		.slice(0, 10)
		.map((item) => ({
			entidad: item.entidad,
			ejecutado: (item.ejecutado ?? 0) / 1e9,
			presupuestado: (item.presupuestado ?? 0) / 1e9,
		}));

	// Calcular totales
	const totals: TotalBudget = data.reduce(
		(acc, item) => {
			acc.totalEjecutado += item.ejecutado ?? 0;
			acc.totalPresupuestado += item.presupuestado ?? 0;
			acc.ejercicio = item.ejercicio;
			return acc;
		},
		{ totalEjecutado: 0, totalPresupuestado: 0, ejercicio: 0 },
	);

	return { topSpenders, totals };
}

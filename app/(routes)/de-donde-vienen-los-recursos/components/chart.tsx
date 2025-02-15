"use client";

import { Cell, LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { formatNumber, hexToRgb } from "@/lib/utils";
import type { DeDondeVienenLosRecursos } from "@/types";

// Paleta de colores extendida

export function Chart({ data }: { data: DeDondeVienenLosRecursos[] }) {
	// Procesamiento de datos
	const processedData = data
		.map((item) => ({
			...item,
			value: item.recaudado,
			percentage:
				item.estimado > 0
					? `${((item.recaudado / item.estimado) * 100).toFixed(1)}%`
					: "N/A",
		}))
		.filter((item) => item.recaudado > 0)
		.sort((a, b) => b.recaudado - a.recaudado)
		.slice(0, 10);

	// Configuración dinámica de colores
	const chartConfig = processedData.reduce((acc, item, index) => {
		// hacer estogetComputedStyle(document.documentElement).getPropertyValue(
		//"--chart-2",
		//);

		let colorBase = "";

		if (typeof window !== "undefined") {
			colorBase = getComputedStyle(document.documentElement).getPropertyValue(
				`--chart-${index + 1}`,
			);
		}

		// Extraer los valores RGB del colorBase
		const rgbColor = hexToRgb(colorBase);

		// Calcular la opacidad basada en el porcentaje recaudado
		const opacity = 1 - index * 0.1; // 100%, 90%, 80%, ... (reducción de 10% por cada posición)

		const color = `${rgbColor.replace("rgb", "rgba").slice(0, -1)}, ${Math.max(opacity, 0)})`; // Construir el color con opacidad

		acc[item.concepto] = {
			label: item.concepto,
			color,
		};
		return acc;
	}, {} as ChartConfig);

	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square h-[350px] w-full"
		>
			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={processedData}
						dataKey="recaudado"
						nameKey="recaudado"
						paddingAngle={2}
						stroke="var(--background)"
					>
						{processedData.map((entry) => (
							<Cell
								key={`cell-${entry.concepto}`}
								fill={chartConfig[entry.concepto]?.color}
								strokeWidth={2}
							/>
						))}
						<LabelList
							dataKey="percentage"
							position="outside"
							className="fill-foreground text-[10px]"
							stroke="none"
							offset={15}
						/>
					</Pie>

					<ChartTooltip
						content={
							<ChartTooltipContent
								nameKey="concepto"
								labelKey="concepto"
								labelFormatter={(value) => `Concepto: ${value}`}
								formatter={(value) => `${formatNumber(value)}`}
								labelClassName="font-semibold text-primary"
								className="border-none bg-background/90 shadow-lg backdrop-blur-sm"
							/>
						}
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
}

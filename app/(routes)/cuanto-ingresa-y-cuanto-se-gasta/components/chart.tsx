"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { formatNumber } from "@/lib/utils";
import type { IngresoEgresoPIB } from "@/types";
import { BarChart2, Calendar } from "lucide-react";

const chartConfig = {
	ingreso: {
		label: "Ingreso",
		color: "var(--chart-1)",
	},
	gasto: {
		label: "Gasto",
		color: "var(--chart-2)",
	},
	pib: {
		label: "PIB",
		color: "var(--chart-3)", // Nuevo color
	},
	ejercicio: {
		label: "Ejercicio",
		color: "var(--chart-4)", // Nuevo color
	},
} satisfies ChartConfig;

interface ChartProps {
	data: IngresoEgresoPIB[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
	return (
		<ChartContainer config={chartConfig}>
			<LineChart
				accessibilityLayer
				data={data}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="ejercicio"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					type="category"
					allowDuplicatedCategory={false}
				/>
				<YAxis
					dataKey="pib"
					// Agrega formateador para mejor visualización
					tickFormatter={(value) => formatNumber(value)}
				/>

				<ChartTooltip
					label="ejercicio"
					cursor={false}
					accessibilityLayer
					content={
						<ChartTooltipContent
							labelKey="ejercicio"
							labelFormatter={(_label, payload) => {
								const item = payload[0];
								if (!item) return null;
								const {
									payload: { ejercicio },
								} = item;
								return (
									<div className="flex items-center space-x-2">
										<Calendar className="h-5 w-5 text-muted-foreground" />
										<h3 className="font-medium">
											Año:{" "}
											<span className="font-extralight text-muted-foreground">
												{ejercicio}
											</span>
										</h3>
									</div>
								);
							}}
							nameKey="ejercicio"
							indicator="dot"
							accessibilityLayer
							formatter={(value, name, item) => {
								// Suponemos que payload es el objeto de datos completo con ingresos y gastos
								const { payload } = item;
								console.log("payload : ", payload);
								const { ingreso, gasto } = payload;

								let iconColor = "text-muted-foreground"; // Color por defecto si son iguales o no se cumple ninguna condición
								if (ingreso > gasto) {
									iconColor = "text-green-500";
								} else if (gasto > ingreso) {
									iconColor = "text-red-500";
								}
								return (
									<div className="flex items-center space-x-2">
										<BarChart2 className={`h-5 w-5 ${iconColor}`} />
										<h3>
											{name.toString().toUpperCase()}:{" "}
											<span className="font-extralight text-muted-foreground">
												{formatNumber(value)}
											</span>
										</h3>
									</div>
								);
							}}
						/>
					}
				/>
				<Line
					dataKey="pib"
					type="monotone"
					stroke="var(--color-pib)" // Define este color en tu CSS
					strokeWidth={2}
					dot={false}
				/>

				<Line
					dataKey="ingreso"
					type="monotone"
					stroke="var(--color-ingreso)"
					strokeWidth={2}
					dot={false}
				/>
				<Line
					dataKey="gasto"
					type="monotone"
					stroke="var(--color-gasto)"
					strokeWidth={2}
					dot={false}
				/>
				<ChartLegend content={<ChartLegendContent />} />
			</LineChart>
		</ChartContainer>
	);
};

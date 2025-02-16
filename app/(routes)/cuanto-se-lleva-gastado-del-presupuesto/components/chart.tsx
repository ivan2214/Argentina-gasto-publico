"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { formatNumber } from "@/lib/utils";

export type TotalBudget = {
	ejercicio: number;
	totalEjecutado: number;
	totalPresupuestado: number;
};

export function Chart({ data }: { data: TotalBudget }) {
	const chartData = [
		{
			ejercicio: data.ejercicio,
			ejecutado: data.totalEjecutado,
			presupuestado: data.totalPresupuestado,
		},
	];

	const chartConfig = {
		ejercicio: {
			label: "Ejercicio",
		},
		ejecutado: {
			label: "Ejecutado",
			color: "var(--chart-1)",
		},
		presupuestado: {
			label: "Presupuestado",
			color: "var(--chart-2)",
		},
	} satisfies ChartConfig;

	return (
		<ChartContainer config={chartConfig}>
			<BarChart accessibilityLayer data={chartData}>
				<XAxis
					dataKey="ejercicio"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					type="category"
					tickFormatter={(value) => `Año ${value}`}
				/>
				<Bar
					dataKey="ejecutado"
					stackId="a"
					fill="var(--color-ejecutado)"
					radius={[0, 0, 4, 4]}
				/>
				<Bar
					dataKey="presupuestado"
					stackId="a"
					fill="var(--color-presupuestado)"
					radius={[4, 4, 0, 0]}
				/>
				<ChartTooltip
					content={
						<ChartTooltipContent
							formatter={(_value) => ""}
							labelFormatter={(value, payload) => {
								const data = payload?.[0]?.payload;
								return (
									<div>
										<h3 className="font-semibold text-primary">
											Finalidad:{" "}
											<span className="font-light text-muted-foreground">
												{value}
											</span>
										</h3>

										<p className="text-foreground">
											Ejecutado:{" "}
											<span className="font-light text-muted-foreground">
												{formatNumber(data?.ejecutado)}
											</span>
										</p>

										<p className="text-foreground">
											Presupuestado:{" "}
											<span className="font-light text-muted-foreground">
												{formatNumber(data?.presupuestado)}
											</span>
										</p>
										<p className="text-foreground">
											Año:{" "}
											<span className="font-light text-muted-foreground">
												{data?.ejercicio}
											</span>
										</p>
									</div>
								);
							}}
						/>
					}
					cursor={false}
					defaultIndex={1}
				/>

				<ChartTooltip
					content={
						<ChartTooltipContent
							formatter={(_value) => ""}
							labelFormatter={(value, payload) => {
								const data = payload?.[0]?.payload;
								return (
									<div>
										<h3 className="font-semibold text-primary">
											Finalidad:{" "}
											<span className="font-light text-muted-foreground">
												{value}
											</span>
										</h3>

										<p className="text-foreground">
											Ejecutado:{" "}
											<span className="font-light text-muted-foreground">
												{formatNumber(data?.ejecutado)}
											</span>
										</p>

										<p className="text-foreground">
											Presupuestado:{" "}
											<span className="font-light text-muted-foreground">
												{formatNumber(data?.presupuestado)}
											</span>
										</p>
										<p className="text-foreground">
											Año:{" "}
											<span className="font-light text-muted-foreground">
												{data?.ejercicio}
											</span>
										</p>
									</div>
								);
							}}
						/>
					}
					cursor={false}
					defaultIndex={1}
				/>
			</BarChart>
		</ChartContainer>
	);
}

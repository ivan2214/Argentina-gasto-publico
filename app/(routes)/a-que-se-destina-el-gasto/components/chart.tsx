"use client";

import { Cell, LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { formatNumber, hexToRgb } from "@/lib/utils";
import type { AQueSeDestinaElGasto } from "@/types";

export function Chart({ data }: { data: AQueSeDestinaElGasto[] }) {
	const processedData = data
		.map((item) => ({
			...item,
			value: item.ejecutado,
			percentage:
				item.presupuestado > 0
					? `${((item.ejecutado / item.presupuestado) * 100).toFixed(1)}%`
					: "N/A",
		}))
		.filter((item) => item.ejecutado > 0)
		.sort((a, b) => b.ejecutado - a.ejecutado)
		.slice(0, 10);

	const chartConfig = processedData.reduce((acc, item, index) => {
		let colorBase = "";
		if (typeof window !== "undefined") {
			colorBase = getComputedStyle(document.documentElement).getPropertyValue(
				`--chart-${index + 1}`,
			);
		}
		const rgbColor = hexToRgb(colorBase);
		const opacity = 1 - index * 0.1;
		const color = `${rgbColor.replace("rgb", "rgba").slice(0, -1)}, ${Math.max(opacity, 0)})`;
		acc[item.finalidad] = {
			label: item.finalidad,
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
						dataKey="ejecutado"
						nameKey="finalidad"
						paddingAngle={2}
						stroke="var(--background)"
					>
						{processedData.map((entry) => (
							<Cell
								key={`cell-${entry.finalidad}`}
								fill={chartConfig[entry.finalidad]?.color}
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
								nameKey="finalidad"
								labelKey="finalidad"
								labelFormatter={(value, payload) => {
									const data = payload[0]?.payload;

									return (
										<div>
											<h3 className="font-semibold text-primary">
												Finalidad:{" "}
												<span className="font-light text-muted-foreground">
													{value}
												</span>
											</h3>
											<p className="text-foreground">
												Porcentaje:{" "}
												<span className="font-light text-muted-foreground">
													{data?.percentage}
												</span>
											</p>
											<p className="text-foreground">
												Ejercutado:{" "}
												<span className="font-light text-muted-foreground">
													{formatNumber(data?.ejecutado)}
												</span>
											</p>
											<p className="text-foreground">
												Funcion:{" "}
												<span className="font-light text-muted-foreground">
													{data?.funcion}
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
								formatter={(_value) => ""}
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

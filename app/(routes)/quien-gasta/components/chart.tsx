"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

type TopSpender = {
	entidad: string;
	ejecutado: number;
	presupuestado: number;
};

const chartConfig = {
	entidad: {
		label: "Entidad",
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

export const Chart = ({ data }: { data: TopSpender[] }) => {
	return (
		<ChartContainer config={chartConfig}>
			<BarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="entidad"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					type="category"
					tickFormatter={(value) => {
						// Dividir por espacios y tomar la primera palabra
						const words = value.split(" ");
						if (words.length > 1) {
							// Si hay más de una palabra, devolver iniciales de cada una
							return words
								.map((w: string) => w.charAt(0).toUpperCase())
								.join("");
						}
						const newLocal = `${words[0].slice(0, 10)}…`;
						// Si es una sola palabra, acortarla si es muy larga
						return words[0].length > 10 ? newLocal : words[0];
					}}
				/>

				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="dashed" />}
				/>

				<Bar
					dataKey="presupuestado"
					fill="var(--color-presupuestado)"
					radius={4}
				/>
				<Bar dataKey="ejecutado" fill="var(--color-ejecutado)" radius={4} />
				<ChartLegend content={<ChartLegendContent />} />
			</BarChart>
		</ChartContainer>
	);
};

"use client";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import type { AQueSeDestinaElGasto } from "@/types";
import { LabelList, Pie, PieChart } from "recharts";

const chartConfig = {
	ejecutado: {
		label: "ejecutado",
	},
	presupuestado: {
		label: "presupuestado",
	},
	finalidad: {
		label: "finalidad",
		color: "var(--chart-1)",
	},
	funcion: {
		label: "funcion",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

interface ChartProps {
	data: AQueSeDestinaElGasto[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
		>
			<PieChart>
				<ChartTooltip
					content={<ChartTooltipContent nameKey="ejecutado" hideLabel />}
				/>
				<Pie data={data} dataKey="finalidad" type="category">
					<LabelList
						dataKey="ejecutado"
						className="fill-background"
						stroke="none"
						fontSize={12}
						formatter={(value: keyof typeof chartConfig) =>
							chartConfig[value]?.label
						}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
};

"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const chartConfig = {
  ingreso: {
    label: "Ingreso",
    color: "var(--chart-1)",
  },
  gasto: {
    label: "Gasto",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface ChartProps {
  data: {
    ingreso: number;
    pib: number;
    gasto: number;
    ejercicio: number;
  }[];
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
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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

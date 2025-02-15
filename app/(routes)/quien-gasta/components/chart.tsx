"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {} from "@/components/ui/card";
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
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{ left: 0, right: 20 }}
        barGap={10}
      >
        <YAxis
          dataKey="entidad"
          type="category"
          tickLine={false}
          axisLine={false}
          width={200}
        />

        <XAxis dataKey="presupuestado" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <XAxis dataKey="ejecutado" type="number" hide />
        <Bar
          fill="var(--color-presupuestado)"
          dataKey="presupuestado"
          layout="vertical"
          radius={5}
        />
        <Bar
          fill="var(--color-ejecutado)"
          dataKey="ejecutado"
          layout="vertical"
          radius={5}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  );
};

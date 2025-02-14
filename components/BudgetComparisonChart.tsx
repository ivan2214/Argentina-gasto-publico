"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type TotalBudget = {
  ejercicio: number;
  totalEjecutado: number;
  totalPresupuestado: number;
};

export function BudgetComparisonChart({ data }: { data: TotalBudget }) {
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
    <Card>
      <CardHeader>
        <CardTitle>Gasto vs Presupuesto</CardTitle>
        <CardDescription>
          Comparación de ejecución vs presupuesto
        </CardDescription>
      </CardHeader>
      <CardContent>
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
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

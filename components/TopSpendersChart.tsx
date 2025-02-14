"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
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

export function TopSpendersChart({ data }: { data: TopSpender[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gasto por Entidad</CardTitle>
        <CardDescription>
          Comparación de ejecución vs presupuesto
        </CardDescription>
      </CardHeader>
      <CardContent>
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
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendencia en aumento <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Comparación de presupuesto vs ejecución
        </div>
      </CardFooter>
    </Card>
  );
}

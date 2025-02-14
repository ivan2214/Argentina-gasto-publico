"use client";

import { Bar, BarChart, Line, LineChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function SpendingChart({ data }) {
  // Process data for the bar chart (latest month only)
  const latestMonthData = data.reduce((acc, curr) => {
    if (!acc[curr.category] || curr.month > acc[curr.category].month) {
      acc[curr.category] = curr;
    }
    return acc;
  }, {});

  const barChartData = Object.values(latestMonthData);

  // Process data for the line chart (trends over time)
  const lineChartData = data
    .reduce((acc, curr) => {
      const monthIndex = acc.findIndex((item) => item.month === curr.month);
      if (monthIndex === -1) {
        acc.push({
          month: curr.month,
          total: curr.amount,
        });
      } else {
        acc[monthIndex].total += curr.amount;
      }
      return acc;
    }, [])
    .sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Categoría</CardTitle>
          <CardDescription>Distribución actual del presupuesto</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              spending: {
                label: "Gasto",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="min-h-[300px]"
          >
            <BarChart
              data={barChartData}
              layout="vertical"
              margin={{
                left: 100,
              }}
            >
              <Bar
                dataKey="amount"
                fill="var(--color-spending)"
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value: number) =>
                      `$${(value / 1000000).toFixed(2)}M`
                    }
                  />
                }
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tendencia de Gastos</CardTitle>
          <CardDescription>Evolución mensual del gasto total</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              total: {
                label: "Total",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="min-h-[300px]"
          >
            <LineChart data={lineChartData}>
              <Line
                type="monotone"
                dataKey="total"
                stroke="var(--color-total)"
                strokeWidth={2}
                dot={{ fill: "var(--color-total)" }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value: number) =>
                      `$${(value / 1000000).toFixed(2)}M`
                    }
                  />
                }
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

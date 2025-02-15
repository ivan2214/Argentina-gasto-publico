"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Line } from "recharts";

const data = {
  labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
  datasets: [
    {
      label: "Ingresos",
      data: [20, 22, 25, 27, 30, 32],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "Gastos",
      data: [22, 24, 26, 28, 31, 33],
      borderColor: "rgb(255, 99, 132)",
      tension: 0.1,
    },
  ],
};

export default function CuantoIngresaYCuantoSeGasta() {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl">
        ¿Cuánto ingresa y cuánto se gasta?
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gastos y recursos en porcentajes del PIB</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="mb-4 w-[180px]">
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
          <div className="h-[400px] w-full">
            <Line data={data} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

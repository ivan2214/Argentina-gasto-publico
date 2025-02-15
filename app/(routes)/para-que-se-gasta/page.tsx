"use client";

import { useState } from "react";
import { SunburstChart, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = {
  name: "Presupuesto",
  children: [
    {
      name: "Servicios Sociales",
      children: [
        { name: "Educación", size: 3000 },
        { name: "Salud", size: 2500 },
        { name: "Promoción y Asistencia Social", size: 1500 },
      ],
    },
    {
      name: "Servicios Económicos",
      children: [
        { name: "Energía, Combustibles y Minería", size: 2000 },
        { name: "Comunicaciones", size: 1000 },
        { name: "Transporte", size: 1800 },
      ],
    },
    {
      name: "Administración Gubernamental",
      children: [
        { name: "Legislativa", size: 800 },
        { name: "Judicial", size: 1200 },
        { name: "Dirección Superior Ejecutiva", size: 1000 },
      ],
    },
  ],
};

export default function ParaQueSeGasta() {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl">¿Para qué se gasta?</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Explorador de gastos por apertura programática</CardTitle>
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
            <SunburstChart data={data} dataKey="size" width={400} height={400}>
              <Tooltip />
            </SunburstChart>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

"use client";

import { useState } from "react";
import { Treemap, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  {
    name: "Gastos en Personal",
    children: [
      { name: "Sueldos", size: 3000 },
      { name: "Contribuciones", size: 1000 },
    ],
  },
  {
    name: "Bienes de Consumo",
    children: [
      { name: "Alimentos", size: 500 },
      { name: "Medicamentos", size: 800 },
    ],
  },
  {
    name: "Servicios no Personales",
    children: [
      { name: "Servicios Básicos", size: 1200 },
      { name: "Alquileres", size: 900 },
    ],
  },
  {
    name: "Bienes de Uso",
    children: [
      { name: "Construcciones", size: 2000 },
      { name: "Maquinaria y Equipo", size: 1500 },
    ],
  },
];

export default function EnQueSeGasta() {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl">¿En qué se gasta?</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gastos por objeto</CardTitle>
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
          <ResponsiveContainer width="100%" height={400}>
            <Treemap data={data} dataKey="size" stroke="#fff" fill="#8884d8">
              <Tooltip />
            </Treemap>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </main>
  );
}

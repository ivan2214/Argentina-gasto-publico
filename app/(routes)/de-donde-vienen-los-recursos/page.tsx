"use client"

import { useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
  labels: ['Impuestos', 'Contribuciones Sociales', 'Ingresos No Tributarios', 'Venta de Bienes y Servicios', 'Rentas de la Propiedad'],
  datasets: [
    {\
      data  'Venta de Bienes y Servicios', 'Rentas de la Propiedad'],
  datasets: [
    {
      data: [65, 15, 10, 5, 5],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF'
      ]
    }
  ]
}

export default function DeDondeVienenLosRecursos() {
  const [year, setYear] = useState(new Date().getFullYear().toString())

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl">¿De dónde vienen los recursos?</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recursos por rubro</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[180px] mb-4">
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-full h-[400px]">
            <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </CardContent>
      </Card>
    </main>
  )
}


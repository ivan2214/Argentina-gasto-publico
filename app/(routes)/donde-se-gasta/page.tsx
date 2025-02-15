"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/argentina/argentina-provinces.json";

const data = [
  { id: "AR-B", value: 1000000 },
  { id: "AR-C", value: 5000000 },
  { id: "AR-K", value: 500000 },
  // Add more data for other provinces
];

export default function DondeSeGasta() {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl">¿Dónde se gasta?</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gastos por ubicación geográfica</CardTitle>
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
          <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
              rotate: [58, 20, 0],
              scale: 600,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = data.find((s) => s.id === geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        d ? `rgba(0, 100, 0, ${d.value / 5000000})` : "#EEE"
                      }
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </CardContent>
      </Card>
    </main>
  );
}

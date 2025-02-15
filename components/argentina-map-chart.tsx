"use client";

import type React from "react";
import { useState, useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { scaleLinear } from "d3-scale";
import { geoPath, geoMercator } from "d3-geo";
import { rgb } from "d3-color";

import type { DondeSeGasta, GeoData, GeojsonProvincias } from "@/types";
import { feature } from "topojson-client";

interface ArgentinaMapChartProps {
  data: DondeSeGasta[];
  geoData: GeoData;
}

export function ArgentinaMapChart({ data, geoData }: ArgentinaMapChartProps) {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const geojsonProvincias = feature(geoData, geoData.objects.provincias);

  const { colorScale, path, maxValue, minValue } = useMemo(() => {
    if (!data || data.length === 0 || !geoData || !geoData.objects.provincias) {
      return { colorScale: null, minValue: 0, maxValue: 0, path: null };
    }

    const ejecutadoValues = data
      .map((d) => d.ejecutado)
      .filter((value): value is number => typeof value === "number");

    if (ejecutadoValues.length === 0) {
      console.log("data", data);

      return { colorScale: null, minValue: 0, maxValue: 0, path: null };
    }

    const minValue = Math.min(...ejecutadoValues);
    const maxValue = Math.max(...ejecutadoValues);

    const colorScale = scaleLinear<string>()
      .domain([minValue, maxValue])
      .range(["var(--chart-1)", "var(--chart-5)"]); // Corregir paréntesis

    const projection = geoMercator().fitSize([800, 800], geojsonProvincias);
    const path = geoPath().projection(projection);

    return { colorScale, minValue, maxValue, path };
  }, [data, geoData]);

  const handleMouseEnter = (e: React.MouseEvent, provincia: DondeSeGasta) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltipContent(`
    <strong>${provincia.provincia}</strong><br/>
    Ejecutado: $${provincia.ejecutado.toLocaleString()}<br/>
    Presupuestado: $${provincia.presupuestado.toLocaleString()}
  `);
    setTooltipPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setTooltipContent(null);
  };

  const chartConfig: ChartConfig = {
    ejecutado: {
      label: "Ejecutado",
      color: "var(--chart-1)",
    },
    presupuestado: {
      label: "Presupuestado",
      color: "var(--chart-2)",
    },
  };

  if (!colorScale || !path || !geoData || !geoData.objects.provincias) {
    return (
      <ChartContainer
        config={chartConfig}
        className="flex h-[600px] w-full items-center justify-center"
      >
        <p>Loading data...</p>
      </ChartContainer>
    );
  }

  const features = (geojsonProvincias as unknown as GeojsonProvincias)
    .features || [geojsonProvincias];

  const getColor = (
    value: number,
    min: number,
    max: number,
    baseColor: string
  ) => {
    const colorScale = scaleLinear<number>().domain([min, max]).range([0.4, 1]); // El rango de opacidad, 0.4 es más transparente, 1 es completamente opaco
    const colorValue = colorScale(value); // Esto da un valor entre 0.4 y 1

    const baseRgb = rgb(baseColor);

    // Ajustar la opacidad según el valor de ejecutado
    baseRgb.opacity = colorValue;

    return baseRgb.toString(); // Devuelve el color en formato RGB con la opacidad ajustada
  };

  return (
    <ChartContainer config={chartConfig} className="relative h-[600px] w-full">
      <svg viewBox="0 0 800 800" className="h-full w-full">
        {features?.map((feature) => {
          const provinciaData = data.find((d) => {
            return d.provincia?.includes(feature.properties.PROVINCIA);
          });

          // Si la provincia tiene datos, obtén el color ajustado, si no, usa un color por defecto
          console.log("provinciaData", provinciaData);

          const fillColor =
            provinciaData && typeof provinciaData.ejecutado === "number"
              ? getColor(
                  provinciaData.ejecutado,
                  minValue,
                  maxValue,
                  "var(--chart-1)"
                )
              : "var(--chart-2)"; // Color por defecto

          return (
            <path
              key={feature.properties.PROVINCIA}
              d={path(feature) || ""}
              fill={fillColor}
              stroke="var(--border)"
              strokeWidth={1}
              onMouseEnter={(e) => {
                if (provinciaData) {
                  handleMouseEnter(e, provinciaData);
                }
              }}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </svg>

      {tooltipContent && (
        <ChartTooltip
          content={
            <ChartTooltipContent position={tooltipPosition}>
              {tooltipContent}
            </ChartTooltipContent>
          }
        />
      )}
    </ChartContainer>
  );
}

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
import type { DondeSeGasta, GeoData } from "@/types";
import { feature } from "topojson-client";

interface ArgentinaMapChartProps {
  data: DondeSeGasta[];
  geoData: GeoData;
}

export function ArgentinaMapChart({ data, geoData }: ArgentinaMapChartProps) {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const geojsonProvincias = feature(geoData, geoData.objects.provincias);

  const { colorScale, minValue, maxValue, path } = useMemo(() => {
    if (!data || data.length === 0 || !geoData || !geoData.objects.provincias) {
      return { colorScale: null, minValue: 0, maxValue: 0, path: null };
    }

    const ejecutadoValues = data
      .map((d) => d.ejecutado)
      .filter(
        (value): value is number =>
          typeof value === "number" && !Number.isNaN(value)
      );

    if (ejecutadoValues.length === 0) {
      return { colorScale: null, minValue: 0, maxValue: 0, path: null };
    }

    const minValue = Math.min(...ejecutadoValues);
    const maxValue = Math.max(...ejecutadoValues);

    const colorScale = scaleLinear<string>()
      .domain([minValue, maxValue])
      .range(["var(--chart-2)", "var(--chart-4)"]);

    const projection = geoMercator().fitSize([800, 800], geojsonProvincias);
    const path = geoPath().projection(projection);

    return { colorScale, minValue, maxValue, path };
  }, [data, geoData]);

  const handleMouseEnter = (e: React.MouseEvent, provincia: DondeSeGasta) => {
    setTooltipContent(`
      <strong>${provincia.provincia}</strong><br/>
      Ejecutado: $${provincia.ejecutado.toLocaleString()}<br/>
      Presupuestado: $${provincia.presupuestado.toLocaleString()}
    `);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
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

  const features = (geojsonProvincias as any).features || [geojsonProvincias];

  return (
    <ChartContainer config={chartConfig} className="relative h-[600px] w-full">
      <svg viewBox="0 0 800 800" className="h-full w-full">
        {features?.map((feature) => {
          const provinciaData = data.find(
            (d) =>
              d.provincia.toLowerCase() ===
              feature.properties.PROVINCIA.toLowerCase()
          );
          return (
            <path
              key={feature.properties.PROVINCIA}
              d={path(feature) || ""}
              fill={
                provinciaData && typeof provinciaData.ejecutado === "number"
                  ? colorScale(provinciaData.ejecutado)
                  : "var(--chart-2)"
              }
              stroke="var(--border)"
              strokeWidth={1}
              onMouseEnter={(e) =>
                provinciaData && handleMouseEnter(e, provinciaData)
              }
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

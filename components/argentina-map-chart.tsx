"use client";
import { useState, useMemo } from "react";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { scaleLinear } from "d3-scale";
import { geoPath, geoMercator } from "d3-geo";
import { rgb } from "d3-color";

import type { DondeSeGasta, GeoData, GeojsonProvincias } from "@/types";
import { feature } from "topojson-client";
import { formatNumber, removeAccents } from "@/lib/utils";

interface ArgentinaMapChartProps {
  data: DondeSeGasta[];
  geoData: GeoData;
}

export function ArgentinaMapChart({ data, geoData }: ArgentinaMapChartProps) {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const geojsonProvincias = feature(geoData, geoData.objects.provincias);

  const { opacityScale, path } = useMemo(() => {
    if (!data || !geoData?.objects.provincias)
      return { opacityScale: null, path: null };

    const ejecutadoValues = data
      .map((d) => d.ejecutado)
      .filter((v): v is number => typeof v === "number");

    if (!ejecutadoValues.length) return { opacityScale: null, path: null };

    const minValue = Math.min(...ejecutadoValues);
    const maxValue = Math.max(...ejecutadoValues);

    // Escala de opacidad específica para cada provincia entre 30% y 100%
    const opacityScale = scaleLinear()
      .domain([minValue, maxValue])
      .range([0.3, 1])
      .clamp(true);

    const projection = geoMercator().fitSize([800, 800], geojsonProvincias);
    const path = geoPath().projection(projection);

    return { opacityScale, minValue, maxValue, path };
  }, [data, geoData]);

  // Función para obtener color con opacidad
  const getColorWithOpacity = (value: number) => {
    if (!opacityScale) return "var(--chart-2)";

    // Convertir color base a RGB
    let baseColor = "var(--chart-2)";
    if (typeof window !== "undefined") {
      baseColor = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--chart-2");
    }

    const color = rgb(baseColor);
    if (!color) return "var(--chart-2)";

    // Aplicar opacidad calculada
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacityScale(value)})`;
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

  if (!path || !geoData || !geoData.objects.provincias) {
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

  // Reemplazar la función getColor con esto:

  return (
    <ChartContainer config={chartConfig} className="relative h-[600px] w-full">
      <svg viewBox="0 0 800 800" className="h-full w-full">
        <title>Mapa de Argentina</title>
        {features?.map((feature) => {
          const provinciaData = data.find((d) => {
            const provincia = removeAccents(d.provincia);
            const featureProvincia = removeAccents(
              feature.properties.PROVINCIA
            );

            return provincia === featureProvincia;
          });

          const fillColor = provinciaData?.ejecutado
            ? getColorWithOpacity(provinciaData.ejecutado)
            : "rgba(0,0,0,0.1)"; // Color para datos faltantes

          return (
            <path
              key={feature.properties.PROVINCIA}
              d={
                feature.properties.PROVINCIA.includes("Ciudad Autónoma")
                  ? `translate(20, -20) ${path(feature)}`
                  : path(feature)
              }
              fill={fillColor}
              stroke="var(--border)"
              strokeWidth={1}
              onMouseEnter={(e) => {
                if (provinciaData) {
                  setTooltipContent(`
                    <strong>${provinciaData.provincia}</strong>
                    <div>Ejecutado: ${formatNumber(
                      provinciaData.ejecutado
                    )}</div>
<div>Presupuestado: ${formatNumber(provinciaData.presupuestado)}</div>

                  `);
                  setTooltipPosition({ x: e.pageX + 15, y: e.pageY - 15 });
                } else {
                  setTooltipContent(`
                    <strong>${feature.properties.PROVINCIA}</strong>
                    <div>No hay datos disponibles</div>
                    `);
                }
              }}
              onMouseLeave={() => setTooltipContent(null)}
            />
          );
        })}
      </svg>

      {tooltipContent && (
        <div
          className={"absolute z-50 rounded bg-white p-2 text-sm shadow"}
          style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
        >
          <div dangerouslySetInnerHTML={{ __html: tooltipContent }} />
        </div>
      )}
    </ChartContainer>
  );
}

"use client";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { formatNumber, removeAccents } from "@/lib/utils";
import type { DondeSeGasta, GeoData, GeojsonProvincias } from "@/types";
import { rgb } from "d3-color";
import { geoMercator, geoPath } from "d3-geo";
import { scaleLinear } from "d3-scale";
import { useMemo, useState } from "react";
import { feature } from "topojson-client";
import type { Objects, Topology } from "topojson-specification";

function adaptGeoData(geoData: GeoData): Topology {
	return {
		type: "Topology",
		objects: geoData.objects as unknown as Objects, // Ajustamos el tipo de objects
		arcs: geoData.arcs,
		transform: geoData.transform as Topology["transform"],
	};
}

interface ArgentinaMapChartProps {
	data: DondeSeGasta[];
	geoData: GeoData;
}

export function ArgentinaMapChart({ data, geoData }: ArgentinaMapChartProps) {
	const [tooltipContent, setTooltipContent] = useState<React.ReactNode>(null);
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

	const { opacityScale, path, features, maxValue, minValue } = useMemo(() => {
		if (!data || !geoData?.objects.provincias)
			return {
				opacityScale: null,
				path: null,
				features: [],
				maxValue: 0,
				minValue: 0,
			};

		const ejecutadoValues = data
			.map((d) => d.ejecutado)
			.filter((v): v is number => typeof v === "number");

		if (!ejecutadoValues.length)
			return {
				opacityScale: null,
				path: null,
				features: [],
				maxValue: 0,
				minValue: 0,
			};

		const minValue = Math.min(...ejecutadoValues);
		const maxValue = Math.max(...ejecutadoValues);

		// Escala de opacidad comparativa
		const opacityScale = scaleLinear()
			.domain([minValue, maxValue])
			.range([0.3, 1]) // Opacidad desde 30% hasta 100%
			.clamp(true);

		// Uso del adaptador
		const adaptedGeoData = adaptGeoData(geoData);
		const geojson = feature(adaptedGeoData, adaptedGeoData.objects.provincias);
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const projection = geoMercator().fitSize([800, 800], geojson as any);
		const path = geoPath().projection(projection);

		return {
			opacityScale,
			path,
			features: (geojson as unknown as GeojsonProvincias).features || [],
			maxValue,
			minValue,
		};
	}, [data, geoData]);

	const getFillColor = (ejecutado?: number) => {
		if (!ejecutado || !opacityScale) return "rgba(128, 128, 128, 0.2)"; // Color para datos faltantes

		// Obtener color base desde CSS variable (asumiendo que --chart-2 es un color RGB válido)
		let baseColor = "";

		if (typeof window !== "undefined") {
			baseColor = getComputedStyle(document.documentElement).getPropertyValue(
				"--chart-2",
			);
		}
		const color = rgb(baseColor);

		// Aplicar opacidad basada en la posición relativa del valor
		return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacityScale(
			ejecutado,
		)})`;
	};

	const handleMouseMove = (e: React.MouseEvent, provincia?: DondeSeGasta) => {
		if (!provincia) return;

		setTooltipContent(
			<div className="flex flex-col gap-2">
				<div className="font-semibold text-lg">{provincia.provincia}</div>
				<div className="flex flex-row gap-2">
					<div className="font-semibold text-sm">Ejecutado:</div>
					<div className="text-sm">{formatNumber(provincia.ejecutado)}</div>
				</div>
				<div className="flex flex-row gap-2">
					<div className="font-semibold text-sm">Presupuestado:</div>
					<div className="text-sm">{formatNumber(provincia.presupuestado)}</div>
				</div>
			</div>,
		);

		setTooltipPosition({ x: e.screenX, y: e.screenY });
	};
	const chartConfig = {
		ejecutado: {
			label: "Ejecutado",
			color: "var(--chart-1)",
		},
		presupuestado: {
			label: "Presupuestado",
			color: "var(--chart-2)",
		},
	} satisfies ChartConfig;

	return (
		<>
			<ChartContainer
				config={chartConfig}
				className="relative h-[600px] w-full"
			>
				{/* Envuelve todo el contenido en un Fragment */}

				{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
				<svg viewBox="0 0 800 800" className="h-full w-full">
					<g>
						{features.map((feature) => {
							const provinciaData = data.find((d) => {
								const provSinAcentos = removeAccents(d.provincia);
								const featureSinAcentos = removeAccents(
									feature.properties.PROVINCIA,
								);
								return provSinAcentos === featureSinAcentos;
							});
							return (
								<path
									key={feature.properties.PROVINCIA}
									// biome-ignore lint/suspicious/noExplicitAny: <explanation>
									d={path?.(feature as any) || ""}
									fill={getFillColor(provinciaData?.ejecutado)}
									stroke="var(--border)"
									strokeWidth={1}
									onMouseMove={(e) => handleMouseMove(e, provinciaData)}
									onMouseLeave={() => setTooltipContent(null)}
								/>
							);
						})}
					</g>
				</svg>
			</ChartContainer>
			{tooltipContent &&
				tooltipContent !== null &&
				tooltipContent !== undefined && (
					<div
						className="pointer-events-none fixed rounded-lg border bg-white p-3 shadow-lg"
						style={{
							left: `${tooltipPosition.x}px`,
							top: `${tooltipPosition.y}px`,
							transition: "all 0.2s",
							opacity: tooltipContent ? 1 : 0,
						}}
					>
						{tooltipContent}
					</div>
				)}
		</>
	);
}

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { destacados } from "@/constants";
import { ArrowRight, Github } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Presupuesto Abierto Argentino - Transparencia en el Gasto Público",
	description:
		"Bienvenido a la plataforma de visualización del gasto público argentino. Nuestro objetivo es hacer transparente y accesible la información presupuestaria para todos los ciudadanos.",
};

export default function Home() {
	return (
		<main className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-8">
			<section className="flex w-full flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:gap-5">
				<div className="space-y-2">
					<h1 className="text-center font-bold text-4xl">
						Presupuesto Abierto Argentino
					</h1>

					<p className="max-w-2xl text-center font-extralight text-muted-foreground text-xl">
						Bienvenido a la plataforma de visualización del gasto público
						argentino. Nuestro objetivo es hacer transparente y accesible la
						información presupuestaria para todos los ciudadanos.
					</p>

					<div className="flex max-w-2xl flex-col items-center gap-4 text-center">
						<p className="font-extralight text-muted-foreground">
							A través del presupuesto, el Estado Nacional planifica los
							ingresos que recibirá y cómo se aplicarán para satisfacer las
							necesidades de la población.
						</p>
					</div>
				</div>
				<div className="max-w-2xl rounded-lg bg-muted p-6">
					<h2 className="mb-4 font-semibold text-2xl">Sobre este proyecto</h2>
					<ul className="list-disc space-y-2 pl-6">
						<li>
							Utilizamos la API de Presupuesto Abierto del gobierno argentino
						</li>
						<li>Visualizamos datos complejos de manera clara y accesible</li>
						<li>
							Proyecto de código abierto: ¡las contribuciones son bienvenidas!
						</li>
						<li>
							Nuestro objetivo es fomentar la transparencia y participación
							ciudadana
						</li>
					</ul>
					<div className="mt-4 flex justify-center">
						<Button variant="outline">
							<Link
								href="https://github.com/ivan2214/Argentina-gasto-publico"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center"
							>
								<Github className="mr-2 h-4 w-4" />
								Contribuir en GitHub
							</Link>
						</Button>
					</div>
				</div>
			</section>
			<h2 className="mt-8 mb-4 font-semibold text-2xl">Explora los datos</h2>
			<section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{destacados.map((destacado) => (
					<Card key={destacado.title} className="flex flex-col">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								{destacado.icon && <destacado.icon className="h-5 w-5" />}
								{destacado.title}
							</CardTitle>
						</CardHeader>
						<CardContent className="flex-grow">
							<p className="font-extralight text-muted-foreground">
								{destacado.description}
							</p>
						</CardContent>
						<CardFooter>
							<Button variant="outline" className="w-full">
								<Link
									href={destacado.link}
									className="flex w-full items-center justify-between"
								>
									Explorar
									<ArrowRight className="ml-2" />
								</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</section>
		</main>
	);
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { destacados } from "@/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 py-8">
			<h1 className="font-bold text-3xl">Presupuesto abierto</h1>

			<p className="font-light text-muted-foreground">
				A través del presupuesto, el Estado Nacional planifica los ingresos que
				recibirá y cómo se aplicarán para satisfacer las necesidades de la
				población.
			</p>
			<Badge>Explorá este sitio para conocerlo en detalle.</Badge>

			<section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{destacados.map((destacado) => (
					<Card key={destacado.title}>
						<CardHeader>
							<CardTitle>{destacado.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p>{destacado.description}</p>
						</CardContent>
						<CardFooter>
							<Link href={destacado.link}>
								<Button variant="outline">
									Ver
									<ArrowRight className="ml-2" />
								</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</section>
		</main>
	);
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const destacados = [
  {
    title: "¿Quien gasta?",
    description: "Gastos por jurisdiccion",
    link: `/quien-gasta?year=${new Date().getFullYear()}`,
  },
  {
    title: "¿A qué se destina el gasto?",
    description: "Gastos por finalidad y funcion",
    link: `/a-que-se-destina-el-gasto?year=${new Date().getFullYear()}`,
  },
  {
    title: "¿En que se gasta?",
    description: "Gastos por objeto",
    link: `/en-que-se-gasta?year=${new Date().getFullYear()}`,
  },
  {
    title: "¿Donde se gasta?",
    description: "Gastos por ubicacion geografica",
    link: `/donde-se-gasta?year=${new Date().getFullYear()}`,
  },
  {
    title: "¿De donde vienen los recursos?",
    description: "Recursos por rubro",
    link: `/de-donde-vienen-los-recursos?year=${new Date().getFullYear()}`,
  },
  {
    title: "¿Cuanto ingresa y cuanto se gasta?",
    description: "Gastos y recursos en porcentajes del PIB",
    link: `/cuanto-ingresa-y-cuanto-se-gasta?year=${new Date().getFullYear()}`,
  },
  {
    title: "¿Para que se gasta?",
    description: "Explorador de gastos por apertura programatica",
    link: `/para-que-se-gasta?year=${new Date().getFullYear()}`,
  },
];

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl">Presupuesto abierto</h1>
      <p>
        A través del presupuesto, el Estado Nacional planifica los ingresos que
        recibirá y cómo se aplicarán para satisfacer las necesidades de la
        población.
      </p>
      <span>Explorá este sitio para conocerlo en detalle.</span>
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

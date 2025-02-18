import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
	return (
		<main className="container mx-auto px-4 py-8">
			{/* Simulación del BreadCrumb */}
			<div className="mb-4 flex items-center space-x-2">
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-4 w-16" />
			</div>

			{/* Título principal */}
			<Skeleton className="mb-8 h-8 w-1/2" />

			{/* Card que contiene el título, el selector y el gráfico */}
			<Card>
				<CardHeader>
					<CardTitle>
						<Skeleton className="h-6 w-1/3" />
					</CardTitle>
				</CardHeader>
				<CardContent>
					{/* Simulación del selector de año */}
					<div className="mb-4">
						<Skeleton className="h-10 w-32" />
					</div>
					{/* Simulación del gráfico */}
					<Skeleton className="h-64 w-full" />
				</CardContent>
			</Card>
		</main>
	);
};

export default LoadingPage;

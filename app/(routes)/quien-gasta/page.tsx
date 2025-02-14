import { SpendingDashboard } from "@/components/SpendingDashboard";
import { SelectYear } from "./components/SelectYear";

type SearchParams = Promise<{ year?: string }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { year } = await searchParams;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-bold text-3xl">Gasto Público de Argentina</h1>
      <SelectYear defaultValue={year} />
      <SpendingDashboard year={year} />
    </main>
  );
}

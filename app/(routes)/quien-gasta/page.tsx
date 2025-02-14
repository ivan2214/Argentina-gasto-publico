import { SpendingDashboard } from "@/components/SpendingDashboard";
import { SelectYear } from "./components/SelectYear";
import { BreadCrumbDynamic } from "@/components/breadcumb-dynamic";

type SearchParams = Promise<{ year?: string }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  let { year } = await searchParams;

  if (!year) {
    year = new Date().getFullYear().toString();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <BreadCrumbDynamic
        links={[
          {
            href: "/",
            label: "Inicio",
          },
          {
            href: `/quien-gasta?year=${year}`,
            label: `Quien gasta en ${year}`,
          },
        ]}
      />
      <h1 className="mb-8 font-bold text-3xl">Gasto Público de Argentina</h1>
      <SelectYear defaultValue={year} />
      <SpendingDashboard year={year} />
    </main>
  );
}

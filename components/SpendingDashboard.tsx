import {} from "@/components/ui/card";

import { BudgetComparisonChart } from "./BudgetComparisonChart";
import { getPresupuesto } from "@/action/quien-gasta";
import { TopSpendersChart } from "./TopSpendersChart";
import { processSpendingData } from "@/lib/processData";

export async function SpendingDashboard({ year }: { year?: string }) {
  const currentYear = new Date().getFullYear().toString();

  const data = await getPresupuesto(year || currentYear);

  if (!data) return <div>Loading...</div>;

  const { topSpenders } = processSpendingData(data);

  const { totals } = processSpendingData(data);

  return (
    <div className="space-y-4">
      <TopSpendersChart data={topSpenders} />

      <BudgetComparisonChart data={totals} />
    </div>
  );
}

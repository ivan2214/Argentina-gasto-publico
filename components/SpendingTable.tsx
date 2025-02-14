import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SpendingTable({ data }) {
  // Group data by category and get the latest month's data
  const latestData = data.reduce((acc, curr) => {
    if (!acc[curr.category] || curr.month > acc[curr.category].month) {
      acc[curr.category] = curr;
    }
    return acc;
  }, {});

  const tableData = Object.values(latestData);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Categoría</TableHead>
          <TableHead>Mes</TableHead>
          <TableHead className="text-right">Monto</TableHead>
          <TableHead className="text-right">Porcentaje</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.category}</TableCell>
            <TableCell>{item.month}</TableCell>
            <TableCell className="text-right">
              ${(item.amount / 1000000).toFixed(2)}M
            </TableCell>
            <TableCell className="text-right">
              {item.percentage.toFixed(1)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

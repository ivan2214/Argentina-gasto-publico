"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

type SelectYearProps = {
  defaultValue?: string;
};

export const SelectYear: React.FC<SelectYearProps> = ({ defaultValue }) => {
  const router = useRouter();
  const pathname = usePathname();
  const years = Array.from(
    { length: 10 },
    (_, index) => new Date().getFullYear() - index
  );

  const handleSelectChange = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("year", value);
    const newPathname = `${pathname}?${searchParams.toString()}`;
    router.push(newPathname);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecciona un año" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Años</SelectLabel>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

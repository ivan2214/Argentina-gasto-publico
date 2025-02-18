import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { destacados } from "@/constants";

const NavMobile = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="md:hidden" size="icon" variant="outline">
					<Menu className="h-6 w-6" />
					<span className="sr-only">Abrir menú</span>
				</Button>
			</SheetTrigger>
			<SheetContent className="w-[300px] sm:w-[400px]" side="right">
				<SheetHeader>
					<SheetTitle className="font-bold text-2xl">Menú</SheetTitle>
				</SheetHeader>
				<nav className="mt-6">
					<ul className="flex w-full flex-col items-start gap-y-2">
						{destacados.map((item) => (
							<Link
								key={item.title}
								className="flex w-full items-center justify-start"
								href={item.link}
							>
								<Button size="sm" variant="ghost">
									{item.title}
								</Button>
							</Link>
						))}
					</ul>
				</nav>
			</SheetContent>
		</Sheet>
	);
};

export default NavMobile;

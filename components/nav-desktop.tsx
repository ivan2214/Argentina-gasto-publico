"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { destacados } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavDesktop = () => {
	const pathname = usePathname();
	console.log(pathname);

	return (
		<nav
			className="ml-auto hidden max-w-3xl overflow-x-auto whitespace-nowrap md:flex"
			style={{
				scrollBehavior: "smooth",
				scrollbarWidth: "thin",

				scrollbarGutter: "stable",
			}}
		>
			<ul className="flex items-center gap-x-2">
				{destacados.map((item) => {
					if (item.link !== "/auth/login" && item.link !== "/auth/register") {
						return (
							<Button
								key={item.title}
								size="sm"
								className={cn(
									"transition-colors duration-300 hover:text-primary",
									pathname === item.link.split("?")[0] &&
										"bg-primary text-primary-foreground",
								)}
								variant="ghost"
							>
								<Link href={item.link}>{item.title}</Link>
							</Button>
						);
					}
				})}
			</ul>
		</nav>
	);
};

export default NavDesktop;

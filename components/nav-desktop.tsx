import Link from "next/link";

import { Button } from "@/components/ui/button";
import { destacados } from "@/constants";

const NavDesktop = () => {
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
							<Link key={item.title} href={item.link}>
								<Button
									size="sm"
									className="transition-colors duration-300 hover:text-primary"
									variant="ghost"
								>
									{item.title}
								</Button>
							</Link>
						);
					}
				})}
			</ul>
		</nav>
	);
};

export default NavDesktop;

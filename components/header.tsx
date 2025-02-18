import Link from "next/link";
import { Container } from "./container";
import { ModeToggle } from "./mode-togglle";
import NavDesktop from "./nav-desktop";
import NavMobile from "./nav-mobile";

export function Header() {
	return (
		<header className="sticky top-0 z-50 shadow-sm">
			<Container className="flex items-center justify-between px-4 py-4">
				<Link href="/" className="flex items-center space-x-2">
					<span className="font-bold text-primary text-xl">
						Gasto publico argentino
					</span>
				</Link>

				<NavDesktop />

				<div className="md:ml-5">
					<ModeToggle />
				</div>
				<NavMobile />
			</Container>
		</header>
	);
}

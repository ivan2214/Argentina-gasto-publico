"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		document.documentElement.style.colorScheme = "light"; // o "dark" dependiendo del tema
	}, []);

	if (!mounted) {
		return <>{children}</>;
	}

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

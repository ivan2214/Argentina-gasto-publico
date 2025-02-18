import { BreadCrumbDynamic } from "@/components/breadcumb-dynamic";
import type { ReactNode } from "react";

type LayoutProps = {
	children: ReactNode;
	breadcrumbLinks: { href: string; label: string }[];
	title: string;
};

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Gasto Público Argentina",
		template: "%s | Gasto Público Argentina",
	},
	description: "Portal informativo sobre el gasto público en Argentina.",
	metadataBase: new URL("https://tusitio.com"),
	openGraph: {
		title: "Gasto Público Argentina",
		description: "Información detallada sobre el gasto público en Argentina.",
		url: "https://tusitio.com",
		siteName: "Gasto Público Argentina",
		locale: "es_AR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Gasto Público Argentina",
		description: "Datos y análisis del gasto público en Argentina.",
		site: "@tu_usuario",
	},
};

export default function Layout({
	children,
	breadcrumbLinks,
	title,
}: LayoutProps) {
	return (
		<main className="container mx-auto flex w-full flex-col items-start gap-4 p-2">
			<BreadCrumbDynamic links={breadcrumbLinks} />
			<h1 className=" font-bold text-3xl">{title}</h1>
			{children}
		</main>
	);
}

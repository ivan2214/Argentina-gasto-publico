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
	metadataBase: new URL("https://argentina-gasto-publico.vercel.app"),
	openGraph: {
		title: "Gasto Público Argentina",
		description: "Información detallada sobre el gasto público en Argentina.",
		url: "https://argentina-gasto-publico.vercel.app",
		siteName: "Gasto Público Argentina",
		locale: "es_AR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Gasto Público Argentina",
		description: "Datos y análisis del gasto público en Argentina.",
		site: "@bongiovannidev",
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
		shortcut: "/favicon-16x16.png",
		other: [
			{
				url: "/site.webmanifest",
				type: "application/json",
			},

			{
				url: "/android-chrome-192x192.png",
				type: "image/png",
			},
			{
				url: "/android-chrome-512x512.png",
				type: "image/png",
			},
			{
				url: "/favicon-16x16.png",
				type: "image/png",
			},
			{
				url: "/favicon-32x32.png",
				type: "image/png",
			},
		],
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

import { BreadCrumbDynamic } from "@/components/breadcumb-dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

type LayoutProps = {
	children: ReactNode;
	breadcrumbLinks: { href: string; label: string }[];
	title: string;
};

export default function Layout({
	children,
	breadcrumbLinks,
	title,
}: LayoutProps) {
	return (
		<main className="container mx-auto px-4 py-8">
			<BreadCrumbDynamic links={breadcrumbLinks} />
			<h1 className="mb-8 font-bold text-3xl">{title}</h1>
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
			</Card>
		</main>
	);
}

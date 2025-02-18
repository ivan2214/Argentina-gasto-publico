"use client";

import Link from "next/link";
import * as React from "react";

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/use-media-query";
interface BreadCrumbDynamicProps {
	links: { label: string; href: string }[];
}

export const BreadCrumbDynamic: React.FC<BreadCrumbDynamicProps> = ({
	links,
}) => {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	// Calcula dinámicamente cuántos ítems mostrar antes de colapsar
	const itemsToDisplay = Math.min(links.length, 2); // Mínimo 2, máximo 3 visibles

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href={links[0].href}>{links[0].label}</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{links.length > itemsToDisplay ? (
					<>
						<BreadcrumbItem>
							{isDesktop ? (
								<DropdownMenu open={open} onOpenChange={setOpen}>
									<DropdownMenuTrigger
										className="flex items-center gap-1"
										aria-label="Toggle menu"
									>
										<BreadcrumbEllipsis className="h-4 w-4" />
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start">
										{links.slice(1, -2).map((link) => (
											<DropdownMenuItem key={link.label}>
												<Link href={link.href ? link.href : "#"}>
													{link.label}
												</Link>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<Drawer open={open} onOpenChange={setOpen}>
									<DrawerTrigger aria-label="Toggle Menu">
										<BreadcrumbEllipsis className="h-4 w-4" />
									</DrawerTrigger>
									<DrawerContent>
										<DrawerHeader className="text-left">
											<DrawerTitle>Navigate to</DrawerTitle>
											<DrawerDescription>
												Select a page to navigate to.
											</DrawerDescription>
										</DrawerHeader>
										<div className="grid gap-1 px-4">
											{links.slice(1, -2).map((link) => (
												<Link
													key={link.label}
													href={link.href ? link.href : "#"}
													className="py-1 text-sm"
												>
													{link.label}
												</Link>
											))}
										</div>
										<DrawerFooter className="pt-4">
											<DrawerClose asChild>
												<Button variant="outline">Close</Button>
											</DrawerClose>
										</DrawerFooter>
									</DrawerContent>
								</Drawer>
							)}
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</>
				) : null}
				{links.slice(-itemsToDisplay + 1).map((link, index, arr) => (
					<React.Fragment key={link.label}>
						<BreadcrumbItem>
							{link.href ? (
								<BreadcrumbLink
									asChild
									className="max-w-20 truncate md:max-w-none"
								>
									<Link href={link.href}>{link.label}</Link>
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage className="max-w-20 truncate md:max-w-none">
									{link.label}
								</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{index < arr.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

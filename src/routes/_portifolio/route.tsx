import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/header/components/header";
import { SideInfoCard } from "@/components/side-card/components/side-info-card";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_portifolio")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative flex h-svh w-svw gap-4 overflow-x-hidden overflow-y-scroll p-2 max-lg:flex-col lg:p-4">
			<Header />
			<SideInfoCard />
			<Card.Root className="h-fit flex-1 overflow-visible p-4 lg:min-h-full lg:p-8">
				<Outlet />
			</Card.Root>
		</div>
	);
}

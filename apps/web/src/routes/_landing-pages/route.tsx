import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Card } from "@web/ui/card";

import { Header } from "@/layout/header/components/header";
import { SideInfoCard } from "@/layout/side-card/components/side-info-card";

export const Route = createFileRoute("/_landing-pages")({
	component: LandingLayout,
});

/** The shell of the portfolio: the header, the profile card on the side and the page in the card. */
function LandingLayout() {
	return (
		<div className="relative flex h-svh w-svw gap-4 overflow-x-hidden overflow-y-scroll p-2 max-lg:flex-col lg:p-4">
			<Header />
			<SideInfoCard />
			<Card className="h-fit flex-1 overflow-visible p-4 lg:min-h-full lg:p-8">
				<Outlet />
			</Card>
		</div>
	);
}

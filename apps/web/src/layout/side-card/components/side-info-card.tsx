import { cn } from "tailwind-variants";

import { Card } from "@web/ui/card";
import { Image } from "@web/ui/image";

import { ContactMiniCard } from "@/modules/landing-pages/components/contact-mini-card";
import { contacts, socialMedias } from "@/modules/landing-pages/constants/contacts";

interface SideInfoCardProps {
	className?: string;
}

/** The profile card on the side: the photo, the name, the contacts and the social networks. */
export function SideInfoCard({ className }: SideInfoCardProps) {
	return (
		<Card
			className={cn("sticky top-0 h-full w-87.5 shrink-0 items-center", "max-lg:static max-lg:mt-20 max-lg:h-75 max-lg:w-full", className)}
		>
			<Card.header className="relative w-full place-items-center justify-center gap-4">
				<div className="bg-accent size-32 overflow-hidden rounded-lg border p-2">
					<Image src="/eu.webp" alt="markin" height={100} width={100} className="size-full rounded-md object-cover" />
				</div>
				<div className="flex flex-col items-center">
					<h1 className="text-2xl font-bold">Marcos</h1>
					<p className="text-muted-foreground text-xs">Markin</p>
				</div>
				<h2 className="bg-accent flex w-fit gap-1 rounded-md border p-2">Engenheiro de software</h2>
			</Card.header>
			<Card.content className="flex w-full flex-col gap-4 max-lg:hidden">
				<div className="bg-accent h-0.5" />
				{contacts.map(({ icon, label, value }) => {
					return <ContactMiniCard icon={icon} label={label} value={value} key={label} />;
				})}
			</Card.content>
			<Card.footer className="relative mt-auto w-full max-lg:hidden">
				<div className="mx-auto flex items-center gap-4 rounded-full border px-4 py-2">
					{socialMedias.map(({ icon: Icon, label, href }) => {
						return (
							<a
								onClick={() => window.umami?.track("social_click", { network: label })}
								href={href}
								title={label}
								key={href}
								target="_blank"
								rel="noreferrer"
							>
								<Icon className="fill-primary size-6" />
							</a>
						);
					})}
				</div>
			</Card.footer>
		</Card>
	);
}

import { cn } from "tailwind-variants";
import { Image } from "@/components/misc/image";
import { ContactMiniCards } from "@/components/side-card/components/contact-mini-cards";
import { Card } from "@/components/ui/card";
import { contacts, socialMedias } from "@/core/contacts";

interface SideInfoCardProps {
	className?: string;
}

export function SideInfoCard({ className }: SideInfoCardProps) {
	return (
		<Card.Root
			className={cn("sticky top-0 h-full w-87.5 shrink-0 items-center", "max-lg:static max-lg:mt-20 max-lg:h-75 max-lg:w-full", className)}
		>
			<Card.Header className="relative w-full place-items-center justify-center gap-4">
				<div className="size-32 overflow-hidden rounded-lg border bg-accent p-2">
					<Image src="/eu.webp" alt="markin" height={100} width={100} className="size-full rounded-md object-cover" />
				</div>
				<div className="flex flex-col items-center">
					<h1 className="font-bold text-2xl">Marcos</h1>
					<p className="text-muted-foreground text-xs">Markin</p>
				</div>
				<h2 className="flex w-fit gap-1 rounded-md border bg-accent p-2">Engenheiro de software</h2>
			</Card.Header>
			<Card.Content className="flex w-full flex-col gap-4 max-lg:hidden">
				<div className="h-0.5 bg-accent" />
				{contacts.map(({ icon, label, value }) => {
					return <ContactMiniCards icon={icon} label={label} value={value} key={label} />;
				})}
			</Card.Content>
			<Card.Footer className="relative mt-auto w-full max-lg:hidden">
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
								<Icon className="size-6 fill-primary" />
							</a>
						);
					})}
				</div>
			</Card.Footer>
		</Card.Root>
	);
}

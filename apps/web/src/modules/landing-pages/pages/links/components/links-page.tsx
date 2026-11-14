import { ArrowBigRightIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";

import { RoundedIcon } from "@web/ui/rounded-icon";

import { info } from "@/core/info";
import { PageTitle } from "@/modules/landing-pages/components/page-title";

const quickLinks = [
	{ icon: UserIcon, label: "Portfólio", description: "Veja meus trabalhos", href: "/" },
	{ icon: MailIcon, label: "E-mail", value: info.email, description: "Envie uma mensagem", href: `mailto:${info.email}` },
	{
		icon: MessageCircleIcon,
		label: "WhatsApp",
		description: "Vamos conversar",
		value: info.phone,
		href: `https://api.whatsapp.com/send?phone=${info.phone}`,
	},
];

/** The quick links: portfolio, e-mail and WhatsApp. */
export function LinksPage() {
	return (
		<main className="flex min-h-125 items-center justify-center p-4 sm:p-6 lg:p-8">
			<div className="w-full max-w-2xl space-y-16">
				<PageTitle size="lg" showDecoration>
					Links Rápidos
				</PageTitle>
				<div className="flex flex-col gap-4 sm:gap-5">
					{quickLinks.map(({ href, icon: Icon, label, description }) => (
						<a
							key={label}
							href={href}
							target="_blank"
							rel="noreferrer"
							onClick={() => window.umami?.track("social_click", { network: label })}
							className="group border-border bg-card hover:border-primary hover:shadow-primary/10 relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:scale-102 hover:shadow-xl sm:p-8"
						>
							<div className="flex items-center gap-4 sm:gap-6">
								<RoundedIcon className="group-hover:bg-primary rounded-md transition-all group-hover:scale-105">
									<Icon className="text-primary group-hover:text-primary-foreground size-7 transition-colors duration-300 sm:h-8 sm:w-8" />
								</RoundedIcon>

								<div className="w-full">
									<h2 className="text-foreground group-hover:text-primary mb-1 text-xl font-semibold transition-colors duration-300 sm:text-2xl">
										{label}
									</h2>
									<p className="text-muted-foreground text-sm sm:text-base">{description}</p>
								</div>
								<div className="shrink-0 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
									<ArrowBigRightIcon className="text-primary" />
								</div>
							</div>

							<div className="from-primary/5 pointer-events-none absolute inset-0 bg-linear-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</a>
					))}
				</div>

				<div className="mt-12 text-center sm:mt-16">
					<p className="text-muted-foreground text-sm">Disponível para novos projetos e oportunidades</p>
				</div>
			</div>
		</main>
	);
}

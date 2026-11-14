import { Badge } from "@web/ui/badge";
import { Card } from "@web/ui/card";
import { Landing } from "@web/ui/landing";

import { ContactMiniCard } from "@/modules/landing-pages/components/contact-mini-card";
import { PageDescription } from "@/modules/landing-pages/components/page-description";
import { PageTitle } from "@/modules/landing-pages/components/page-title";
import { contacts, socialMedias } from "@/modules/landing-pages/constants/contacts";
import { pageLayoutClassName } from "@/modules/landing-pages/constants/page-layout";
import { ContactForm } from "@/modules/landing-pages/pages/contact/components/contact-form";

/** The contact page: the form, my contact details and my social networks. */
export function ContactPage() {
	return (
		<Landing className={pageLayoutClassName}>
			<div>
				<PageTitle showDecoration size="lg">
					Contatos
				</PageTitle>
				<PageDescription>
					Fique à vontade para entrar em contato comigo através do formulário ou pelas minhas redes sociais. Estou sempre aberto a novas
					conexões e oportunidades de colaboração!
				</PageDescription>
			</div>
			<div className="flex w-full gap-8 max-xl:flex-col-reverse">
				<Card className="flex-2 border-0">
					<Card.content className="space-y-8">
						<h2 className="text-2xl font-bold">Entre em contato</h2>
						<ContactForm />
					</Card.content>
				</Card>
				<Card>
					<Card.content className="space-y-8">
						<div className="space-y-4">
							<h2 className="text-2xl font-bold">Contatos</h2>
							<div className="space-y-4">
								{contacts.map(({ icon, label, value }) => (
									<ContactMiniCard icon={icon} label={label} value={value} key={label} />
								))}
							</div>
						</div>
						<div className="space-y-4">
							<h2 className="text-2xl font-bold">Redes sociais</h2>
							<div className="flex flex-wrap gap-4">
								{socialMedias.map(({ icon: Icon, label, href }) => (
									<a href={href} title={label} key={href} target="_blank" rel="noreferrer">
										<Badge className="hover:bg-accent bg-none capitalize transition-colors">
											<Icon className="fill-primary size-4" /> {label}
										</Badge>
									</a>
								))}
							</div>
						</div>
					</Card.content>
				</Card>
			</div>
		</Landing>
	);
}

import { MailIcon, MapPin, PhoneIcon } from "lucide-react";

import { GitHubIcon } from "@/assets/icons/github";
import { LinkedInIcon } from "@/assets/icons/linkedin";
import { WhatsAppIcon } from "@/assets/icons/whatsapp";
import { info } from "@/core/info";

export const contacts = [
	{
		icon: MailIcon,
		label: "Email",
		value: info.email,
	},
	{
		icon: PhoneIcon,
		label: "Telefone",
		value: info.phone,
	},
	{
		icon: MapPin,
		label: "Localização",
		value: info.location,
	},
];

export const socialMedias = [
	{
		icon: GitHubIcon,
		label: "github",
		href: info.socialMedias.github,
	},
	{
		icon: LinkedInIcon,
		label: "linkedin",
		href: info.socialMedias.linkedin,
	},
	{
		icon: WhatsAppIcon,
		label: "whatsapp",
		href: info.socialMedias.whatsApp,
	},
];

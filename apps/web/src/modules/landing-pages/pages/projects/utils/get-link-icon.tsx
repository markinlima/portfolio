import { ExternalLinkIcon, GlobeIcon, WalletIcon } from "lucide-react";

/** The icon of a project link, by its type. */
export function getLinkIcon(type: string) {
	switch (type) {
		case "github":
			return <WalletIcon className="size-4" />;
		case "demo":
			return <GlobeIcon className="size-4" />;
		default:
			return <ExternalLinkIcon className="size-4" />;
	}
}

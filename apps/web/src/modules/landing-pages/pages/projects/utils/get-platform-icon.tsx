import { ComputerIcon, GlobeIcon, PhoneIcon } from "lucide-react";

import type { Plataform } from "@/modules/landing-pages/schemas/project";

/** The icon of a platform the project runs on. */
export function getPlatformIcon(platform: Plataform) {
	switch (platform) {
		case "desktop":
			return <ComputerIcon className="size-4" />;
		case "web":
			return <GlobeIcon className="size-4" />;
		default:
			return <PhoneIcon className="size-4" />;
	}
}

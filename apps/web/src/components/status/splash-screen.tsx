import { useState } from "react";

import { getRandomItem } from "@web/shared/utils";
import { SimpleLoaderIcon } from "@web/ui/simple-loader";

import { APP_CONFIG } from "@/core/info";
import { loadingPhrases } from "@/core/phrases";

/** The screen shown while the app loads: the brand name and a random loading phrase. */
export function SplashScreen() {
	const [phrase] = useState(() => getRandomItem(loadingPhrases));

	return (
		<section className="dark flex h-svh w-full flex-col items-center justify-center gap-2">
			<SimpleLoaderIcon className="size-12 animate-pulse" />
			<h1 className="text-3xl font-bold">{APP_CONFIG.brand.name}</h1>
			<p className="text-muted-foreground text-center text-sm">{phrase}</p>
		</section>
	);
}

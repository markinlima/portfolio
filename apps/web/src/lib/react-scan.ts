import { clientEnv } from "@/lib/env/client";

/** Loads React Scan in development, to show the renders of the components. */
export function useReactScan() {
	if (clientEnv.VITE_DEBUG_MODE === true) {
		import("react-scan").then(({ scan }) => {
			scan({
				enabled: true,
			});
		});
	}
}

import type { LucideIcon } from "lucide-react";

import { copyToClipboard } from "@/utils/copy-to-clipboard";

interface ContactMiniCardProps {
	label: string;
	value: string;
	icon: LucideIcon;
}

/** A contact detail that is copied to the clipboard when clicked. */
export function ContactMiniCard({ label, value, icon: Icon }: ContactMiniCardProps) {
	return (
		<button
			type="button"
			onClick={() => copyToClipboard({ value: value, message: `${label} Copiado(a)!` })}
			className="flex cursor-pointer items-center gap-2 text-left"
			key={value}
		>
			<div className="rounded-md border p-4">
				<Icon className="text-primary" />
			</div>
			<div>
				<p className="text-muted-foreground font-bold">{label}</p>
				<p className="text-sm">{value}</p>
			</div>
		</button>
	);
}

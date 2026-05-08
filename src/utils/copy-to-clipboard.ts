import { toast } from "@/modules/notification/components/toasts";
import { IsClientSide } from "@/utils/is-client-side";

interface CopyToClipboardProps {
	value: string;
	message: string;
}

export function copyToClipboard({ value, message }: CopyToClipboardProps) {
	if (!IsClientSide()) return;

	navigator.clipboard.writeText(value);
	toast.success({ title: "Valor Copiado!", description: message });

	window.umami?.track("copy_info", { value_copied: value });
}

import { toast } from "@web/toast";

interface CopyToClipboardProps {
	value: string;
	message: string;
}

/** Copies a value to the clipboard and shows a toast. */
export function copyToClipboard({ value, message }: CopyToClipboardProps) {
	navigator.clipboard.writeText(value);
	toast.success({ title: "Valor Copiado!", description: message });
}

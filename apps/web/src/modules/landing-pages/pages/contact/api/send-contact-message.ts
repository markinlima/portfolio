import { useMutation } from "@tanstack/react-query";

import type { ContactMessage } from "@shared/routes/validators";

import { api } from "@/lib/axios";

/** Sends a message from the contact form to the backend, which forwards it to the Discord webhook. */
export function sendContactMessage(input: ContactMessage) {
	return api.post("/contact", input);
}

/** Mutation of the contact form. */
export function useMutationSendContactMessage() {
	return useMutation({ mutationFn: sendContactMessage });
}

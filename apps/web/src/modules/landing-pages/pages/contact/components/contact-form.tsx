import { CheckIcon } from "lucide-react";

import { type ContactMessage, contactMessageSchema } from "@shared/routes/validators";
import { Field, Form } from "@web/form";

import { useAppForm } from "@/modules/form/lib/app-form";
import { useMutationSendContactMessage } from "@/modules/landing-pages/pages/contact/api/send-contact-message";

const defaultValues: ContactMessage = { name: "", email: "", message: "", website: "" };

/** The contact form. Its honeypot field is hidden from people; the API drops the messages that fill it. */
export function ContactForm() {
	const { mutateAsync: sendMessage, isSuccess } = useMutationSendContactMessage();

	const form = useAppForm({
		defaultValues,
		validators: { onChange: contactMessageSchema, onSubmit: contactMessageSchema },
		onSubmit: async ({ value }) => {
			try {
				await sendMessage(value);
				window.umami?.track("contact_submit_success");
			} catch (error) {
				window.umami?.track("contact_submit_error", { form: "contact" });
				throw error;
			}
		},
	});

	if (isSuccess) {
		return (
			<div className="flex h-75 w-full flex-col items-center justify-center p-2 text-center">
				<CheckIcon className="text-success" />
				<p className="text-lg font-bold">Mensagem enviada com sucesso!</p>
			</div>
		);
	}

	return (
		<form.AppForm>
			<Form className="space-y-4">
				<div className="flex gap-4 max-md:flex-col">
					<form.AppField name="name">
						{(field) => (
							<Field>
								<Field.label>Seu Nome</Field.label>
								<field.TextField placeholder="Insira seu nome completo" maxLength={100} />
								<Field.error />
							</Field>
						)}
					</form.AppField>
					<form.AppField name="email">
						{(field) => (
							<Field>
								<Field.label>Seu E-mail</Field.label>
								<field.TextField placeholder="seu.email@exemplo.com" maxLength={100} />
								<Field.error />
							</Field>
						)}
					</form.AppField>
				</div>

				<form.AppField name="message">
					{(field) => (
						<Field>
							<Field.label>Sua Mensagem</Field.label>
							<field.TextareaField placeholder="Escreva sua mensagem aqui..." className="h-100" maxLength={600} />
							<Field.error />
						</Field>
					)}
				</form.AppField>

				<div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
					<form.AppField name="website">
						{(field) => (
							<Field>
								<Field.label>Site</Field.label>
								<field.TextField tabIndex={-1} autoComplete="off" />
							</Field>
						)}
					</form.AppField>
				</div>

				<Form.error />
				<Form.submitButton className="max-lg:w-full" size="lg">
					Enviar Mensagem!
				</Form.submitButton>
			</Form>
		</form.AppForm>
	);
}

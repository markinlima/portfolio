import { CheckIcon } from "lucide-react";
import { Field } from "@/modules/form/components/field";
import { useAppForm } from "@/modules/form/lib/app-form";
import { useMutationSendContactMessage } from "@/modules/portifolio/pages/contact/api/send-contact-message";
import { type ContactMessageInput, contactMessageSchema } from "@/modules/portifolio/pages/contact/schemas/contact-message";

export type ContactFormSchema = ContactMessageInput;

export function ContactForm() {
	const { mutateAsync: sendMessage, isSuccess } = useMutationSendContactMessage();

	const defaultValues: ContactFormSchema = {
		name: "",
		email: "",
		message: "",
	};

	const Form = useAppForm({
		validators: {
			onMount: contactMessageSchema,
			onChange: contactMessageSchema,
			onSubmit: contactMessageSchema,
		},
		defaultValues,
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
				<p className="font-bold text-lg">Mensagem enviada com sucesso!</p>
			</div>
		);
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				Form.handleSubmit();
			}}
			className="space-y-4"
		>
			<div className="flex gap-4 max-md:flex-col">
				<Form.AppField
					name="name"
					children={(AppField) => (
						<Field.Wrapper>
							<Field.Label>Seu Nome</Field.Label>
							<AppField.TextField placeholder="Insira seu nome completo" maxLength={100} />
							<Field.Error />
						</Field.Wrapper>
					)}
				/>
				<Form.AppField
					name="email"
					children={(AppField) => (
						<Field.Wrapper>
							<Field.Label>Seu E-mail</Field.Label>
							<AppField.TextField placeholder="seu.email@exemplo.com" maxLength={100} />
							<Field.Error />
						</Field.Wrapper>
					)}
				/>
			</div>

			<Form.AppField
				name="message"
				children={(AppField) => (
					<Field.Wrapper>
						<Field.Label>Sua Mensagem</Field.Label>
						<AppField.TextareaField placeholder="Escreva sua mensagem aqui..." className="h-100" maxLength={600} />
						<Field.Error />
					</Field.Wrapper>
				)}
			/>

			<Form.AppForm>
				<Form.SubmitButton className="max-lg:w-full" size="lg">
					Enviar Mensagem!
				</Form.SubmitButton>
			</Form.AppForm>
		</form>
	);
}

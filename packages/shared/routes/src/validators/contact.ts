import z from "zod";

export const MAX_CONTACT_NAME_LENGTH = 80;
export const MAX_CONTACT_EMAIL_LENGTH = 120;
export const MIN_CONTACT_MESSAGE_LENGTH = 10;
export const MAX_CONTACT_MESSAGE_LENGTH = 2000;

/** The message a visitor sends from the contact form. */
export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(
      MAX_CONTACT_NAME_LENGTH,
      `Use até ${MAX_CONTACT_NAME_LENGTH} caracteres.`,
    ),
  email: z
    .email("Informe um e-mail válido.")
    .trim()
    .max(
      MAX_CONTACT_EMAIL_LENGTH,
      `Use até ${MAX_CONTACT_EMAIL_LENGTH} caracteres.`,
    ),
  message: z
    .string()
    .trim()
    .min(
      MIN_CONTACT_MESSAGE_LENGTH,
      `Escreva pelo menos ${MIN_CONTACT_MESSAGE_LENGTH} caracteres.`,
    )
    .max(
      MAX_CONTACT_MESSAGE_LENGTH,
      `Use até ${MAX_CONTACT_MESSAGE_LENGTH} caracteres.`,
    ),
  /** Honeypot: a field hidden from people. A filled one is answered as sent and never delivered. */
  website: z.string().max(200).optional(),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;

import z from "zod";

import { contactMessageSchema } from "../../../validators/contact";

export const sendContactMessageBody = contactMessageSchema;

export const sendContactMessageResponse = z.object({
  contact: z.object({
    status: z.literal("sent"),
  }),
});

export type SendContactMessageBody = z.infer<typeof sendContactMessageBody>;
export type SendContactMessageResponse = z.infer<
  typeof sendContactMessageResponse
>;

import Elysia from "elysia";

import { sendContactMessageRoute } from "./send-contact-message";

export const contactRoutes = new Elysia().use(sendContactMessageRoute());

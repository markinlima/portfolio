import { AppError, type AppErrorOptions } from "../app-error";

export class PayloadTooLargeError extends AppError {
	constructor(message = "O conteúdo enviado é grande demais.", options?: AppErrorOptions) {
		super(message, 413, false, options);
	}
}

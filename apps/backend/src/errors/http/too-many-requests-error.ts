import { AppError, type AppErrorOptions } from "../app-error";

export class TooManyRequestsError extends AppError {
	constructor(message = "Muitas tentativas. Aguarde um pouco e tente novamente.", options?: AppErrorOptions) {
		super(message, 429, true, options);
	}
}

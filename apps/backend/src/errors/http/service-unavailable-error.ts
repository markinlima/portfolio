import { AppError, type AppErrorOptions } from "../app-error";

export class ServiceUnavailableError extends AppError {
	constructor(message = "O serviço está indisponível no momento. Tente novamente mais tarde.", options?: AppErrorOptions) {
		super(message, 503, true, options);
	}
}

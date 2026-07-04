import { DomainError } from "./DomainError";

export class CredencialesInvalidasError extends DomainError {
  readonly code = "CREDENCIALES_INVALIDAS";

  constructor(mensaje: string) {
    super(mensaje);
  }
}

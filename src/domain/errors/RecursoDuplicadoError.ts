import { DomainError } from "./DomainError";

export class RecursoDuplicadoError extends DomainError {
  readonly code = "RECURSO_DUPLICADO";

  constructor(mensaje: string) {
    super(mensaje);
  }
}

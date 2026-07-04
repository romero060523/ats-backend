import { DomainError } from "./DomainError";

export class AccionNoPermitidaError extends DomainError {
  readonly code = "ACCION_NO_PERMITIDA";

  constructor(mensaje: string) {
    super(mensaje);
  }
}

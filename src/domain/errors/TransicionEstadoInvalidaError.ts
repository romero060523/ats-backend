import { DomainError } from "./DomainError";

export class TransicionEstadoInvalidaError extends DomainError {
  readonly code = "TRANSICION_ESTADO_INVALIDA";

  constructor(estadoActual: string, estadoDestino: string) {
    super(`No se puede pasar de ${estadoActual} a ${estadoDestino}`);
  }
}

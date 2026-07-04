import { DomainError } from "./DomainError";

export class RecursoNoEncontradoError extends DomainError {
  readonly code = "RECURSO_NO_ENCONTRADO";

  constructor(recurso: string, identificador?: string) {
    super(
      identificador
        ? `${recurso} con identificador "${identificador}" no fue encontrado`
        : `${recurso} no fue encontrado`
    );
  }
}

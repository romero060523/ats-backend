import { DomainError } from "./DomainError";

export class TokenInvalidoError extends DomainError {
  readonly code = "TOKEN_INVALIDO";

  constructor() {
    super("Token de autenticación inválido o ausente");
  }
}

import { DomainError } from "./DomainError";
import { ZodError } from "zod";

export class DatosInvalidosError extends DomainError {
  readonly code = "DATOS_INVALIDOS";
  readonly detalles: unknown;

  constructor(error: ZodError) {
    super("Los datos proporcionados son inválidos");
    this.detalles = error.flatten();
  }
}

import { Request, Response, NextFunction } from "express";
import { DomainError } from "@domain/errors/DomainError";
import { RecursoNoEncontradoError } from "@domain/errors/RecursoNoEncontradoError";
import { RecursoDuplicadoError } from "@domain/errors/RecursoDuplicadoError";
import { TransicionEstadoInvalidaError } from "@domain/errors/TransicionEstadoInvalidaError";
import { AccionNoPermitidaError } from "@domain/errors/AccionNoPermitidaError";
import { CredencialesInvalidasError } from "@domain/errors/CredencialesInvalidasError";
import { TokenInvalidoError } from "@domain/errors/TokenInvalidoError";
import { DatosInvalidosError } from "@domain/errors/DatosInvalidosError";

function resolverStatus(error: DomainError): number {
  if (error instanceof RecursoNoEncontradoError) return 404;
  if (error instanceof RecursoDuplicadoError) return 409;
  if (error instanceof TransicionEstadoInvalidaError) return 409;
  if (error instanceof AccionNoPermitidaError) return 403;
  if (error instanceof CredencialesInvalidasError) return 401;
  if (error instanceof TokenInvalidoError) return 401;
  if (error instanceof DatosInvalidosError) return 400;
  return 500;
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (error instanceof DomainError) {
    const status = resolverStatus(error);
    const errorBody: Record<string, unknown> = {
      code: error.code,
      message: error.message,
    };

    if (error instanceof DatosInvalidosError) {
      errorBody.detalles = error.detalles;
    }

    res.status(status).json({ success: false, error: errorBody });
    return;
  }

  console.error("[Error interno]", error);
  res.status(500).json({
    success: false,
    error: { code: "INTERNAL_SERVER_ERROR", message: "Error interno del servidor" },
  });
}

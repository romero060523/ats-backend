import { Request, Response, NextFunction } from "express";
import { RolUsuarioEnum } from "@domain/entities/Usuario";
import { AccionNoPermitidaError } from "@domain/errors/AccionNoPermitidaError";

export function requireRole(...rolesPermitidos: RolUsuarioEnum[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.usuarioAutenticado || !rolesPermitidos.includes(req.usuarioAutenticado.rol)) {
      next(new AccionNoPermitidaError("Rol insuficiente para esta acción"));
      return;
    }
    next();
  };
}

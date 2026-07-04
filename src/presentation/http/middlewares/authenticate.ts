import { Request, Response, NextFunction } from "express";
import { tokenService } from "@shared/container";
import { TokenInvalidoError } from "@domain/errors/TokenInvalidoError";

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    next(new TokenInvalidoError());
    return;
  }

  const token = header.slice(7);
  const payload = tokenService.verificar(token);

  if (!payload) {
    next(new TokenInvalidoError());
    return;
  }

  req.usuarioAutenticado = { id: payload.sub, rol: payload.rol };
  next();
}

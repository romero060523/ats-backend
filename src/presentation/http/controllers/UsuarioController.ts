import { Request, Response, NextFunction } from "express";
import { listarUsuarios, crearReclutador, cambiarEstadoActivoUsuario } from "@shared/container";
import { RolUsuarioEnum } from "@domain/entities/Usuario";
import { serializarUsuario } from "../dto/serializers";

export async function listar(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { rol } = (req.parsedQuery ?? {}) as { rol?: RolUsuarioEnum };
    const usuarios = await listarUsuarios.ejecutar(rol ? { rol } : undefined);
    res.status(200).json({ success: true, data: usuarios.map(serializarUsuario) });
  } catch (err) {
    next(err);
  }
}

export async function crearNuevoReclutador(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const usuario = await crearReclutador.ejecutar(req.body);
    res.status(201).json({ success: true, data: serializarUsuario(usuario) });
  } catch (err) {
    next(err);
  }
}

export async function cambiarEstadoActivo(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const usuario = await cambiarEstadoActivoUsuario.ejecutar({ usuarioId: req.params.id });
    res.status(200).json({ success: true, data: serializarUsuario(usuario) });
  } catch (err) {
    next(err);
  }
}

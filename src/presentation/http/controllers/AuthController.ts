import { Request, Response, NextFunction } from "express";
import { registrarPostulante, iniciarSesion, obtenerUsuarioActual } from "@shared/container";
import { serializarUsuario } from "../dto/serializers";

export async function registro(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const usuario = await registrarPostulante.ejecutar(req.body);
    res.status(201).json({ success: true, data: serializarUsuario(usuario) });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const resultado = await iniciarSesion.ejecutar(req.body);
    res.status(200).json({
      success: true,
      data: { token: resultado.token, usuario: serializarUsuario(resultado.usuario) },
    });
  } catch (err) {
    next(err);
  }
}

export async function me(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const usuario = await obtenerUsuarioActual.ejecutar({
      usuarioId: req.usuarioAutenticado!.id,
    });
    res.status(200).json({ success: true, data: serializarUsuario(usuario) });
  } catch (err) {
    next(err);
  }
}

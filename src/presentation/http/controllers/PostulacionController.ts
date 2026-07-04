import { Request, Response, NextFunction } from "express";
import {
  crearPostulacion,
  listarMisPostulaciones,
  transicionarEstadoPostulacion,
  obtenerHistorialPostulacion,
  obtenerUsuarioActual,
} from "@shared/container";
import { serializarPostulacion } from "../dto/serializers";

function parsePaginacion(req: Request): { pagina: number; limite: number } {
  const q = req.parsedQuery as { pagina?: number; limite?: number } | undefined;
  return {
    pagina: q?.pagina ?? (Number(req.query.pagina) || 1),
    limite: q?.limite ?? (Number(req.query.limite) || 20),
  };
}

export async function crear(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const postulacion = await crearPostulacion.ejecutar({
      vacanteId: req.body.vacanteId,
      postulanteId: req.usuarioAutenticado!.id,
      mensajePostulacion: req.body.mensajePostulacion,
    });
    res.status(201).json({ success: true, data: serializarPostulacion(postulacion) });
  } catch (err) {
    next(err);
  }
}

export async function listarMias(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { pagina, limite } = parsePaginacion(req);
    const resultado = await listarMisPostulaciones.ejecutar({
      postulanteId: req.usuarioAutenticado!.id,
      pagina,
      limite,
    });

    res.status(200).json({
      success: true,
      data: resultado.items.map(serializarPostulacion),
      meta: {
        total: resultado.total,
        pagina,
        limite,
        totalPaginas: Math.ceil(resultado.total / limite),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function transicionar(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const usuario = await obtenerUsuarioActual.ejecutar({ usuarioId: req.usuarioAutenticado!.id });
    const postulacion = await transicionarEstadoPostulacion.ejecutar({
      postulacionId: req.params.id,
      usuario,
      nuevoEstado: req.body.nuevoEstado,
      comentario: req.body.comentario,
    });
    res.status(201).json({ success: true, data: serializarPostulacion(postulacion) });
  } catch (err) {
    next(err);
  }
}

export async function obtenerHistorial(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const usuario = await obtenerUsuarioActual.ejecutar({ usuarioId: req.usuarioAutenticado!.id });
    const historial = await obtenerHistorialPostulacion.ejecutar({
      postulacionId: req.params.id,
      usuario,
    });
    res.status(200).json({ success: true, data: historial });
  } catch (err) {
    next(err);
  }
}

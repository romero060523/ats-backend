import { Request, Response, NextFunction } from "express";
import {
  listarVacantesPublicas,
  obtenerVacantePublicaPorSlug,
  crearVacante,
  listarVacantesPanel,
  obtenerVacantePanelPorId,
  editarVacante,
  cambiarEstadoVacante,
  eliminarVacante,
  obtenerUsuarioActual,
  listarPostulacionesDeVacante,
} from "@shared/container";
import { serializarPostulacion } from "../dto/serializers";

function parsePaginacion(req: Request): { pagina: number; limite: number } {
  const q = req.parsedQuery as { pagina?: number; limite?: number } | undefined;
  return {
    pagina: q?.pagina ?? (Number(req.query.pagina) || 1),
    limite: q?.limite ?? (Number(req.query.limite) || 20),
  };
}

export async function listarPublicas(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const q = req.parsedQuery as { pagina?: number; limite?: number; area?: string; ubicacion?: string } | undefined;
    const pagina = q?.pagina ?? (Number(req.query.pagina) || 1);
    const limite = q?.limite ?? (Number(req.query.limite) || 20);

    const resultado = await listarVacantesPublicas.ejecutar({
      filtro: {
        area: q?.area ?? (req.query.area as string | undefined),
        ubicacion: q?.ubicacion ?? (req.query.ubicacion as string | undefined),
      },
      pagina,
      limite,
    });

    res.status(200).json({
      success: true,
      data: resultado.items,
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

export async function obtenerPorSlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const vacante = await obtenerVacantePublicaPorSlug.ejecutar({ slug: req.params.slug });
    res.status(200).json({ success: true, data: vacante });
  } catch (err) {
    next(err);
  }
}

export async function crear(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const vacante = await crearVacante.ejecutar({
      ...req.body,
      reclutadorId: req.usuarioAutenticado!.id,
    });
    res.status(201).json({ success: true, data: vacante });
  } catch (err) {
    next(err);
  }
}

export async function listarPanel(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { pagina, limite } = parsePaginacion(req);
    const usuario = await obtenerUsuarioActual.ejecutar({ usuarioId: req.usuarioAutenticado!.id });
    const resultado = await listarVacantesPanel.ejecutar({ usuario, pagina, limite });

    res.status(200).json({
      success: true,
      data: resultado.items,
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

export async function obtenerPanelPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const usuario = await obtenerUsuarioActual.ejecutar({ usuarioId: req.usuarioAutenticado!.id });
    const vacante = await obtenerVacantePanelPorId.ejecutar({ id: req.params.id, usuario });
    res.status(200).json({ success: true, data: vacante });
  } catch (err) {
    next(err);
  }
}

export async function editar(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const usuario = await obtenerUsuarioActual.ejecutar({ usuarioId: req.usuarioAutenticado!.id });
    const vacante = await editarVacante.ejecutar({ id: req.params.id, usuario, cambios: req.body });
    res.status(200).json({ success: true, data: vacante });
  } catch (err) {
    next(err);
  }
}

export async function cambiarEstado(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const usuario = await obtenerUsuarioActual.ejecutar({ usuarioId: req.usuarioAutenticado!.id });
    const vacante = await cambiarEstadoVacante.ejecutar({
      id: req.params.id,
      usuario,
      nuevoEstado: req.body.nuevoEstado,
    });
    res.status(200).json({ success: true, data: vacante });
  } catch (err) {
    next(err);
  }
}

export async function eliminar(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const usuario = await obtenerUsuarioActual.ejecutar({ usuarioId: req.usuarioAutenticado!.id });
    const vacante = await eliminarVacante.ejecutar({ id: req.params.id, usuario });
    res.status(200).json({ success: true, data: vacante });
  } catch (err) {
    next(err);
  }
}

export async function listarPostulacionesPorVacante(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { pagina, limite } = parsePaginacion(req);
    const usuario = await obtenerUsuarioActual.ejecutar({ usuarioId: req.usuarioAutenticado!.id });
    const resultado = await listarPostulacionesDeVacante.ejecutar({
      vacanteId: req.params.vacanteId,
      usuario,
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

import { Router, RequestHandler } from "express";
import { authenticate } from "../middlewares/authenticate";
import { requireRole } from "../middlewares/requireRole";
import { validate } from "../middlewares/validate";
import {
  crearPostulacionSchema,
  transicionarEstadoSchema,
  paginacionQuerySchema,
} from "../validators/postulacionValidators";
import * as postulacionController from "../controllers/PostulacionController";
import { RolUsuarioEnum } from "@domain/entities/Usuario";

const router = Router();

// POSTULANTE
router.post(
  "/postulaciones",
  authenticate,
  requireRole(RolUsuarioEnum.POSTULANTE),
  validate(crearPostulacionSchema),
  postulacionController.crear
);

router.get(
  "/postulaciones/mias",
  authenticate,
  requireRole(RolUsuarioEnum.POSTULANTE),
  validate(paginacionQuerySchema, "query"),
  postulacionController.listarMias
);

// Historial accesible por el postulante dueño, reclutador de la vacante y administrador.
// La policy interna de ObtenerHistorialPostulacion filtra los tres casos — aquí solo
// exigimos sesión válida; el requireRole sería demasiado restrictivo.
router.get(
  "/postulaciones/:id/transiciones",
  authenticate,
  postulacionController.obtenerHistorial
);

// RECLUTADOR / ADMINISTRADOR
const panelMiddleware: RequestHandler[] = [
  authenticate,
  requireRole(RolUsuarioEnum.RECLUTADOR, RolUsuarioEnum.ADMINISTRADOR),
];

// POST porque crea un nuevo registro en HistorialEstadoPostulacion (semántica de creación).
router.post(
  "/panel/postulaciones/:id/transiciones",
  ...panelMiddleware,
  validate(transicionarEstadoSchema),
  postulacionController.transicionar
);

export default router;

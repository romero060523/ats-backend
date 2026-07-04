import { Router, RequestHandler } from "express";
import { authenticate } from "../middlewares/authenticate";
import { requireRole } from "../middlewares/requireRole";
import { validate } from "../middlewares/validate";
import {
  crearVacanteSchema,
  editarVacanteSchema,
  cambiarEstadoVacanteSchema,
  listarVacantesQuerySchema,
  paginacionQuerySchema,
} from "../validators/vacanteValidators";
import * as vacanteController from "../controllers/VacanteController";
import { RolUsuarioEnum } from "@domain/entities/Usuario";

const router = Router();

// Rutas públicas
// ORDEN IMPORTANTE: si se añade alguna ruta literal bajo /vacantes (ej. /vacantes/destacadas),
// debe registrarse ANTES de /vacantes/:slug, o Express la capturaría como { slug: "destacadas" }.
router.get("/vacantes", validate(listarVacantesQuerySchema, "query"), vacanteController.listarPublicas);
router.get("/vacantes/:slug", vacanteController.obtenerPorSlug);

// Rutas de panel (RECLUTADOR / ADMINISTRADOR)
const panelMiddleware: RequestHandler[] = [
  authenticate,
  requireRole(RolUsuarioEnum.RECLUTADOR, RolUsuarioEnum.ADMINISTRADOR),
];

router.get("/panel/vacantes", ...panelMiddleware, validate(paginacionQuerySchema, "query"), vacanteController.listarPanel);
router.post("/panel/vacantes", ...panelMiddleware, validate(crearVacanteSchema), vacanteController.crear);
router.get("/panel/vacantes/:id", ...panelMiddleware, vacanteController.obtenerPanelPorId);
router.patch("/panel/vacantes/:id", ...panelMiddleware, validate(editarVacanteSchema), vacanteController.editar);
router.patch("/panel/vacantes/:id/estado", ...panelMiddleware, validate(cambiarEstadoVacanteSchema), vacanteController.cambiarEstado);
router.delete("/panel/vacantes/:id", ...panelMiddleware, vacanteController.eliminar);
router.get(
  "/panel/vacantes/:vacanteId/postulaciones",
  ...panelMiddleware,
  validate(paginacionQuerySchema, "query"),
  vacanteController.listarPostulacionesPorVacante
);

export default router;

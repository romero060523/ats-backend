import { Router, RequestHandler } from "express";
import { authenticate } from "../middlewares/authenticate";
import { requireRole } from "../middlewares/requireRole";
import { validate } from "../middlewares/validate";
import { crearReclutadorSchema, listarUsuariosQuerySchema } from "../validators/usuarioValidators";
import * as usuarioController from "../controllers/UsuarioController";
import { RolUsuarioEnum } from "@domain/entities/Usuario";

const router = Router();

const adminMiddleware: RequestHandler[] = [
  authenticate,
  requireRole(RolUsuarioEnum.ADMINISTRADOR),
];

router.get("/", ...adminMiddleware, validate(listarUsuariosQuerySchema, "query"), usuarioController.listar);
router.post("/reclutadores", ...adminMiddleware, validate(crearReclutadorSchema), usuarioController.crearNuevoReclutador);
router.patch("/:id/estado", ...adminMiddleware, usuarioController.cambiarEstadoActivo);

export default router;

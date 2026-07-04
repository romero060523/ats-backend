import { Router, RequestHandler } from "express";
import { authenticate } from "../middlewares/authenticate";
import { requireRole } from "../middlewares/requireRole";
import { RolUsuarioEnum } from "@domain/entities/Usuario";
import * as metricaController from "../controllers/MetricaController";

const router = Router();

const adminMiddleware: RequestHandler[] = [
  authenticate,
  requireRole(RolUsuarioEnum.ADMINISTRADOR),
];

router.get("/", ...adminMiddleware, metricaController.obtenerMetricas);

export default router;

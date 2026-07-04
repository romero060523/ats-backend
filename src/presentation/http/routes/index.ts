import { Router } from "express";
import authRoutes from "./authRoutes";
import vacanteRoutes from "./vacanteRoutes";
import postulacionRoutes from "./postulacionRoutes";
import usuarioRoutes from "./usuarioRoutes";
import metricaRoutes from "./metricaRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/", vacanteRoutes);
router.use("/", postulacionRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/metricas", metricaRoutes);

export default router;

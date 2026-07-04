import { Request, Response, NextFunction } from "express";
import { obtenerMetricasGlobales } from "@shared/container";

export async function obtenerMetricas(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const metricas = await obtenerMetricasGlobales.ejecutar();
    res.status(200).json({ success: true, data: metricas });
  } catch (err) {
    next(err);
  }
}

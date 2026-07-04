import { z } from "zod";
import { EstadoPostulacionEnum } from "@domain/value-objects/EstadoPostulacion";

export const crearPostulacionSchema = z.object({
  vacanteId: z.string().uuid("vacanteId debe ser un UUID válido"),
  mensajePostulacion: z.string().optional(),
});

export const transicionarEstadoSchema = z.object({
  nuevoEstado: z.nativeEnum(EstadoPostulacionEnum),
  comentario: z.string().optional().nullable(),
});

export const paginacionQuerySchema = z.object({
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(100).default(20),
});

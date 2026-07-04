import { z } from "zod";
import { EstadoVacanteEnum } from "@domain/entities/Vacante";

export const crearVacanteSchema = z.object({
  titulo: z.string().min(1),
  descripcion: z.string().min(1),
  requisitos: z.string().min(1),
  ubicacion: z.string().min(1),
  area: z.string().min(1),
  salarioMin: z.number().nullable().optional(),
  salarioMax: z.number().nullable().optional(),
});

export const editarVacanteSchema = z.object({
  titulo: z.string().min(1).optional(),
  descripcion: z.string().min(1).optional(),
  requisitos: z.string().min(1).optional(),
  ubicacion: z.string().min(1).optional(),
  area: z.string().min(1).optional(),
  salarioMin: z.number().nullable().optional(),
  salarioMax: z.number().nullable().optional(),
});

export const cambiarEstadoVacanteSchema = z.object({
  nuevoEstado: z.nativeEnum(EstadoVacanteEnum),
});

export const listarVacantesQuerySchema = z.object({
  area: z.string().optional(),
  ubicacion: z.string().optional(),
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(100).default(20),
});

export const paginacionQuerySchema = z.object({
  pagina: z.coerce.number().int().min(1).default(1),
  limite: z.coerce.number().int().min(1).max(100).default(20),
});

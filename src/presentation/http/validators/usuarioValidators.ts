import { z } from "zod";
import { RolUsuarioEnum } from "@domain/entities/Usuario";

export const crearReclutadorSchema = z.object({
  nombre: z.string().min(1),
  email: z.string().email("Email inválido"),
  passwordPlano: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const listarUsuariosQuerySchema = z.object({
  rol: z.nativeEnum(RolUsuarioEnum).optional(),
});

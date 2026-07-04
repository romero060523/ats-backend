import { z } from "zod";

export const registrarSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  passwordPlano: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  passwordPlano: z.string().min(1, "La contraseña es requerida"),
});

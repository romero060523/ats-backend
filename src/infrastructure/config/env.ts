import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url({ message: "DATABASE_URL debe ser una URL válida" }),
  JWT_SECRET: z
    .string()
    .min(32, { message: "JWT_SECRET debe tener al menos 32 caracteres" }),
  JWT_EXPIRES_IN: z.string().min(1, { message: "JWT_EXPIRES_IN es requerida" }),
  PORT: z.coerce.number().default(4000),
  CORS_ORIGIN: z.string().url({ message: "CORS_ORIGIN debe ser una URL válida" }),
  ADMIN_SEED_EMAIL: z.string().email({ message: "ADMIN_SEED_EMAIL debe ser un email válido" }),
  ADMIN_SEED_PASSWORD: z
    .string()
    .min(1, { message: "ADMIN_SEED_PASSWORD es requerida" }),
});

const resultado = envSchema.safeParse(process.env);

if (!resultado.success) {
  const detalle = resultado.error.issues
    .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(
    `Configuración de entorno inválida. Revisa tu archivo .env:\n${detalle}`
  );
}

export const env = resultado.data;

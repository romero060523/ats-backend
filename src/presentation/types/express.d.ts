import { RolUsuarioEnum } from "@domain/entities/Usuario";

declare global {
  namespace Express {
    interface Request {
      usuarioAutenticado?: {
        id: string;
        rol: RolUsuarioEnum;
      };
      parsedQuery?: Record<string, unknown>;
    }
  }
}

export {};

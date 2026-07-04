import { RolUsuarioEnum } from "../../../domain/entities/Usuario";

export interface TokenPayload {
  sub: string;
  rol: RolUsuarioEnum;
}

export interface TokenService {
  generar(payload: TokenPayload): string;
  verificar(token: string): TokenPayload | null;
}

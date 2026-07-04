import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { TokenPayload, TokenService } from "../../application/ports/services/TokenService";
import { RolUsuarioEnum } from "../../domain/entities/Usuario";

function esRolValido(valor: unknown): valor is RolUsuarioEnum {
  return typeof valor === "string" && Object.values(RolUsuarioEnum).includes(valor as RolUsuarioEnum);
}

export class JwtTokenService implements TokenService {
  generar(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
  }

  verificar(token: string): TokenPayload | null {
    try {
      const decodificado = jwt.verify(token, env.JWT_SECRET);

      if (typeof decodificado === "string") {
        return null;
      }

      if (typeof decodificado.sub !== "string" || !esRolValido(decodificado.rol)) {
        return null;
      }

      return { sub: decodificado.sub, rol: decodificado.rol };
    } catch {
      return null;
    }
  }
}

import { Usuario } from "../../../domain/entities/Usuario";
import { CredencialesInvalidasError } from "../../../domain/errors/CredencialesInvalidasError";
import { UsuarioRepository } from "../../ports/repositories/UsuarioRepository";
import { PasswordHasher } from "../../ports/services/PasswordHasher";
import { TokenService } from "../../ports/services/TokenService";

export interface IniciarSesionInput {
  email: string;
  passwordPlano: string;
}

export interface IniciarSesionOutput {
  token: string;
  usuario: Usuario;
}

const MENSAJE_CREDENCIALES_INVALIDAS = "Credenciales inválidas";

export class IniciarSesion {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService
  ) {}

  async ejecutar(input: IniciarSesionInput): Promise<IniciarSesionOutput> {
    const usuario = await this.usuarioRepository.buscarPorEmail(input.email);
    if (!usuario) {
      throw new CredencialesInvalidasError(MENSAJE_CREDENCIALES_INVALIDAS);
    }

    const coincide = await this.passwordHasher.comparar(
      input.passwordPlano,
      usuario.obtenerPasswordHash()
    );
    if (!coincide) {
      throw new CredencialesInvalidasError(MENSAJE_CREDENCIALES_INVALIDAS);
    }

    if (!usuario.activo) {
      throw new CredencialesInvalidasError(MENSAJE_CREDENCIALES_INVALIDAS);
    }

    const token = this.tokenService.generar({ sub: usuario.id, rol: usuario.rol });

    return { token, usuario };
  }
}

import { randomUUID } from "crypto";
import { RolUsuarioEnum, Usuario } from "../../../domain/entities/Usuario";
import { RecursoDuplicadoError } from "../../../domain/errors/RecursoDuplicadoError";
import { UsuarioRepository } from "../../ports/repositories/UsuarioRepository";
import { PasswordHasher } from "../../ports/services/PasswordHasher";

export interface CrearReclutadorInput {
  nombre: string;
  email: string;
  passwordPlano: string;
}

export class CrearReclutador {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async ejecutar(input: CrearReclutadorInput): Promise<Usuario> {
    const existente = await this.usuarioRepository.buscarPorEmail(input.email);
    if (existente) {
      throw new RecursoDuplicadoError(`Ya existe un usuario con el email "${input.email}"`);
    }

    const passwordHash = await this.passwordHasher.hash(input.passwordPlano);
    const ahora = new Date();

    const usuario = new Usuario({
      id: randomUUID(),
      nombre: input.nombre,
      email: input.email,
      passwordHash,
      rol: RolUsuarioEnum.RECLUTADOR,
      activo: true,
      createdAt: ahora,
      updatedAt: ahora,
    });

    return this.usuarioRepository.crear(usuario);
  }
}

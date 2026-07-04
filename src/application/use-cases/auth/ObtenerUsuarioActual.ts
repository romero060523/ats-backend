import { Usuario } from "../../../domain/entities/Usuario";
import { RecursoNoEncontradoError } from "../../../domain/errors/RecursoNoEncontradoError";
import { UsuarioRepository } from "../../ports/repositories/UsuarioRepository";

export interface ObtenerUsuarioActualInput {
  usuarioId: string;
}

export class ObtenerUsuarioActual {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async ejecutar(input: ObtenerUsuarioActualInput): Promise<Usuario> {
    const usuario = await this.usuarioRepository.buscarPorId(input.usuarioId);
    if (!usuario) {
      throw new RecursoNoEncontradoError("Usuario", input.usuarioId);
    }

    return usuario;
  }
}

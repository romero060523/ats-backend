import { Usuario } from "../../../domain/entities/Usuario";
import { RecursoNoEncontradoError } from "../../../domain/errors/RecursoNoEncontradoError";
import { UsuarioRepository } from "../../ports/repositories/UsuarioRepository";

export interface CambiarEstadoActivoUsuarioInput {
  usuarioId: string;
}

export class CambiarEstadoActivoUsuario {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async ejecutar(input: CambiarEstadoActivoUsuarioInput): Promise<Usuario> {
    const usuario = await this.usuarioRepository.buscarPorId(input.usuarioId);
    if (!usuario) {
      throw new RecursoNoEncontradoError("Usuario", input.usuarioId);
    }

    const usuarioActualizado = new Usuario({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      passwordHash: usuario.obtenerPasswordHash(),
      rol: usuario.rol,
      activo: !usuario.activo,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
    });

    return this.usuarioRepository.actualizar(usuarioActualizado);
  }
}

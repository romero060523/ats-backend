import { RolUsuarioEnum, Usuario } from "../../../domain/entities/Usuario";
import { UsuarioRepository } from "../../ports/repositories/UsuarioRepository";

export interface ListarUsuariosInput {
  rol?: RolUsuarioEnum;
}

export class ListarUsuarios {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async ejecutar(input?: ListarUsuariosInput): Promise<Usuario[]> {
    return this.usuarioRepository.listar(input);
  }
}

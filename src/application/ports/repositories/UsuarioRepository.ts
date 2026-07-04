import { RolUsuarioEnum, Usuario } from "../../../domain/entities/Usuario";

export interface UsuarioRepository {
  crear(usuario: Usuario): Promise<Usuario>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
  buscarPorId(id: string): Promise<Usuario | null>;
  listar(filtro?: { rol?: RolUsuarioEnum }): Promise<Usuario[]>;
  actualizar(usuario: Usuario): Promise<Usuario>;
}

import { PrismaClientOrTx } from "../client";
import { UsuarioRepository } from "../../../../application/ports/repositories/UsuarioRepository";
import { RolUsuarioEnum, Usuario } from "../../../../domain/entities/Usuario";
import { UsuarioMapper, rolAPrisma } from "../mappers/UsuarioMapper";

export class PrismaUsuarioRepository implements UsuarioRepository {
  constructor(private readonly prisma: PrismaClientOrTx) {}

  async crear(usuario: Usuario): Promise<Usuario> {
    const creado = await this.prisma.usuario.create({
      data: UsuarioMapper.toPersistence(usuario),
    });

    return UsuarioMapper.toDomain(creado);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const encontrado = await this.prisma.usuario.findUnique({ where: { email } });

    return encontrado ? UsuarioMapper.toDomain(encontrado) : null;
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    const encontrado = await this.prisma.usuario.findUnique({ where: { id } });

    return encontrado ? UsuarioMapper.toDomain(encontrado) : null;
  }

  async listar(filtro?: { rol?: RolUsuarioEnum }): Promise<Usuario[]> {
    const usuarios = await this.prisma.usuario.findMany({
      where: filtro?.rol ? { rol: rolAPrisma(filtro.rol) } : undefined,
    });

    return usuarios.map((usuario) => UsuarioMapper.toDomain(usuario));
  }

  async actualizar(usuario: Usuario): Promise<Usuario> {
    const { id, createdAt, updatedAt, ...data } = UsuarioMapper.toPersistence(usuario);

    const actualizado = await this.prisma.usuario.update({
      where: { id: usuario.id },
      data,
    });

    return UsuarioMapper.toDomain(actualizado);
  }
}

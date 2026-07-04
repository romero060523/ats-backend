import { Usuario as PrismaUsuario, RolUsuario as PrismaRolUsuario } from "@prisma/client";
import { Usuario } from "../../../../domain/entities/Usuario";
import { rolADominio, rolAPrisma } from "./enums";

export { rolADominio, rolAPrisma };

export interface UsuarioPersistenceData {
  id: string;
  nombre: string;
  email: string;
  passwordHash: string;
  rol: PrismaRolUsuario;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UsuarioMapper {
  static toDomain(prismaUsuario: PrismaUsuario): Usuario {
    return new Usuario({
      id: prismaUsuario.id,
      nombre: prismaUsuario.nombre,
      email: prismaUsuario.email,
      passwordHash: prismaUsuario.passwordHash,
      rol: rolADominio(prismaUsuario.rol),
      activo: prismaUsuario.activo,
      createdAt: prismaUsuario.createdAt,
      updatedAt: prismaUsuario.updatedAt,
    });
  }

  static toPersistence(usuario: Usuario): UsuarioPersistenceData {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      passwordHash: usuario.obtenerPasswordHash(),
      rol: rolAPrisma(usuario.rol),
      activo: usuario.activo,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
    };
  }
}

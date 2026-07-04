import {
  Postulacion as PrismaPostulacion,
  EstadoPostulacion as PrismaEstadoPostulacion,
} from "@prisma/client";
import { Postulacion } from "../../../../domain/entities/Postulacion";
import { estadoPostulacionADominio, estadoPostulacionAPrisma } from "./enums";

export interface PostulacionPersistenceData {
  id: string;
  vacanteId: string;
  postulanteId: string;
  estado: PrismaEstadoPostulacion;
  mensajePostulacion: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class PostulacionMapper {
  static toDomain(prismaPostulacion: PrismaPostulacion): Postulacion {
    return new Postulacion({
      id: prismaPostulacion.id,
      vacanteId: prismaPostulacion.vacanteId,
      postulanteId: prismaPostulacion.postulanteId,
      estado: estadoPostulacionADominio(prismaPostulacion.estado),
      mensajePostulacion: prismaPostulacion.mensajePostulacion,
      createdAt: prismaPostulacion.createdAt,
      updatedAt: prismaPostulacion.updatedAt,
    });
  }

  static toPersistence(postulacion: Postulacion): PostulacionPersistenceData {
    return {
      id: postulacion.id,
      vacanteId: postulacion.vacanteId,
      postulanteId: postulacion.postulanteId,
      estado: estadoPostulacionAPrisma(postulacion.estado),
      mensajePostulacion: postulacion.mensajePostulacion,
      createdAt: postulacion.createdAt,
      updatedAt: postulacion.updatedAt,
    };
  }
}

import {
  HistorialEstadoPostulacion as PrismaHistorial,
  EstadoPostulacion as PrismaEstadoPostulacion,
} from "@prisma/client";
import { HistorialEstadoPostulacion } from "../../../../domain/entities/HistorialEstadoPostulacion";
import { EstadoPostulacionEnum } from "../../../../domain/value-objects/EstadoPostulacion";
import { estadoPostulacionADominio, estadoPostulacionAPrisma } from "./enums";

function estadoADominioONull(
  estado: PrismaEstadoPostulacion | null
): EstadoPostulacionEnum | null {
  return estado === null ? null : estadoPostulacionADominio(estado);
}

function estadoAPrismaONull(
  estado: EstadoPostulacionEnum | null
): PrismaEstadoPostulacion | null {
  return estado === null ? null : estadoPostulacionAPrisma(estado);
}

export interface HistorialPersistenceData {
  id: string;
  postulacionId: string;
  estadoAnterior: PrismaEstadoPostulacion | null;
  estadoNuevo: PrismaEstadoPostulacion;
  cambiadoPorId: string;
  comentario: string | null;
  createdAt: Date;
}

export class HistorialMapper {
  static toDomain(prismaHistorial: PrismaHistorial): HistorialEstadoPostulacion {
    return new HistorialEstadoPostulacion({
      id: prismaHistorial.id,
      postulacionId: prismaHistorial.postulacionId,
      estadoAnterior: estadoADominioONull(prismaHistorial.estadoAnterior),
      estadoNuevo: estadoPostulacionADominio(prismaHistorial.estadoNuevo),
      cambiadoPorId: prismaHistorial.cambiadoPorId,
      comentario: prismaHistorial.comentario,
      createdAt: prismaHistorial.createdAt,
    });
  }

  static toPersistence(historial: HistorialEstadoPostulacion): HistorialPersistenceData {
    return {
      id: historial.id,
      postulacionId: historial.postulacionId,
      estadoAnterior: estadoAPrismaONull(historial.estadoAnterior),
      estadoNuevo: estadoPostulacionAPrisma(historial.estadoNuevo),
      cambiadoPorId: historial.cambiadoPorId,
      comentario: historial.comentario,
      createdAt: historial.createdAt,
    };
  }
}

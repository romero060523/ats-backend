import {
  RolUsuario as PrismaRolUsuario,
  EstadoVacante as PrismaEstadoVacante,
  EstadoPostulacion as PrismaEstadoPostulacion,
} from "@prisma/client";
import { RolUsuarioEnum } from "../../../../domain/entities/Usuario";
import { EstadoVacanteEnum } from "../../../../domain/entities/Vacante";
import { EstadoPostulacionEnum } from "../../../../domain/value-objects/EstadoPostulacion";

export function rolADominio(rol: PrismaRolUsuario): RolUsuarioEnum {
  switch (rol) {
    case PrismaRolUsuario.ADMINISTRADOR:
      return RolUsuarioEnum.ADMINISTRADOR;
    case PrismaRolUsuario.RECLUTADOR:
      return RolUsuarioEnum.RECLUTADOR;
    case PrismaRolUsuario.POSTULANTE:
      return RolUsuarioEnum.POSTULANTE;
  }
}

export function rolAPrisma(rol: RolUsuarioEnum): PrismaRolUsuario {
  switch (rol) {
    case RolUsuarioEnum.ADMINISTRADOR:
      return PrismaRolUsuario.ADMINISTRADOR;
    case RolUsuarioEnum.RECLUTADOR:
      return PrismaRolUsuario.RECLUTADOR;
    case RolUsuarioEnum.POSTULANTE:
      return PrismaRolUsuario.POSTULANTE;
  }
}

export function estadoVacanteADominio(estado: PrismaEstadoVacante): EstadoVacanteEnum {
  switch (estado) {
    case PrismaEstadoVacante.BORRADOR:
      return EstadoVacanteEnum.BORRADOR;
    case PrismaEstadoVacante.PUBLICADA:
      return EstadoVacanteEnum.PUBLICADA;
    case PrismaEstadoVacante.CERRADA:
      return EstadoVacanteEnum.CERRADA;
  }
}

export function estadoVacanteAPrisma(estado: EstadoVacanteEnum): PrismaEstadoVacante {
  switch (estado) {
    case EstadoVacanteEnum.BORRADOR:
      return PrismaEstadoVacante.BORRADOR;
    case EstadoVacanteEnum.PUBLICADA:
      return PrismaEstadoVacante.PUBLICADA;
    case EstadoVacanteEnum.CERRADA:
      return PrismaEstadoVacante.CERRADA;
  }
}

export function estadoPostulacionADominio(
  estado: PrismaEstadoPostulacion
): EstadoPostulacionEnum {
  switch (estado) {
    case PrismaEstadoPostulacion.RECIBIDA:
      return EstadoPostulacionEnum.RECIBIDA;
    case PrismaEstadoPostulacion.EN_REVISION:
      return EstadoPostulacionEnum.EN_REVISION;
    case PrismaEstadoPostulacion.ENTREVISTA:
      return EstadoPostulacionEnum.ENTREVISTA;
    case PrismaEstadoPostulacion.ACEPTADA:
      return EstadoPostulacionEnum.ACEPTADA;
    case PrismaEstadoPostulacion.RECHAZADA:
      return EstadoPostulacionEnum.RECHAZADA;
  }
}

export function estadoPostulacionAPrisma(
  estado: EstadoPostulacionEnum
): PrismaEstadoPostulacion {
  switch (estado) {
    case EstadoPostulacionEnum.RECIBIDA:
      return PrismaEstadoPostulacion.RECIBIDA;
    case EstadoPostulacionEnum.EN_REVISION:
      return PrismaEstadoPostulacion.EN_REVISION;
    case EstadoPostulacionEnum.ENTREVISTA:
      return PrismaEstadoPostulacion.ENTREVISTA;
    case EstadoPostulacionEnum.ACEPTADA:
      return PrismaEstadoPostulacion.ACEPTADA;
    case EstadoPostulacionEnum.RECHAZADA:
      return PrismaEstadoPostulacion.RECHAZADA;
  }
}

import { Vacante as PrismaVacante, EstadoVacante as PrismaEstadoVacante, Prisma } from "@prisma/client";
import { Vacante } from "../../../../domain/entities/Vacante";
import { estadoVacanteADominio, estadoVacanteAPrisma } from "./enums";

function decimalANumeroONull(valor: Prisma.Decimal | null): number | null {
  return valor === null ? null : valor.toNumber();
}

function numeroADecimalONull(valor: number | null): Prisma.Decimal | null {
  return valor === null ? null : new Prisma.Decimal(valor);
}

export interface VacantePersistenceData {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  requisitos: string;
  ubicacion: string;
  area: string;
  salarioMin: Prisma.Decimal | null;
  salarioMax: Prisma.Decimal | null;
  estado: PrismaEstadoVacante;
  reclutadorId: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class VacanteMapper {
  static toDomain(prismaVacante: PrismaVacante): Vacante {
    return new Vacante({
      id: prismaVacante.id,
      titulo: prismaVacante.titulo,
      slug: prismaVacante.slug,
      descripcion: prismaVacante.descripcion,
      requisitos: prismaVacante.requisitos,
      ubicacion: prismaVacante.ubicacion,
      area: prismaVacante.area,
      salarioMin: decimalANumeroONull(prismaVacante.salarioMin),
      salarioMax: decimalANumeroONull(prismaVacante.salarioMax),
      estado: estadoVacanteADominio(prismaVacante.estado),
      reclutadorId: prismaVacante.reclutadorId,
      deletedAt: prismaVacante.deletedAt,
      createdAt: prismaVacante.createdAt,
      updatedAt: prismaVacante.updatedAt,
    });
  }

  static toPersistence(vacante: Vacante): VacantePersistenceData {
    return {
      id: vacante.id,
      titulo: vacante.titulo,
      slug: vacante.slug,
      descripcion: vacante.descripcion,
      requisitos: vacante.requisitos,
      ubicacion: vacante.ubicacion,
      area: vacante.area,
      salarioMin: numeroADecimalONull(vacante.salarioMin),
      salarioMax: numeroADecimalONull(vacante.salarioMax),
      estado: estadoVacanteAPrisma(vacante.estado),
      reclutadorId: vacante.reclutadorId,
      deletedAt: vacante.deletedAt,
      createdAt: vacante.createdAt,
      updatedAt: vacante.updatedAt,
    };
  }
}

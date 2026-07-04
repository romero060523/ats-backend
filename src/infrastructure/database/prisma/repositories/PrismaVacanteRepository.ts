import { EstadoVacante as PrismaEstadoVacante } from "@prisma/client";
import { PrismaClientOrTx } from "../client";
import { VacanteRepository } from "../../../../application/ports/repositories/VacanteRepository";
import { Vacante } from "../../../../domain/entities/Vacante";
import { VacanteMapper } from "../mappers/VacanteMapper";

export class PrismaVacanteRepository implements VacanteRepository {
  constructor(private readonly prisma: PrismaClientOrTx) {}

  async crear(vacante: Vacante): Promise<Vacante> {
    const creada = await this.prisma.vacante.create({
      data: VacanteMapper.toPersistence(vacante),
    });

    return VacanteMapper.toDomain(creada);
  }

  async buscarPorId(id: string): Promise<Vacante | null> {
    const encontrada = await this.prisma.vacante.findUnique({ where: { id } });

    return encontrada ? VacanteMapper.toDomain(encontrada) : null;
  }

  async buscarPorSlug(slug: string): Promise<Vacante | null> {
    const encontrada = await this.prisma.vacante.findUnique({ where: { slug } });

    return encontrada ? VacanteMapper.toDomain(encontrada) : null;
  }

  async existeSlug(slug: string): Promise<boolean> {
    const encontrada = await this.prisma.vacante.findUnique({
      where: { slug },
      select: { id: true },
    });

    return encontrada !== null;
  }

  async listarPublicas(
    filtro: { area?: string; ubicacion?: string },
    pagina: number,
    limite: number
  ): Promise<{ items: Vacante[]; total: number }> {
    const where = {
      estado: PrismaEstadoVacante.PUBLICADA,
      deletedAt: null,
      ...(filtro.area ? { area: filtro.area } : {}),
      ...(filtro.ubicacion ? { ubicacion: filtro.ubicacion } : {}),
    };

    const [registros, total] = await Promise.all([
      this.prisma.vacante.findMany({
        where,
        skip: (pagina - 1) * limite,
        take: limite,
      }),
      this.prisma.vacante.count({ where }),
    ]);

    return { items: registros.map((registro) => VacanteMapper.toDomain(registro)), total };
  }

  async listarPanel(
    filtro: { reclutadorId?: string },
    pagina: number,
    limite: number
  ): Promise<{ items: Vacante[]; total: number }> {
    const where = {
      deletedAt: null,
      ...(filtro.reclutadorId ? { reclutadorId: filtro.reclutadorId } : {}),
    };

    const [registros, total] = await Promise.all([
      this.prisma.vacante.findMany({
        where,
        skip: (pagina - 1) * limite,
        take: limite,
      }),
      this.prisma.vacante.count({ where }),
    ]);

    return { items: registros.map((registro) => VacanteMapper.toDomain(registro)), total };
  }

  async actualizar(vacante: Vacante): Promise<Vacante> {
    const { id, createdAt, updatedAt, ...data } = VacanteMapper.toPersistence(vacante);

    const actualizada = await this.prisma.vacante.update({
      where: { id: vacante.id },
      data,
    });

    return VacanteMapper.toDomain(actualizada);
  }
}

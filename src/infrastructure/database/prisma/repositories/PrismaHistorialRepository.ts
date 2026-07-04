import { PrismaClientOrTx } from "../client";
import { HistorialRepository } from "../../../../application/ports/repositories/HistorialRepository";
import { HistorialEstadoPostulacion } from "../../../../domain/entities/HistorialEstadoPostulacion";
import { HistorialMapper } from "../mappers/HistorialMapper";

export class PrismaHistorialRepository implements HistorialRepository {
  constructor(private readonly prisma: PrismaClientOrTx) {}

  async crear(historial: HistorialEstadoPostulacion): Promise<HistorialEstadoPostulacion> {
    const creado = await this.prisma.historialEstadoPostulacion.create({
      data: HistorialMapper.toPersistence(historial),
    });

    return HistorialMapper.toDomain(creado);
  }

  async listarPorPostulacion(postulacionId: string): Promise<HistorialEstadoPostulacion[]> {
    const registros = await this.prisma.historialEstadoPostulacion.findMany({
      where: { postulacionId },
      orderBy: { createdAt: "asc" },
    });

    return registros.map((registro) => HistorialMapper.toDomain(registro));
  }
}

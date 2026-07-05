import { PrismaClientOrTx } from "../client";
import {
  PostulacionRepository,
  PostulacionConVacanteResumen,
} from "../../../../application/ports/repositories/PostulacionRepository";
import { Postulacion } from "../../../../domain/entities/Postulacion";
import { EstadoPostulacionEnum } from "../../../../domain/value-objects/EstadoPostulacion";
import { PostulacionMapper } from "../mappers/PostulacionMapper";
import { estadoPostulacionADominio } from "../mappers/enums";

const TODOS_LOS_ESTADOS: EstadoPostulacionEnum[] = [
  EstadoPostulacionEnum.RECIBIDA,
  EstadoPostulacionEnum.EN_REVISION,
  EstadoPostulacionEnum.ENTREVISTA,
  EstadoPostulacionEnum.ACEPTADA,
  EstadoPostulacionEnum.RECHAZADA,
];

export class PrismaPostulacionRepository implements PostulacionRepository {
  constructor(private readonly prisma: PrismaClientOrTx) {}

  async crear(postulacion: Postulacion): Promise<Postulacion> {
    const creada = await this.prisma.postulacion.create({
      data: PostulacionMapper.toPersistence(postulacion),
    });

    return PostulacionMapper.toDomain(creada);
  }

  async buscarPorId(id: string): Promise<Postulacion | null> {
    const encontrada = await this.prisma.postulacion.findUnique({ where: { id } });

    return encontrada ? PostulacionMapper.toDomain(encontrada) : null;
  }

  async existePostulacion(vacanteId: string, postulanteId: string): Promise<boolean> {
    const encontrada = await this.prisma.postulacion.findUnique({
      where: { vacanteId_postulanteId: { vacanteId, postulanteId } },
      select: { id: true },
    });

    return encontrada !== null;
  }

  async listarPorPostulante(
    postulanteId: string,
    pagina: number,
    limite: number
  ): Promise<{ items: Postulacion[]; total: number }> {
    const where = { postulanteId };

    const [registros, total] = await Promise.all([
      this.prisma.postulacion.findMany({
        where,
        skip: (pagina - 1) * limite,
        take: limite,
      }),
      this.prisma.postulacion.count({ where }),
    ]);

    return { items: registros.map((registro) => PostulacionMapper.toDomain(registro)), total };
  }

  async listarPorPostulanteConVacante(
    postulanteId: string,
    pagina: number,
    limite: number
  ): Promise<{ items: PostulacionConVacanteResumen[]; total: number }> {
    const where = { postulanteId };

    const [registros, total] = await Promise.all([
      this.prisma.postulacion.findMany({
        where,
        skip: (pagina - 1) * limite,
        take: limite,
        include: {
          vacante: { select: { titulo: true, slug: true, ubicacion: true } },
        },
      }),
      this.prisma.postulacion.count({ where }),
    ]);

    return {
      items: registros.map((registro) => ({
        postulacion: PostulacionMapper.toDomain(registro),
        vacanteTitulo: registro.vacante.titulo,
        vacanteSlug: registro.vacante.slug,
        vacanteUbicacion: registro.vacante.ubicacion,
      })),
      total,
    };
  }

  async listarPorVacante(
    vacanteId: string,
    pagina: number,
    limite: number
  ): Promise<{ items: Postulacion[]; total: number }> {
    const where = { vacanteId };

    const [registros, total] = await Promise.all([
      this.prisma.postulacion.findMany({
        where,
        skip: (pagina - 1) * limite,
        take: limite,
      }),
      this.prisma.postulacion.count({ where }),
    ]);

    return { items: registros.map((registro) => PostulacionMapper.toDomain(registro)), total };
  }

  async actualizar(postulacion: Postulacion): Promise<Postulacion> {
    const { id, createdAt, updatedAt, ...data } = PostulacionMapper.toPersistence(postulacion);

    const actualizada = await this.prisma.postulacion.update({
      where: { id: postulacion.id },
      data,
    });

    return PostulacionMapper.toDomain(actualizada);
  }

  async contarTotalPorEstado(): Promise<Record<EstadoPostulacionEnum, number>> {
    const agrupado = await this.prisma.postulacion.groupBy({
      by: ["estado"],
      _count: { estado: true },
    });

    const conteoPorEstado = agrupado.reduce<Record<string, number>>((acumulado, grupo) => {
      acumulado[estadoPostulacionADominio(grupo.estado)] = grupo._count.estado;
      return acumulado;
    }, {});

    return TODOS_LOS_ESTADOS.reduce((resultado, estado) => {
      resultado[estado] = conteoPorEstado[estado] ?? 0;
      return resultado;
    }, {} as Record<EstadoPostulacionEnum, number>);
  }
}

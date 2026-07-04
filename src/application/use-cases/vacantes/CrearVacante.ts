import { randomUUID } from "crypto";
import { EstadoVacanteEnum, Vacante } from "../../../domain/entities/Vacante";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";
import { GenerarSlugUnico } from "./GenerarSlugUnico";

export interface CrearVacanteInput {
  titulo: string;
  descripcion: string;
  requisitos: string;
  ubicacion: string;
  area: string;
  salarioMin?: number | null;
  salarioMax?: number | null;
  reclutadorId: string;
}

export class CrearVacante {
  constructor(
    private readonly vacanteRepository: VacanteRepository,
    private readonly generarSlugUnico: GenerarSlugUnico
  ) {}

  async ejecutar(input: CrearVacanteInput): Promise<Vacante> {
    const slug = await this.generarSlugUnico.ejecutar(input.titulo);
    const ahora = new Date();

    const vacante = new Vacante({
      id: randomUUID(),
      titulo: input.titulo,
      slug,
      descripcion: input.descripcion,
      requisitos: input.requisitos,
      ubicacion: input.ubicacion,
      area: input.area,
      salarioMin: input.salarioMin ?? null,
      salarioMax: input.salarioMax ?? null,
      estado: EstadoVacanteEnum.BORRADOR,
      reclutadorId: input.reclutadorId,
      deletedAt: null,
      createdAt: ahora,
      updatedAt: ahora,
    });

    return this.vacanteRepository.crear(vacante);
  }
}

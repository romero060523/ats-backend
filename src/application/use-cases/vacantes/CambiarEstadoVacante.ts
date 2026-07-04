import { EstadoVacanteEnum, Vacante } from "../../../domain/entities/Vacante";
import { Usuario } from "../../../domain/entities/Usuario";
import { RecursoNoEncontradoError } from "../../../domain/errors/RecursoNoEncontradoError";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";
import { VacantePolicy } from "../../policies/VacantePolicy";

export interface CambiarEstadoVacanteInput {
  id: string;
  usuario: Usuario;
  nuevoEstado: EstadoVacanteEnum;
}

export class CambiarEstadoVacante {
  constructor(private readonly vacanteRepository: VacanteRepository) {}

  async ejecutar(input: CambiarEstadoVacanteInput): Promise<Vacante> {
    const vacante = await this.vacanteRepository.buscarPorId(input.id);

    if (!vacante || vacante.estaEliminada()) {
      throw new RecursoNoEncontradoError("Vacante", input.id);
    }

    VacantePolicy.verificarAcceso(input.usuario, vacante);

    const vacanteActualizada = new Vacante({
      id: vacante.id,
      titulo: vacante.titulo,
      slug: vacante.slug,
      descripcion: vacante.descripcion,
      requisitos: vacante.requisitos,
      ubicacion: vacante.ubicacion,
      area: vacante.area,
      salarioMin: vacante.salarioMin,
      salarioMax: vacante.salarioMax,
      estado: input.nuevoEstado,
      reclutadorId: vacante.reclutadorId,
      deletedAt: vacante.deletedAt,
      createdAt: vacante.createdAt,
      updatedAt: vacante.updatedAt,
    });

    return this.vacanteRepository.actualizar(vacanteActualizada);
  }
}

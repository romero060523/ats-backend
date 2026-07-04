import { Usuario } from "../../../domain/entities/Usuario";
import { Vacante } from "../../../domain/entities/Vacante";
import { RecursoNoEncontradoError } from "../../../domain/errors/RecursoNoEncontradoError";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";
import { VacantePolicy } from "../../policies/VacantePolicy";

export interface EliminarVacanteInput {
  id: string;
  usuario: Usuario;
}

export class EliminarVacante {
  constructor(private readonly vacanteRepository: VacanteRepository) {}

  async ejecutar(input: EliminarVacanteInput): Promise<Vacante> {
    const vacante = await this.vacanteRepository.buscarPorId(input.id);

    if (!vacante || vacante.estaEliminada()) {
      throw new RecursoNoEncontradoError("Vacante", input.id);
    }

    VacantePolicy.verificarAcceso(input.usuario, vacante);

    const vacanteEliminada = new Vacante({
      id: vacante.id,
      titulo: vacante.titulo,
      slug: vacante.slug,
      descripcion: vacante.descripcion,
      requisitos: vacante.requisitos,
      ubicacion: vacante.ubicacion,
      area: vacante.area,
      salarioMin: vacante.salarioMin,
      salarioMax: vacante.salarioMax,
      estado: vacante.estado,
      reclutadorId: vacante.reclutadorId,
      deletedAt: new Date(),
      createdAt: vacante.createdAt,
      updatedAt: vacante.updatedAt,
    });

    return this.vacanteRepository.actualizar(vacanteEliminada);
  }
}

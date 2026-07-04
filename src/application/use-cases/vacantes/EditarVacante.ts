import { Usuario } from "../../../domain/entities/Usuario";
import { Vacante } from "../../../domain/entities/Vacante";
import { RecursoNoEncontradoError } from "../../../domain/errors/RecursoNoEncontradoError";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";
import { VacantePolicy } from "../../policies/VacantePolicy";

export interface CambiosVacante {
  titulo?: string;
  descripcion?: string;
  requisitos?: string;
  ubicacion?: string;
  area?: string;
  salarioMin?: number | null;
  salarioMax?: number | null;
}

export interface EditarVacanteInput {
  id: string;
  usuario: Usuario;
  cambios: CambiosVacante;
}

export class EditarVacante {
  constructor(private readonly vacanteRepository: VacanteRepository) {}

  async ejecutar(input: EditarVacanteInput): Promise<Vacante> {
    const vacante = await this.vacanteRepository.buscarPorId(input.id);

    if (!vacante || vacante.estaEliminada()) {
      throw new RecursoNoEncontradoError("Vacante", input.id);
    }

    VacantePolicy.verificarAcceso(input.usuario, vacante);

    const vacanteActualizada = new Vacante({
      id: vacante.id,
      titulo: input.cambios.titulo ?? vacante.titulo,
      slug: vacante.slug,
      descripcion: input.cambios.descripcion ?? vacante.descripcion,
      requisitos: input.cambios.requisitos ?? vacante.requisitos,
      ubicacion: input.cambios.ubicacion ?? vacante.ubicacion,
      area: input.cambios.area ?? vacante.area,
      salarioMin:
        input.cambios.salarioMin !== undefined ? input.cambios.salarioMin : vacante.salarioMin,
      salarioMax:
        input.cambios.salarioMax !== undefined ? input.cambios.salarioMax : vacante.salarioMax,
      estado: vacante.estado,
      reclutadorId: vacante.reclutadorId,
      deletedAt: vacante.deletedAt,
      createdAt: vacante.createdAt,
      updatedAt: vacante.updatedAt,
    });

    return this.vacanteRepository.actualizar(vacanteActualizada);
  }
}

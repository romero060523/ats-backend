import { Usuario } from "../../../domain/entities/Usuario";
import { Vacante } from "../../../domain/entities/Vacante";
import { RecursoNoEncontradoError } from "../../../domain/errors/RecursoNoEncontradoError";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";
import { VacantePolicy } from "../../policies/VacantePolicy";

export interface ObtenerVacantePanelPorIdInput {
  id: string;
  usuario: Usuario;
}

export class ObtenerVacantePanelPorId {
  constructor(private readonly vacanteRepository: VacanteRepository) {}

  async ejecutar(input: ObtenerVacantePanelPorIdInput): Promise<Vacante> {
    const vacante = await this.vacanteRepository.buscarPorId(input.id);

    if (!vacante || vacante.estaEliminada()) {
      throw new RecursoNoEncontradoError("Vacante", input.id);
    }

    VacantePolicy.verificarAcceso(input.usuario, vacante);

    return vacante;
  }
}

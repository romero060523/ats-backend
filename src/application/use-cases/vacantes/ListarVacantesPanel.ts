import { Usuario } from "../../../domain/entities/Usuario";
import { Vacante } from "../../../domain/entities/Vacante";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";

export interface ListarVacantesPanelInput {
  usuario: Usuario;
  pagina: number;
  limite: number;
}

export class ListarVacantesPanel {
  constructor(private readonly vacanteRepository: VacanteRepository) {}

  async ejecutar(input: ListarVacantesPanelInput): Promise<{ items: Vacante[]; total: number }> {
    const filtro = input.usuario.esAdministrador() ? {} : { reclutadorId: input.usuario.id };

    return this.vacanteRepository.listarPanel(filtro, input.pagina, input.limite);
  }
}

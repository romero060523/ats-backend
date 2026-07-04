import { Vacante } from "../../../domain/entities/Vacante";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";

export interface ListarVacantesPublicasInput {
  filtro: { area?: string; ubicacion?: string };
  pagina: number;
  limite: number;
}

export class ListarVacantesPublicas {
  constructor(private readonly vacanteRepository: VacanteRepository) {}

  async ejecutar(input: ListarVacantesPublicasInput): Promise<{ items: Vacante[]; total: number }> {
    return this.vacanteRepository.listarPublicas(input.filtro, input.pagina, input.limite);
  }
}

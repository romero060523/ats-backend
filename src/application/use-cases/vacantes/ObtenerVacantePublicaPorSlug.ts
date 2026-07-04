import { Vacante } from "../../../domain/entities/Vacante";
import { RecursoNoEncontradoError } from "../../../domain/errors/RecursoNoEncontradoError";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";

export interface ObtenerVacantePublicaPorSlugInput {
  slug: string;
}

export class ObtenerVacantePublicaPorSlug {
  constructor(private readonly vacanteRepository: VacanteRepository) {}

  async ejecutar(input: ObtenerVacantePublicaPorSlugInput): Promise<Vacante> {
    const vacante = await this.vacanteRepository.buscarPorSlug(input.slug);

    if (!vacante || !vacante.estaPublicada()) {
      throw new RecursoNoEncontradoError("Vacante", input.slug);
    }

    return vacante;
  }
}

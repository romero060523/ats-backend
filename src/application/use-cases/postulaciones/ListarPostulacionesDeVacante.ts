import { Usuario } from "../../../domain/entities/Usuario";
import { Postulacion } from "../../../domain/entities/Postulacion";
import { RecursoNoEncontradoError } from "../../../domain/errors/RecursoNoEncontradoError";
import { PostulacionRepository } from "../../ports/repositories/PostulacionRepository";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";
import { VacantePolicy } from "../../policies/VacantePolicy";

export interface ListarPostulacionesDeVacanteInput {
  vacanteId: string;
  usuario: Usuario;
  pagina: number;
  limite: number;
}

export class ListarPostulacionesDeVacante {
  constructor(
    private readonly postulacionRepository: PostulacionRepository,
    private readonly vacanteRepository: VacanteRepository
  ) {}

  async ejecutar(
    input: ListarPostulacionesDeVacanteInput
  ): Promise<{ items: Postulacion[]; total: number }> {
    const vacante = await this.vacanteRepository.buscarPorId(input.vacanteId);
    if (!vacante || vacante.estaEliminada()) {
      throw new RecursoNoEncontradoError("Vacante", input.vacanteId);
    }

    VacantePolicy.verificarAcceso(input.usuario, vacante);

    return this.postulacionRepository.listarPorVacante(input.vacanteId, input.pagina, input.limite);
  }
}

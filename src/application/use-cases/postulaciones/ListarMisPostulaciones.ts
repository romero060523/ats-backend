import {
  PostulacionRepository,
  PostulacionConVacanteResumen,
} from "../../ports/repositories/PostulacionRepository";

export interface ListarMisPostulacionesInput {
  postulanteId: string;
  pagina: number;
  limite: number;
}

export class ListarMisPostulaciones {
  constructor(private readonly postulacionRepository: PostulacionRepository) {}

  async ejecutar(
    input: ListarMisPostulacionesInput
  ): Promise<{ items: PostulacionConVacanteResumen[]; total: number }> {
    return this.postulacionRepository.listarPorPostulanteConVacante(
      input.postulanteId,
      input.pagina,
      input.limite
    );
  }
}

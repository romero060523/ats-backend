import { Postulacion } from "../../../domain/entities/Postulacion";
import { PostulacionRepository } from "../../ports/repositories/PostulacionRepository";

export interface ListarMisPostulacionesInput {
  postulanteId: string;
  pagina: number;
  limite: number;
}

export class ListarMisPostulaciones {
  constructor(private readonly postulacionRepository: PostulacionRepository) {}

  async ejecutar(
    input: ListarMisPostulacionesInput
  ): Promise<{ items: Postulacion[]; total: number }> {
    return this.postulacionRepository.listarPorPostulante(
      input.postulanteId,
      input.pagina,
      input.limite
    );
  }
}

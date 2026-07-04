import { Usuario } from "../../../domain/entities/Usuario";
import { HistorialEstadoPostulacion } from "../../../domain/entities/HistorialEstadoPostulacion";
import { RecursoNoEncontradoError } from "../../../domain/errors/RecursoNoEncontradoError";
import { AccionNoPermitidaError } from "../../../domain/errors/AccionNoPermitidaError";
import { PostulacionRepository } from "../../ports/repositories/PostulacionRepository";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";
import { HistorialRepository } from "../../ports/repositories/HistorialRepository";

export interface ObtenerHistorialPostulacionInput {
  postulacionId: string;
  usuario: Usuario;
}

export class ObtenerHistorialPostulacion {
  constructor(
    private readonly postulacionRepository: PostulacionRepository,
    private readonly vacanteRepository: VacanteRepository,
    private readonly historialRepository: HistorialRepository
  ) {}

  async ejecutar(
    input: ObtenerHistorialPostulacionInput
  ): Promise<HistorialEstadoPostulacion[]> {
    const postulacion = await this.postulacionRepository.buscarPorId(input.postulacionId);
    if (!postulacion) {
      throw new RecursoNoEncontradoError("Postulacion", input.postulacionId);
    }

    const vacante = await this.vacanteRepository.buscarPorId(postulacion.vacanteId);
    if (!vacante) {
      throw new RecursoNoEncontradoError("Vacante", postulacion.vacanteId);
    }

    const tieneAcceso =
      input.usuario.esAdministrador() ||
      postulacion.postulanteId === input.usuario.id ||
      vacante.perteneceA(input.usuario.id);

    if (!tieneAcceso) {
      throw new AccionNoPermitidaError("No tienes acceso al historial de esta postulación");
    }

    const historial = await this.historialRepository.listarPorPostulacion(input.postulacionId);

    return [...historial].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

import { randomUUID } from "crypto";
import { Postulacion } from "../../../domain/entities/Postulacion";
import { EstadoPostulacionEnum } from "../../../domain/value-objects/EstadoPostulacion";
import { AccionNoPermitidaError } from "../../../domain/errors/AccionNoPermitidaError";
import { RecursoDuplicadoError } from "../../../domain/errors/RecursoDuplicadoError";
import { RecursoNoEncontradoError } from "../../../domain/errors/RecursoNoEncontradoError";
import { HistorialEstadoPostulacion } from "../../../domain/entities/HistorialEstadoPostulacion";
import { PostulacionRepository } from "../../ports/repositories/PostulacionRepository";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";
import { TransactionManager } from "../../ports/services/TransactionManager";

export interface CrearPostulacionInput {
  vacanteId: string;
  postulanteId: string;
  mensajePostulacion?: string | null;
}

export class CrearPostulacion {
  constructor(
    private readonly postulacionRepository: PostulacionRepository,
    private readonly vacanteRepository: VacanteRepository,
    private readonly transactionManager: TransactionManager
  ) {}

  async ejecutar(input: CrearPostulacionInput): Promise<Postulacion> {
    const vacante = await this.vacanteRepository.buscarPorId(input.vacanteId);
    if (!vacante || vacante.estaEliminada()) {
      throw new RecursoNoEncontradoError("Vacante", input.vacanteId);
    }

    if (!vacante.estaPublicada()) {
      throw new AccionNoPermitidaError("Esta vacante no admite postulaciones");
    }

    const yaPostulo = await this.postulacionRepository.existePostulacion(
      input.vacanteId,
      input.postulanteId
    );
    if (yaPostulo) {
      throw new RecursoDuplicadoError("Ya existe una postulación de este usuario a esta vacante");
    }

    const ahora = new Date();

    const postulacion = new Postulacion({
      id: randomUUID(),
      vacanteId: input.vacanteId,
      postulanteId: input.postulanteId,
      estado: EstadoPostulacionEnum.RECIBIDA,
      mensajePostulacion: input.mensajePostulacion ?? null,
      createdAt: ahora,
      updatedAt: ahora,
    });

    return this.transactionManager.ejecutar(async (uow) => {
      const postulacionCreada = await uow.postulacionRepository.crear(postulacion);

      const historial = new HistorialEstadoPostulacion({
        id: randomUUID(),
        postulacionId: postulacionCreada.id,
        estadoAnterior: null,
        estadoNuevo: EstadoPostulacionEnum.RECIBIDA,
        cambiadoPorId: input.postulanteId,
        comentario: null,
        createdAt: ahora,
      });

      await uow.historialRepository.crear(historial);

      return postulacionCreada;
    });
  }
}

import { randomUUID } from "crypto";
import { Usuario } from "../../../domain/entities/Usuario";
import { Postulacion } from "../../../domain/entities/Postulacion";
import { HistorialEstadoPostulacion } from "../../../domain/entities/HistorialEstadoPostulacion";
import { EstadoPostulacionEnum } from "../../../domain/value-objects/EstadoPostulacion";
import { RecursoNoEncontradoError } from "../../../domain/errors/RecursoNoEncontradoError";
import { PostulacionRepository } from "../../ports/repositories/PostulacionRepository";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";
import { TransactionManager } from "../../ports/services/TransactionManager";
import { VacantePolicy } from "../../policies/VacantePolicy";

export interface TransicionarEstadoPostulacionInput {
  postulacionId: string;
  usuario: Usuario;
  nuevoEstado: EstadoPostulacionEnum;
  comentario?: string | null;
}

export class TransicionarEstadoPostulacion {
  constructor(
    private readonly postulacionRepository: PostulacionRepository,
    private readonly vacanteRepository: VacanteRepository,
    private readonly transactionManager: TransactionManager
  ) {}

  async ejecutar(input: TransicionarEstadoPostulacionInput): Promise<Postulacion> {
    const postulacion = await this.postulacionRepository.buscarPorId(input.postulacionId);
    if (!postulacion) {
      throw new RecursoNoEncontradoError("Postulacion", input.postulacionId);
    }

    const vacante = await this.vacanteRepository.buscarPorId(postulacion.vacanteId);
    if (!vacante) {
      throw new RecursoNoEncontradoError("Vacante", postulacion.vacanteId);
    }

    VacantePolicy.verificarAcceso(input.usuario, vacante);

    const estadoAnterior = postulacion.estado;

    postulacion.transicionarA(input.nuevoEstado);

    const resultado = await this.transactionManager.ejecutar(async (uow) => {
      const postulacionActualizada = await uow.postulacionRepository.actualizar(postulacion);

      const historial = new HistorialEstadoPostulacion({
        id: randomUUID(),
        postulacionId: postulacionActualizada.id,
        estadoAnterior,
        estadoNuevo: input.nuevoEstado,
        cambiadoPorId: input.usuario.id,
        comentario: input.comentario ?? null,
        createdAt: new Date(),
      });

      await uow.historialRepository.crear(historial);

      return postulacionActualizada;
    });

    return resultado;
  }
}

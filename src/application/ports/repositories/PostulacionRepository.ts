import { Postulacion } from "../../../domain/entities/Postulacion";
import { EstadoPostulacionEnum } from "../../../domain/value-objects/EstadoPostulacion";

export interface PostulacionRepository {
  crear(postulacion: Postulacion): Promise<Postulacion>;
  buscarPorId(id: string): Promise<Postulacion | null>;
  existePostulacion(vacanteId: string, postulanteId: string): Promise<boolean>;
  listarPorPostulante(
    postulanteId: string,
    pagina: number,
    limite: number
  ): Promise<{ items: Postulacion[]; total: number }>;
  listarPorVacante(
    vacanteId: string,
    pagina: number,
    limite: number
  ): Promise<{ items: Postulacion[]; total: number }>;
  actualizar(postulacion: Postulacion): Promise<Postulacion>;
  contarTotalPorEstado(): Promise<Record<EstadoPostulacionEnum, number>>;
}

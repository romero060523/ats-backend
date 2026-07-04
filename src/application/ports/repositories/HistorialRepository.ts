import { HistorialEstadoPostulacion } from "../../../domain/entities/HistorialEstadoPostulacion";

export interface HistorialRepository {
  crear(historial: HistorialEstadoPostulacion): Promise<HistorialEstadoPostulacion>;
  listarPorPostulacion(postulacionId: string): Promise<HistorialEstadoPostulacion[]>;
}

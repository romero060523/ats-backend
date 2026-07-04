import { EstadoPostulacionEnum } from "../../../domain/value-objects/EstadoPostulacion";
import { VacanteRepository } from "../../ports/repositories/VacanteRepository";
import { PostulacionRepository } from "../../ports/repositories/PostulacionRepository";

export interface MetricasGlobales {
  totalVacantesActivas: number;
  totalPostulaciones: number;
  distribucionPorEstado: Record<EstadoPostulacionEnum, number>;
}

export class ObtenerMetricasGlobales {
  constructor(
    private readonly vacanteRepository: VacanteRepository,
    private readonly postulacionRepository: PostulacionRepository
  ) {}

  async ejecutar(): Promise<MetricasGlobales> {
    // NOTA para Infrastructure: listarPanel({}) debe excluir por defecto las
    // vacantes con deletedAt != null; un admin no debería verlas en las métricas.
    const [vacantes, distribucionPorEstado] = await Promise.all([
      this.vacanteRepository.listarPanel({}, 1, 1),
      this.postulacionRepository.contarTotalPorEstado(),
    ]);

    const totalPostulaciones = Object.values(distribucionPorEstado).reduce(
      (total, cantidad) => total + cantidad,
      0
    );

    return {
      totalVacantesActivas: vacantes.total,
      totalPostulaciones,
      distribucionPorEstado,
    };
  }
}

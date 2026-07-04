import { Vacante } from "../../../domain/entities/Vacante";

export interface VacanteRepository {
  crear(vacante: Vacante): Promise<Vacante>;
  buscarPorId(id: string): Promise<Vacante | null>;
  buscarPorSlug(slug: string): Promise<Vacante | null>;
  existeSlug(slug: string): Promise<boolean>;
  listarPublicas(
    filtro: { area?: string; ubicacion?: string },
    pagina: number,
    limite: number
  ): Promise<{ items: Vacante[]; total: number }>;
  listarPanel(
    filtro: { reclutadorId?: string },
    pagina: number,
    limite: number
  ): Promise<{ items: Vacante[]; total: number }>;
  actualizar(vacante: Vacante): Promise<Vacante>;
}

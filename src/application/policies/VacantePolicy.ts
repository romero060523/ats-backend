import { AccionNoPermitidaError } from "../../domain/errors/AccionNoPermitidaError";
import { Usuario } from "../../domain/entities/Usuario";
import { Vacante } from "../../domain/entities/Vacante";

export class VacantePolicy {
  static verificarAcceso(usuario: Usuario, vacante: Vacante): void {
    if (usuario.esAdministrador()) {
      return;
    }

    if (vacante.perteneceA(usuario.id)) {
      return;
    }

    throw new AccionNoPermitidaError("No tienes acceso a esta vacante");
  }
}

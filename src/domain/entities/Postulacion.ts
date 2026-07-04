import { TransicionEstadoInvalidaError } from "../errors/TransicionEstadoInvalidaError";
import { EstadoPostulacion, EstadoPostulacionEnum } from "../value-objects/EstadoPostulacion";

export interface PostulacionProps {
  id: string;
  vacanteId: string;
  postulanteId: string;
  estado: EstadoPostulacionEnum;
  mensajePostulacion: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Postulacion {
  readonly id: string;
  readonly vacanteId: string;
  readonly postulanteId: string;
  private _estado: EstadoPostulacionEnum;
  readonly mensajePostulacion: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: PostulacionProps) {
    this.id = props.id;
    this.vacanteId = props.vacanteId;
    this.postulanteId = props.postulanteId;
    this._estado = props.estado;
    this.mensajePostulacion = props.mensajePostulacion;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  get estado(): EstadoPostulacionEnum {
    return this._estado;
  }

  // Muta _estado in-place (a diferencia de Vacante/Usuario, inmutables) porque esto es una transición de dominio con reglas propias, no una simple edición de datos.
  transicionarA(nuevoEstado: EstadoPostulacionEnum): void {
    if (!EstadoPostulacion.puedeTransicionarA(this._estado, nuevoEstado)) {
      throw new TransicionEstadoInvalidaError(this._estado, nuevoEstado);
    }

    this._estado = nuevoEstado;
  }
}

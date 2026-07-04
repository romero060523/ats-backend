import { EstadoPostulacionEnum } from "../value-objects/EstadoPostulacion";

export interface HistorialEstadoPostulacionProps {
  id: string;
  postulacionId: string;
  estadoAnterior: EstadoPostulacionEnum | null;
  estadoNuevo: EstadoPostulacionEnum;
  cambiadoPorId: string;
  comentario: string | null;
  createdAt: Date;
}

export class HistorialEstadoPostulacion {
  readonly id: string;
  readonly postulacionId: string;
  readonly estadoAnterior: EstadoPostulacionEnum | null;
  readonly estadoNuevo: EstadoPostulacionEnum;
  readonly cambiadoPorId: string;
  readonly comentario: string | null;
  readonly createdAt: Date;

  constructor(props: HistorialEstadoPostulacionProps) {
    this.id = props.id;
    this.postulacionId = props.postulacionId;
    this.estadoAnterior = props.estadoAnterior;
    this.estadoNuevo = props.estadoNuevo;
    this.cambiadoPorId = props.cambiadoPorId;
    this.comentario = props.comentario;
    this.createdAt = props.createdAt;
  }
}

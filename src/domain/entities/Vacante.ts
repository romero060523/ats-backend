export enum EstadoVacanteEnum {
  BORRADOR = "BORRADOR",
  PUBLICADA = "PUBLICADA",
  CERRADA = "CERRADA",
}

export interface VacanteProps {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  requisitos: string;
  ubicacion: string;
  area: string;
  salarioMin: number | null;
  salarioMax: number | null;
  estado: EstadoVacanteEnum;
  reclutadorId: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Vacante {
  readonly id: string;
  readonly titulo: string;
  readonly slug: string;
  readonly descripcion: string;
  readonly requisitos: string;
  readonly ubicacion: string;
  readonly area: string;
  readonly salarioMin: number | null;
  readonly salarioMax: number | null;
  readonly estado: EstadoVacanteEnum;
  readonly reclutadorId: string;
  readonly deletedAt: Date | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: VacanteProps) {
    this.id = props.id;
    this.titulo = props.titulo;
    this.slug = props.slug;
    this.descripcion = props.descripcion;
    this.requisitos = props.requisitos;
    this.ubicacion = props.ubicacion;
    this.area = props.area;
    this.salarioMin = props.salarioMin;
    this.salarioMax = props.salarioMax;
    this.estado = props.estado;
    this.reclutadorId = props.reclutadorId;
    this.deletedAt = props.deletedAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  estaPublicada(): boolean {
    return this.estado === EstadoVacanteEnum.PUBLICADA;
  }

  perteneceA(usuarioId: string): boolean {
    return this.reclutadorId === usuarioId;
  }

  estaEliminada(): boolean {
    return this.deletedAt !== null;
  }
}

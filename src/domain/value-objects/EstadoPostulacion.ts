export enum EstadoPostulacionEnum {
  RECIBIDA = "RECIBIDA",
  EN_REVISION = "EN_REVISION",
  ENTREVISTA = "ENTREVISTA",
  ACEPTADA = "ACEPTADA",
  RECHAZADA = "RECHAZADA",
}

const TRANSICIONES_VALIDAS: Record<EstadoPostulacionEnum, EstadoPostulacionEnum[]> = {
  [EstadoPostulacionEnum.RECIBIDA]: [
    EstadoPostulacionEnum.EN_REVISION,
    EstadoPostulacionEnum.RECHAZADA,
  ],
  [EstadoPostulacionEnum.EN_REVISION]: [
    EstadoPostulacionEnum.ENTREVISTA,
    EstadoPostulacionEnum.RECHAZADA,
  ],
  [EstadoPostulacionEnum.ENTREVISTA]: [
    EstadoPostulacionEnum.ACEPTADA,
    EstadoPostulacionEnum.RECHAZADA,
  ],
  [EstadoPostulacionEnum.ACEPTADA]: [],
  [EstadoPostulacionEnum.RECHAZADA]: [],
};

export class EstadoPostulacion {
  static puedeTransicionarA(
    estadoActual: EstadoPostulacionEnum,
    estadoDestino: EstadoPostulacionEnum
  ): boolean {
    return TRANSICIONES_VALIDAS[estadoActual].includes(estadoDestino);
  }
}

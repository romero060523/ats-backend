export enum RolUsuarioEnum {
  ADMINISTRADOR = "ADMINISTRADOR",
  RECLUTADOR = "RECLUTADOR",
  POSTULANTE = "POSTULANTE",
}

export interface UsuarioProps {
  id: string;
  nombre: string;
  email: string;
  passwordHash: string;
  rol: RolUsuarioEnum;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Usuario {
  readonly id: string;
  readonly nombre: string;
  readonly email: string;
  private readonly _passwordHash: string;
  readonly rol: RolUsuarioEnum;
  readonly activo: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: UsuarioProps) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.email = props.email;
    this._passwordHash = props.passwordHash;
    this.rol = props.rol;
    this.activo = props.activo;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  obtenerPasswordHash(): string {
    return this._passwordHash;
  }

  esAdministrador(): boolean {
    return this.rol === RolUsuarioEnum.ADMINISTRADOR;
  }

  esReclutador(): boolean {
    return this.rol === RolUsuarioEnum.RECLUTADOR;
  }

  esPostulante(): boolean {
    return this.rol === RolUsuarioEnum.POSTULANTE;
  }
}

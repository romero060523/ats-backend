import { Usuario } from "@domain/entities/Usuario";
import { Postulacion } from "@domain/entities/Postulacion";

export function serializarUsuario(u: Usuario) {
  return {
    id: u.id,
    nombre: u.nombre,
    email: u.email,
    rol: u.rol,
    activo: u.activo,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}

export function serializarPostulacion(p: Postulacion) {
  return {
    id: p.id,
    vacanteId: p.vacanteId,
    postulanteId: p.postulanteId,
    estado: p.estado,
    mensajePostulacion: p.mensajePostulacion,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

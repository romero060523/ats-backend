import { prisma } from "../infrastructure/database/prisma/client";
import { PrismaUsuarioRepository } from "../infrastructure/database/prisma/repositories/PrismaUsuarioRepository";
import { PrismaVacanteRepository } from "../infrastructure/database/prisma/repositories/PrismaVacanteRepository";
import { PrismaPostulacionRepository } from "../infrastructure/database/prisma/repositories/PrismaPostulacionRepository";
import { PrismaHistorialRepository } from "../infrastructure/database/prisma/repositories/PrismaHistorialRepository";
import { PrismaTransactionManager } from "../infrastructure/database/prisma/PrismaTransactionManager";
import { BcryptPasswordHasher } from "../infrastructure/security/BcryptPasswordHasher";
import { JwtTokenService } from "../infrastructure/security/JwtTokenService";

import { RegistrarPostulante } from "../application/use-cases/auth/RegistrarPostulante";
import { IniciarSesion } from "../application/use-cases/auth/IniciarSesion";
import { ObtenerUsuarioActual } from "../application/use-cases/auth/ObtenerUsuarioActual";

import { CrearReclutador } from "../application/use-cases/usuarios/CrearReclutador";
import { ListarUsuarios } from "../application/use-cases/usuarios/ListarUsuarios";
import { CambiarEstadoActivoUsuario } from "../application/use-cases/usuarios/CambiarEstadoActivoUsuario";

import { GenerarSlugUnico } from "../application/use-cases/vacantes/GenerarSlugUnico";
import { CrearVacante } from "../application/use-cases/vacantes/CrearVacante";
import { ListarVacantesPublicas } from "../application/use-cases/vacantes/ListarVacantesPublicas";
import { ObtenerVacantePublicaPorSlug } from "../application/use-cases/vacantes/ObtenerVacantePublicaPorSlug";
import { ListarVacantesPanel } from "../application/use-cases/vacantes/ListarVacantesPanel";
import { ObtenerVacantePanelPorId } from "../application/use-cases/vacantes/ObtenerVacantePanelPorId";
import { EditarVacante } from "../application/use-cases/vacantes/EditarVacante";
import { CambiarEstadoVacante } from "../application/use-cases/vacantes/CambiarEstadoVacante";
import { EliminarVacante } from "../application/use-cases/vacantes/EliminarVacante";

import { CrearPostulacion } from "../application/use-cases/postulaciones/CrearPostulacion";
import { ListarMisPostulaciones } from "../application/use-cases/postulaciones/ListarMisPostulaciones";
import { ListarPostulacionesDeVacante } from "../application/use-cases/postulaciones/ListarPostulacionesDeVacante";
import { TransicionarEstadoPostulacion } from "../application/use-cases/postulaciones/TransicionarEstadoPostulacion";
import { ObtenerHistorialPostulacion } from "../application/use-cases/postulaciones/ObtenerHistorialPostulacion";

import { ObtenerMetricasGlobales } from "../application/use-cases/metricas/ObtenerMetricasGlobales";

// Repositorios (instancia no transaccional, ligada al PrismaClient global).
const usuarioRepository = new PrismaUsuarioRepository(prisma);
const vacanteRepository = new PrismaVacanteRepository(prisma);
const postulacionRepository = new PrismaPostulacionRepository(prisma);
const historialRepository = new PrismaHistorialRepository(prisma);

// Servicios de infraestructura.
const transactionManager = new PrismaTransactionManager(prisma);
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();

// Casos de uso — auth/
export const registrarPostulante = new RegistrarPostulante(usuarioRepository, passwordHasher);
export const iniciarSesion = new IniciarSesion(usuarioRepository, passwordHasher, tokenService);
export const obtenerUsuarioActual = new ObtenerUsuarioActual(usuarioRepository);

// Casos de uso — usuarios/
export const crearReclutador = new CrearReclutador(usuarioRepository, passwordHasher);
export const listarUsuarios = new ListarUsuarios(usuarioRepository);
export const cambiarEstadoActivoUsuario = new CambiarEstadoActivoUsuario(usuarioRepository);

// Casos de uso — vacantes/
const generarSlugUnico = new GenerarSlugUnico(vacanteRepository);
export const crearVacante = new CrearVacante(vacanteRepository, generarSlugUnico);
export const listarVacantesPublicas = new ListarVacantesPublicas(vacanteRepository);
export const obtenerVacantePublicaPorSlug = new ObtenerVacantePublicaPorSlug(vacanteRepository);
export const listarVacantesPanel = new ListarVacantesPanel(vacanteRepository);
export const obtenerVacantePanelPorId = new ObtenerVacantePanelPorId(vacanteRepository);
export const editarVacante = new EditarVacante(vacanteRepository);
export const cambiarEstadoVacante = new CambiarEstadoVacante(vacanteRepository);
export const eliminarVacante = new EliminarVacante(vacanteRepository);

// Casos de uso — postulaciones/
export const crearPostulacion = new CrearPostulacion(
  postulacionRepository,
  vacanteRepository,
  transactionManager
);
export const listarMisPostulaciones = new ListarMisPostulaciones(postulacionRepository);
export const listarPostulacionesDeVacante = new ListarPostulacionesDeVacante(
  postulacionRepository,
  vacanteRepository
);
export const transicionarEstadoPostulacion = new TransicionarEstadoPostulacion(
  postulacionRepository,
  vacanteRepository,
  transactionManager
);
export const obtenerHistorialPostulacion = new ObtenerHistorialPostulacion(
  postulacionRepository,
  vacanteRepository,
  historialRepository
);

// Casos de uso — metricas/
export const obtenerMetricasGlobales = new ObtenerMetricasGlobales(
  vacanteRepository,
  postulacionRepository
);

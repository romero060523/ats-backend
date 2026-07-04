import { PostulacionRepository } from "../repositories/PostulacionRepository";
import { HistorialRepository } from "../repositories/HistorialRepository";

export interface UnitOfWork {
  postulacionRepository: PostulacionRepository;
  historialRepository: HistorialRepository;
}

export interface TransactionManager {
  ejecutar<T>(trabajo: (uow: UnitOfWork) => Promise<T>): Promise<T>;
}

import { PrismaClient } from "@prisma/client";
import {
  TransactionManager,
  UnitOfWork,
} from "../../../application/ports/services/TransactionManager";
import { PrismaPostulacionRepository } from "./repositories/PrismaPostulacionRepository";
import { PrismaHistorialRepository } from "./repositories/PrismaHistorialRepository";

export class PrismaTransactionManager implements TransactionManager {
  constructor(private readonly prisma: PrismaClient) {}

  async ejecutar<T>(trabajo: (uow: UnitOfWork) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      const uow: UnitOfWork = {
        postulacionRepository: new PrismaPostulacionRepository(tx),
        historialRepository: new PrismaHistorialRepository(tx),
      };

      return trabajo(uow);
    });
  }
}

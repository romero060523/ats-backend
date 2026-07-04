-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ADMINISTRADOR', 'RECLUTADOR', 'POSTULANTE');

-- CreateEnum
CREATE TYPE "EstadoVacante" AS ENUM ('BORRADOR', 'PUBLICADA', 'CERRADA');

-- CreateEnum
CREATE TYPE "EstadoPostulacion" AS ENUM ('RECIBIDA', 'EN_REVISION', 'ENTREVISTA', 'ACEPTADA', 'RECHAZADA');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL DEFAULT 'POSTULANTE',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacantes" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "requisitos" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "salarioMin" DECIMAL(10,2),
    "salarioMax" DECIMAL(10,2),
    "estado" "EstadoVacante" NOT NULL DEFAULT 'BORRADOR',
    "reclutadorId" UUID NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vacantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postulaciones" (
    "id" UUID NOT NULL,
    "vacanteId" UUID NOT NULL,
    "postulanteId" UUID NOT NULL,
    "estado" "EstadoPostulacion" NOT NULL DEFAULT 'RECIBIDA',
    "mensajePostulacion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "postulaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial_estado_postulacion" (
    "id" UUID NOT NULL,
    "postulacionId" UUID NOT NULL,
    "estadoAnterior" "EstadoPostulacion",
    "estadoNuevo" "EstadoPostulacion" NOT NULL,
    "cambiadoPorId" UUID NOT NULL,
    "comentario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historial_estado_postulacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vacantes_slug_key" ON "vacantes"("slug");

-- CreateIndex
CREATE INDEX "vacantes_estado_idx" ON "vacantes"("estado");

-- CreateIndex
CREATE INDEX "vacantes_reclutadorId_idx" ON "vacantes"("reclutadorId");

-- CreateIndex
CREATE INDEX "postulaciones_postulanteId_idx" ON "postulaciones"("postulanteId");

-- CreateIndex
CREATE INDEX "postulaciones_vacanteId_idx" ON "postulaciones"("vacanteId");

-- CreateIndex
CREATE UNIQUE INDEX "postulaciones_vacanteId_postulanteId_key" ON "postulaciones"("vacanteId", "postulanteId");

-- CreateIndex
CREATE INDEX "historial_estado_postulacion_postulacionId_idx" ON "historial_estado_postulacion"("postulacionId");

-- AddForeignKey
ALTER TABLE "vacantes" ADD CONSTRAINT "vacantes_reclutadorId_fkey" FOREIGN KEY ("reclutadorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postulaciones" ADD CONSTRAINT "postulaciones_vacanteId_fkey" FOREIGN KEY ("vacanteId") REFERENCES "vacantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postulaciones" ADD CONSTRAINT "postulaciones_postulanteId_fkey" FOREIGN KEY ("postulanteId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_estado_postulacion" ADD CONSTRAINT "historial_estado_postulacion_postulacionId_fkey" FOREIGN KEY ("postulacionId") REFERENCES "postulaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_estado_postulacion" ADD CONSTRAINT "historial_estado_postulacion_cambiadoPorId_fkey" FOREIGN KEY ("cambiadoPorId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

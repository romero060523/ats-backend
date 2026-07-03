# ats-backend

Backend de un ATS (sistema de reclutamiento) en Node.js + Express + TypeScript + Prisma, organizado en Clean Architecture.

## Dependency Rule

Las dependencias del codigo solo apuntan hacia adentro: `presentation -> application -> domain` e `infrastructure -> application -> domain`. Ninguna capa interna conoce a una capa externa.

## Capas

- **domain**: reglas de negocio puras (entidades, value objects, errores de dominio); no depende de ninguna otra capa ni de librerias externas.
- **application**: casos de uso que orquestan el dominio, y los puertos (interfaces) que infraestructura debe implementar; depende solo de domain.
- **infrastructure**: implementaciones concretas de los puertos (Prisma, bcrypt, JWT, configuracion); depende de application y domain, nunca al reves.
- **presentation**: capa HTTP (controllers, routes, middlewares, validators) que expone los casos de uso al exterior; depende de application y domain, nunca de infrastructure directamente.

## Scripts

- `pnpm install`: instala las dependencias del proyecto.
- `pnpm dev`: levanta el servidor en modo desarrollo con recarga automatica.
- `pnpm build`: compila TypeScript a `dist/`.
- `pnpm start`: ejecuta el build compilado.
- `pnpm prisma:generate` / `pnpm prisma:migrate`: comandos de Prisma sobre `prisma/schema.prisma`.

## Configuracion

Copiar `.env.example` a `.env` y completar las variables (`DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT`, `CORS_ORIGIN`).

## Gestor de paquetes

Este proyecto usa [pnpm](https://pnpm.io) como gestor de paquetes oficial (version fijada en `packageManager` dentro de `package.json`) para garantizar instalaciones reproducibles entre maquinas.

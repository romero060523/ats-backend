import { PrismaClient, RolUsuario } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const BCRYPT_SALT_ROUNDS = 10;

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_SEED_EMAIL y ADMIN_SEED_PASSWORD deben estar definidas en las variables de entorno."
    );
  }

  const existente = await prisma.usuario.findUnique({ where: { email } });

  if (existente) {
    console.log(`El usuario administrador "${email}" ya existe. Omitiendo creacion.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  await prisma.usuario.create({
    data: {
      nombre: "Administrador",
      email,
      passwordHash,
      rol: RolUsuario.ADMINISTRADOR,
    },
  });

  console.log(`Usuario administrador "${email}" creado correctamente.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

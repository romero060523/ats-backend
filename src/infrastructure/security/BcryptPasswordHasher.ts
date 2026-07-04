import bcrypt from "bcrypt";
import { PasswordHasher } from "../../application/ports/services/PasswordHasher";

const BCRYPT_SALT_ROUNDS = 10;

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(passwordPlano: string): Promise<string> {
    return bcrypt.hash(passwordPlano, BCRYPT_SALT_ROUNDS);
  }

  async comparar(passwordPlano: string, hash: string): Promise<boolean> {
    return bcrypt.compare(passwordPlano, hash);
  }
}

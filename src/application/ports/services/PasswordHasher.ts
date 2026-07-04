export interface PasswordHasher {
  hash(passwordPlano: string): Promise<string>;
  comparar(passwordPlano: string, hash: string): Promise<boolean>;
}

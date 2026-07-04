import { VacanteRepository } from "../../ports/repositories/VacanteRepository";

const RANGO_DIACRITICOS_COMBINANTES_INICIO = 0x0300;
const RANGO_DIACRITICOS_COMBINANTES_FIN = 0x036f;

function quitarDiacriticos(valor: string): string {
  let resultado = "";
  for (const caracter of valor) {
    const codigo = caracter.codePointAt(0) ?? 0;
    const esDiacriticoCombinante =
      codigo >= RANGO_DIACRITICOS_COMBINANTES_INICIO && codigo <= RANGO_DIACRITICOS_COMBINANTES_FIN;
    if (!esDiacriticoCombinante) {
      resultado += caracter;
    }
  }
  return resultado;
}

function normalizarASlugBase(titulo: string): string {
  return quitarDiacriticos(titulo.normalize("NFD"))
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export class GenerarSlugUnico {
  constructor(private readonly vacanteRepository: VacanteRepository) {}

  async ejecutar(titulo: string): Promise<string> {
    const slugBase = normalizarASlugBase(titulo);

    let candidato = slugBase;
    let sufijo = 2;

    while (await this.vacanteRepository.existeSlug(candidato)) {
      candidato = `${slugBase}-${sufijo}`;
      sufijo += 1;
    }

    return candidato;
  }
}

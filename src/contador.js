// Lógica pura do contador: sem DOM, para ser testada isoladamente.
export const VALOR_INICIAL = 0;
export const MINIMO = 0;

export function incrementar(valor) {
  return valor + 1;
}

export function decrementar(valor) {
  return Math.max(MINIMO, valor - 1);
}

export function repor() {
  return VALOR_INICIAL;
}

export function criarContador(inicial = VALOR_INICIAL) {
  let valor = Math.max(MINIMO, inicial);
  return {
    get valor() {
      return valor;
    },
    incrementar() {
      valor = incrementar(valor);
      return valor;
    },
    decrementar() {
      valor = decrementar(valor);
      return valor;
    },
    repor() {
      valor = repor();
      return valor;
    },
  };
}

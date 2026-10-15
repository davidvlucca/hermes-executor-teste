import { criarContador, MINIMO } from './contador.js';

// Liga o contador aos elementos da página. Recebe o documento para poder ser testado com jsdom.
export function montarContador(doc) {
  const contador = criarContador();
  const valorEl = doc.querySelector('#valor');
  const menosBtn = doc.querySelector('#menos');
  const maisBtn = doc.querySelector('#mais');
  const mais10Btn = doc.querySelector('#mais10');
  const reporBtn = doc.querySelector('#repor');

  function render() {
    valorEl.textContent = String(contador.valor);
    menosBtn.disabled = contador.valor <= MINIMO;
  }

  maisBtn.addEventListener('click', () => {
    contador.incrementar();
    render();
  });

  mais10Btn.addEventListener('click', () => {
    contador.somar10();
    render();
  });

  menosBtn.addEventListener('click', () => {
    contador.decrementar();
    render();
  });

  reporBtn.addEventListener('click', () => {
    contador.repor();
    render();
  });

  render();
  return contador;
}

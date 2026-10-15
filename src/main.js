import './style.css';
import { criarContador, MINIMO } from './contador.js';

const contador = criarContador();
const valorEl = document.querySelector('#valor');
const menosBtn = document.querySelector('#menos');
const maisBtn = document.querySelector('#mais');
const reporBtn = document.querySelector('#repor');

function render() {
  valorEl.textContent = String(contador.valor);
  menosBtn.disabled = contador.valor <= MINIMO;
}

maisBtn.addEventListener('click', () => {
  contador.incrementar();
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

// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { montarContador } from '../src/ui.js';
// Usa o index.html real, para apanhar ids errados ou botões em falta.
import html from '../index.html?raw';

function clicar(id, vezes = 1) {
  for (let i = 0; i < vezes; i++) document.querySelector(id).click();
}

const valor = () => document.querySelector('#valor').textContent;

describe('página do contador', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = new DOMParser()
      .parseFromString(html, 'text/html')
      .documentElement.innerHTML;
    montarContador(document);
  });

  it('mostra 0 e desativa -1 ao início', () => {
    expect(valor()).toBe('0');
    expect(document.querySelector('#menos').disabled).toBe(true);
  });

  it('+1 aumenta o valor apresentado e ativa -1', () => {
    clicar('#mais', 3);
    expect(valor()).toBe('3');
    expect(document.querySelector('#menos').disabled).toBe(false);
  });

  it('-1 diminui o valor e não passa abaixo de 0', () => {
    clicar('#mais', 2);
    clicar('#menos');
    expect(valor()).toBe('1');
    clicar('#menos');
    expect(valor()).toBe('0');
    expect(document.querySelector('#menos').disabled).toBe(true);
    // Mesmo forçando o evento com o botão desativado, o valor não fica negativo.
    document.querySelector('#menos').disabled = false;
    clicar('#menos', 5);
    expect(valor()).toBe('0');
  });

  it('Repor volta a 0', () => {
    clicar('#mais', 4);
    clicar('#repor');
    expect(valor()).toBe('0');
    expect(document.querySelector('#menos').disabled).toBe(true);
  });
});

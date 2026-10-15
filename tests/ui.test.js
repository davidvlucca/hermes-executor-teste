// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { VALOR_INICIAL } from '../src/contador.js';
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

  it('+10 uma vez dá valor inicial + 10', () => {
    clicar('#mais10');
    expect(valor()).toBe(String(VALOR_INICIAL + 10));
    expect(document.querySelector('#menos').disabled).toBe(false);
  });

  it('+10 duas vezes dá valor inicial + 20', () => {
    clicar('#mais10', 2);
    expect(valor()).toBe(String(VALOR_INICIAL + 20));
  });

  it('+10 combina com os outros botões', () => {
    clicar('#mais10');
    clicar('#mais');
    clicar('#menos');
    expect(valor()).toBe(String(VALOR_INICIAL + 10));
    clicar('#repor');
    expect(valor()).toBe(String(VALOR_INICIAL));
  });
});

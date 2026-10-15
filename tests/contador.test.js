import { describe, expect, it } from 'vitest';
import { criarContador, decrementar, incrementar, repor } from '../src/contador.js';

describe('funções puras', () => {
  it('incrementar soma 1', () => {
    expect(incrementar(0)).toBe(1);
    expect(incrementar(5)).toBe(6);
  });

  it('decrementar subtrai 1', () => {
    expect(decrementar(3)).toBe(2);
  });

  it('decrementar nunca desce abaixo de 0', () => {
    expect(decrementar(0)).toBe(0);
    expect(decrementar(1)).toBe(0);
  });

  it('repor devolve 0', () => {
    expect(repor()).toBe(0);
  });
});

describe('criarContador', () => {
  it('começa em 0', () => {
    expect(criarContador().valor).toBe(0);
  });

  it('não aceita valor inicial negativo', () => {
    expect(criarContador(-5).valor).toBe(0);
  });

  it('valor inicial que não seja inteiro começa em 0', () => {
    for (const inicial of [NaN, 2.5, Infinity, '3', null]) {
      expect(criarContador(inicial).valor).toBe(0);
    }
    expect(criarContador(4).valor).toBe(4);
  });

  it('+1, -1 e repor alteram o estado', () => {
    const c = criarContador();
    c.incrementar();
    c.incrementar();
    c.incrementar();
    expect(c.valor).toBe(3);
    c.decrementar();
    expect(c.valor).toBe(2);
    c.repor();
    expect(c.valor).toBe(0);
  });

  it('-1 repetido em 0 mantém 0', () => {
    const c = criarContador();
    for (let i = 0; i < 10; i++) c.decrementar();
    expect(c.valor).toBe(0);
    expect(c.incrementar()).toBe(1);
  });
});

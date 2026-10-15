// Teste de fumo do build: corre o bundle gerado em dist/ e clica nos botões.
// Precisa de `npm run build` antes (o verificar.sh faz isso).
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';
import { beforeEach, describe, expect, it } from 'vitest';

const dist = join(import.meta.dirname, '..', 'dist');

function carregarBuild() {
  const indexPath = join(dist, 'index.html');
  if (!existsSync(indexPath)) {
    throw new Error('dist/index.html não existe: corre `npm run build` primeiro.');
  }
  const html = readFileSync(indexPath, 'utf8');
  const scripts = [...html.matchAll(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g)];
  expect(scripts).toHaveLength(1);
  const bundle = readFileSync(join(dist, scripts[0][1]), 'utf8');

  // O jsdom não executa scripts do tipo module. O bundle não tem import/export,
  // por isso corre como script normal, depois do HTML carregado (um módulo é diferido).
  const semModulo = html.replace(scripts[0][0], '');
  const dom = new JSDOM(semModulo, { runScripts: 'outside-only' });
  dom.window.eval(bundle);
  return dom.window.document;
}

describe('build em dist/', () => {
  let doc;
  const valor = () => doc.querySelector('#valor').textContent;
  const clicar = (id, vezes = 1) => {
    for (let i = 0; i < vezes; i++) doc.querySelector(id).click();
  };

  beforeEach(() => {
    doc = carregarBuild();
  });

  it('o bundle liga os botões ao contador', () => {
    expect(valor()).toBe('0');
    expect(doc.querySelector('#menos').disabled).toBe(true);
    clicar('#mais', 3);
    expect(valor()).toBe('3');
    clicar('#menos');
    expect(valor()).toBe('2');
    clicar('#repor');
    expect(valor()).toBe('0');
  });

  it('o -1 não desce abaixo de 0', () => {
    doc.querySelector('#menos').disabled = false;
    clicar('#menos', 3);
    expect(valor()).toBe('0');
  });
});

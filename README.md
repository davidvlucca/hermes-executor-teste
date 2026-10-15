# hermes-executor-teste

Página simples com um contador (+1, -1, repor). O valor nunca desce abaixo de 0.
Feita com HTML, CSS e JavaScript, usando Vite.

## Requisitos

Node.js 22.13 ou mais recente (testado com Node 24).

## Como correr

```bash
npm ci            # instalar dependências
npm run dev       # servidor de desenvolvimento (http://localhost:5173)
npm run build     # build de produção em dist/
npm run preview   # servir o build
npm test          # testes (Vitest)
npm run lint      # lint (ESLint)
./verificar.sh    # instala, faz build, testes e lint; falha se algo falhar
```

## Estrutura

- `index.html` — página
- `src/contador.js` — lógica do contador (sem DOM)
- `src/main.js` — liga a lógica aos botões
- `tests/contador.test.js` — testes da lógica

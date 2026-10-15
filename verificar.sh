#!/usr/bin/env bash
# Verificação completa: dependências, build, testes e lint.
set -euo pipefail
cd "$(dirname "$0")"

echo "==> npm ci"
npm ci

echo "==> build"
npm run build

echo "==> testes"
npm test

echo "==> lint"
npm run lint

echo "OK: tudo passou."

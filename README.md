# Sala de Guerra — Terminal Danilo Alves™

> Repositório legado: `terminal-lobao`  
> Nome recomendado para padronização futura: `sala-de-guerra-terminal-danilo`

## Visão do projeto

O **Terminal Danilo Alves™** é um aplicativo desktop em Electron para organizar estudos de mercado, diário operacional, gestão de risco, scanner de ativos e módulos da assistente Suzy.

Este projeto deve ser tratado como ferramenta educacional, organizacional e experimental. Ele **não promete lucro**, **não substitui gestão de risco** e **não deve executar operações reais sem modo simulação, confirmação e travas de segurança**.

## Stack atual

- Electron
- JavaScript
- HTML/CSS
- Node.js
- Build para Windows via `electron-builder`

## Como executar

```bash
npm install
npm start
```

## Como gerar build Windows

```bash
npm run build
```

## Estrutura profissional recomendada

```text
terminal-lobao/
├── README.md
├── package.json
├── main.js
├── src/
│   ├── index.html
│   ├── styles/
│   ├── scripts/
│   ├── components/
│   ├── services/
│   └── database/
├── docs/
│   ├── ESTRUTURA.md
│   ├── ROADMAP.md
│   └── SEGURANCA.md
├── scripts/
└── tests/
```

## Regras técnicas

1. Nunca misturar código de tela, lógica de negócio e integração externa no mesmo arquivo.
2. Criar primeiro modo simulação antes de qualquer integração real.
3. Registrar operações em diário antes de automatizar decisões.
4. Manter gestão de risco visível na interface.
5. Testar localmente antes de gerar build.

## Documentação

- [`docs/ESTRUTURA.md`](docs/ESTRUTURA.md) — organização das pastas e arquivos.
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — etapas de evolução do projeto.
- [`docs/SEGURANCA.md`](docs/SEGURANCA.md) — regras de segurança operacional.

## Status

Projeto em fase de organização técnica e preparação para evolução modular.

## Progresso

```text
[███░░░░░░░] 30%
```

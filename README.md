# Sala de Guerra / Terminal Danilo Alves™

> Repositório legado: `terminal-lobao`.
>
> Nome recomendado para padronização futura: `sala-de-guerra-terminal-danilo`.

## Objetivo

Criar um painel operacional para estudos de mercado, registro de operações, scanner de ativos, gestão de risco e assistente Suzy.

Este projeto deve ser tratado como ferramenta educacional e de organização. Nada aqui deve prometer lucro, entrada garantida ou operação sem confirmação.

## Status atual

Projeto em fase de organização técnica.

## Como usar a versão atual

```bash
npm install
npm start
```

## Se aparecer erro do Electron

Rode o arquivo:

```text
REINSTALAR_E_RODAR.bat
```

Ou execute manualmente:

```cmd
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
npm start
```

## Estrutura recomendada

```text
terminal-lobao/
├── README.md
├── docs/
│   ├── ROADMAP.md
│   ├── GESTAO-DE-RISCO.md
│   └── COMANDOS-SUZY.md
├── src/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── database/
├── scripts/
└── tests/
```

## Roadmap resumido

- [ ] Padronizar nome do repositório
- [ ] Revisar estrutura atual do Electron
- [ ] Criar tela inicial do Terminal Danilo
- [ ] Criar módulo de diário operacional
- [ ] Criar módulo de gestão de risco
- [ ] Criar módulo Suzy
- [ ] Criar exportação de relatório
- [ ] Criar documentação de instalação

## Regra de segurança

Antes de qualquer integração real com corretora, criar primeiro:

- modo simulação
- aviso de risco
- limite de perda
- diário obrigatório
- botão de travamento operacional

## Progresso

[███░░░░░░░] 30%

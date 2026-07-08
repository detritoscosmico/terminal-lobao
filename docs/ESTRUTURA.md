# Estrutura do projeto — Terminal Danilo Alves™

Este documento define como o repositório deve ser organizado para crescer sem virar bagunça.

## Estrutura recomendada

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
├── scripts/
└── tests/
```

## Função de cada área

### `main.js`

Arquivo principal do Electron. Ele abre a janela do aplicativo e carrega a interface.

### `src/`

Área principal do produto. Deve concentrar a interface visual e a lógica do app.

### `src/components/`

Componentes reutilizáveis: cards, botões, painéis, modais, alertas e blocos da Suzy.

### `src/services/`

Serviços de integração: APIs, leitura de dados, simuladores, scanner de ativos e comunicação externa.

### `src/database/`

Camada de dados local: histórico, configurações, diário operacional e registros internos.

### `docs/`

Documentação do projeto. Tudo que explica o sistema deve ficar aqui.

### `scripts/`

Scripts auxiliares para instalar, limpar cache, gerar build ou preparar ambiente.

### `tests/`

Testes do sistema. Mesmo simples, devem validar se o app abre e se os módulos principais funcionam.

## Regra central

Cada arquivo deve ter uma responsabilidade clara. Se um arquivo começa a fazer coisas demais, ele deve ser dividido.

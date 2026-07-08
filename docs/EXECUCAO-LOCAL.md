# Execução local — Terminal Danilo Alves™

## Pré-requisitos

- Node.js instalado
- VS Code instalado
- Git instalado

## Como rodar

```bash
npm install
npm start
```

## Como verificar estrutura mínima

```bash
npm run check
```

Esse comando confere se os arquivos essenciais existem:

- `main.js`
- `src/index.html`
- `package.json`

## Como gerar instalador Windows

```bash
npm run build
```

## Erros comuns

### Electron não abre

Rode:

```bash
npm install
npm start
```

Se continuar com erro, apague `node_modules` e instale novamente.

### Arquivo obrigatório ausente

Se `npm run check` acusar arquivo ausente, conferir se o arquivo foi movido ou apagado sem atualizar a configuração.

## Regra de trabalho

Antes de mudar o projeto, rode:

```bash
npm run check
```

Depois de mudar, rode novamente. Se passou antes e quebrou depois, a alteração causou o problema.

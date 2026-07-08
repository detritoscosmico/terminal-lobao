# Regras de risco — Terminal Danilo Alves™

O Terminal possui alertas educativos para impedir operação impulsiva e reforçar disciplina.

## Regras atuais no código

Arquivo principal:

```text
src/js/app.js
```

Configuração atual:

```js
const RISK_RULES = {
  maxDailyOperations: 5,
  dailyLossLimit: -200,
  stakeWarning: 100
};
```

## O que cada regra significa

### `maxDailyOperations`

Número máximo recomendado de operações por dia.

Padrão atual:

```text
5 operações
```

### `dailyLossLimit`

Limite de perda diária. Se o resultado do dia chegar nesse valor, a Suzy alerta para encerrar.

Padrão atual:

```text
- R$ 200,00
```

### `stakeWarning`

Valor de entrada que gera alerta de mão alta.

Padrão atual:

```text
R$ 100,00
```

## Importante

Essas regras são educativas e organizacionais. Elas não garantem lucro e não substituem estudo, estratégia, disciplina ou gestão de banca.

## Próxima melhoria

Criar uma tela para configurar esses limites sem precisar alterar código.

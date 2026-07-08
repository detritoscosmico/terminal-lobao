# Regras de risco — Terminal Danilo Alves™

O Terminal possui alertas educativos para impedir operação impulsiva e reforçar disciplina.

## Onde configurar

Abra o aplicativo e vá em:

```text
Sistema → Configuração de Risco
```

Lá você pode alterar:

- máximo de operações no dia
- limite de perda diária
- alerta de mão alta

As configurações ficam salvas localmente no navegador/Electron usando `localStorage`.

## Padrão inicial

```js
const DEFAULT_RISK_RULES = {
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

## Como funciona

Antes de salvar uma operação, o Terminal verifica:

1. Se o número máximo de operações do dia já foi atingido.
2. Se o limite de perda diária já foi atingido.
3. Se o valor da operação ultrapassa o alerta de mão alta.

Se algum alerta for ativado, a Suzy pede confirmação antes de registrar.

## Exportação

Ao exportar JSON, o arquivo inclui:

- operações registradas
- configuração de risco atual

## Importante

Essas regras são educativas e organizacionais. Elas não garantem lucro e não substituem estudo, estratégia, disciplina ou gestão de banca.

## Próxima melhoria

Criar travamento opcional para impedir registro após limite de perda, em vez de apenas alertar.

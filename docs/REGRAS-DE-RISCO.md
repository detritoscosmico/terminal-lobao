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
- bloqueio rígido após limite

As configurações ficam salvas localmente no navegador/Electron usando `localStorage`.

## Padrão inicial

```js
const DEFAULT_RISK_RULES = {
  maxDailyOperations: 5,
  dailyLossLimit: -200,
  stakeWarning: 100,
  hardLock: false
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

### `hardLock`

Modo de bloqueio rígido.

Quando ativado, o Terminal impede novo registro se:

- o máximo de operações do dia já foi atingido
- o limite de perda diária já foi atingido

Quando desativado, o Terminal apenas mostra alerta e pede confirmação.

## Resumo diário de risco

Abra:

```text
Sistema → Resumo Diário de Risco
```

O painel mostra:

- alertas de risco gerados no dia
- bloqueios acionados no dia
- motivo de cada alerta ou bloqueio
- valor da tentativa de registro, quando houver

Os eventos ficam salvos localmente em:

```text
suzy12_risk_events
```

## Como funciona

Antes de salvar uma operação, o Terminal verifica:

1. Se o número máximo de operações do dia já foi atingido.
2. Se o limite de perda diária já foi atingido.
3. Se o valor da operação ultrapassa o alerta de mão alta.
4. Se o bloqueio rígido está ativo.

Se o bloqueio rígido estiver ativo e um limite crítico tiver sido atingido, o registro é bloqueado e o evento aparece no resumo diário.

## Exportação

Ao exportar JSON, o arquivo inclui:

- operações registradas
- configuração de risco atual
- estado do bloqueio rígido
- eventos de risco

## Importante

Essas regras são educativas e organizacionais. Elas não garantem lucro e não substituem estudo, estratégia, disciplina ou gestão de banca.

## Próxima melhoria

Criar um relatório de batalha diário com estatísticas, riscos, bloqueios e observações da Suzy.

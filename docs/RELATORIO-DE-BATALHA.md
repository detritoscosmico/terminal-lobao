# Relatório de Batalha Diário — Terminal Danilo Alves™

O Relatório de Batalha Diário consolida o desempenho do dia em uma visão simples para revisão operacional.

## Onde acessar

Abra o aplicativo e vá em:

```text
Sistema → Relatório de Batalha Diário
```

## O que o relatório mostra

- data do relatório
- total de operações do dia
- quantidade de wins
- quantidade de losses
- win rate do dia
- resultado estimado do dia
- ativo mais operado
- setup mais usado
- emoção dominante
- erro mais registrado
- alertas de risco
- bloqueios de risco
- estado do bloqueio rígido
- observação da Suzy

## Arquivo do módulo

```text
src/js/battle-report.js
```

Esse arquivo lê dados locais do Terminal:

```text
suzy12_ops
suzy12_risk_settings
suzy12_risk_events
```

## Exportação

O botão `Exportar TXT` gera um arquivo no formato:

```text
relatorio-batalha-AAAA-MM-DD.txt
```

## Interpretação

### Dia positivo

A Suzy recomenda preservar o ganho e evitar overtrade.

### Dia negativo

A Suzy recomenda reduzir exposição, revisar erros e proteger a banca.

### Dia neutro

A Suzy recomenda focar na qualidade das entradas.

## Importante

O relatório é educativo e organizacional. Ele não prevê mercado, não promete lucro e não substitui gestão de risco.

## Próxima melhoria

Criar PDF do Relatório de Batalha e histórico por data.

# Segurança operacional — Terminal Danilo Alves™

Este projeto envolve estudos de mercado e pode futuramente se conectar a dados financeiros. Por isso, a segurança vem antes da automação.

## Regras obrigatórias

1. Nenhum módulo deve prometer lucro.
2. Nenhuma operação real deve ser executada sem confirmação manual.
3. O modo simulação deve vir antes de qualquer integração real.
4. Toda decisão deve exibir risco, contexto e alerta.
5. O usuário deve conseguir pausar ou travar o sistema rapidamente.

## Antes de integrar corretora ou API sensível

- [ ] Criar ambiente de teste
- [ ] Criar modo simulação
- [ ] Criar logs de operação
- [ ] Criar botão de travamento
- [ ] Criar aviso claro de risco
- [ ] Criar validação manual antes de qualquer ação crítica

## Informações sensíveis

Nunca commitar no GitHub:

- Senhas
- Tokens
- Chaves de API
- Dados de conta real
- Prints com saldo ou dados pessoais

Use `.env` local e mantenha `.env` no `.gitignore`.

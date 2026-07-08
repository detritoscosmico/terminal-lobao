# SUZY FASE 12.1 — APP DESKTOP CORRIGIDO

Correção: Electron travado na versão estável 31.7.7.

## Como usar

```bash
npm install
npm start
```

## Se aparecer "Electron failed to install correctly"

Rode o arquivo:

```text
REINSTALAR_E_RODAR.bat
```

Ou execute:

```cmd
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
npm start
```

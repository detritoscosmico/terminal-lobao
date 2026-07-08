const BATTLE_STORAGE = {
  operations: 'suzy12_ops',
  riskSettings: 'suzy12_risk_settings',
  riskEvents: 'suzy12_risk_events'
};

function battleMoney(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function battleTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

function battleRead(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch (error) {
    return fallback;
  }
}

function battlePnl(operation) {
  return operation.resultado === 'WIN' ? Number(operation.valor) * 0.85 : -Number(operation.valor);
}

function battleTodayItems(items) {
  const today = battleTodayISO();
  return items.filter((item) => String(item.createdAt || '').startsWith(today));
}

function battleMostCommon(items, key) {
  const counts = {};

  items.forEach((item) => {
    const value = item[key] || 'Não informado';
    counts[value] = (counts[value] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0] ? `${sorted[0][0]} (${sorted[0][1]}x)` : 'Sem dados';
}

function buildBattleReport() {
  const operations = battleTodayItems(battleRead(BATTLE_STORAGE.operations, []));
  const riskEvents = battleTodayItems(battleRead(BATTLE_STORAGE.riskEvents, []));
  const riskSettings = battleRead(BATTLE_STORAGE.riskSettings, {});

  const wins = operations.filter((operation) => operation.resultado === 'WIN').length;
  const losses = operations.filter((operation) => operation.resultado === 'LOSS').length;
  const result = operations.reduce((sum, operation) => sum + battlePnl(operation), 0);
  const winRate = operations.length ? Math.round((wins / operations.length) * 100) : 0;
  const alerts = riskEvents.filter((event) => event.type === 'alerta').length;
  const blocks = riskEvents.filter((event) => event.type === 'bloqueio').length;
  const mostCommonEmotion = battleMostCommon(operations, 'emocao');
  const mostCommonError = battleMostCommon(operations, 'erro');
  const mostUsedSetup = battleMostCommon(operations, 'setup');
  const mostUsedAsset = battleMostCommon(operations, 'ativo');

  const suzyNote = result > 0
    ? 'Dia positivo. Preserve o ganho, evite overtrade e registre o que funcionou.'
    : result < 0
      ? 'Dia negativo. Reduza exposição, revise erros e proteja a banca antes de tentar recuperar.'
      : 'Dia neutro. Foque na qualidade das entradas, não em quantidade.';

  return {
    date: new Date().toLocaleDateString('pt-BR'),
    operations,
    riskEvents,
    riskSettings,
    wins,
    losses,
    result,
    winRate,
    alerts,
    blocks,
    mostCommonEmotion,
    mostCommonError,
    mostUsedSetup,
    mostUsedAsset,
    suzyNote
  };
}

function battleReportText(report) {
  return [
    `RELATÓRIO DE BATALHA DIÁRIO — ${report.date}`,
    '',
    `Operações: ${report.operations.length}`,
    `Wins: ${report.wins}`,
    `Losses: ${report.losses}`,
    `Win rate: ${report.winRate}%`,
    `Resultado estimado: ${battleMoney(report.result)}`,
    '',
    `Ativo mais operado: ${report.mostUsedAsset}`,
    `Setup mais usado: ${report.mostUsedSetup}`,
    `Emoção dominante: ${report.mostCommonEmotion}`,
    `Erro mais registrado: ${report.mostCommonError}`,
    '',
    `Alertas de risco: ${report.alerts}`,
    `Bloqueios de risco: ${report.blocks}`,
    `Bloqueio rígido: ${report.riskSettings.hardLock ? 'Ativo' : 'Inativo'}`,
    '',
    `Observação da Suzy: ${report.suzyNote}`
  ].join('\n');
}

function renderBattleReport() {
  const target = document.getElementById('battleReportBox');
  if (!target) return;

  const report = buildBattleReport();

  target.innerHTML = `
    <div class="item"><strong>Data:</strong> ${report.date}</div>
    <div class="item"><strong>Operações:</strong> ${report.operations.length} | Wins: ${report.wins} | Losses: ${report.losses} | WR: ${report.winRate}%</div>
    <div class="item"><strong>Resultado:</strong> ${battleMoney(report.result)}</div>
    <div class="item"><strong>Ativo:</strong> ${report.mostUsedAsset} | <strong>Setup:</strong> ${report.mostUsedSetup}</div>
    <div class="item"><strong>Emoção:</strong> ${report.mostCommonEmotion} | <strong>Erro:</strong> ${report.mostCommonError}</div>
    <div class="item"><strong>Risco:</strong> ${report.alerts} alerta(s), ${report.blocks} bloqueio(s), bloqueio rígido ${report.riskSettings.hardLock ? 'ativo' : 'inativo'}.</div>
    <div class="item"><strong>Suzy:</strong> ${report.suzyNote}</div>
  `;
}

function exportBattleReport() {
  const report = buildBattleReport();
  const blob = new Blob([battleReportText(report)], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `relatorio-batalha-${battleTodayISO()}.txt`;
  link.click();

  URL.revokeObjectURL(url);
}

function setupBattleReport() {
  renderBattleReport();

  const refresh = document.getElementById('refreshBattleReport');
  const exportButton = document.getElementById('exportBattleReport');

  if (refresh) refresh.onclick = renderBattleReport;
  if (exportButton) exportButton.onclick = exportBattleReport;
}

setupBattleReport();

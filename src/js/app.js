const $ = (id) => document.getElementById(id);

const STORAGE = {
  operations: 'suzy12_ops',
  voice: 'suzy12_voice',
  riskSettings: 'suzy12_risk_settings'
};

const DEFAULT_RISK_RULES = {
  maxDailyOperations: 5,
  dailyLossLimit: -200,
  stakeWarning: 100
};

let riskRules = loadRiskRules();
let ops = JSON.parse(localStorage.getItem(STORAGE.operations) || '[]');
let selectedVoiceName = localStorage.getItem(STORAGE.voice) || '';
let voices = [];

function money(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function loadRiskRules() {
  const saved = JSON.parse(localStorage.getItem(STORAGE.riskSettings) || 'null');
  return { ...DEFAULT_RISK_RULES, ...(saved || {}) };
}

function saveRiskRules() {
  localStorage.setItem(STORAGE.riskSettings, JSON.stringify(riskRules));
}

function save() {
  localStorage.setItem(STORAGE.operations, JSON.stringify(ops));
}

function pnl(op) {
  return op.resultado === 'WIN' ? Number(op.valor) * 0.85 : -Number(op.valor);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function isToday(op) {
  return String(op.createdAt || '').startsWith(todayISO());
}

function todayOperations() {
  return ops.filter(isToday);
}

function todayPnl() {
  return todayOperations().reduce((sum, op) => sum + pnl(op), 0);
}

function group(key) {
  const map = {};

  ops.forEach((operation) => {
    const groupName = operation[key] || 'Não informado';

    if (!map[groupName]) {
      map[groupName] = { total: 0, wins: 0, pnl: 0 };
    }

    map[groupName].total += 1;
    if (operation.resultado === 'WIN') map[groupName].wins += 1;
    map[groupName].pnl += pnl(operation);
  });

  return Object.entries(map)
    .map(([name, data]) => ({
      name,
      ...data,
      wr: data.total ? Math.round((data.wins / data.total) * 100) : 0
    }))
    .sort((a, b) => b.pnl - a.pnl);
}

function setText(id, value) {
  const element = $(id);
  if (element) element.textContent = value;
}

function render() {
  const total = ops.length;
  const wins = ops.filter((operation) => operation.resultado === 'WIN').length;
  const totalPnl = ops.reduce((sum, operation) => sum + pnl(operation), 0);

  setText('totalOps', total);
  setText('winrate', `${total ? Math.round((wins / total) * 100) : 0}%`);
  setText('missionLossLimit', money(riskRules.dailyLossLimit));
  setText('missionMaxOps', riskRules.maxDailyOperations);

  const pnlElement = $('pnl');
  if (pnlElement) {
    pnlElement.textContent = money(totalPnl);
    pnlElement.className = totalPnl >= 0 ? 'good' : 'bad';
  }

  const asset = group('ativo');
  const setup = group('setup');
  const emotion = group('emocao');

  renderMemory(asset, setup, emotion);
  renderRanking('assetRank', asset);
  renderRanking('setupRank', setup);
  renderCoach(total, totalPnl, asset, emotion);
  renderRiskSettings();
}

function renderMemory(asset, setup, emotion) {
  const memoryBox = $('memoryBox');
  if (!memoryBox) return;

  const memory = [
    ['Melhor ativo', asset[0]],
    ['Pior ativo', asset.slice().reverse()[0]],
    ['Setup campeão', setup[0]],
    ['Setup problemático', setup.slice().reverse()[0]],
    ['Melhor emoção', emotion[0]],
    ['Emoção perigosa', emotion.slice().reverse()[0]]
  ];

  memoryBox.innerHTML = memory.map(([title, item]) => `
    <div class="mem">
      <strong>${title}</strong><br>
      ${item ? `${item.name} | ${item.total} ops | WR ${item.wr}% | ${money(item.pnl)}` : 'Sem dados'}
    </div>
  `).join('');
}

function renderRanking(targetId, data) {
  const target = $(targetId);
  if (!target) return;

  target.innerHTML = data.map((item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.total}</td>
      <td>${item.wr}%</td>
      <td class="${item.pnl >= 0 ? 'good' : 'bad'}">${money(item.pnl)}</td>
    </tr>
  `).join('') || '<tr><td colspan="4">Sem dados</td></tr>';
}

function renderCoach(total, totalPnl, asset, emotion) {
  const coachBox = $('coachBox');
  if (!coachBox) return;

  const items = [];
  const dailyOperations = todayOperations();
  const dailyResult = todayPnl();

  if (!total) items.push('Registre operações para a Suzy aprender seu padrão.');
  if (total >= 3 && totalPnl < 0) items.push('Resultado geral negativo detectado. Reduza a mão e revise entradas.');
  if (dailyOperations.length >= riskRules.maxDailyOperations) items.push('Limite diário de operações atingido. Pare e revise o diário.');
  if (dailyResult <= riskRules.dailyLossLimit) items.push('Limite de perda diária atingido. Protocolo correto: encerrar o dia.');
  if (asset[0]) items.push(`Priorize estudo em ${asset[0].name}. Ele lidera seu ranking.`);
  if (emotion.slice().reverse()[0]) items.push(`Observe seu estado emocional: ${emotion.slice().reverse()[0].name}.`);

  items.push('Protocolo Suzy: tendência, região, confirmação, risco e registro.');

  coachBox.innerHTML = items.map((item) => `<div class="item">${item}</div>`).join('');
}

function renderRiskSettings() {
  const maxOps = $('riskMaxOps');
  const lossLimit = $('riskLossLimit');
  const stakeWarning = $('riskStakeWarning');

  if (maxOps) maxOps.value = riskRules.maxDailyOperations;
  if (lossLimit) lossLimit.value = riskRules.dailyLossLimit;
  if (stakeWarning) stakeWarning.value = riskRules.stakeWarning;
}

function riskWarnings(value) {
  const warnings = [];
  const dailyOperations = todayOperations();
  const dailyResult = todayPnl();

  if (dailyOperations.length >= riskRules.maxDailyOperations) {
    warnings.push('Você já atingiu o número máximo de operações do dia.');
  }

  if (dailyResult <= riskRules.dailyLossLimit) {
    warnings.push('Seu limite de perda diária já foi atingido.');
  }

  if (value > riskRules.stakeWarning) {
    warnings.push(`Valor acima do alerta de mão: ${money(riskRules.stakeWarning)}.`);
  }

  return warnings;
}

function saveOp() {
  const value = Number($('valor')?.value || 0);

  if (!value || value <= 0) {
    alert('Informe um valor válido para a operação.');
    return;
  }

  const warnings = riskWarnings(value);
  if (warnings.length) {
    const shouldContinue = confirm(`Alerta de risco:\n\n${warnings.join('\n')}\n\nDeseja registrar mesmo assim?`);
    if (!shouldContinue) return;
  }

  const operation = {
    ativo: $('ativo')?.value || 'Não informado',
    setup: $('setup')?.value || 'Não informado',
    direcao: $('direcao')?.value || 'Não informado',
    resultado: $('resultado')?.value || 'LOSS',
    valor: value,
    emocao: $('emocao')?.value || 'Não informado',
    motivo: $('motivo')?.value || '',
    erro: $('erro')?.value || 'Nenhum',
    data: new Date().toLocaleString('pt-BR'),
    createdAt: new Date().toISOString()
  };

  ops.push(operation);
  save();

  if ($('motivo')) $('motivo').value = '';

  const message = operation.resultado === 'WIN'
    ? `Win registrado em ${operation.ativo}. Boa execução, mas continue disciplinado.`
    : `Loss registrado em ${operation.ativo}. Sem revanche. Revise o motivo e proteja a banca.`;

  setText('suzyText', message);
  speak(message);
  render();
}

function saveRiskSettings() {
  const maxDailyOperations = Number($('riskMaxOps')?.value || DEFAULT_RISK_RULES.maxDailyOperations);
  const dailyLossLimit = Number($('riskLossLimit')?.value || DEFAULT_RISK_RULES.dailyLossLimit);
  const stakeWarning = Number($('riskStakeWarning')?.value || DEFAULT_RISK_RULES.stakeWarning);

  if (maxDailyOperations <= 0 || stakeWarning <= 0 || dailyLossLimit >= 0) {
    alert('Configuração inválida. Use máximo de operações positivo, mão positiva e limite de perda negativo.');
    return;
  }

  riskRules = { maxDailyOperations, dailyLossLimit, stakeWarning };
  saveRiskRules();
  setText('riskSettingsStatus', `Risco salvo: ${maxDailyOperations} operações/dia, limite ${money(dailyLossLimit)}, alerta de mão ${money(stakeWarning)}.`);
  speak('Configuração de risco salva.');
  render();
}

function resetRiskSettings() {
  riskRules = { ...DEFAULT_RISK_RULES };
  saveRiskRules();
  setText('riskSettingsStatus', 'Configurações de risco restauradas para o padrão.');
  speak('Risco restaurado para o padrão.');
  render();
}

function applyTone(text) {
  const tone = $('toneSelect')?.value || 'doce';

  if (tone === 'tatica') return `${text} Siga o plano.`;
  if (tone === 'provocante') return `${text} Nada de impulso, Danilo.`;

  return text;
}

function speak(text) {
  if (!('speechSynthesis' in window)) return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(applyTone(text));
  utterance.lang = 'pt-BR';
  utterance.rate = 0.92;
  utterance.pitch = 1.16;

  const selectedVoice = voices.find((voice) => voice.name === ($('voiceSelect')?.value || selectedVoiceName));
  if (selectedVoice) utterance.voice = selectedVoice;

  speechSynthesis.speak(utterance);
}

function loadVoices() {
  if (!('speechSynthesis' in window)) return;

  voices = speechSynthesis.getVoices();

  const voiceSelect = $('voiceSelect');
  if (!voiceSelect) return;

  voiceSelect.innerHTML = voices.map((voice) => `<option value="${voice.name}">${voice.name} — ${voice.lang}</option>`).join('');

  const preferredVoice = voices.find((voice) => voice.name === selectedVoiceName)
    || voices.find((voice) => voice.lang.toLowerCase().includes('pt-br'))
    || voices[0];

  if (preferredVoice) {
    voiceSelect.value = preferredVoice.name;
    selectedVoiceName = preferredVoice.name;
  }
}

function download(name, content) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = name;
  link.click();

  URL.revokeObjectURL(url);
}

function setupTabs() {
  document.querySelectorAll('.nav').forEach((button) => {
    button.onclick = () => {
      document.querySelectorAll('.nav').forEach((item) => item.classList.remove('active'));
      document.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('active'));

      button.classList.add('active');
      $(button.dataset.tab)?.classList.add('active');
    };
  });
}

function setupEvents() {
  if ($('saveOp')) $('saveOp').onclick = saveOp;
  if ($('speakIntro')) $('speakIntro').onclick = () => speak('Suzy fase doze corrigida ativada.');
  if ($('briefingBtn')) $('briefingBtn').onclick = () => speak('Briefing: opere pouco, filtre bem e encerre ao bater meta ou limite.');
  if ($('riskBtn')) $('riskBtn').onclick = () => speak('Risco: entrada pequena, stop respeitado e zero vingança operacional.');
  if ($('testVoice')) $('testVoice').onclick = () => speak('Esta é a voz feminina da Suzy no aplicativo desktop.');

  if ($('saveVoice')) {
    $('saveVoice').onclick = () => {
      selectedVoiceName = $('voiceSelect')?.value || '';
      localStorage.setItem(STORAGE.voice, selectedVoiceName);
      speak('Voz salva.');
    };
  }

  if ($('saveRiskSettings')) $('saveRiskSettings').onclick = saveRiskSettings;
  if ($('resetRiskSettings')) $('resetRiskSettings').onclick = resetRiskSettings;

  if ($('exportData')) {
    $('exportData').onclick = () => download('suzy12-dados.json', JSON.stringify({ ops, riskRules }, null, 2));
  }

  if ($('clearData')) {
    $('clearData').onclick = () => {
      if (confirm('Limpar todos os dados?')) {
        ops = [];
        save();
        render();
      }
    };
  }
}

setupTabs();
setupEvents();

if ('speechSynthesis' in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

render();

// ═══════════════════════════════════════════════════════════
// Constants and Configuration
// ═══════════════════════════════════════════════════════════
const COUNTRY_FLAGS = {
  "AD": "🇦🇩 AD", "AE": "🇦🇪 AE", "AF": "🇦🇫 AF", "AG": "🇦🇬 AG", "AI": "🇦🇮 AI", "AL": "🇦🇱 AL",
  "AM": "🇦🇲 AM", "AO": "🇦🇴 AO", "AQ": "🇦🇶 AQ", "AR": "🇦🇷 AR", "AS": "🇦🇸 AS", "AT": "🇦🇹 AT",
  "AU": "🇦🇺 AU", "AW": "🇦🇼 AW", "AX": "🇦🇽 AX", "AZ": "🇦🇿 AZ", "BA": "🇧🇦 BA", "BB": "🇧🇧 BB",
  "BD": "🇧🇩 BD", "BE": "🇧🇪 BE", "BF": "🇧🇫 BF", "BG": "🇧🇬 BG", "BH": "🇧🇭 BH", "BI": "🇧🇮 BI",
  "BJ": "🇧🇯 BJ", "BL": "🇧🇱 BL", "BM": "🇧🇲 BM", "BN": "🇧🇳 BN", "BO": "🇧🇴 BO", "BQ": "🇧🇶 BQ",
  "BR": "🇧🇷 BR", "BS": "🇧🇸 BS", "BT": "🇧🇹 BT", "BV": "🇧🇻 BV", "BW": "🇧🇼 BW", "BY": "🇧🇾 BY",
  "BZ": "🇧🇿 BZ", "CA": "🇨🇦 CA", "CC": "🇨🇨 CC", "CD": "🇨🇩 CD", "CF": "🇨🇫 CF", "CG": "🇨🇬 CG",
  "CH": "🇨🇭 CH", "CI": "🇨🇮 CI", "CK": "🇨🇰 CK", "CL": "🇨🇱 CL", "CM": "🇨🇲 CM", "CN": "🇨🇳 CN",
  "CO": "🇨🇴 CO", "CR": "🇨🇷 CR", "CU": "🇨🇺 CU", "CV": "🇨🇻 CV", "CW": "🇨🇼 CW", "CX": "🇨🇽 CX",
  "CY": "🇨🇾 CY", "CZ": "🇨🇿 CZ", "DE": "🇩🇪 DE", "DJ": "🇩🇯 DJ", "DK": "🇩🇰 DK", "DM": "🇩🇲 DM",
  "DO": "🇩🇴 DO", "DZ": "🇩🇿 DZ", "EC": "🇪🇨 EC", "EE": "🇪🇪 EE", "EG": "🇪🇬 EG", "EH": "🇪🇭 EH",
  "ER": "🇪🇷 ER", "ES": "🇪🇸 ES", "ET": "🇪🇹 ET", "FI": "🇫🇮 FI", "FJ": "🇫🇯 FJ", "FK": "🇫🇰 FK",
  "FM": "🇫🇲 FM", "FO": "🇫🇴 FO", "FR": "🇫🇷 FR", "GA": "🇬🇦 GA", "GB": "🇬🇧 GB", "GD": "🇬🇩 GD",
  "GE": "🇬🇪 GE", "GF": "🇬🇫 GF", "GG": "🇬🇬 GG", "GH": "🇬🇭 GH", "GI": "🇬🇮 GI", "GL": "🇬🇱 GL",
  "GM": "🇬🇲 GM", "GN": "🇬🇳 GN", "GP": "🇬🇵 GP", "GQ": "🇬🇶 GQ", "GR": "🇬🇷 GR", "GS": "🇬🇸 GS",
  "GT": "🇬🇹 GT", "GU": "🇬🇺 GU", "GW": "🇬🇼 GW", "GY": "🇬🇾 GY", "HK": "🇭🇰 HK", "HM": "🇭🇲 HM",
  "HN": "🇭🇳 HN", "HR": "🇭🇷 HR", "HT": "🇭🇹 HT", "HU": "🇭🇺 HU", "ID": "🇮🇩 ID", "IE": "🇮🇪 IE",
  "IL": "🇮🇱 IL", "IM": "🇮🇲 IM", "IN": "🇮🇳 IN", "IO": "🇮🇴 IO", "IQ": "🇮🇶 IQ", "IR": "🇮🇷 IR",
  "IS": "🇮🇸 IS", "IT": "🇮🇹 IT", "JE": "🇯🇪 JE", "JM": "🇯🇲 JM", "JO": "🇯🇴 JO", "JP": "🇯🇵 JP",
  "KE": "🇰🇪 KE", "KG": "🇰🇬 KG", "KH": "🇰🇭 KH", "KI": "🇰🇮 KI", "KM": "🇰🇲 KM", "KN": "🇰🇳 KN",
  "KP": "🇰🇵 KP", "KR": "🇰🇷 KR", "KW": "🇰🇼 KW", "KY": "🇰🇾 KY", "KZ": "🇰🇿 KZ", "LA": "🇱🇦 LA",
  "LB": "🇱🇧 LB", "LC": "🇱🇨 LC", "LI": "🇱🇮 LI", "LK": "🇱🇰 LK", "LR": "🇱🇷 LR", "LS": "🇱🇸 LS",
  "LT": "🇱🇹 LT", "LU": "🇱🇺 LU", "LV": "🇱🇻 LV", "LY": "🇱🇾 LY", "MA": "🇲🇦 MA", "MC": "🇲🇨 MC",
  "MD": "🇲🇩 MD", "ME": "🇲🇪 ME", "MF": "🇲🇫 MF", "MG": "🇲🇬 MG", "MH": "🇲🇭 MH", "MK": "🇲🇰 MK",
  "ML": "🇲🇱 ML", "MM": "🇲🇲 MM", "MN": "🇲🇳 MN", "MO": "🇲🇴 MO", "MP": "🇲🇵 MP", "MQ": "🇲🇶 MQ",
  "MR": "🇲🇷 MR", "MS": "🇲🇸 MS", "MT": "🇲🇹 MT", "MU": "🇲🇺 MU", "MV": "🇲🇻 MV", "MW": "🇲🇼 MW",
  "MX": "🇲🇽 MX", "MY": "🇲🇾 MY", "MZ": "🇲🇿 MZ", "NA": "🇳🇦 NA", "NC": "🇳🇨 NC", "NE": "🇳🇪 NE",
  "NF": "🇳🇫 NF", "NG": "🇳🇬 NG", "NI": "🇳🇮 NI", "NL": "🇳🇱 NL", "NO": "🇳🇴 NO", "NP": "🇳🇵 NP",
  "NR": "🇳🇷 NR", "NU": "🇳🇺 NU", "NZ": "🇳🇿 NZ", "OM": "🇴🇲 OM", "PA": "🇵🇦 PA", "PE": "🇵🇪 PE",
  "PF": "🇵🇫 PF", "PG": "🇵🇬 PG", "PH": "🇵🇭 PH", "PK": "🇵🇰 PK", "PL": "🇵🇱 PL", "PM": "🇵🇲 PM",
  "PN": "🇵🇳 PN", "PR": "🇵🇷 PR", "PS": "🇵🇸 PS", "PT": "🇵🇹 PT", "PW": "🇵🇼 PW", "PY": "🇵🇾 PY",
  "QA": "🇶🇦 QA", "RE": "🇷🇪 RE", "RO": "🇷🇴 RO", "RS": "🇷🇸 RS", "RU": "🇷🇺 RU", "RW": "🇷🇼 RW",
  "SA": "🇸🇦 SA", "SB": "🇸🇧 SB", "SC": "🇸🇨 SC", "SD": "🇸🇩 SD", "SE": "🇸🇪 SE", "SG": "🇸🇬 SG",
  "SH": "🇸🇭 SH", "SI": "🇸🇮 SI", "SJ": "🇸🇯 SJ", "SK": "🇸🇰 SK", "SL": "🇸🇱 SL", "SM": "🇸🇲 SM",
  "SN": "🇸🇳 SN", "SO": "🇸🇴 SO", "SR": "🇸🇷 SR", "SS": "🇸🇸 SS", "ST": "🇸🇹 ST", "SV": "🇸🇻 SV",
  "SX": "🇸🇽 SX", "SY": "🇸🇾 SY", "SZ": "🇸🇿 SZ", "TC": "🇹🇨 TC", "TD": "🇹🇩 TD", "TF": "🇹🇫 TF",
  "TG": "🇹🇬 TG", "TH": "🇹🇭 TH", "TJ": "🇹🇯 TJ", "TK": "🇹🇰 TK", "TL": "🇹🇱 TL", "TM": "🇹🇲 TM",
  "TN": "🇹🇳 TN", "TO": "🇹🇴 TO", "TR": "🇹🇷 TR", "TT": "🇹🇹 TT", "TV": "🇹🇻 TV", "TW": "🇹🇼 TW",
  "TZ": "🇹🇿 TZ", "UA": "🇺🇦 UA", "UK": "🇬🇧 GB", "UG": "🇺🇬 UG", "UM": "🇺🇲 UM", "US": "🇺🇸 US", "UY": "🇺🇾 UY",
  "UZ": "🇺🇿 UZ", "VA": "🇻🇦 VA", "VC": "🇻🇨 VC", "VE": "🇻🇪 VE", "VG": "🇻🇬 VG", "VI": "🇻🇮 VI",
  "VN": "🇻🇳 VN", "VU": "🇻🇺 VU", "WF": "🇼🇫 WF", "WS": "🇼🇸 WS", "YE": "🇾🇪 YE", "YT": "🇾🇹 YT",
  "ZA": "🇿🇦 ZA", "ZM": "🇿🇲 ZM", "ZW": "🇿🇼 ZW"
};

const AMNEZIA_KEYS    = ['jc', 'jmin', 'jmax', 's1', 's2', 'h1', 'h2', 'h3', 'h4'];
const AMNEZIA15_KEYS  = ['i1', 'i2', 'i3', 'i4', 'i5'];
const SUPPORTED_LANGS = ["en", "tr", "fa", "ru", "zh"];

// ── LocalStorage keys ────────────────────────────────────
const LS_THEME         = 'wg_theme';
const LS_JUNK_MODE     = 'wg_junk_mode';
const LS_AMNEZIA15     = 'wg_amnezia15';
const LS_RANDOMIZE_PC  = 'wg_randomize_per_config';
const LS_WS_ID         = 'wg_ws_id';
const LS_WS_IP         = 'wg_ws_ip';
const LS_WS_IB         = 'wg_ws_ib';

// ═══════════════════════════════════════════════════════════
// Global State
// ═══════════════════════════════════════════════════════════
let proxyList    = [];
let translations = {};
let currentLang  = localStorage.getItem("lang") || detectBrowserLang();

// ═══════════════════════════════════════════════════════════
// Utility — DOM
// ═══════════════════════════════════════════════════════════
const getById          = (id)       => document.getElementById(id);
const getBySelector    = (sel)      => document.querySelector(sel);
const getAllBySelector  = (sel)      => document.querySelectorAll(sel);
const getRandomInt     = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const elements = {
  get wgFiles()          { return getById('wgFiles'); },
  get yamlOutput()       { return getById('yamlOutput'); },
  get confInput()        { return getById('confInput'); },
  get fileList()         { return getById('fileList'); },
  get downloadBtn()      { return getById('downloadBtn'); },
  get copyBtn()          { return getById('copyBtn'); },
  get clearBtn()         { return getById('clearBtn'); },
  get musor1()           { return getBySelector('.musor1'); },
  get musor2()           { return getBySelector('.musor2'); },
  get containerColumns() { return getBySelector('.container-columns'); },
  get container2()       { return getBySelector('.container2'); },
  get validationPanel()  { return getById('validationPanel'); },
  get configTabsContainer() { return getById('configTabsContainer'); },
  get configTabsHeader() { return getById('configTabsHeader'); },
  get configTabsBody()   { return getById('configTabsBody'); },
  get downloadZipBtn()   { return getById('downloadZipBtn'); },
};

// ═══════════════════════════════════════════════════════════
// Notifications
// ═══════════════════════════════════════════════════════════
function showNotification(message, type = 'success') {
  document.querySelectorAll('.notification').forEach(el => el.remove());

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  if (currentLang === 'fa') notification.classList.add('rtl-text');
  notification.textContent = message;

  Object.assign(notification.style, {
    position: 'fixed', top: '20px', right: '20px',
    padding: '1rem 1.5rem', borderRadius: '1rem',
    color: 'white', fontWeight: '600', zIndex: '10000',
    opacity: '0', transform: 'translateX(100%)',
    transition: 'all 0.3s ease', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 8px 32px rgba(31,38,135,0.37)',
    textAlign: currentLang === 'fa' ? 'right' : 'left',
    maxWidth: '360px', wordBreak: 'break-word'
  });

  const bg = {
    success: 'linear-gradient(135deg,#00d4aa 0%,#00b4d8 100%)',
    error:   'linear-gradient(135deg,#ff6b6b 0%,#c46539 100%)',
    info:    'linear-gradient(135deg,#667eea 0%,#764ba2 100%)'
  };
  notification.style.background = bg[type] || bg.success;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 3500);
}

// ═══════════════════════════════════════════════════════════
// Theme Toggle
// ═══════════════════════════════════════════════════════════
function initTheme() {
  const saved = localStorage.getItem(LS_THEME) || 'dark';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem(LS_THEME, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ═══════════════════════════════════════════════════════════
// Persist / Restore Settings (localStorage)
// ═══════════════════════════════════════════════════════════
function persistSettings() {
  // Junk mode
  const junkMode = getBySelector('input[name="junk"]:checked')?.id || 'junk1';
  localStorage.setItem(LS_JUNK_MODE, junkMode);

  // Amnezia 1.5
  const a15 = getById('enableAmnezia15')?.checked || false;
  localStorage.setItem(LS_AMNEZIA15, a15 ? '1' : '0');

  // Randomize per config
  const rpc = getById('randomizePerConfig')?.checked || false;
  localStorage.setItem(LS_RANDOMIZE_PC, rpc ? '1' : '0');

  // Wiresock
  localStorage.setItem(LS_WS_ID, getById('ws_id')?.value || '');
  localStorage.setItem(LS_WS_IP, getById('ws_ip')?.value || 'QUIC');
  localStorage.setItem(LS_WS_IB, getById('ws_ib')?.value || 'Chrome');
}

function restoreSettings() {
  // Junk mode
  const junkMode = localStorage.getItem(LS_JUNK_MODE);
  if (junkMode) {
    const el = getById(junkMode);
    if (el) el.checked = true;
  }

  // Amnezia 1.5
  const a15 = localStorage.getItem(LS_AMNEZIA15);
  if (a15 === '1') {
    const cb = getById('enableAmnezia15');
    if (cb) { cb.checked = true; toggleAmnezia15(); }
  }

  // Randomize per config
  const rpc = localStorage.getItem(LS_RANDOMIZE_PC);
  if (rpc === '1') {
    const cb = getById('randomizePerConfig');
    if (cb) cb.checked = true;
  }

  // Wiresock
  const wsId = localStorage.getItem(LS_WS_ID);
  if (wsId !== null) {
    const el = getById('ws_id');
    if (el) el.value = wsId;
  }
  const wsIp = localStorage.getItem(LS_WS_IP);
  if (wsIp) {
    const el = getById('ws_ip');
    if (el) el.value = wsIp;
  }
  const wsIb = localStorage.getItem(LS_WS_IB);
  if (wsIb) {
    const el = getById('ws_ib');
    if (el) el.value = wsIb;
  }

  validateConvertButton();
}

// ═══════════════════════════════════════════════════════════
// Drag-and-Drop Support
// ═══════════════════════════════════════════════════════════
function setupDragAndDrop() {
  const uploadLabel = getById('fileUploadLabel');
  const textarea    = elements.confInput;

  // ── Upload label drop zone ────────────────────────────
  ['dragenter', 'dragover'].forEach(evt => {
    uploadLabel.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadLabel.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(evt => {
    uploadLabel.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadLabel.classList.remove('drag-over');
    });
  });

  uploadLabel.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (!files.length) return;

    // Filter .conf files
    const confFiles = Array.from(files).filter(f =>
      f.name.endsWith('.conf') || f.type === '' || f.type === 'text/plain'
    );

    if (!confFiles.length) {
      showNotification('Please drop .conf files only', 'error');
      return;
    }

    // Inject into file input via DataTransfer
    try {
      const dt = new DataTransfer();
      confFiles.forEach(f => dt.items.add(f));
      elements.wgFiles.files = dt.files;
      handleFileChange({ target: elements.wgFiles });
    } catch {
      // Fallback: read files manually
      readDroppedFiles(confFiles);
    }
  });

  // ── Textarea drop zone ────────────────────────────────
  ['dragenter', 'dragover'].forEach(evt => {
    textarea.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      textarea.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(evt => {
    textarea.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      textarea.classList.remove('drag-over');
    });
  });

  textarea.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (!files.length) return;

    const confFiles = Array.from(files).filter(f =>
      f.name.endsWith('.conf') || f.type === '' || f.type === 'text/plain'
    );

    if (!confFiles.length) {
      // Let the user drop text
      return;
    }

    readDroppedFiles(confFiles);
  });
}

function readDroppedFiles(files) {
  let combined = '';
  let loaded   = 0;

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      combined += String(reader.result).trim() + '\n\n';
      loaded++;
      if (loaded === files.length) {
        elements.confInput.value    = combined.trim();
        elements.confInput.disabled = false;
        elements.confInput.style.opacity = '1';
        elements.confInput.style.cursor  = 'text';
        elements.fileList.innerHTML = files.map(f => f.name).join(', ');
        updateFileLabel();
      }
    };
    reader.readAsText(file);
  });
}

// ═══════════════════════════════════════════════════════════
// Config Validation / Linting
// ═══════════════════════════════════════════════════════════

/** Base64 key validation (WireGuard 32-byte keys = 44-char base64) */
function isValidWGKey(key) {
  if (!key) return false;
  return /^[A-Za-z0-9+/]{43}=$/.test(key);
}

/** CIDR / IP validation */
function isValidIP(ip) {
  return /^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/.test(ip.trim()) ||
         /^[0-9a-fA-F:]+\/\d{1,3}$/.test(ip.trim());
}

/** host:port validation */
function isValidEndpoint(ep) {
  if (!ep) return false;
  // IPv6 bracket notation
  if (ep.startsWith('[')) return /^$.+$:\d+$/.test(ep);
  const parts = ep.split(':');
  return parts.length === 2 && parts[1] && !isNaN(parseInt(parts[1]));
}

function validateWGConfig(wgConfig, label) {
  const issues = [];
  const iface  = wgConfig.interface || {};
  const peer   = wgConfig.peers?.[0] || {};

  if (!iface.privatekey) {
    issues.push({ level: 'error', msg: `[${label}] Missing PrivateKey in [Interface]` });
  } else if (!isValidWGKey(iface.privatekey)) {
    issues.push({ level: 'error', msg: `[${label}] PrivateKey appears malformed (expected 44-char base64)` });
  }

  if (!peer.publickey) {
    issues.push({ level: 'error', msg: `[${label}] Missing PublicKey in [Peer]` });
  } else if (!isValidWGKey(peer.publickey)) {
    issues.push({ level: 'error', msg: `[${label}] PublicKey appears malformed (expected 44-char base64)` });
  }

  if (!peer.endpoint) {
    issues.push({ level: 'error', msg: `[${label}] Missing Endpoint in [Peer]` });
  } else if (!isValidEndpoint(peer.endpoint)) {
    issues.push({ level: 'error', msg: `[${label}] Endpoint "${peer.endpoint}" is malformed (expected host:port)` });
  }

  if (!peer.allowedips) {
    issues.push({ level: 'warning', msg: `[${label}] Missing AllowedIPs in [Peer]` });
  } else {
    const invalidIPs = peer.allowedips.split(',')
      .map(s => s.trim())
      .filter(ip => ip && !isValidIP(ip));
    if (invalidIPs.length) {
      issues.push({ level: 'warning', msg: `[${label}] Possibly malformed AllowedIPs: ${invalidIPs.join(', ')}` });
    }
  }

  if (!iface.address) {
    issues.push({ level: 'warning', msg: `[${label}] Missing Address in [Interface]` });
  }

  if (peer.presharedKey && !isValidWGKey(peer.presharedKey)) {
    issues.push({ level: 'warning', msg: `[${label}] PresharedKey appears malformed` });
  }

  return issues;
}

function renderValidationPanel(allIssues) {
  const panel = elements.validationPanel;

  if (!allIssues.length) {
    panel.classList.add('hidden');
    panel.innerHTML = '';
    return;
  }

  panel.classList.remove('hidden');
  panel.innerHTML = allIssues.map(issue => {
    const icon = issue.level === 'error' ? '✖' : issue.level === 'warning' ? '⚠' : '✔';
    return `<div class="validation-item ${issue.level}">
      <span class="validation-icon">${icon}</span>
      <span class="validation-text">${escapeHtml(issue.msg)}</span>
    </div>`;
  }).join('');
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function runValidationOnInput() {
  const text = elements.confInput?.value?.trim();
  if (!text) {
    renderValidationPanel([]);
    return;
  }

  try {
    const configs = parseMultipleWGConfigs(text);
    const issues  = configs.flatMap((cfg, idx) =>
      validateWGConfig(cfg, configs.length === 1 ? 'Config' : `Config ${idx + 1}`)
    );
    renderValidationPanel(issues);
  } catch {
    renderValidationPanel([]);
  }
}

// ═══════════════════════════════════════════════════════════
// Configuration Generators
// ═══════════════════════════════════════════════════════════

/** If randomizePerConfig is on, generate unique junk values; otherwise use shared settings */
function generateJunkValues(usePerConfigRandom = false) {
  if (usePerConfigRandom) {
    const jc   = getRandomInt(1, 128);
    const jmin = getRandomInt(1, 1279);
    const jmax = getRandomInt(jmin + 1, 1280);
    return { jc, jmin, jmax };
  }

  const selectedOption = getBySelector('input[name="junk"]:checked')?.id;
  const configs = {
    junk1: { jc: 3,   jmin: 1,    jmax: 3   },
    junk2: { jc: 5,   jmin: 10,   jmax: 40  },
    junk3: {
      jc:   parseInt(getById('jc1')?.value)   || 128,
      jmin: parseInt(getById('jmin1')?.value) || 1279,
      jmax: parseInt(getById('jmax1')?.value) || 1280
    }
  };
  const cfg = configs[selectedOption] || configs.junk3;
  if (cfg.jmax <= cfg.jmin) cfg.jmax = cfg.jmin + 1;
  return cfg;
}

function generateAmneziaDefaults(usePerConfigRandom = false) {
  const junkValues = generateJunkValues(usePerConfigRandom);

  const result = {
    ...junkValues,
    s1: 0, s2: 0,
    h1: 1, h2: 2, h3: 3, h4: 4
  };

  const isVersion15Enabled = getById('enableAmnezia15')?.checked;
  if (isVersion15Enabled) {
    result.i1 = getById('i1_1')?.value || '<b 0xc70000000108ce1bf31eec7d93360000449e227e4596ed7f75c4d35ce31880b4133107c822c6355b51f0d7c1bba96d5c210a48aca01885fed0871cfc37d59137d73b506dc013bb4a13c060ca5b04b7ae215af71e37d6e8ff1db235f9fe0c25cb8b492471054a7c8d0d6077d430d07f6e87a8699287f6e69f54263c7334a8e144a29851429bf2e350e519445172d36953e96085110ce1fb641e5efad42c0feb4711ece959b72cc4d6f3c1e83251adb572b921534f6ac4b10927167f41fe50040a75acef62f45bded67c0b45b9d655ce374589cad6f568b8475b2e8921ff98628f86ff2eb5bcce6f3ddb7dc89e37c5b5e78ddc8d93a58896e530b5f9f1448ab3b7a1d1f24a63bf981634f6183a21af310ffa52e9ddf5521561760288669de01a5f2f1a4f922e68d0592026bbe4329b654d4f5d6ace4f6a23b8560b720a5350691c0037b10acfac9726add44e7d3e880ee6f3b0d6429ff33655c297fee786bb5ac032e48d2062cd45e305e6d8d8b82bfbf0fdbc5ec09943d1ad02b0b5868ac4b24bb10255196be883562c35a713002014016b8cc5224768b3d330016cf8ed9300fe6bf39b4b19b3667cddc6e7c7ebe4437a58862606a2a66bd4184b09ab9d2cd3d3faed4d2ab71dd821422a9540c4c5fa2a9b2e6693d411a22854a8e541ed930796521f03a54254074bc4c5bca152a1723260e7d70a24d49720acc544b41359cfc252385bda7de7d05878ac0ea0343c77715e145160e6562161dfe2024846dfda3ce99068817a2418e66e4f37dea40a21251c8a034f83145071d93baadf050ca0f95dc9ce2338fb082d64fbc8faba905cec66e65c0e1f9b003c32c943381282d4ab09bef9b6813ff3ff5118623d2617867e25f0601df583c3ac51bc6303f79e68d8f8de4b8363ec9c7728b3ec5fcd5274edfca2a42f2727aa223c557afb33f5bea4f64aeb252c0150ed734d4d8eccb257824e8e090f65029a3a042a51e5cc8767408ae07d55da8507e4d009ae72c47ddb138df3cab6cc023df2532f88fb5a4c4bd917fafde0f3134be09231c389c70bc55cb95a779615e8e0a76a2b4d943aabfde0e394c985c0cb0376930f92c5b6998ef49ff4a13652b787503f55c4e3d8eebd6e1bc6db3a6d405d8405bd7a8db7cefc64d16e0d105a468f3d33d29e5744a24c4ac43ce0eb1bf6b559aed520b91108cda2de6e2c4f14bc4f4dc58712580e07d217c8cca1aaf7ac04bab3e7b1008b966f1ed4fba3fd93a0a9d3a27127e7aa587fbcc60d548300146bdc126982a58ff5342fc41a43f83a3d2722a26645bc961894e339b953e78ab395ff2fb854247ad06d446cc2944a1aefb90573115dc198f5c1efbc22bc6d7a74e41e666a643d5f85f57fde81b87ceff95353d22ae8bab11684180dd142642894d8dc34e402f802c2fd4a73508ca99124e428d67437c871dd96e506ffc39c0fc401f666b437adca41fd563cbcfd0fa22fbbf8112979c4e677fb533d981745cceed0fe96da6cc0593c430bbb71bcbf924f70b4547b0bb4d41c94a09a9ef1147935a5c75bb2f721fbd24ea6a9f5c9331187490ffa6d4e34e6bb30c2c54a0344724f01088fb2751a486f425362741664efb287bce66c4a544c96fa8b124d3c6b9eaca170c0b530799a6e878a57f402eb0016cf2689d55c76b2a91285e2273763f3afc5bc9398273f5338a06d>';
    result.i2 = getById('i2_1')?.value || '';
    result.i3 = getById('i3_1')?.value || '';
    result.i4 = getById('i4_1')?.value || '';
    result.i5 = getById('i5_1')?.value || '';
  }

  return result;
}

function generateWiresocketDefaults() {
  const isLight = getById('ws_junk1')?.checked;
  const isHeavy = getById('ws_junk2')?.checked;

  let jc, jmin, jmax;
  if (isLight)      { jc = 3;   jmin = 1;    jmax = 3;  }
  else if (isHeavy) { jc = 5;   jmin = 10;   jmax = 40; }
  else {
    jc   = parseInt(getById('ws_jc1')?.value)   || 128;
    jmin = parseInt(getById('ws_jmin1')?.value) || 1279;
    jmax = parseInt(getById('ws_jmax1')?.value) || 1280;
  }
  if (jmax <= jmin) jmax = jmin + 1;

  return {
    jc, jmin, jmax,
    s1: 0, s2: 0,
    h1: 1, h2: 2, h3: 3, h4: 4,
    id: getById('ws_id')?.value  || '',
    ip: getById('ws_ip')?.value  || 'QUIC',
    ib: getById('ws_ib')?.value  || 'Chrome'
  };
}

// ═══════════════════════════════════════════════════════════
// Configuration Parsers
// ═══════════════════════════════════════════════════════════
function parseWGConfig(text) {
  const config = { interface: { amneziaOptions: {} }, peers: [] };
  let currentSection = null;

  for (const line of text.split('\n')) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (currentSection === 'peer' && trimmedLine.startsWith('#')) {
      const nameMatch = trimmedLine.match(/#\s*(.+)/);
      if (nameMatch && config.peers.length > 0)
        config.peers[config.peers.length - 1].name = nameMatch[1].trim();
      continue;
    }

    if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
      currentSection = trimmedLine.slice(1, -1).toLowerCase();
      if (currentSection === 'peer') config.peers.push({ amneziaOptions: {} });
      continue;
    }

    const equalIndex = trimmedLine.indexOf('=');
    if (equalIndex === -1) continue;

    const key   = trimmedLine.slice(0, equalIndex).trim().toLowerCase();
    const value = trimmedLine.slice(equalIndex + 1).trim();

    if (currentSection === 'interface') {
      const target = [...AMNEZIA_KEYS, ...AMNEZIA15_KEYS, 'id', 'ip', 'ib'].includes(key)
        ? config.interface.amneziaOptions
        : config.interface;
      target[key] = value;
    } else if (currentSection === 'peer' && config.peers.length > 0) {
      const peer = config.peers[config.peers.length - 1];
      if ([...AMNEZIA_KEYS, ...AMNEZIA15_KEYS, 'id', 'ip', 'ib'].includes(key)) {
        peer.amneziaOptions[key] = value;
      } else if (key === 'presharedkey') {
        peer.presharedKey = value;
      } else {
        peer[key] = value;
      }
    }
  }

  return config;
}

function parseMultipleWGConfigs(text) {
  return text.split(/\n(?=$Interface$)/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => parseWGConfig(p));
}

// ═══════════════════════════════════════════════════════════
// Proxy Conversion
// ═══════════════════════════════════════════════════════════
function convertToProxy(wgConfig, fileName, format = 'clash', usePerConfigRandom = false) {
  const { interface: ifaceData, peers } = wgConfig;
  const peerData = peers[0];

  if (!peerData?.endpoint) throw new Error('Missing peer endpoint');

  const colonIdx = peerData.endpoint.lastIndexOf(':');
  const server   = peerData.endpoint.slice(0, colonIdx);
  const port     = peerData.endpoint.slice(colonIdx + 1);
  const dnsList  = ifaceData.dns ? ifaceData.dns.split(',').map(d => d.trim()) : [];

  let options = {};

  if (format === 'wiresocket') {
    options = generateWiresocketDefaults();
    options.id = ifaceData.amneziaOptions.id || peerData.amneziaOptions?.id || options.id;
    options.ip = ifaceData.amneziaOptions.ip || peerData.amneziaOptions?.ip || options.ip;
    options.ib = ifaceData.amneziaOptions.ib || peerData.amneziaOptions?.ib || options.ib;
  } else {
    options = generateAmneziaDefaults(usePerConfigRandom);
    for (const key of AMNEZIA15_KEYS) {
      const v = ifaceData.amneziaOptions[key] || peerData.amneziaOptions?.[key];
      if (v) options[key] = v;
    }
    for (const key of AMNEZIA_KEYS) {
      const v = ifaceData.amneziaOptions[key] || peerData.amneziaOptions?.[key];
      if (v) options[key] = v;
    }
  }

  let proxyName    = peerData.name || fileName.replace('.conf', '');
  const originalName = proxyName;

  if (!proxyName) {
    proxyName = `Random_${Math.random().toString(36).substr(2, 5)}`;
  } else {
    // 1. Clean up known garbage strings first
    proxyName = proxyName.replace(/FREE#?/gi, '').trim();

    // 2. Normalize numbers, brackets, and common delimiters to clean spaces
    // This turns "de1" into "de ", and "[pl4]" into " pl "
    const isolatedTokens = proxyName
      .replace(/[\[\]\(\)\{\}\-_]/g, ' ')
      .replace(/\d+/g, ' '); // Drops trailing digits so "de1" becomes "de"

    // 3. Extract all isolated 2-letter alphabetic clusters
    const candidates = isolatedTokens.match(/\b[a-zA-Z]{2}\b/g);
    
    if (candidates) {
      // Find the first token that matches a valid code in your COUNTRY_FLAGS mapping
      const validCountryCode = candidates
        .map(code => code.toUpperCase())
        .find(code => COUNTRY_FLAGS[code]);

      if (validCountryCode) {
        // Isolate the emoji flag (e.g. "🇩🇪")
        const flagEmoji = COUNTRY_FLAGS[validCountryCode].split(' ')[0];
        
        // Strip the country code text out of the original string to avoid repetition
        // dynamically accounts for surrounding symbols
        const cleanRegex = new RegExp(`[\\s\\[\\(-\\_\\]]*${validCountryCode}[\\s\\]\\)-\\_\\]]*`, 'i');
        let beautifullyCleanedName = proxyName.replace(cleanRegex, ' ').replace(/\s+/g, ' ').trim();
        
        // Fallback if stripping the country text leaves an empty name or just a hanging character
        if (!beautifullyCleanedName || beautifullyCleanedName === '-') {
          beautifullyCleanedName = originalName.replace('.conf', '');
        }

        // Apply flag prefix
        proxyName = `${flagEmoji} ${beautifullyCleanedName}`;
      }
    }

    // Final sweep to remove trailing dangling characters
    proxyName = proxyName.replace(/[-\s_]+$/, '').trim();
  }


  const result = {
    name: proxyName,
    originalName,
    type: "wireguard",
    server: server.replace(/^$|$$/g, ''), // strip IPv6 brackets for display
    serverRaw: server, // keep raw for endpoint reconstruction
    port: parseInt(port),
    ip: ifaceData.address,
    private_key: ifaceData.privatekey,
    public_key: peerData.publickey,
    preshared_key: peerData.presharedKey,
    allowed_ips: peerData.allowedips
      ? peerData.allowedips.split(',').map(ip => `'${ip.trim()}'`)
      : [],
    udp: true,
    mtu: 1420,
    remote_dns_resolve: true,
    dns: dnsList,
    isDefaultAmnezia: !(ifaceData.amneziaOptions.jc || peerData.amneziaOptions?.jc)
  };

  if (format === 'wiresocket') {
    result['wiresocket-options'] = options;
  } else {
    result['amnezia-options'] = options;
  }

  return result;
}

// ═══════════════════════════════════════════════════════════
// YAML / Config Generators
// ═══════════════════════════════════════════════════════════
function generateAmneziaOptionsYAML(options) {
  const entries = Object.entries(options)
    .filter(([key, value]) => value !== undefined && value !== '' &&
      [...AMNEZIA_KEYS, ...AMNEZIA15_KEYS].includes(key))
    .map(([key, value]) => `    ${key}: ${value}`)
    .join('\n');
  return entries ? `  amnezia-wg-option:\n${entries}\n` : '';
}

function generateProxyGroups(proxies) {
  if (!proxies.length) return '';
  const proxyNames = proxies.map(p => `    - ${p.name}`).join('\n');
  return `
- name: DPI
  type: select
  icon: https://raw.githubusercontent.com/zaeboba/page/refs/heads/main/archive/wireguard.svg
  proxies:
${proxyNames}
  url: 'http://speed.cloudflare.com/'
  unified-delay: true
  interval: 300`;
}

// ── Clash ───────────────────────────────────────────────
function generateClashYaml() {
  if (!proxyList.length) {
    showNotification(translations['could_not_process_files'] || 'Could not process files', 'error');
    return;
  }

  const yamlProxies = proxyList.map(proxy => {
    const parts = [
      `- name: ${proxy.name}`,
      `  type: ${proxy.type}`,
      `  server: ${proxy.server}`,
      `  port: ${proxy.port}`,
      `  ip: ${proxy.ip}`,
      `  private-key: ${proxy.private_key}`,
      `  public-key: ${proxy.public_key}`
    ];
    if (proxy.preshared_key) parts.push(`  pre-shared-key: ${proxy.preshared_key}`);
    parts.push(
      `  allowed-ips: [${proxy.allowed_ips.join(', ')}]`,
      `  udp: ${proxy.udp}`,
      `  mtu: ${proxy.mtu}`,
      `  remote-dns-resolve: ${proxy.remote_dns_resolve}`,
      `  dns: [${proxy.dns.join(', ')}]`,
      generateAmneziaOptionsYAML(proxy['amnezia-options'])
    );
    return parts.join('\n');
  }).join('\n');

  const fullYaml = `proxies:\n${yamlProxies}\nproxy-groups:${generateProxyGroups(proxyList)}`;

  // Clash = single YAML, use tabs UI with one tab for each proxy + a combined tab
  buildTabsUI(
    proxyList,
    (proxy) => {
      const singleYaml = (() => {
        const parts = [
          `- name: ${proxy.name}`,
          `  type: ${proxy.type}`,
          `  server: ${proxy.server}`,
          `  port: ${proxy.port}`,
          `  ip: ${proxy.ip}`,
          `  private-key: ${proxy.private_key}`,
          `  public-key: ${proxy.public_key}`
        ];
        if (proxy.preshared_key) parts.push(`  pre-shared-key: ${proxy.preshared_key}`);
        parts.push(
          `  allowed-ips: [${proxy.allowed_ips.join(', ')}]`,
          `  udp: ${proxy.udp}`,
          `  mtu: ${proxy.mtu}`,
          `  remote-dns-resolve: ${proxy.remote_dns_resolve}`,
          `  dns: [${proxy.dns.join(', ')}]`,
          generateAmneziaOptionsYAML(proxy['amnezia-options'])
        );
        return parts.join('\n');
      })();
      return singleYaml;
    },
    fullYaml,
    {
      downloadAll:    () => downloadYAML(fullYaml, 'clash-config.yaml'),
      downloadSingle: (proxy, content, idx) => downloadYAML(content, `${getAWGFileName(proxy, idx).replace('.conf', '.yaml')}`),
      showZip:        false,
      showQR:         false,
      format:         'clash'
    }
  );
}

// ── AmneziaWG ───────────────────────────────────────────
function generateAWGYaml() {
  if (!proxyList.length) {
    showNotification(translations['could_not_process_files'] || 'Could not process files', 'error');
    return;
  }

  const contents = proxyList.map(p => generateSingleAWGConfig(p));
  const combined = contents.join('\n\n');

  buildTabsUI(
    proxyList,
    (proxy, idx) => generateSingleAWGConfig(proxy),
    combined,
    {
      downloadAll:    downloadAWGConfigs,
      downloadSingle: (proxy, content, idx) => downloadYAML(content, getAWGFileName(proxy, idx)),
      showZip:        false,
      showQR:         true,
      format:         'awg'
    }
  );
}

function generateSingleAWGConfig(proxy) {
  const options = proxy['amnezia-options'] || {};
  const lines = [
    `# ${proxy.originalName || 'Unnamed config'}`,
    `[Interface]`,
    `PrivateKey = ${proxy.private_key}`,
    `Address = ${proxy.ip}`
  ];
  if (proxy.dns?.length) lines.push(`DNS = ${proxy.dns.join(', ')}`);
  lines.push(`MTU = ${proxy.mtu}`);
  lines.push(
    `Jc = ${options.jc ?? 128}`,
    `Jmin = ${options.jmin ?? 1279}`,
    `Jmax = ${options.jmax ?? 1280}`,
    `S1 = ${options.s1 ?? 0}`,
    `S2 = ${options.s2 ?? 0}`,
    `H1 = ${options.h1 ?? 1}`,
    `H2 = ${options.h2 ?? 2}`,
    `H3 = ${options.h3 ?? 3}`,
    `H4 = ${options.h4 ?? 4}`
  );
  if (options.i1) lines.push(`I1 = ${options.i1}`);
  if (options.i2) lines.push(`I2 = ${options.i2}`);
  if (options.i3) lines.push(`I3 = ${options.i3}`);
  if (options.i4) lines.push(`I4 = ${options.i4}`);
  if (options.i5) lines.push(`I5 = ${options.i5}`);
  lines.push(``, `[Peer]`, `PublicKey = ${proxy.public_key}`);
  if (proxy.preshared_key) lines.push(`PresharedKey = ${proxy.preshared_key}`);
  lines.push(
    `AllowedIPs = ${proxy.allowed_ips.join(', ').replace(/'/g, '')}`,
    `Endpoint = ${proxy.serverRaw || proxy.server}:${proxy.port}`
  );
  return lines.join('\n');
}

// ── Wiresocket ──────────────────────────────────────────
function generateWiresocketConfigs() {
  if (!proxyList.length) {
    showNotification(translations['could_not_process_files'] || 'Could not process files', 'error');
    return;
  }

  const combined = proxyList.map(p => generateSingleWiresocketConfig(p)).join('\n\n');

  buildTabsUI(
    proxyList,
    (proxy) => generateSingleWiresocketConfig(proxy),
    combined,
    {
      downloadAll:    downloadWiresocketConfigs,
      downloadSingle: (proxy, content, idx) => downloadYAML(content, getAWGFileName(proxy, idx).replace('.conf', '-wiresock.conf')),
      showZip:        false,
      showQR:         false,
      format:         'wiresocket'
    }
  );
}

function generateSingleWiresocketConfig(proxy) {
  const options = proxy['wiresocket-options'] || {};
  const lines = [
    `# ${proxy.originalName || 'Unnamed config'}`,
    `[Interface]`,
    `PrivateKey = ${proxy.private_key}`,
    `Address = ${proxy.ip}`
  ];
  if (proxy.dns?.length) lines.push(`DNS = ${proxy.dns.join(', ')}`);
  lines.push(`MTU = ${proxy.mtu}`);
  lines.push(
    `Jc = ${options.jc ?? 128}`,
    `Jmin = ${options.jmin ?? 1279}`,
    `Jmax = ${options.jmax ?? 1280}`,
    `S1 = ${options.s1 ?? 0}`,
    `S2 = ${options.s2 ?? 0}`,
    `H1 = ${options.h1 ?? 1}`,
    `H2 = ${options.h2 ?? 2}`,
    `H3 = ${options.h3 ?? 3}`,
    `H4 = ${options.h4 ?? 4}`
  );
  if (options.id) lines.push(`Id = ${options.id}`);
  if (options.ip) lines.push(`Ip = ${options.ip}`);
  if (options.ib) lines.push(`Ib = ${options.ib}`);
  lines.push(``, `[Peer]`, `PublicKey = ${proxy.public_key}`);
  if (proxy.preshared_key) lines.push(`PresharedKey = ${proxy.preshared_key}`);
  lines.push(
    `AllowedIPs = ${proxy.allowed_ips.join(', ').replace(/'/g, '')}`,
    `Endpoint = ${proxy.serverRaw || proxy.server}:${proxy.port}`
  );
  return lines.join('\n');
}

// ═══════════════════════════════════════════════════════════
// Tabbed Per-Config UI
// ═══════════════════════════════════════════════════════════
function buildTabsUI(proxies, contentFn, combinedContent, opts) {
  const { downloadAll, downloadSingle, showZip, showQR, format } = opts;

  // Hide legacy output
  elements.yamlOutput.classList.add('hidden');
  const legacyContainer = getById('legacyBtnContainer');
  if (legacyContainer) legacyContainer.style.display = 'none';

  // Show tab container
  elements.configTabsContainer.classList.remove('hidden');

  // Build tab buttons
  elements.configTabsHeader.innerHTML = '';
  elements.configTabsBody.innerHTML   = '';

  proxies.forEach((proxy, idx) => {
    const content   = contentFn(proxy, idx);
    const shortName = (proxy.originalName || `Config ${idx + 1}`)
      .replace(/[^a-z0-9 _-]/gi, '').trim().slice(0, 18) || `Config ${idx + 1}`;

    // Tab button
    const tabBtn = document.createElement('button');
    tabBtn.className    = `config-tab-btn${idx === 0 ? ' active' : ''}`;
    tabBtn.textContent  = shortName;
    tabBtn.title        = proxy.originalName || `Config ${idx + 1}`;
    tabBtn.dataset.idx  = idx;
    tabBtn.addEventListener('click', () => activateTab(idx));
    elements.configTabsHeader.appendChild(tabBtn);

    // Tab pane
    const pane = document.createElement('div');
    pane.className = `config-tab-pane${idx === 0 ? ' active' : ''}`;
    pane.dataset.idx = idx;

    const ta = document.createElement('textarea');
    ta.value       = content;
    ta.spellcheck  = false;
    ta.autocomplete = 'off';
    ta.autocorrect  = 'off';
    ta.autocapitalize = 'off';
    pane.appendChild(ta);

    // Pane action buttons
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'config-tab-pane-actions';

  // Download single
    const dlBtn = document.createElement('button');
    dlBtn.className   = 'download-btn';
    dlBtn.setAttribute('data-i18n', 'download'); // Add data-i18n attribute
    dlBtn.innerHTML   = `Download`;
    dlBtn.addEventListener('click', () => {
      downloadSingle(proxy, ta.value, idx);
    });
    actionsDiv.appendChild(dlBtn);

    // Copy single
    const cpBtn = document.createElement('button');
    cpBtn.className   = 'download-btn';
    cpBtn.setAttribute('data-i18n', 'copy'); // Add data-i18n attribute
    cpBtn.innerHTML   = `Copy`;
    cpBtn.addEventListener('click', () => copyToClipboard(ta.value));
    actionsDiv.appendChild(cpBtn);

    // QR button (Only for formats that don't balloon data payload size)
    const isAmneziaActive = getById('enableAmnezia15')?.checked;
    if (showQR && !isAmneziaActive) {
      const qrBtn = document.createElement('button');
      qrBtn.className = 'download-btn qr-btn';
      qrBtn.innerHTML = `QR Code`;
      qrBtn.addEventListener('click', () => showQRModal(ta.value, proxy.originalName || `Config ${idx + 1}`));
      actionsDiv.appendChild(qrBtn);
    }

    pane.appendChild(actionsDiv);
    elements.configTabsBody.appendChild(pane);
  });

  // Global action buttons
  const dlBtn = getById('downloadBtn');
  const cpBtn = getById('copyBtn');
  const zipBtn = getById('downloadZipBtn');

  dlBtn.style.display = 'flex';
  cpBtn.style.display = 'flex';
  zipBtn.style.display = showZip ? 'flex' : 'none';
  dlBtn.onclick = downloadAll;
  cpBtn.onclick = () => copyToClipboard(combinedContent);
  zipBtn.onclick = () => downloadZIP(proxies, contentFn, format);

  // Show wrappers only if more than 1 config was converted
  const actionsHeader = getBySelector('.config-tabs-actions-header');
  const actionsFooter = getBySelector('.config-tabs-actions');
  const hasMultipleConfigs = proxies.length > 1;

  if (actionsHeader) actionsHeader.style.display = hasMultipleConfigs ? 'flex' : 'none';
  if (actionsFooter) actionsFooter.style.display = hasMultipleConfigs ? 'flex' : 'none';

  // Translate the freshly injected individual action buttons
  loadLanguage(currentLang);
}

function activateTab(idx) {
  getAllBySelector('.config-tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
  });
  getAllBySelector('.config-tab-pane').forEach((pane, i) => {
    pane.classList.toggle('active', i === idx);
  });
}

// ═══════════════════════════════════════════════════════════
// QR Code Modal
// ═══════════════════════════════════════════════════════════
function showQRModal(configText, title) {
    const modal     = getById('qrModal');
    const container = getById('qrCodeContainer');
    const titleEl   = getById('qrModalTitle');
    
    // Check if the classic QRCode library is loaded
    if (!modal || !container || typeof QRCode === 'undefined' || typeof QRCode.CorrectLevel === 'undefined') {
        showNotification('QRCode library not loaded. Please check the <script> tag in index.html', 'error');
        return;
    }
    
    container.innerHTML = '';
    titleEl.textContent = title || 'QR Code';
    
    try {
        // FIX: Normalize line endings and trim whitespace to save precious QR code bytes
        const cleanText = String(configText).replace(/\r\n/g, '\n').trim();
        
        new QRCode(container, {
            text:          cleanText,
            width:         256,
            height:        256,
            colorDark:     '#000000',
            colorLight:    '#ffffff',
            correctLevel:  QRCode.CorrectLevel.L // 'L' holds the maximum amount of data
        });
    } catch (err) {
        console.error("QR Code Generation Error:", err);
        
        let errMsg = "Failed to generate QR code.";
        // Catch the specific qrcodejs overflow error
        if (err.message && err.message.includes('code length overflow')) {
            errMsg = "Config exceeds the maximum physical limit of a QR code (~2900 bytes).<br><br>This is almost always caused by the massive Amnezia 'I1' parameter. Try disabling 'Enable Amnezia 1.5' or use the Download/ZIP feature instead.";
        }
        
        container.innerHTML = `<p style="color:var(--danger);font-size:0.85rem;padding:1rem;text-align:center;line-height:1.5;"> ${errMsg} </p>`;
    }
    
    modal.classList.remove('hidden');
}

function setupQRModal() {
  const modal    = getById('qrModal');
  const closeBtn = getById('qrModalClose');

  if (!modal) return;

  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

// ═══════════════════════════════════════════════════════════
// ZIP Download
// ═══════════════════════════════════════════════════════════
async function downloadZIP(proxies, contentFn, format) {
  if (typeof JSZip === 'undefined') {
    showNotification('JSZip library not loaded', 'error');
    return;
  }
  if (!proxies.length) return;

  const zip = new JSZip();

  proxies.forEach((proxy, idx) => {
    try {
      const content  = contentFn(proxy, idx);
      const baseName = format === 'wiresocket'
        ? getAWGFileName(proxy, idx).replace('.conf', '-wiresock.conf')
        : format === 'clash'
          ? getAWGFileName(proxy, idx).replace('.conf', '.yaml')
          : getAWGFileName(proxy, idx);
      zip.file(baseName, content);
    } catch (err) {
      console.error(`ZIP: skipping config ${idx + 1}:`, err);
    }
  });

  try {
    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `wg-configs-${format}.zip`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
    showNotification(`Downloaded ${proxies.length} configs as ZIP`);
  } catch (err) {
    showNotification('Failed to create ZIP: ' + err.message, 'error');
  }
}

// ═══════════════════════════════════════════════════════════
// File Operations
// ═══════════════════════════════════════════════════════════
function downloadYAML(content, fileName) {
  const blob = new Blob([content], { type: 'text/plain; charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href     = url;
  link.download = fileName || 'config.conf';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => { document.body.removeChild(link); URL.revokeObjectURL(url); }, 100);
}

function downloadAWGConfigs() {
  if (!proxyList.length) return;

  // Use ZIP if multiple, else single download
  if (proxyList.length > 1) {
    downloadZIP(proxyList, (proxy) => generateSingleAWGConfig(proxy), 'awg');
  } else {
    const content  = generateSingleAWGConfig(proxyList[0]);
    const fileName = getAWGFileName(proxyList[0], 0);
    downloadYAML(content, fileName);
  }
}

function downloadWiresocketConfigs() {
  if (!proxyList.length) return;

  if (proxyList.length > 1) {
    downloadZIP(proxyList, (proxy) => generateSingleWiresocketConfig(proxy), 'wiresocket');
  } else {
    const content  = generateSingleWiresocketConfig(proxyList[0]);
    const fileName = getAWGFileName(proxyList[0], 0).replace('.conf', '-wiresock.conf');
    downloadYAML(content, fileName);
  }
}

function getAWGFileName(proxy, index) {
  // Fallback if proxy name is somehow missing
  let baseName = proxy.name || proxy.originalName || `config_${index + 1}`;

  let cleanedName = baseName
    .replace(/[\\/:*?"<>|]/g, '') // Remove strictly illegal filesystem characters
    .replace(/\s+/g, '_')         // Replace spaces with underscores for clean file paths
    .trim();

  // Fallback if cleaning completely empties out the string
  if (!cleanedName || cleanedName === '.conf') {
    cleanedName = `config_${index + 1}`;
  }

  return `${cleanedName}.conf`;
}

// ═══════════════════════════════════════════════════════════
// UI Helpers
// ═══════════════════════════════════════════════════════════
function copyToClipboard(text) {
  if (!text?.trim()) {
    showNotification(translations['nothing_to_copy'] || 'Nothing to copy!', 'error');
    return;
  }
  navigator.clipboard.writeText(text)
    .then(() => showNotification(translations['config_copied'] || 'Configuration copied!'))
    .catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showNotification(translations['config_copied'] || 'Configuration copied!');
      } catch {
        showNotification(translations['copy_failed'] || 'Failed to copy', 'error');
      }
      document.body.removeChild(ta);
    });
}

function resetTabsUI() {
  elements.configTabsContainer.classList.add('hidden');
  elements.configTabsHeader.innerHTML = '';
  elements.configTabsBody.innerHTML = '';
  const dlBtn = getById('downloadBtn');
  const cpBtn = getById('copyBtn');
  const zipBtn = getById('downloadZipBtn');
  if (dlBtn) dlBtn.style.display = 'none';
  if (cpBtn) cpBtn.style.display = 'none';
  if (zipBtn) zipBtn.style.display = 'none';
  
  // Reset bulk actions containers visibility
  const actionsHeader = getBySelector('.config-tabs-actions-header');
  const actionsFooter = getBySelector('.config-tabs-actions');
  if (actionsHeader) actionsHeader.style.display = 'none';
  if (actionsFooter) actionsFooter.style.display = 'none';

  elements.yamlOutput.value = '';
}

// ═══════════════════════════════════════════════════════════
// Main Conversion Logic
// ═══════════════════════════════════════════════════════════
function convert() {
  const selectedFormat = getBySelector('input[name="option"]:checked')?.id;

  if (selectedFormat === 'wiresocket') {
    const wsId = getById('ws_id')?.value?.trim();
    if (!wsId) return showNotification('Id field is required for Wiresocket', 'error');
  }

  const files     = elements.wgFiles.files;
  const textInput = elements.confInput.value.trim();

  if (!files.length && !textInput) {
    return showNotification(
      translations['select_files_alert'] || 'Please select files or paste configuration',
      'error'
    );
  }

  proxyList = [];
  resetTabsUI();
  renderValidationPanel([]);

  if (files.length) {
    processFiles(files, selectedFormat);
  } else if (textInput) {
    processTextInput(textInput, selectedFormat);
  }

  persistSettings();
}

function processFiles(files, selectedOption) {
  elements.fileList.innerHTML = Array.from(files).map(f => f.name).join(', ');

  const randomPerConfig = getById('randomizePerConfig')?.checked || false;
  let filesProcessed    = 0;
  const totalFiles      = files.length;
  const allIssues       = [];

  Array.from(files).forEach((file) => {
    const reader = new FileReader();

    reader.onload = function () {
      try {
        const wgConfig = parseWGConfig(reader.result);

        // Validate
        const issues = validateWGConfig(wgConfig, file.name);
        allIssues.push(...issues);

        const hasErrors = issues.some(i => i.level === 'error');
        if (!hasErrors) {
          const format = selectedOption === 'wiresocket' ? 'wiresocket' : 'clash';
          const proxy  = convertToProxy(wgConfig, file.name, format, randomPerConfig);
          proxyList.push(proxy);
        } else {
          showNotification(`Skipped ${file.name}: validation errors`, 'error');
        }
      } catch (error) {
        showNotification(
          (translations['error_in_file'] || 'Error in file {file}: {msg}')
            .replace('{file}', file.name)
            .replace('{msg}', error.message),
          'error'
        );
      } finally {
        filesProcessed++;
        if (filesProcessed === totalFiles) {
          renderValidationPanel(allIssues);
          finalizeConversion(selectedOption);
        }
      }
    };

    reader.onerror = function () {
      showNotification(
        (translations['error_reading_file'] || 'Error reading file {file}')
          .replace('{file}', file.name),
        'error'
      );
      filesProcessed++;
      if (filesProcessed === totalFiles) {
        renderValidationPanel(allIssues);
        finalizeConversion(selectedOption);
      }
    };

    reader.readAsText(file);
  });
}

function processTextInput(textInput, selectedOption) {
  const randomPerConfig = getById('randomizePerConfig')?.checked || false;
  const allIssues       = [];

  try {
    const wgConfigs = parseMultipleWGConfigs(textInput);

    wgConfigs.forEach((wgConfig, idx) => {
      const label  = wgConfigs.length === 1 ? 'Config' : `Config ${idx + 1}`;
      const issues = validateWGConfig(wgConfig, label);
      allIssues.push(...issues);

      const hasErrors = issues.some(i => i.level === 'error');
      if (!hasErrors) {
        const format = selectedOption === 'wiresocket' ? 'wiresocket' : 'clash';
        const proxy  = convertToProxy(wgConfig, `pasted_${idx + 1}.conf`, format, randomPerConfig);
        proxyList.push(proxy);
      }
    });

    elements.fileList.innerHTML = wgConfigs.map((_, i) => `pasted_${i + 1}.conf`).join(', ');
    renderValidationPanel(allIssues);
    finalizeConversion(selectedOption);
  } catch (error) {
    showNotification(
      (translations['error_in_file'] || 'Error in {file}: {msg}')
        .replace('{file}', 'pasted.conf')
        .replace('{msg}', error.message),
      'error'
    );
  }
}

function finalizeConversion(selectedOption) {
  if (!proxyList.length) {
    showNotification(translations['could_not_process_files'] || 'Could not process any configs', 'error');
    return;
  }

  const converters = {
    clash:      generateClashYaml,
    awg:        generateAWGYaml,
    wiresocket: generateWiresocketConfigs
  };

  (converters[selectedOption] || converters.clash)();

  elements.configTabsContainer?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ═══════════════════════════════════════════════════════════
// Event Handlers
// ═══════════════════════════════════════════════════════════
function setupEventListeners() {
  // Format radio buttons
  getAllBySelector('input[name="option"]').forEach(radio => {
    radio.addEventListener('change', handleOptionChange);
  });

  // Wiresock Id validation
  getById('ws_id')?.addEventListener('input', () => { validateConvertButton(); persistSettings(); });
  getById('ws_ip')?.addEventListener('change', persistSettings);
  getById('ws_ib')?.addEventListener('change', persistSettings);

  // Amnezia 1.5 toggle
  getById('enableAmnezia15')?.addEventListener('change', () => {
    toggleAmnezia15();
    persistSettings();
  });

  // Junk mode radios — persist & reset randomization on junk1/junk2
  getAllBySelector('input[name="junk"]').forEach(r => {
    r.addEventListener('change', function() {
      if (this.id === 'junk1' || this.id === 'junk2') {
        const randomizeCheckbox = getById('randomizePerConfig');
        if (randomizeCheckbox) randomizeCheckbox.checked = false;
      }
      persistSettings();
    });
  });

  // Randomize per config
  getById('randomizePerConfig')?.addEventListener('change', function() {
    if (this.checked) {
      const junk3Radio = getById('junk3');
      if (junk3Radio) junk3Radio.checked = true;
    }
    persistSettings();
  });

  // File input
  elements.wgFiles.addEventListener('change', handleFileChange);

  // Live validation on textarea input
  elements.confInput.addEventListener('input', debounce(runValidationOnInput, 600));

  // Random junk
  getById('randomJunkBtn').onclick  = handleRandomJunk;
  getBySelector('.randombtn2').onclick = handleRandomWiresocket;

  // Reset junk defaults
  getById('resetJunkBtn')?.addEventListener('click', handleResetJunk);

  // Reset Amnezia 1.5 I1-I5
  getById('resetAmnezia15Btn')?.addEventListener('click', handleResetAmnezia15);

  // Clear button
  elements.clearBtn.addEventListener('click', handleClear);

  // Theme toggle
  getById('themeToggleBtn')?.addEventListener('click', toggleTheme);
}

function handleOptionChange() {
  const isWiresocket = this.id === 'wiresocket';

  elements.musor1.classList.toggle('hidden', isWiresocket);
  elements.musor2.classList.toggle('hidden', !isWiresocket);
  elements.containerColumns.classList.toggle('karing-active', isWiresocket);
  elements.container2.classList.toggle('karing-active', isWiresocket);

  const amnezia15Toggle = getById('amnezia15-toggle-label');
  if (amnezia15Toggle) amnezia15Toggle.style.display = isWiresocket ? 'none' : 'block';

  if (isWiresocket) {
    const cb = getById('enableAmnezia15');
    if (cb) { cb.checked = false; toggleAmnezia15(); }
  }

  validateConvertButton();
}

function toggleAmnezia15() {
  const isChecked = getById('enableAmnezia15')?.checked || false;
  getById('amnezia15-inputs')?.classList.toggle('hidden', !isChecked);
}

function handleFileChange(event) {
  const files     = event.target.files;
  const confInput = elements.confInput;

  if (!files.length) {
    confInput.value              = '';
    confInput.disabled           = false;
    confInput.style.opacity      = '1';
    confInput.style.cursor       = 'text';
    elements.fileList.innerHTML  = i18n('select_files_label');
    updateFileLabel();
    renderValidationPanel([]);
    return;
  }

  elements.fileList.innerHTML = Array.from(files).map(f => f.name).join(', ');

  let loaded = 0, combinedText = '';
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function () {
      combinedText += String(reader.result).trim() + '\n\n';
      loaded++;
      if (loaded === files.length) {
        confInput.value         = combinedText.trim();
        confInput.disabled      = true;
        confInput.style.opacity = '0.7';
        confInput.style.cursor  = 'not-allowed';
        runValidationOnInput();
      }
    };
    reader.readAsText(file);
  });

  updateFileLabel();
}

function handleRandomJunk() {
  const jc   = getRandomInt(1, 128);
  const jmin = getRandomInt(1, 1279);
  const jmax = getRandomInt(jmin + 1, 1280);
  getById('jc1').value   = jc;
  getById('jmin1').value = jmin;
  getById('jmax1').value = jmax;
  getById('junk3').checked = true;
  persistSettings();
}

function handleRandomWiresocket() {
  const jc   = getRandomInt(1, 128);
  const jmin = getRandomInt(1, 1279);
  const jmax = getRandomInt(jmin + 1, 1280);
  getById('ws_jc1').value   = jc;
  getById('ws_jmin1').value = jmin;
  getById('ws_jmax1').value = jmax;
  getById('ws_junk3').checked = true;
}

function handleResetJunk() {
    // Reset to "Light" preset (junk1)
    getById('junk1').checked = true;
    getById('jc1').value   = '';
    getById('jmin1').value = '';
    getById('jmax1').value = '';
    
    // FIX: Explicitly uncheck randomize per config and update storage
    const randomizeCb = getById('randomizePerConfig');
    if (randomizeCb) {
        randomizeCb.checked = false;
        localStorage.setItem(LS_RANDOMIZE_PC, '0');
    }
    
    localStorage.setItem(LS_JUNK_MODE, 'junk1');
    showNotification('Junk settings reset to Light defaults', 'info');
}

function handleResetAmnezia15() {
  ['i1_1', 'i2_1', 'i3_1', 'i4_1', 'i5_1'].forEach(id => {
    const el = getById(id);
    if (el) el.value = '';
  });
  showNotification('I1–I5 fields cleared', 'info');
}

function handleClear() {
  elements.confInput.value         = '';
  elements.confInput.disabled      = false;
  elements.confInput.style.opacity = '1';
  elements.confInput.style.cursor  = 'text';
  elements.wgFiles.value           = '';
  elements.fileList.innerHTML      = i18n('select_files_label');
  proxyList = [];
  resetTabsUI();
  renderValidationPanel([]);
  updateFileLabel();
}

// ── Debounce utility ─────────────────────────────────────
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ═══════════════════════════════════════════════════════════
// Internationalization
// ═══════════════════════════════════════════════════════════
function detectBrowserLang() {
  const lang = navigator.language.slice(0, 2);
  return SUPPORTED_LANGS.includes(lang) ? lang : 'en';
}

async function loadLanguage(lang) {
  try {
    const response = await fetch(`./lang/${lang}.json?v=1.1`);
    if (!response.ok) throw new Error(`Language file not found: ${lang}`);

    const languageData = await response.json();
    translatePage(languageData);

    localStorage.setItem('lang', lang);
    document.body.className = document.body.className.replace(/lang-\w+/g, '') + ` lang-${lang}`;
    currentLang = lang;
    updateDropdownSelection(lang);
    updateFileLabel();
  } catch (error) {
    console.error('Failed to load language:', error);
  }
}

function translatePage(languageData) {
  translations = languageData;

  getAllBySelector('[data-i18n]:not(.hidden), [data-i18n].hidden').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (languageData[key]) {
      if (element.tagName.toLowerCase() === 'title') document.title = languageData[key];
      else element.textContent = languageData[key];
    }
  });

  getAllBySelector('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (languageData[key]) element.placeholder = languageData[key];
  });
}

function updateDropdownSelection(lang) {
  const dropdown   = getById('languageSwitcher');
  const selectedText = dropdown.querySelector('.selected-text');
  dropdown.querySelectorAll('.dropdown-option').forEach(opt => opt.classList.remove('active'));
  const activeOption = dropdown.querySelector(`[data-value="${lang}"]`);
  if (activeOption) {
    activeOption.classList.add('active');
    selectedText.textContent = activeOption.textContent;
  }
}

function setupLanguageDropdown() {
  const dropdown = getById('languageSwitcher');
  const selected = dropdown.querySelector('.dropdown-selected');
  const options  = dropdown.querySelectorAll('.dropdown-option');

  selected.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  options.forEach(option => {
    option.addEventListener('click', function () {
      if (this.dataset.value !== currentLang) loadLanguage(this.dataset.value);
      dropdown.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dropdown.classList.remove('open');
  });
}

// ═══════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════
function i18n(key, params = {}) {
  let str = (translations && translations[key]) ? translations[key] : key;
  Object.entries(params).forEach(([k, v]) => {
    str = str.replace(new RegExp(`{${k}}`, 'g'), v);
  });
  return str;
}

function updateFileLabel() {
  const fileInput  = elements.wgFiles;
  const uploadText = getBySelector('#fileUploadLabel .upload-text');
  if (!uploadText || !fileInput) return;
  const count = fileInput.files ? fileInput.files.length : 0;
  uploadText.textContent = count === 0
    ? (translations['select_files'] || i18n('select_files_label'))
    : i18n('files_selected_label', { count });
}

function validateConvertButton() {
  const selectedOption = getBySelector('input[name="option"]:checked')?.id;
  const wsId           = getById('ws_id')?.value?.trim();
  const convertBtn     = getBySelector('button[onclick="convert()"]');
  if (!convertBtn) return;

  if (selectedOption === 'wiresocket' && !wsId) {
    convertBtn.disabled      = true;
    convertBtn.style.opacity = '0.5';
    convertBtn.style.cursor  = 'not-allowed';
  } else {
    convertBtn.disabled      = false;
    convertBtn.style.opacity = '1';
    convertBtn.style.cursor  = 'pointer';
  }
}

// ═══════════════════════════════════════════════════════════
// Donation Modal
// ═══════════════════════════════════════════════════════════
function setupDonationModal() {
  const donateBtn = getById('donateBtn');
  const modal     = getById('donateModal');
  const closeBtn  = getById('donateModalClose');
  if (!donateBtn || !modal) return;

  donateBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) modal.classList.add('hidden');
  });

  getAllBySelector('.wallet-item').forEach(item => {
    item.addEventListener('click', () => {
      const address = item.getAttribute('data-address');
      navigator.clipboard.writeText(address)
        .then(() => showNotification(translations['address_copied'] || 'Address copied!'))
        .catch(() => showNotification(translations['copy_failed'] || 'Failed to copy', 'error'));
    });
  });
}

// ═══════════════════════════════════════════════════════════
// Draggable Tabs Navigation (Mouse Drag to Scroll)
// ═══════════════════════════════════════════════════════════
function setupDraggableTabs() {
    const slider = document.querySelector('.config-tabs-header');
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault(); // Prevents text selection while dragging
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier (adjust if needed)
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Set initial cursor
    slider.style.cursor = 'grab';
}

// ═══════════════════════════════════════════════════════════
// Initialize
// ═══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  setupEventListeners();
  setupLanguageDropdown();
  setupDragAndDrop();
  setupQRModal();
  setupDonationModal();
  loadLanguage(currentLang);
  restoreSettings();
  toggleAmnezia15();

  const checkedOption = getBySelector('input[name="option"]:checked');
  if (checkedOption) handleOptionChange.call(checkedOption);

  validateConvertButton();
  setupDraggableTabs(); 
});

window.addEventListener('resize', () => {});
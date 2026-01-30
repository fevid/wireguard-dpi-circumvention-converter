// Constants and Configuration
const COUNTRY_FLAGS = {
  "JP": "🇯🇵 JP", "US": "🇺🇸 US", "NL": "🇳🇱 NL", "DE": "🇩🇪 DE",
  "FR": "🇫🇷 FR", "GB": "🇬🇧 GB", "CA": "🇨🇦 CA", "AU": "🇦🇺 AU",
  "RO": "🇷🇴 RO", "PL": "🇵🇱 PL", "SE": "🇸🇪 SE", "CH": "🇨🇭 CH",
  "SG": "🇸🇬 SG", "HK": "🇭🇰 HK", "IT": "🇮🇹 IT", "ES": "🇪🇸 ES",
  "BR": "🇧🇷 BR", "IN": "🇮🇳 IN", "MX": "🇲🇽 MX", "ZA": "🇿🇦 ZA",
  "RU": "🇷🇺 RU", "KR": "🇰🇷 KR", "NO": "🇳🇴 NO", "DK": "🇩🇰 DK",
  "FI": "🇫🇮 FI", "NZ": "🇳🇿 NZ", "IE": "🇮🇪 IE", "AT": "🇦🇹 AT",
  "BE": "🇧🇪 BE", "CZ": "🇨🇿 CZ", "PT": "🇵🇹 PT", "TR": "🇹🇷 TR",
  "UA": "🇺🇦 UA", "AR": "🇦🇷 AR", "CL": "🇨🇱 CL", "CO": "🇨🇴 CO",
  "TH": "🇹🇭 TH", "MY": "🇲🇾 MY", "ID": "🇮🇩 ID", "AE": "🇦🇪 AE",
  "SA": "🇸🇦 SA", "IL": "🇮🇱 IL", "EG": "🇪🇬 EG"
};

const AMNEZIA_KEYS = ['jc', 'jmin', 'jmax', 's1', 's2', 'h1', 'h2', 'h3', 'h4'];
const AMNEZIA15_KEYS = ['i1', 'i2', 'i3', 'i4', 'i5'];
const SUPPORTED_LANGS = ["en", "tr", "fa", "ru", "zh"];

// Global State
let proxyList = [];
let translations = {};
let currentLang = localStorage.getItem("lang") || detectBrowserLang();

// Add this function after line 16 (after currentLang variable)
function showNotification(message, type = 'success') {
  document.querySelectorAll('.notification').forEach(el => el.remove());

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  if (currentLang === 'fa') {
    notification.classList.add('rtl-text');
  }

  notification.textContent = message;
  
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 1.5rem',
    borderRadius: '1rem',
    color: 'white',
    fontWeight: '600',
    zIndex: '10000',
    opacity: '0',
    transform: 'translateX(100%)',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    textAlign: currentLang === 'fa' ? 'right' : 'left'
  });

  const bg = {
    success: 'linear-gradient(135deg, #00d4aa 0%, #00b4d8 100%)',
    error: 'linear-gradient(135deg, #ff6b6b 0%, #c46539 100%)',
    info: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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
  }, 3000);
}

// Utility Functions
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getById = (id) => document.getElementById(id);
const getBySelector = (selector) => document.querySelector(selector);
const getAllBySelector = (selector) => document.querySelectorAll(selector);


// DOM Element Cache
const elements = {
  get wgFiles() { return getById('wgFiles'); },
  get yamlOutput() { return getById('yamlOutput'); },
  get confInput() { return getById('confInput'); },
  get fileList() { return getById('fileList'); },
  get downloadBtn() { return getById('downloadBtn'); },
  get copyBtn() { return getById('copyBtn'); },
  get clearBtn() { return getById('clearBtn'); },
  get musor1() { return getBySelector('.musor1'); },
  get musor2() { return getBySelector('.musor2'); },
  get containerColumns() { return getBySelector('.container-columns'); },
  get container2() { return getBySelector('.container2'); }
};

// Configuration Generators
function generateAmneziaDefaults() {
  const selectedOption = getBySelector('input[name="junk"]:checked')?.id;
  
  const configs = {
    junk1: { jc: 3, jmin: 1, jmax: 3 },
    junk2: { jc: 5, jmin: 10, jmax: 40 },
    junk3: {
      jc: parseInt(getById('jc1').value) || 128,
      jmin: parseInt(getById('jmin1').value) || 1279,
      jmax: parseInt(getById('jmax1').value) || 1280
    }
  };

  const config = configs[selectedOption] || configs.junk3;
  
  if (config.jmax <= config.jmin) {
    config.jmax = config.jmin + 1;
  }

  // Always include standard params
  const result = {
    ...config,
    s1: 0,
    s2: 0,
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4
  };

  // Add I1-I5 if enabled and have values
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
  
  if (isLight) {
    jc = 3;
    jmin = 1;
    jmax = 3;
  } else if (isHeavy) {
    jc = 5;
    jmin = 10;
    jmax = 40;
  } else {
    // Custom
    jc = parseInt(getById('ws_jc1')?.value) || 128;
    jmin = parseInt(getById('ws_jmin1')?.value) || 1279;
    jmax = parseInt(getById('ws_jmax1')?.value) || 1280;
  }
  
  if (jmax <= jmin) {
    jmax = jmin + 1;
  }

  return {
    jc,
    jmin,
    jmax,
    s1: 0,
    s2: 0,
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    id: getById('ws_id')?.value || '',
    ip: getById('ws_ip')?.value || 'QUIC',
    ib: getById('ws_ib')?.value || 'Chrome'
  };
}

// Configuration Parsers
function parseWGConfig(text) {
  const config = { 
    interface: { amneziaOptions: {} },
    peers: []
  };
  let currentSection = null;

  const lines = text.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Handle peer comments
    if (currentSection === 'peer' && trimmedLine.startsWith('#')) {
      const nameMatch = trimmedLine.match(/#\s*(.+)/);
      if (nameMatch && config.peers.length > 0) {
        config.peers[config.peers.length - 1].name = nameMatch[1].trim();
      }
      continue;
    }

    // Handle section headers
    if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
      currentSection = trimmedLine.slice(1, -1).toLowerCase();
      if (currentSection === 'peer') {
        config.peers.push({ amneziaOptions: {} });
      }
      continue;
    }

    // Parse key-value pairs
    const equalIndex = trimmedLine.indexOf('=');
    if (equalIndex === -1) continue;

    const key = trimmedLine.slice(0, equalIndex).trim().toLowerCase();
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
  return text.split(/\n(?=\[Interface\])/)
    .map(part => part.trim())
    .filter(part => part.length > 0)
    .map(part => parseWGConfig(part));
}

// Proxy Conversion
function convertToProxy(wgConfig, fileName, format = 'clash') {
  const { interface: interfaceData, peers } = wgConfig;
  const peerData = peers[0];
  
  if (!peerData?.endpoint) {
    throw new Error('Missing peer endpoint');
  }

  const [server, port] = peerData.endpoint.split(':');
  const dnsList = interfaceData.dns ? interfaceData.dns.split(',').map(d => d.trim()) : [];
  
  let options = {};
  
  if (format === 'wiresocket') {
    options = generateWiresocketDefaults();
    // Override with file values if present
    options.id = interfaceData.amneziaOptions.id || peerData.amneziaOptions.id || options.id;
    options.ip = interfaceData.amneziaOptions.ip || peerData.amneziaOptions.ip || options.ip;
    options.ib = interfaceData.amneziaOptions.ib || peerData.amneziaOptions.ib || options.ib;
  } else {
    options = generateAmneziaDefaults();
    // Merge with file values for i1-i5
    for (const key of AMNEZIA15_KEYS) {
      if (interfaceData.amneziaOptions[key] || peerData.amneziaOptions[key]) {
        options[key] = interfaceData.amneziaOptions[key] || peerData.amneziaOptions[key];
      }
    }
    // Override standard params with file values if present
    for (const key of AMNEZIA_KEYS) {
      if (interfaceData.amneziaOptions[key] || peerData.amneziaOptions[key]) {
        options[key] = interfaceData.amneziaOptions[key] || peerData.amneziaOptions[key];
      }
    }
  }
  
  // Generate proxy name with country flag
  let proxyName = peerData.name || fileName.replace('.conf', '');
  const originalName = proxyName;
  
  if (!proxyName) {
    proxyName = `Random_${Math.random().toString(36).substr(2, 5)}`;
  } else {
    proxyName = proxyName.replace(/FREE#?/g, '').replace(/-$/, '');
    
    // Add country flag if found
    const flagPattern = /(?:^|[^a-z])([a-z]{2})(?=[-_\s\d]|$)/gi;
    const match = flagPattern.exec(proxyName);
    if (match) {
      const countryCode = match[1].toUpperCase();
      if (COUNTRY_FLAGS[countryCode]) {
        proxyName = COUNTRY_FLAGS[countryCode].split(' ')[0] + ' ' + proxyName;
      }
    }
  }

  const result = {
    name: proxyName,
    originalName,
    type: "wireguard",
    server,
    port: parseInt(port),
    ip: interfaceData.address,
    private_key: interfaceData.privatekey,
    public_key: peerData.publickey,
    preshared_key: peerData.presharedKey,
    allowed_ips: peerData.allowedips.split(',').map(ip => `'${ip.trim()}'`),
    udp: true,
    mtu: 1420,
    remote_dns_resolve: true,
    dns: dnsList,
    isDefaultAmnezia: !(interfaceData.amneziaOptions.jc || peerData.amneziaOptions.jc)
  };

  if (format === 'wiresocket') {
    result['wiresocket-options'] = options;
  } else {
    result['amnezia-options'] = options;
  }

  return result;
}

// YAML Generators
function generateAmneziaOptionsYAML(options) {
  const entries = Object.entries(options)
    .filter(([key, value]) => value !== undefined && value !== '' && [...AMNEZIA_KEYS, ...AMNEZIA15_KEYS].includes(key))
    .map(([key, value]) => `    ${key}: ${value}`)
    .join('\n');
  return entries ? `  amnezia-wg-option:\n${entries}\n` : '';
}

function generateProxyGroups(proxies) {
  if (proxies.length === 0) return '';

  const proxyNames = proxies.map(proxy => `    - ${proxy.name}`).join('\n');
  
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

// Output Generators
function generateClashYaml() {
  if (proxyList.length === 0) {
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

    if (proxy.preshared_key) {
      parts.push(`  pre-shared-key: ${proxy.preshared_key}`);
    }

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

  const proxyGroups = generateProxyGroups(proxyList);
  const fullYaml = `proxies:\n${yamlProxies}\nproxy-groups:${proxyGroups}`;
  
  displayOutput(fullYaml, 'clash-config.yaml');
}

function generateAWGYaml() {
  if (proxyList.length === 0) {
    showNotification(translations['could_not_process_files'] || 'Could not process files', 'error');
    return;
  }

  const awgConfigs = proxyList.map(generateSingleAWGConfig);
  const finalOutput = awgConfigs.join('\n\n');

  elements.yamlOutput.value = finalOutput;
  showButtons();
  elements.downloadBtn.onclick = downloadAWGConfigs;
  elements.copyBtn.onclick = () => copyToClipboard(finalOutput);
}

function generateSingleAWGConfig(proxy) {
  const options = proxy['amnezia-options'] || {};
  
  const configLines = [
    `# ${proxy.originalName || 'Unnamed config'}`,
    `[Interface]`,
    `PrivateKey = ${proxy.private_key}`,
    `Address = ${proxy.ip}`
  ];

  if (proxy.dns?.length > 0) {
    configLines.push(`DNS = ${proxy.dns.join(', ')}`);
  }

  configLines.push(`MTU = ${proxy.mtu}`);

  // Standard parameters (always included)
  configLines.push(
    `Jc = ${options.jc || 128}`,
    `Jmin = ${options.jmin || 1279}`,
    `Jmax = ${options.jmax || 1280}`,
    `S1 = ${options.s1 || 0}`,
    `S2 = ${options.s2 || 0}`,
    `H1 = ${options.h1 || 1}`,
    `H2 = ${options.h2 || 2}`,
    `H3 = ${options.h3 || 3}`,
    `H4 = ${options.h4 || 4}`
  );

  // I1-I5 parameters (included if they have values)
  if (options.i1) configLines.push(`I1 = ${options.i1}`);
  if (options.i2) configLines.push(`I2 = ${options.i2}`);
  if (options.i3) configLines.push(`I3 = ${options.i3}`);
  if (options.i4) configLines.push(`I4 = ${options.i4}`);
  if (options.i5) configLines.push(`I5 = ${options.i5}`);

  configLines.push(
    ``,
    `[Peer]`,
    `PublicKey = ${proxy.public_key}`
  );

  if (proxy.preshared_key) {
    configLines.push(`PresharedKey = ${proxy.preshared_key}`);
  }

  configLines.push(
    `AllowedIPs = ${proxy.allowed_ips.join(', ').replace(/'/g, '')}`,
    `Endpoint = ${proxy.server}:${proxy.port}`
  );

  return configLines.join('\n');
}

function generateWiresocketConfigs() {
  if (proxyList.length === 0) {
    showNotification(translations['could_not_process_files'] || 'Could not process files', 'error');
    return;
  }

  const configs = proxyList.map(generateSingleWiresocketConfig);
  const finalOutput = configs.join('\n\n');

  elements.yamlOutput.value = finalOutput;
  showButtons();
  elements.downloadBtn.onclick = downloadWiresocketConfigs;
  elements.copyBtn.onclick = () => copyToClipboard(finalOutput);
}

function generateSingleWiresocketConfig(proxy) {
  const options = proxy['wiresocket-options'] || {};
  
  const configLines = [
    `# ${proxy.originalName || 'Unnamed config'}`,
    `[Interface]`,
    `PrivateKey = ${proxy.private_key}`,
    `Address = ${proxy.ip}`
  ];

  if (proxy.dns?.length > 0) {
    configLines.push(`DNS = ${proxy.dns.join(', ')}`);
  }

  configLines.push(`MTU = ${proxy.mtu}`);

  // Wiresocket parameters with hardcoded H1-H4 defaults
  configLines.push(
    `Jc = ${options.jc || 128}`,
    `Jmin = ${options.jmin || 1279}`,
    `Jmax = ${options.jmax || 1280}`,
    `S1 = ${options.s1 || 0}`,
    `S2 = ${options.s2 || 0}`,
    `H1 = ${options.h1 || 1}`,
    `H2 = ${options.h2 || 2}`,
    `H3 = ${options.h3 || 3}`,
    `H4 = ${options.h4 || 4}`
  );

  // Wiresocket specific fields
  if (options.id) configLines.push(`Id = ${options.id}`);
  if (options.ip) configLines.push(`Ip = ${options.ip}`);
  if (options.ib) configLines.push(`Ib = ${options.ib}`);

  configLines.push(
    ``,
    `[Peer]`,
    `PublicKey = ${proxy.public_key}`
  );

  if (proxy.preshared_key) {
    configLines.push(`PresharedKey = ${proxy.preshared_key}`);
  }

  configLines.push(
    `AllowedIPs = ${proxy.allowed_ips.join(', ').replace(/'/g, '')}`,
    `Endpoint = ${proxy.server}:${proxy.port}`
  );

  return configLines.join('\n');
}

// File Operations
function downloadYAML(content, fileName) {
  const blob = new Blob([content], { type: 'text/yaml; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = fileName || 'config.yaml';
  document.body.appendChild(link);
  link.click();
  
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

function downloadAWGConfigs() {
  if (proxyList.length === 0) {
    showNotification(translations['could_not_process_files'] || 'Could not process files', 'error');
    return;
  }

  proxyList.forEach((proxy, index) => {
    try {
      const awgConfig = generateSingleAWGConfig(proxy);
      const fileName = getAWGFileName(proxy, index);
      downloadYAML(awgConfig, fileName);
    } catch (error) {
      console.error(`Failed to download config ${index + 1}:`, error);
      showNotification(
        (translations['error_in_file'] || 'Error in {file}: {msg}')
          .replace('{file}', getAWGFileName(proxy, index))
          .replace('{msg}', error.message),
        'error'
      );
    }
  });
}

function downloadWiresocketConfigs() {
  if (proxyList.length === 0) {
    showNotification(translations['could_not_process_files'] || 'Could not process files', 'error');
    return;
  }

  proxyList.forEach((proxy, index) => {
    try {
      const wsConfig = generateSingleWiresocketConfig(proxy);
      const fileName = getAWGFileName(proxy, index).replace('.conf', '-wiresocket.conf');
      downloadYAML(wsConfig, fileName);
    } catch (error) {
      console.error(`Failed to download config ${index + 1}:`, error);
      showNotification(
        (translations['error_in_file'] || 'Error in {file}: {msg}')
          .replace('{file}', getAWGFileName(proxy, index))
          .replace('{msg}', error.message),
        'error'
      );
    }
  });
}

function getAWGFileName(proxy, index) {
  if (proxy.originalName) {
    const cleanedName = proxy.originalName.replace(/-FREE/g, '');
    return `${cleanedName.replace(/[^a-z0-9]/gi, '_')}.conf`;
  }
  return `config_${index + 1}.conf`;
}

// UI Helper Functions
function displayOutput(content, fileName) {
  elements.yamlOutput.value = content;
  showButtons();
  elements.downloadBtn.onclick = () => downloadYAML(content, fileName);
  elements.copyBtn.onclick = () => copyToClipboard(content);
}

function showButtons() {
  elements.downloadBtn.classList.remove('hidden');
  elements.copyBtn.classList.remove('hidden');
}

function copyToClipboard(text) {
  if (!text.trim()) {
    showNotification(translations['nothing_to_copy'] || 'Nothing to copy!', 'error');
    return;
  }
  
  navigator.clipboard.writeText(text)
    .then(() => showNotification(translations['config_copied'] || 'Configuration copied!'))
    .catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showNotification(translations['config_copied'] || 'Configuration copied!');
      } catch (err) {
        showNotification(translations['copy_failed'] || 'Failed to copy', 'error');
      }
      document.body.removeChild(textArea);
    });
}

// Main Conversion Logic
function convert() {
  const selectedFormat = getBySelector('input[name="option"]:checked')?.id;
  if (selectedFormat === 'wiresocket') {
    const wsId = getById('ws_id')?.value?.trim();
    if (!wsId) {
      return showNotification('Id field is required for Wiresocket', 'error');
    }
  }
  const files = elements.wgFiles.files;
  const textInput = elements.confInput.value.trim();

  if (!files.length && !textInput) {
    return showNotification(translations['select_files_alert'] || 'Please select files or paste configuration', 'error');
  }

  const selectedOption = getBySelector('input[name="option"]:checked')?.id;
  proxyList = [];
  elements.fileList.innerHTML = "";

  // Process files if available
  if (files.length) {
    processFiles(files, selectedOption);
  } else if (textInput) {
    // Process pasted configs
    processTextInput(textInput, selectedOption);
  }
}

function processFiles(files, selectedOption) {
  elements.fileList.innerHTML = Array.from(files).map(f => f.name).join(', ');
  
  let filesProcessed = 0;
  const totalFiles = files.length;

  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    
    reader.onload = function() {
      try {
        const wgConfig = parseWGConfig(reader.result);
        const proxy = convertToProxy(wgConfig, file.name, selectedOption === 'wiresocket' ? 'wiresocket' : 'clash');
        proxyList.push(proxy);
      } catch (error) {
        showNotification((translations['error_in_file'] || 'Error in file {file}: {msg}')
          .replace('{file}', file.name)
          .replace('{msg}', error.message), 'error');
      } finally {
        filesProcessed++;
        if (filesProcessed === totalFiles) {
          finalizeConversion(selectedOption);
        }
      }
    };
    
    reader.onerror = function() {
      showNotification((translations['error_reading_file'] || 'Error reading file {file}')
  .replace('{file}', file.name), 'error');
      filesProcessed++;
      if (filesProcessed === totalFiles) {
        finalizeConversion(selectedOption);
      }
    };
    
    reader.readAsText(file);
  });
}

function processTextInput(textInput, selectedOption) {
  try {
    const wgConfigs = parseMultipleWGConfigs(textInput);
    
    wgConfigs.forEach((wgConfig, idx) => {
      const format = selectedOption === 'wiresocket' ? 'wiresocket' : 'clash';
      const proxy = convertToProxy(wgConfig, `pasted_${idx + 1}.conf`, format);
      proxyList.push(proxy);
    });
    
    elements.fileList.innerHTML = wgConfigs
      .map((_, i) => `pasted_${i + 1}.conf`)
      .join(', ');
    
    finalizeConversion(selectedOption);
  } catch (error) {
    showNotification((translations['error_in_file'] || 'Error in {file}: {msg}')
        .replace('{file}', 'pasted.conf')
        .replace('{msg}', error.message),'error');
  }
}

function finalizeConversion(selectedOption) {
  const converters = {
    clash: generateClashYaml,
    awg: generateAWGYaml,
    wiresocket: generateWiresocketConfigs
  };

  const converter = converters[selectedOption] || converters.clash;
  converter();

  // Scroll to output
  elements.yamlOutput?.scrollIntoView({ 
    behavior: "smooth", 
    block: "center" 
  });
}

// Event Handlers
function setupEventListeners() {
  // Radio button handlers
  getAllBySelector('input[name="option"]').forEach(radio => {
    radio.addEventListener('change', handleOptionChange);
  });

  // Validate convert button when Id field changes
  getById('ws_id')?.addEventListener('input', validateConvertButton);

  // Amnezia 1.5 toggle
  getById('enableAmnezia15')?.addEventListener('change', toggleAmnezia15);

  // File input handler
  elements.wgFiles.addEventListener('change', handleFileChange);
  

  // Random button handlers
  getBySelector('.randombtn').onclick = handleRandomJunk;
  getBySelector('.randombtn2').onclick = handleRandomWiresocket;

  // Clear button handler
  elements.clearBtn.addEventListener('click', handleClear);
}

function handleOptionChange() {
  const isWiresocket = this.id === 'wiresocket';
  const isAwg = this.id === 'awg';
  
  elements.musor1.classList.toggle('hidden', isWiresocket);
  elements.musor2.classList.toggle('hidden', !isWiresocket);
  elements.containerColumns.classList.toggle('karing-active', isWiresocket);
  elements.container2.classList.toggle('karing-active', isWiresocket);
  
  // Show/hide Amnezia 1.5 toggle
  const amnezia15Toggle = getById('amnezia15-toggle-label');
  if (amnezia15Toggle) {
    amnezia15Toggle.style.display = isAwg ? 'block' : 'none';
  }
  // Uncheck Amnezia 1.5 when switching to other formats
  const amnezia15Checkbox = getById('enableAmnezia15');
  if (!isAwg && amnezia15Checkbox) {
    amnezia15Checkbox.checked = false;
    toggleAmnezia15.call(amnezia15Checkbox);
  }
  validateConvertButton();
}

function toggleAmnezia15() {
  const isChecked = getById('enableAmnezia15')?.checked || false;
  const amnezia15Inputs = getById('amnezia15-inputs');
  
  if (isChecked) {
    amnezia15Inputs?.classList.remove('hidden');
  } else {
    amnezia15Inputs?.classList.add('hidden');
  }
}

function handleFileChange(event) {
  const files = event.target.files;
  const confInput = elements.confInput;

  if (!files.length) {
    confInput.value = "";
    confInput.disabled = false;
    confInput.style.opacity = '1';
    confInput.style.cursor = 'text';
    elements.fileList.innerHTML = i18n('select_files_label');
    updateFileLabel();
    return;
  }

  elements.fileList.innerHTML = Array.from(files).map(f => f.name).join(', ');

  let loaded = 0;
  let combinedText = "";
  
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function() {
      combinedText += String(reader.result).trim() + "\n\n";
      loaded++;
      if (loaded === files.length) {
        confInput.value = combinedText.trim();
        confInput.disabled = true;
        confInput.style.opacity = '0.7';
        confInput.style.cursor = 'not-allowed';
      }
    };
    reader.readAsText(file);
  });

  updateFileLabel();
}

function handleRandomJunk() {
  const jc = getRandomInt(1, 128);
  const jmin = getRandomInt(1, 1279);
  const jmax = getRandomInt(jmin + 1, 1280);
  
  getById('jc1').value = jc;
  getById('jmin1').value = jmin;
  getById('jmax1').value = jmax;
  getById('h1_1').value = getRandomInt(1, 5);
  getById('h2_1').value = getRandomInt(1, 10);
  getById('h3_1').value = getRandomInt(1, 10);
  getById('h4_1').value = getRandomInt(1, 10);
  getById('junk3').checked = true;
}

function handleRandomWiresocket() {
  const jc = getRandomInt(1, 128);
  const jmin = getRandomInt(1, 1279);
  const jmax = getRandomInt(jmin + 1, 1280);
  
  getById('ws_jc1').value = jc;
  getById('ws_jmin1').value = jmin;
  getById('ws_jmax1').value = jmax;
  getById('ws_junk3').checked = true;
}

function handleClear() {
  elements.confInput.value = "";
  elements.confInput.disabled = false;
  elements.confInput.style.opacity = '1';
  elements.confInput.style.cursor = 'text';
  elements.wgFiles.value = "";
  elements.yamlOutput.value = "";
  elements.fileList.innerHTML = i18n('select_files_label');
  updateFileLabel();
}

// Mobile-specific Functions
function replaceMobileText() {
  if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return;
}

// Internationalization
function detectBrowserLang() {
  const lang = navigator.language.slice(0, 2);
  return SUPPORTED_LANGS.includes(lang) ? lang : "en";
}

async function loadLanguage(lang) {
  try {
    const response = await fetch(`./lang/${lang}.json`);
    if (!response.ok) throw new Error(`Language file not found: ${lang}`);
    
    const languageData = await response.json();
    translatePage(languageData);
    
    localStorage.setItem("lang", lang);
    document.body.className = document.body.className
      .replace(/lang-\w+/g, '') + ` lang-${lang}`;
    
    currentLang = lang;
    updateDropdownSelection(lang);
    updateFileLabel();
  } catch (error) {
    console.error('Failed to load language:', error);
  }
}

function translatePage(languageData) {
  translations = languageData;
  
  // Translate elements with data-i18n
  getAllBySelector("[data-i18n]:not(.hidden), [data-i18n].hidden").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (languageData[key]) {
      if (element.tagName.toLowerCase() === "title") {
        document.title = languageData[key];
      } else {
        element.textContent = languageData[key];
      }
    } else {
    // Fallback: keep existing text if translation is missing
    console.warn(`Missing translation for key: ${key} in language: ${currentLang}`);
  }
  });

  // Translate placeholders
  getAllBySelector("[data-i18n-placeholder]").forEach(element => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (languageData[key]) {
      element.placeholder = languageData[key];
    }
  });
}

function updateDropdownSelection(lang) {
  const dropdown = getById('languageSwitcher');
  const selectedText = dropdown.querySelector('.selected-text');
  const options = dropdown.querySelectorAll('.dropdown-option');
  
  // Remove active class from all options
  options.forEach(option => option.classList.remove('active'));
  
  // Find and activate the current language option
  const activeOption = dropdown.querySelector(`[data-value="${lang}"]`);
  if (activeOption) {
    activeOption.classList.add('active');
    selectedText.textContent = activeOption.textContent;
  }
}

function setupLanguageDropdown() {
  const dropdown = getById('languageSwitcher');
  const selected = dropdown.querySelector('.dropdown-selected');
  const options = dropdown.querySelectorAll('.dropdown-option');
  
  // Toggle dropdown
  selected.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdown.classList.toggle('open');
  });
  
  // Handle option selection
  options.forEach(option => {
    option.addEventListener('click', function() {
      const selectedLang = this.dataset.value;
      
      if (selectedLang !== currentLang) {
        loadLanguage(selectedLang);
      }
      
      dropdown.classList.remove('open');
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');
    }
  });
  
  // Close dropdown on escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      dropdown.classList.remove('open');
    }
  });
}

// Helper Functions
function i18n(key, params = {}) {
  let str = (translations && translations[key]) ? translations[key] : key;
  
  Object.entries(params).forEach(([paramKey, value]) => {
    str = str.replace(new RegExp(`{${paramKey}}`, 'g'), value);
  });
  
  return str;
}

function updateFileLabel() {
  const fileInput = elements.wgFiles;
  const uploadText = getBySelector('#fileUploadLabel .upload-text');
  
  if (!uploadText || !fileInput) return;

  const count = fileInput.files ? fileInput.files.length : 0;
  
  if (count === 0) {
    uploadText.textContent = translations['select_files'] || i18n('select_files_label');
  } else {
    uploadText.textContent = i18n('files_selected_label', { count });
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  setupLanguageDropdown();
  loadLanguage(currentLang);
  replaceMobileText();
  toggleAmnezia15();
  
  // Initialize UI states
  const checkedOption = getBySelector('input[name="option"]:checked');
  if (checkedOption) {
    handleOptionChange.call(checkedOption);
  }
  validateConvertButton();
});

function validateConvertButton() {
  const selectedOption = getBySelector('input[name="option"]:checked')?.id;
  const wsId = getById('ws_id')?.value?.trim();
  const convertBtn = getBySelector('button[onclick="convert()"]');
  
  if (!convertBtn) return;
  
  if (selectedOption === 'wiresocket' && !wsId) {
    convertBtn.disabled = true;
    convertBtn.style.opacity = '0.5';
    convertBtn.style.cursor = 'not-allowed';
  } else {
    convertBtn.disabled = false;
    convertBtn.style.opacity = '1';
    convertBtn.style.cursor = 'pointer';
  }
}

// Handle window resize for mobile
window.addEventListener('resize', replaceMobileText);
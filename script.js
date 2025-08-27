document.querySelectorAll('input[name="option"]').forEach(radio => {
  radio.addEventListener('change', function() {
    const musor1 = document.querySelector('.musor1');
    const musor2 = document.querySelector('.musor2');
    const containerColumns = document.querySelector('.container-columns');
    const container2 = document.querySelector('.container2');
    
    if (this.id === 'karing') {
      musor1.classList.add('hidden');
      musor2.classList.remove('hidden');
      containerColumns.classList.add('karing-active');
      container2.classList.add('karing-active');
    } else {
      musor1.classList.remove('hidden');
      musor2.classList.add('hidden');
      containerColumns.classList.remove('karing-active');
      container2.classList.remove('karing-active');
    }
  });
});

document.getElementById('wgFiles').addEventListener('change', function(e) {
  const files = e.target.files;
  const confInput = document.getElementById('confInput');

  if (!files.length) {
    confInput.value = "";
    document.getElementById('fileList').innerHTML = i18n('select_files_label');
    updateFileLabel();
    return;
  }

  document.getElementById('fileList').innerHTML = `${Array.from(files).map(f => f.name).join(', ')}`;

  let loaded = 0;
  let combinedText = "";
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function() {
      combinedText += String(reader.result).trim() + "\n\n";
      loaded++;
      if (loaded === files.length) {
        confInput.value = combinedText.trim();
      }
    };
    reader.readAsText(file);
  });

  updateFileLabel(); // uses current translations and selected count
});

document.querySelector('.randombtn').onclick = function() {
  const jc = getRandomInt(1, 128);
  const jmin = getRandomInt(1, 1279);
  const jmax = getRandomInt(jmin + 1, 1280);
  
  document.getElementById('jc1').value = jc;
  document.getElementById('jmin1').value = jmin;
  document.getElementById('jmax1').value = jmax;
  document.getElementById('junk3').checked = true;
};
document.querySelector('.randombtn2').onclick = function() {
  const generateRandomPair = () => {
    const first = getRandomInt(1, 50);
    const second = getRandomInt(first + 1, 120);
    return `${first}-${second}`;
  };
  document.getElementById('fp1').value = generateRandomPair();
  document.getElementById('fps1').value = generateRandomPair();
  document.getElementById('fpd1').value = generateRandomPair();
  document.getElementById('fake3').checked = true;
};

const COUNTRY_FLAGS = {
    "JP": "🇯🇵 JP",
    "US": "🇺🇸 US",
    "NL": "🇳🇱 NL",
    "DE": "🇩🇪 DE",
    "FR": "🇫🇷 FR",
    "GB": "🇬🇧 GB",
    "CA": "🇨🇦 CA",
    "AU": "🇦🇺 AU",
    "RO": "🇷🇴 RO",
    "PL": "🇵🇱 PL",
    "SE": "🇸🇪 SE",
    "CH": "🇨🇭 CH",
    "SG": "🇸🇬 SG",
    "HK": "🇭🇰 HK",
    "IT": "🇮🇹 IT",
    "ES": "🇪🇸 ES",
    "BR": "🇧🇷 BR",
    "IN": "🇮🇳 IN",
    "MX": "🇲🇽 MX",
    "ZA": "🇿🇦 ZA",
    "RU": "🇷🇺 RU",
    "KR": "🇰🇷 KR",
    "NO": "🇳🇴 NO",
    "DK": "🇩🇰 DK",
    "FI": "🇫🇮 FI",
    "NZ": "🇳🇿 NZ",
    "IE": "🇮🇪 IE",
    "AT": "🇦🇹 AT",
    "BE": "🇧🇪 BE",
    "CZ": "🇨🇿 CZ",
    "PT": "🇵🇹 PT",
    "TR": "🇹🇷 TR",
    "UA": "🇺🇦 UA",
    "AR": "🇦🇷 AR",
    "CL": "🇨🇱 CL",
    "CO": "🇨🇴 CO",
    "TH": "🇹🇭 TH",
    "MY": "🇲🇾 MY",
    "ID": "🇮🇩 ID",
    "AE": "🇦🇪 AE",
    "SA": "🇸🇦 SA",
    "IL": "🇮🇱 IL",
    "EG": "🇪🇬 EG"
  };
let proxyList = [];
function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

function generateAmneziaDefaults() {
  const selectedOption = document.querySelector('input[name="junk"]:checked').id;
  let jc, jmin, jmax;
  switch(selectedOption) {
    case 'junk1':
      jc = 3;
      jmin = 1;
      jmax = 3;
      break;
    case 'junk2':
      jc = 30;
      jmin = 10;
      jmax = 30;
      break;
    case 'junk3':
      jc = parseInt(document.getElementById('jc1').value) || 128;
      jmin = parseInt(document.getElementById('jmin1').value) || 1279;
      jmax = parseInt(document.getElementById('jmax1').value) || 1280;
      break;
    default:
      jc = 128;
      jmin = 1279;
      jmax = 1280;
  }

  if (jmax <= jmin) {
    jmax = jmin + 1;
  }

  return {
    jc: jc,
    jmin: jmin,
    jmax: jmax,
    s1: 0,
    s2: 0,
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4
  };
}

function parseWGConfig(text) {
  const config = { 
    interface: { amneziaOptions: {} },
    peers: []
  };
  let currentSection = null;

  text.split('\n').forEach(line => {
    line = line.trim();
    if (!line) return;

    if (currentSection === 'peer' && line.startsWith('#')) {
      const nameMatch = line.match(/#\s*(.+)/);
      if (nameMatch) {
        config.peers[config.peers.length - 1].name = nameMatch[1].trim();
      }
      return;
    }

    if (line.startsWith('[') && line.endsWith(']')) {
      currentSection = line.slice(1, -1).toLowerCase();
      if (currentSection === 'peer') config.peers.push({ amneziaOptions: {} });
      return;
    }

    const [key, ...valueParts] = line.split('=');
    const cleanKey = key.trim().toLowerCase();
    const value = valueParts.join('=').trim();

    if (currentSection === 'interface') {
      if (['jc', 'jmin', 'jmax', 's1', 's2', 'h1', 'h2', 'h3', 'h4'].includes(cleanKey)) {
        config.interface.amneziaOptions[cleanKey] = value;
      } else {
        config.interface[cleanKey] = value;
      }
    } else if (currentSection === 'peer') {
      const peer = config.peers[config.peers.length - 1];
      if (['jc', 'jmin', 'jmax', 's1', 's2', 'h1', 'h2', 'h3', 'h4'].includes(cleanKey)) {
        peer.amneziaOptions[cleanKey] = value;
      } else if (cleanKey === 'presharedkey') {
        peer.presharedKey = value; // Adding PresharedKey processing
      } else {
        peer[cleanKey] = value;
      }
    }
  });

  return config;
}

function convertToClashProxy(wgConfig, fileName) {
  const interfaceData = wgConfig.interface;
  const peerData = wgConfig.peers[0];
  const dnsList = interfaceData.dns ? interfaceData.dns.split(',').map(d => d.trim()) : [];
  const defaultAmnezia = generateAmneziaDefaults();
  let proxyName = peerData.name || fileName.replace('.conf', '');
  let originalName = proxyName;
  
  if (!proxyName) {
    proxyName = `Random_${Math.random().toString(36).substr(2, 5)}`;
  } else {
    proxyName = proxyName.replace(/FREE#?/g, '');
    proxyName = proxyName.replace(/-$/, '');
    
    const flagPattern = /(?:^|[^a-z])([a-z]{2})(?=[-_\s\d]|$)/gi;
    let match;

    while ((match = flagPattern.exec(proxyName)) !== null) {
      const countryCode = match[1].toUpperCase();
      if (COUNTRY_FLAGS[countryCode]) {
        proxyName = COUNTRY_FLAGS[countryCode].split(' ')[0] + ' ' + proxyName;
        break;
      }
    }
  }

  const amneziaOptions = {};
  for (const key of ['jc', 'jmin', 'jmax', 's1', 's2', 'h1', 'h2', 'h3', 'h4']) {
    const interfaceValue = interfaceData.amneziaOptions[key];
    const peerValue = peerData.amneziaOptions[key];
    amneziaOptions[key] = interfaceValue || peerValue || defaultAmnezia[key];
  }

  return {
    name: proxyName,
    originalName: originalName,
    type: "wireguard",
    server: peerData.endpoint.split(':')[0],
    port: parseInt(peerData.endpoint.split(':')[1]),
    ip: interfaceData.address, 
    private_key: interfaceData.privatekey,
    public_key: peerData.publickey,
    preshared_key: peerData.presharedKey,
    allowed_ips: peerData.allowedips.split(',').map(ip => `'${ip.trim()}'`),
    udp: true,
    mtu: 1420,
    remote_dns_resolve: true,
    dns: dnsList,
    'amnezia-wg-option': amneziaOptions,
    isDefaultAmnezia: !(interfaceData.amneziaOptions.jc || peerData.amneziaOptions.jc)
  };
}

function generateAmneziaOptionsYAML(options) {
      let yaml = '  amnezia-wg-option:\n';
      for (const [key, value] of Object.entries(options)) {
        yaml += `    ${key}: ${value}\n`;
      }
      return yaml;
    }

function generateProxyGroups(proxies) {
  const groups = [];
  const allProxies = [];

  proxies.forEach(proxy => {
    allProxies.push(proxy.name);
  });

  if (allProxies.length > 0) {
    groups.push(`
- name: DPI
  type: select
  icon: https://raw.githubusercontent.com/zaeboba/page/refs/heads/main/archive/wireguard.svg
  proxies:
    - ${allProxies.join('\n    - ')}
  url: 'http://speed.cloudflare.com/'
  unified-delay: true
  interval: 300`);
  }

  return groups.join('\n');
}

function convert() {
  const files = document.getElementById('wgFiles').files;
  const textInput = document.getElementById('confInput').value.trim();

  if (!files.length && !textInput) {
    return alert(translations['select_files_alert']);
  }

  const selectedOption = document.querySelector('input[name="option"]:checked').id;

  proxyList = [];
  document.getElementById('fileList').innerHTML = "";
  let filesProcessed = 0;

  // --- Case 1: files take priority ---
  if (files.length) {
    document.getElementById('fileList').innerHTML =
      `${Array.from(files).map(f => f.name).join(', ')}`;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = function () {
        try {
          const wgConfig = parseWGConfig(reader.result);
          const proxy = convertToClashProxy(wgConfig, file.name);
          proxyList.push(proxy);
        } catch (e) {
          alert(
            translations['error_in_file']
              .replace('{file}', file.name)
              .replace('{msg}', e.message)
          );
        } finally {
          filesProcessed++;
          if (filesProcessed === files.length) {
            finalizeConversion(selectedOption);
          }
        }
      };
      reader.onerror = function () {
        alert(translations['error_reading_file'].replace('{file}', file.name));
        filesProcessed++;
        if (filesProcessed === files.length) {
          finalizeConversion(selectedOption);
        }
      };
      reader.readAsText(file);
    });
    return; 
  }

  // --- Case 2: pasted configs ---
  if (textInput) {
    try {
      const wgConfigs = parseMultipleWGConfigs(textInput);
      wgConfigs.forEach((wgConfig, idx) => {
        const proxy = convertToClashProxy(wgConfig, `pasted_${idx + 1}.conf`);
        proxyList.push(proxy);
      });
      document.getElementById('fileList').innerHTML =
        wgConfigs.map((_, i) => `pasted_${i + 1}.conf`).join(', ');

      finalizeConversion(selectedOption);
    } catch (e) {
      alert(
        translations['error_in_file']
          .replace('{file}', "pasted.conf")
          .replace('{msg}', e.message)
      );
    }
  }
}


function parseMultipleWGConfigs(text) {
  const parts = text.split(/\n(?=\[Interface\])/); // split when new [Interface] begins
  return parts
    .map(p => p.trim())
    .filter(p => p) // skip empty
    .map(p => parseWGConfig(p));
}


function finalizeConversion(selectedOption) {
  switch (selectedOption) {
    case "clash":
      generateClashYaml();
      break;
    case "awg":
      generateAWGYaml();
      break;
    case "karing":
      generateKaringYaml();
      break;
    default:
      generateClashYaml();
  }

  // Scroll into view after conversion
  const output = document.getElementById('yamlOutput');
  if (output) {
    output.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

document.getElementById('clearBtn').addEventListener('click', function () {
  const confInput = document.getElementById('confInput');
  const fileInput = document.getElementById('wgFiles');

  confInput.value = "";
  fileInput.value = "";
  document.getElementById('fileList').innerHTML = i18n('select_files_label');
  updateFileLabel();  // reset label using current language
});



function generateClashYaml() {
  if (proxyList.length === 0) {
    alert(translations['could_not_process_files']);
    return;
  }

  const yamlProxies = proxyList.map(proxy => {
    let yaml = `- name: ${proxy.name}\n`;
    yaml += `  type: ${proxy.type}\n`;
    yaml += `  server: ${proxy.server}\n`;
    yaml += `  port: ${proxy.port}\n`;
    yaml += `  ip: ${proxy.ip}\n`; // Now includes subnet mask
    yaml += `  private-key: ${proxy.private_key}\n`;
    yaml += `  public-key: ${proxy.public_key}\n`;
    if (proxy.preshared_key) {
      yaml += `  pre-shared-key: ${proxy.preshared_key}\n`;
    }
    yaml += `  allowed-ips: [${proxy.allowed_ips.join(', ')}]\n`;
    yaml += `  udp: ${proxy.udp}\n`;
    yaml += `  mtu: ${proxy.mtu}\n`;
    yaml += `  remote-dns-resolve: ${proxy.remote_dns_resolve}\n`;
    yaml += `  dns: [${proxy.dns.join(', ')}]\n`;
    yaml += generateAmneziaOptionsYAML(proxy['amnezia-wg-option'], proxy.isDefaultAmnezia);
    return yaml;
  }).join('\n');

  const proxyGroups = generateProxyGroups(proxyList);
  const fullYaml = `proxies:\n${yamlProxies}\nproxy-groups:${proxyGroups}`;
  
  document.getElementById('yamlOutput').value = fullYaml;
  document.getElementById('downloadBtn').classList.remove('hidden');
  document.getElementById('copyBtn').classList.remove('hidden');
  document.getElementById('downloadBtn').onclick = () => downloadYAML(fullYaml, 'clash-config.yaml');
  document.getElementById('copyBtn').onclick = () => {
    navigator.clipboard.writeText(fullYaml)
      .then(() => alert(translations['config_copied']))
      .catch(err => alert(translations['copy_failed']));
  };
}

function generateAWGYaml() {
  if (proxyList.length === 0) {
    alert(translations['could_not_process_files']);
    return;
  }

  const awgConfigs = proxyList.map(proxy => generateSingleAWGConfig(proxy));
  const finalOutput = awgConfigs.join('\n\n');

  document.getElementById('yamlOutput').value = finalOutput;
  document.getElementById('downloadBtn').classList.remove('hidden');
  document.getElementById('downloadBtn').onclick = downloadAWGConfigs;
  document.getElementById('copyBtn').classList.remove('hidden');
  document.getElementById('copyBtn').onclick = () => {
    navigator.clipboard.writeText(finalOutput)
      .then(() => alert(translations['config_copied']))
      .catch(err => alert(translations['copy_failed']));
  };
}

function generateKaringYaml() {
  if (proxyList.length === 0) {
    alert(translations['could_not_process_files']);
    return;
  }

  const fakeOption = document.querySelector('input[name="fake"]:checked').id;
  let fakePackets, fakePacketsSize, fakePacketsDelay;

  switch(fakeOption) {
    case 'fake1':
      fakePackets = "3";
      fakePacketsSize = "1";
      fakePacketsDelay = "3";
      break;
    case 'fake2':
      fakePackets = "1-10";
      fakePacketsSize = "10-30";
      fakePacketsDelay = "10-30";
      break;
    case 'fake3':
      fakePackets = document.getElementById('fp1').value || "5-10";
      fakePacketsSize = document.getElementById('fps1').value || "40-100";
      fakePacketsDelay = document.getElementById('fpd1').value || "20-250";
      break;
    default:
      fakePackets = "5-10";
      fakePacketsSize = "40-100";
      fakePacketsDelay = "20-250";
  }

  const outbounds = proxyList.map(proxy => ({
    "type": "wireguard",
    "tag": proxy.name,
    "local_address": [proxy.ip], 
    "private_key": proxy.private_key,
    "peer_public_key": proxy.public_key,
    "mtu": proxy.mtu,
    "fake_packets": fakePackets,
    "fake_packets_size": fakePacketsSize,
    "fake_packets_delay": fakePacketsDelay,
    "fake_packets_mode": "m4",
    "server": proxy.server,
    "server_port": proxy.port
  }));
  const karingConfig = {
    "outbounds": outbounds
  };

  const fullYaml = JSON.stringify(karingConfig, null, 2);
  document.getElementById('yamlOutput').value = fullYaml;
  document.getElementById('downloadBtn').classList.remove('hidden');
  document.getElementById('copyBtn').classList.remove('hidden');
  document.getElementById('downloadBtn').onclick = () => downloadYAML(fullYaml, 'karing-config.json');
  document.getElementById('copyBtn').onclick = () => {
    navigator.clipboard.writeText(fullYaml)
      .then(() => alert(translations['config_copied']))
      .catch(err => alert(translations['copy_failed']));
  };
}

function downloadYAML(yamlContent, fileName) {
  const blob = new Blob([yamlContent], { type: 'text/yaml; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName || 'config.yaml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadAWGConfigs() {
  if (proxyList.length === 0) {
    alert(translations['could_not_process_files']);
    return;
  }

  proxyList.forEach((proxy, index) => {
    try {
      const awgConfig = generateSingleAWGConfig(proxy);
      const fileName = getAWGFileName(proxy, index);
      
      const blob = new Blob([awgConfig], { type: 'application/x-config; charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (e) {
      console.error(`Failed to download config ${index + 1}: ${e.message}`);
      alert(translations['error_in_file'].replace('{file}', getAWGFileName(proxy, index)).replace('{msg}', e.message));
    }
  });
}

function generateSingleAWGConfig(proxy) {
  const amneziaOptions = proxy['amnezia-wg-option'];
  
  let awgConfig = '';
  
  if (proxy.originalName) {
    awgConfig += `# ${proxy.originalName}\n`;
  } else {
    awgConfig += `# Безымянный конфиг\n`;
  }
  
  awgConfig += `[Interface]\n`;
  awgConfig += `PrivateKey = ${proxy.private_key}\n`;
  awgConfig += `Address = ${proxy.ip}\n`;
  
  if (proxy.dns && proxy.dns.length > 0) {
    awgConfig += `DNS = ${proxy.dns.join(', ')}\n`;
  }
  
  awgConfig += `MTU = ${proxy.mtu}\n`;
  awgConfig += `Jc = ${amneziaOptions.jc}\n`;
  awgConfig += `Jmin = ${amneziaOptions.jmin}\n`;
  awgConfig += `Jmax = ${amneziaOptions.jmax}\n`;
  awgConfig += `H1 = ${amneziaOptions.h1}\n`;
  awgConfig += `H2 = ${amneziaOptions.h2}\n`;
  awgConfig += `H3 = ${amneziaOptions.h3}\n`;
  awgConfig += `H4 = ${amneziaOptions.h4}\n`;
  awgConfig += `\n[Peer]\n`;
  awgConfig += `PublicKey = ${proxy.public_key}\n`;
  if (proxy.preshared_key) {
  awgConfig += `PresharedKey = ${proxy.preshared_key}\n`;}
  awgConfig += `AllowedIPs = ${proxy.allowed_ips.join(', ').replace(/'/g, '')}\n`;
  awgConfig += `Endpoint = ${proxy.server}:${proxy.port}\n`;
  
  return awgConfig;
}

function getAWGFileName(proxy, index) {
  if (proxy.originalName) {
    const cleanedName = proxy.originalName.replace(/-FREE/g, '');
    return `${cleanedName.replace(/[^a-z0-9]/gi, '_')}.conf`;
  }
  return `config_${index + 1}.conf`;
}

function fallbackDownload(proxies) {
  proxies.forEach((proxy, index) => {
    const awgConfig = generateSingleAWGConfig(proxy);
    const fileName = getAWGFileName(proxy, index);
    
    const blob = new Blob([awgConfig], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100 * index);
  });
}

function replaceMobileText() {
    if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return;

    // Заменяем подписи к полям ввода
    const labels = document.querySelectorAll('.musor2 .jc');
    labels[0].previousSibling.textContent = "fake_packets = ";
    labels[1].previousSibling.textContent = "fake_packets_size = ";
    labels[2].previousSibling.textContent = "fake_packets_delay = ";
}

// Вызываем при загрузке и при изменении размера окна
window.addEventListener('DOMContentLoaded', replaceMobileText);
window.addEventListener('resize', replaceMobileText);



// TRNSLATION
const supportedLangs = ["en", "tr", "fa", "ru", "zh"];
let currentLang = localStorage.getItem("lang") || detectBrowserLang();

function detectBrowserLang() {
  let lang = navigator.language.slice(0, 2);
  return supportedLangs.includes(lang) ? lang : "en";
}

async function loadLanguage(lang) {
  try {
    const res = await fetch(`./lang/${lang}.json`);
    if (!res.ok) throw new Error(`Language file not found: ${lang}`);
    const t = await res.json();          // <— avoid shadowing 'translations'
    translatePage(t);                    // translatePage will set global 'translations'
    localStorage.setItem("lang", lang);
    document.body.classList.remove('lang-en', 'lang-tr', 'lang-fa', 'lang-ru', 'lang-zh');
    document.body.classList.add(`lang-${lang}`);
    currentLang = lang;
    updateDropdownSelection(lang);

    updateFileLabel();                   // <— refresh label with current lang
  } catch (err) {
    console.error(err);
  }
}


let translations = {};

function translatePage(t) {
  translations = t;  // save globally for script use
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      if (el.tagName.toLowerCase() === "title") {
        document.title = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Also update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) {
      el.placeholder = t[key];
    }
  });
}

function updateDropdownSelection(lang) {
  const dropdown = document.getElementById('languageSwitcher');
  const selectedText = dropdown.querySelector('.selected-text');
  const options = dropdown.querySelectorAll('.dropdown-option');
  
  // Remove active class from all options
  options.forEach(opt => opt.classList.remove('active'));
  
  // Find and activate the current language option
  const activeOption = dropdown.querySelector(`[data-value="${lang}"]`);
  if (activeOption) {
    activeOption.classList.add('active');
    selectedText.textContent = activeOption.textContent;
  }
}

// Custom Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.getElementById('languageSwitcher');
  const selected = dropdown.querySelector('.dropdown-selected');
  const selectedText = dropdown.querySelector('.selected-text');
  const options = dropdown.querySelectorAll('.dropdown-option');
  
  // Toggle dropdown
  selected.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
  
  // Handle option selection
  options.forEach(option => {
    option.addEventListener('click', function() {
      const selectedLang = this.dataset.value;
      
      // Only load if different language selected
      if (selectedLang !== currentLang) {
        loadLanguage(selectedLang);
      }
      
      // Close dropdown
      dropdown.classList.remove('open');
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
  
  // Close dropdown on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      dropdown.classList.remove('open');
    }
  });
  
  // Initialize: Load initial language and set dropdown
  loadLanguage(currentLang);
});

// --- i18n helpers ---
function i18n(key, params = {}) {
  let str = (translations && translations[key]) ? translations[key] : key;
  for (const k in params) str = str.replace(new RegExp(`{${k}}`, 'g'), params[k]);
  return str;
}

function updateFileLabel() {
  const fileInput = document.getElementById('wgFiles');
  const uploadText = document.querySelector('#fileUploadLabel .upload-text');
  if (!uploadText || !fileInput) return;

  const count = fileInput.files ? fileInput.files.length : 0;
  if (count === 0) {
    // prefer 'select_files' if it exists, else 'select_files_label'
    uploadText.textContent = translations['select_files'] 
      ? translations['select_files'] 
      : i18n('select_files_label');
  } else {
    uploadText.textContent = i18n('files_selected_label', { count });
  }
}




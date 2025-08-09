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
    const label = document.getElementById('fileUploadLabel');
    
    if (files.length === 0) {
        label.textContent = 'Select files';
    } else {
        label.textContent = `Files selected: ${files.length}`;
    }
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
        // Add flag at the beginning, keep original name unchanged
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
    ip: interfaceData.address.split('/')[0],
    private_key: interfaceData.privatekey,
    public_key: peerData.publickey,
    preshared_key: peerData.presharedKey, // Add PresharedKey to the output
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
  if (!files.length) return alert('Select files .conf');

  const selectedOption = document.querySelector('input[name="option"]:checked').id;
  
  proxyList = [];
  document.getElementById('fileList').innerHTML = `Files being processed: ${Array.from(files).map(f => f.name).join(', ')}`;
  let filesProcessed = 0;
  
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function() {
      try {
        const wgConfig = parseWGConfig(reader.result);
        const proxy = convertToClashProxy(wgConfig, file.name);
        proxyList.push(proxy);
        filesProcessed++;
        if (filesProcessed === files.length) {
          switch(selectedOption) {
            case 'clash':
              generateClashYaml();
              break;
            case 'awg':
              generateAWGYaml();
              break;
            case 'karing':
              generateKaringYaml();
              break;
            default:
              generateClashYaml();
          }
        }
      } catch (e) {
        alert(`Error in file ${file.name}: ${e.message}`);
        filesProcessed++; 
        if (filesProcessed === files.length) {
          generateClashYaml();
        }
      }
    };
    reader.onerror = function() {
      alert(`Error reading file ${file.name}`);
      filesProcessed++;
      if (filesProcessed === files.length) {
        generateClashYaml();
      }
    };
    reader.readAsText(file);
  });
}

function generateClashYaml() {
  if (proxyList.length === 0) {
    alert('Could not process any files');
    return;
  }

  const yamlProxies = proxyList.map(proxy => {
    let yaml = `- name: ${proxy.name}\n`;
    yaml += `  type: ${proxy.type}\n`;
    yaml += `  server: ${proxy.server}\n`;
    yaml += `  port: ${proxy.port}\n`;
    yaml += `  ip: ${proxy.ip}\n`;
    yaml += `  private-key: ${proxy.private_key}\n`;
    yaml += `  public-key: ${proxy.public_key}\n`;
    yaml += `  allowed-ips: [${proxy.allowed_ips.join(', ')}]\n`;
	if (proxy.preshared_key) {
    yaml += `  pre-shared-key: ${proxy.preshared_key}\n`;}
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
      .then(() => alert('Config copied to clipboard!'))
      .catch(err => alert('Failed to copy: ', err));
  };
}

function generateAWGYaml() {
  if (proxyList.length === 0) {
    alert('Could not process any files');
    return;
  }

  const awgConfigs = proxyList.map(proxy => generateSingleAWGConfig(proxy));
  const finalOutput = awgConfigs.join('\n\n');

  document.getElementById('yamlOutput').value = finalOutput;
  document.getElementById('downloadBtn').classList.remove('hidden');
  document.getElementById('downloadBtn').onclick = downloadAWGConfigs;
  document.getElementById('copyBtn').classList.remove('hidden');
  document.getElementById('copyBtn').onclick = () => {
    navigator.clipboard.writeText(fullYaml)
      .then(() => alert('Config copied to clipboard!'))
      .catch(err => alert('Failed to copy: ', err));
  };
}

function generateKaringYaml() {
  if (proxyList.length === 0) {
    alert('Could not process any files');
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
    "local_address": [`${proxy.ip}/32`],
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
      .then(() => alert('Config copied to clipboard!'))
      .catch(err => alert('Failed to copy: ', err));
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
  if (proxyList.length === 0) return;
  const downloadFrame = document.createElement('iframe');
  downloadFrame.style.display = 'none';
  document.body.appendChild(downloadFrame);
  proxyList.forEach((proxy, index) => {
    setTimeout(() => {
      const awgConfig = generateSingleAWGConfig(proxy);
      const fileName = getAWGFileName(proxy, index);
      
      const blob = new Blob([awgConfig], { type: 'application/x-config; charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      downloadFrame.contentDocument.body.appendChild(link);
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 10000);
    }, 1000 * index);
  });
  setTimeout(() => {
    document.body.removeChild(downloadFrame);
  }, 1000 * proxyList.length + 1000);
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

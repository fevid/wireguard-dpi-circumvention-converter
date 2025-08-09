# WireGuard DPI Circumvention Converter

## Overview

This project is a fork of [ProtonVPN-Converter](https://github.com/protontestguide/ProtonVPN-Converter), customized to convert WireGuard configuration files into formats that incorporate junk packet generation to evade Deep Packet Inspection (DPI) in highly restricted internet environments, such as China, Russia, and Iran. Unlike the original, this tool is not limited to ProtonVPN configurations and supports any valid WireGuard `.conf` file. It generates configurations for Clash, AmneziaWG (AWG), and Karing, enhancing VPN traffic obfuscation to bypass censorship and surveillance.

## Features

- **Universal WireGuard Support**: Converts any valid WireGuard `.conf` file, not limited to ProtonVPN.
- **DPI Circumvention**: Adds junk packet options (`jc`, `jmin`, `jmax`, etc.) to obfuscate VPN traffic, tailored for restrictive environments.
- **Multiple Output Formats**:
  - **Clash**: YAML configuration with junk packet options.
  - **AmneziaWG (AWG)**: Text-based WireGuard configs with Amnezia options.
  - **Karing**: JSON configuration with customizable fake packet settings.
- **Customizable Junk Packets**: Predefined or user-defined settings for junk packet parameters (`jc`, `jmin`, `jmax`) and Karing-specific fake packets (`fake_packets`, `fake_packets_size`, `fake_packets_delay`).
- **Country Flag Detection**: Automatically identifies country codes in proxy names and adds flag emojis for clarity.
- **Randomized Parameters**: Generate random junk packet settings for quick setup.
- **User-Friendly Interface**: Web-based UI for file selection, configuration, and downloading results.

## Use Cases

- Bypassing internet censorship in countries with advanced DPI (e.g., China, Russia, Iran).
- Enhancing VPN privacy for users in restrictive network environments.
- Converting and customizing WireGuard configurations for various VPN clients.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wireguard-dpi-circumvention-converter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd wireguard-dpi-circumvention-converter
   ```
3. Open `index.html` in a web browser to use the tool locally, or host it on a web server.

## Usage

1. **Upload WireGuard Configs**: Select one or more `.conf` files via the web interface.
2. **Select Output Format**: Choose Clash, AWG, or Karing.
3. **Configure Junk Packets**:
   - Select predefined options (`junk1`, `junk2`) or enter custom values for `jc`, `jmin`, `jmax`.
   - For Karing, set `fake_packets`, `fake_packets_size`, and `fake_packets_delay` (predefined or custom).
4. **Convert and Download**: Click the convert button to process files and download the generated configuration(s).
5. **Copy to Clipboard**: Optionally copy the output for manual use.

## Example

### Input (WireGuard `.conf`)
```
[Interface]
PrivateKey = <private_key>
Address = 10.0.0.1/24
DNS = 8.8.8.8

[Peer]
PublicKey = <public_key>
Endpoint = server.com:port
AllowedIPs = 0.0.0.0/0
```

### Output (Amnezia Example)
```
# ProxyName
[Interface]
PrivateKey = <private_key>
Address = 10.0.0.1
DNS = 8.8.8.8
MTU = 1420
Jc = 128
Jmin = 1279
Jmax = 1280
H1 = 1
H2 = 2
H3 = 3
H4 = 4

[Peer]
PublicKey = <public_key>
AllowedIPs = 0.0.0.0/0
Endpoint = server.com:port
```

## Customization Notes

This fork extends the original [ProtonVPN-Converter](https://github.com/protontestguide/ProtonVPN-Converter) with the following enhancements:
- Removed ProtonVPN-specific logic, allowing conversion of any WireGuard configuration.
- Modified `generateProxyGroups` to group all proxies under a single "All Proxies" category, improving compatibility with diverse VPN providers.
- Enhanced junk packet configuration for better DPI circumvention, with flexible options for AmneziaWG and Karing.
- Improved country code detection to support a broader range of proxy names.

## Technical Details

- **Junk Packet Parameters**:
  - `jc`: Number of junk packets.
  - `jmin`/`jmax`: Jitter range for packet timing.
  - `s1`, `s2`, `h1`, `h2`, `h3`, `h4`: AmneziaWG obfuscation settings.
  - Karing: `fake_packets`, `fake_packets_size`, `fake_packets_delay`, `fake_packets_mode`.
- **File Processing**: Uses `FileReader` to parse `.conf` files and convert them to the selected format.
- **Dependencies**: Pure JavaScript, no external dependencies required.
- **Country Code Detection**: Regex-based identification of country codes with flag emoji mapping.

## Credits

- Original project: [ProtonVPN-Converter](https://github.com/protontestguide/ProtonVPN-Converter) by [protontestguide](https://github.com/protontestguide).
- Forked and customized by [your-username](https://github.com/your-username).
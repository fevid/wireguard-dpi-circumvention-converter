# WireGuard DPI Circumvention Converter

## Overview

A web-based tool for converting WireGuard configuration files into formats that incorporate junk packet generation to evade Deep Packet Inspection (DPI) in highly restricted internet environments, such as China, Russia, and Iran. It generates configurations for Clash, AmneziaWG (AWG), and Wiresock, enhancing VPN traffic obfuscation to bypass censorship and surveillance.

## Features

- **Universal WireGuard Support**: Converts any valid WireGuard `.conf` file.
- **DPI Circumvention**: Adds junk packet options (`jc`, `jmin`, `jmax`, etc.) to obfuscate VPN traffic, tailored for restrictive environments.
- **Multiple Output Formats**:
  - **Clash**: YAML configuration with junk packet options.
  - **AmneziaWG (AWG)**: Text-based WireGuard configs with Amnezia options.
  - **Wiresock**: Text-based WireGuard configs with Masking options.
- **Customizable Junk Packets**: Predefined or user-defined settings for junk packet parameters (`jc`, `jmin`, `jmax`).
- **DNS Override**: Override DNS settings with well-known providers (Google, Cloudflare, Quad9, OpenDNS, AdGuard, NextDNS) or custom DNS servers.
- **MTU Override**: Customize MTU value (default: 1420, typical range: 1280-1500) for optimized VPN performance.
- **Country Flag Detection**: Automatically identifies country codes in proxy names and adds flag emojis for clarity.
- **Randomized Parameters**: Generate random junk packet settings for quick setup.
- **User-Friendly Interface**: Web-based UI for file selection, configuration, and downloading results.

## Usage

Visit the website on [GitHub Pages](https://fevid.github.io/wireguard-dpi-circumvention-converter/) or [Vercel](https://wireguard-converter.vercel.app/), or clone the project and serve it locally by running `python -m http.server 8000` in the project directory, then accessing `http://localhost:8000` in your browser.
1. **Insert WireGuard Configs**: Select one or more `.conf` files via the web interface or paste them manually.
2. **Select Output Format**: Choose Clash, AWG, or Wiresock.
3. **Configure Junk Packets**:
   - Select predefined options (`junk1`, `junk2`) or enter custom values for `jc`, `jmin`, `jmax`.
4. **Configure DNS (Optional)**:
   - Enable "Override DNS Settings" to replace the DNS servers in your config.
   - Select from well-known providers (Google, Cloudflare, Quad9, OpenDNS, AdGuard, NextDNS) or enter custom DNS servers.
5. **Configure MTU (Optional)**:
   - Enable "Override MTU Value" to change the MTU setting.
   - Enter a custom MTU value (default: 1420, recommended range: 1280-1500).
6. **Convert and Download**: Click the convert button to process files and download the generated configuration(s).
7. **Copy to Clipboard**: Optionally copy the output for manual use.


## 🗂 Other Projects

- [OpenVPN AuthBatch](https://github.com/fevid/openvpn-authbatch)


## 💸 Support

Even small amounts make a difference.

| Network | Address |
| --- | --- |
| BTC | `bc1q8clnx03a4wzcmvt0n9ntk0tj6zx22xzrq2jvhk` |
| ETH | `0xaE5774e34635d76f0B6b9B685b99fA1827fADAEa` |
| LTC | `ltc1qak0ptwlnp7vn76yhryq3u6mflmdcm3s0t6cj60` |
| TON | `UQBVVcD7mRhwXlyJAD2V0OIeDh496_DHhUlMdidS4R6nvn2H` |
| USDT/USDC (TRC20) | `TDcQTV1aJ4SPtw8sft2CvQhmMzS22gaVx1` |

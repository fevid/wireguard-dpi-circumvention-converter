# WireGuard DPI Circumvention Converter

## Overview

This project is a fork of [ProtonVPN-Converter](https://github.com/protontestguide/ProtonVPN-Converter), customized UI for converting WireGuard configuration files into formats that incorporate junk packet generation to evade Deep Packet Inspection (DPI) in highly restricted internet environments, such as China, Russia, and Iran. It generates configurations for Clash, AmneziaWG (AWG), and Wiresock, enhancing VPN traffic obfuscation to bypass censorship and surveillance.

## Features

- **Universal WireGuard Support**: Converts any valid WireGuard `.conf` file, not limited to ProtonVPN.
- **DPI Circumvention**: Adds junk packet options (`jc`, `jmin`, `jmax`, etc.) to obfuscate VPN traffic, tailored for restrictive environments.
- **Multiple Output Formats**:
  - **Clash**: YAML configuration with junk packet options.
  - **AmneziaWG (AWG)**: Text-based WireGuard configs with Amnezia options.
  - **Wiresock**: Text-based WireGuard configs with Masking options.
- **Customizable Junk Packets**: Predefined or user-defined settings for junk packet parameters (`jc`, `jmin`, `jmax`).
- **Country Flag Detection**: Automatically identifies country codes in proxy names and adds flag emojis for clarity.
- **Randomized Parameters**: Generate random junk packet settings for quick setup.
- **User-Friendly Interface**: Web-based UI for file selection, configuration, and downloading results.

## Usage

Visit the website on [GitHub Pages](https://fevid.github.io/wireguard-dpi-circumvention-converter/) or [Vercel](https://wireguard-converter.vercel.app/), or clone the project and serve it locally by running `python -m http.server 8000` in the project directory, then accessing `http://localhost:8000` in your browser.
1. **Insert WireGuard Configs**: Select one or more `.conf` files via the web interface or paste them manually.
2. **Select Output Format**: Choose Clash, AWG, or Wiresock.
3. **Configure Junk Packets**:
   - Select predefined options (`junk1`, `junk2`) or enter custom values for `jc`, `jmin`, `jmax`.
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
- UI Overhauled and Removed ProtonVPN-specific UI, allowing conversion of any WireGuard configuration.
- Improved country code detection to support a broader range of proxy names.
- Multilingual.


## Credits

- Original project: [ProtonVPN-Converter](https://github.com/protontestguide/ProtonVPN-Converter) by [protontestguide](https://github.com/protontestguide).

## 🗂 Other Projects

- [OpenVPN AuthBatch](https://github.com/fevid/openvpn-authbatch)



<a href="https://nowpayments.io/donation?api_key=bc7f43a9-c6fe-4382-a8eb-69001c7a5fe0" target="_blank" rel="noreferrer noopener">
    <img src="https://nowpayments.io/images/embeds/donation-button-black.svg" alt="Crypto donation button by NOWPayments">
</a>

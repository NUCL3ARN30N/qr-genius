# QR Genius

![GitHub stars](https://img.shields.io/github/stars/NUCL3ARN30N/qr-genius?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/NUCL3ARN30N/qr-genius?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/NUCL3ARN30N/qr-genius?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/NUCL3ARN30N/qr-genius?style=for-the-badge)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)

> Advanced QR code generator & reader with custom styles, icon libraries, shape masks, gradients, bulk export & live preview

## Quick Start

**Live at:** [qr.genius-space.org](https://qr.genius-space.org)

## Modes

| Mode | Description |
|------|-------------|
| **Create** | Generate styled QR codes with full customization |
| **Read** | Upload or paste a QR code image to decode its contents |
| **Bulk** | Generate and export multiple QR codes at once |

## Data Types

| # | Type | Description |
|:-:|------|-------------|
| 1 | URL | Encode website links |
| 2 | Text | Encode plain text messages |
| 3 | Email | mailto: with subject & body |
| 4 | Phone | tel: dial links |
| 5 | SMS | Pre-filled text messages |
| 6 | WiFi | Auto-connect credentials (WPA/WEP) |
| 7 | vCard | Full contact cards |
| 8 | Event | Calendar events (iCal) |

## Styling Options

| # | Option | Description |
|:-:|--------|-------------|
| 1 | Dot Styles | Square, Dots, Rounded, Classy, Classy Round, Extra Round |
| 2 | Corner Squares | Square, Dot, Rounded |
| 3 | Corner Dots | Square, Dot |
| 4 | Colors | Solid or Gradient (linear / radial, 4 directions) |
| 5 | Corner Colors | Separate Corner Square & Corner Dot colors |
| 6 | Shape Masks | None, Circle, Rounded, Heart, Diamond, Shield, Hexagon, Star |
| 7 | Background Patterns | None, Dots, Grid, Noise — with color & opacity control |
| 8 | Frames / Borders | None, Simple, Rounded, Badge, Ticket — with color & thickness |
| 9 | Text Labels | Custom text above or below QR, configurable font, size & color |
| 10 | Transparent Background | Toggle for overlay use on existing designs |
| 11 | Error Correction | L (7%), M (15%), Q (25%), H (30%) |
| 12 | Size & Margin | 150–1000px, margin 0–50 |

## Icon Sources

| Source | Format | Reference |
|--------|--------|-----------|
| Presets | Click to select | 15 built-in icons |
| FontAwesome | `fa-solid fa-rocket` | [fontawesome.com](https://fontawesome.com/icons) |
| Remix Icon | `ri-rocket-line` | [remixicon.com](https://remixicon.com) |
| Nerd Fonts | `nf-fa-linux` | [nerdfonts.com/cheat-sheet](https://www.nerdfonts.com/cheat-sheet) |
| Simple Icons | `github` | [simpleicons.org](https://simpleicons.org) |
| Upload | PNG, JPG, SVG | Drag & drop or click |

## Style Presets

Save and reuse your QR code designs:

- **Save** — Capture all current styling into a named preset (stored in browser)
- **Apply** — One-click restore of any saved preset
- **Export** — Download preset as shareable `.json` file
- **Import** — Load a `.json` preset file from disk

Presets capture all visual settings: colors, gradients, dot styles, shape masks, patterns, frames, labels, icon selection, size, margin, and error correction level.

## Export Options

| Format | Single | Bulk |
|--------|--------|------|
| PNG | ✓ | ✓ (ZIP) |
| SVG | ✓ | ✓ (ZIP) |
| PDF (A4) | ✓ (with optional background image) | ✓ (multi-page) |

## QR Reader

Upload or paste a QR code image to decode it. Supports automatic detection of:

- URLs (with direct open link)
- Email addresses (mailto:)
- Phone numbers (tel:)
- SMS messages
- WiFi credentials (SSID, password, encryption)
- vCard contacts (name, org, phone, email, address)
- Calendar events (title, location, start/end times)
- Plain text

Accepts PNG, JPG, SVG, GIF, BMP, and WebP. Includes clipboard paste support.

## Bulk Mode

Generate multiple QR codes at once:

- **Text input** — One data string per line
- **CSV upload** — Auto-detects columns, select the data column
- **Shared styling** — All codes use the current Create tab configuration
- **Preview grid** — Thumbnail view of all generated codes
- **Export** — ZIP of PNGs, ZIP of SVGs, or multi-page A4 PDF (max 200 codes)

## Controls

- **Live Preview:** QR code updates automatically on every change (180ms debounce)
- **Undo / Redo:** 50-state history for all changes
- **Download:** Export as PNG, SVG, or PDF (with optional A4 background)
- **Custom Icons:** 5 icon libraries + custom image upload with adjustable size

## Requirements

**Browser:** Any modern browser (Chrome, Firefox, Safari, Edge)  
**Server:** None — fully static, runs 100% client-side  
**Dependencies:** Loaded via CDN (QR Code Styling, Font Awesome, Remix Icon, Nerd Fonts, Simple Icons, jsQR, jsPDF, JSZip, Google Fonts)

---

<p align="center">
  <sub>Badges from <a href="https://github.com/envoy1084/awesome-badges">envoy1084/awesome-badges</a></sub>
</p>

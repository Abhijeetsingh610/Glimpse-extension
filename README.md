<div align="center">
  <img src="icons/icon128.png" alt="Glimpse Logo" width="128" height="128" />

  # Glimpse
  
  **AI-Powered Tab & Bookmark Search for Chrome**

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)](https://developer.chrome.com/docs/extensions/mv3/)
  [![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Coming_Soon-gray?logo=google-chrome)](https://chrome.google.com/webstore)
  
  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-usage">Usage</a> •
    <a href="#-privacy">Privacy</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

---

## 🔍 Overview

**Glimpse** transforms how you navigate your browser. Instead of digging through cluttered tabs or forgotten bookmarks, just ask for what you need. Powered by **Google Gemini AI**, Glimpse understands natural language queries like *"find my GitHub tab"* or *"show bookmarks about React"*.

It also features a lightning-fast **Local Mode** that works completely offline, ensuring you can always find what you're looking for instantly.

## ✨ Features

- **🤖 AI-Powered Search**: Understands context and intent (e.g., "tabs I opened yesterday").
- **⚡ Lightning Fast**: Instant results with local fuzzy search fallback.
- **🔒 Privacy First**: Your data never leaves your device (except for AI search, which is optional).
- **🎯 Dual Scope**: Searches both open tabs (across all windows) and bookmarks simultaneously.
- **⌨️ Keyboard Centric**: Navigate entirely without a mouse using `Ctrl+Shift+F` and arrow keys.
- **🎨 Modern UI**: Beautiful dark mode interface designed for readability.

## 🚀 Installation

### Option 1: Load Unpacked (For Developers)

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/glimpse-extension.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Toggle **Developer mode** in the top right corner.
4. Click **Load unpacked**.
5. Select the `glimpse-extension` directory.

### Option 2: Chrome Web Store
*(Coming Soon)*

## 📖 Usage

1. **Open Glimpse**: Press `Ctrl+Shift+F` (or `Cmd+Shift+F` on Mac).
2. **Search**:
   - **Local Mode**: Type keywords (e.g., "github", "docs").
   - **AI Mode**: Type natural queries (e.g., "find that article about AI").
3. **Navigate**: Use `↑` / `↓` arrow keys to select a result.
4. **Open**: Press `Enter` to jump to the tab or open the bookmark.

### ⚙️ Configuration

Click the **Settings (⚙️)** icon in the popup to:
- **Enable AI Mode**: Enter your free [Google Gemini API Key](https://makersuite.google.com/app/apikey).
- **Toggle Search Modes**: Switch between AI and Local search.
- **Manage Data**: Remove your API key at any time.

## 🔒 Privacy Policy

We take privacy seriously.
- **No Tracking**: We do not collect analytics or user data.
- **Local Storage**: Your API key is stored locally on your device using `chrome.storage.sync`.
- **AI Data**: When using AI mode, only your search query and relevant tab/bookmark titles are sent to Google Gemini.
- **Offline Capable**: Local mode works 100% offline with zero data transmission.

Read our full [Privacy Policy](PRIVACY.md).

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML, CSS (Variables, Flexbox), JavaScript (ES6+).
- **Extension API**: Manifest V3 (Service Workers, Storage, Tabs, Bookmarks).
- **AI Integration**: Google Gemini API (`gemini-1.5-flash`).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Made with ❤️ by the Glimpse Team
</div>

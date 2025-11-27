# 🚀 Quick Start Guide - Glimpse

## 📦 Installation (2 minutes)

### Step 1: Load the Extension
1. Open Google Chrome
2. Go to `chrome://extensions/`
3. Toggle **Developer mode** ON (top-right corner)
4. Click **Load unpacked**
5. Select the `glimpse-extension` folder
6. ✅ Done! You should see Glimpse in your extensions

### Step 2: Pin the Extension (Optional)
1. Click the puzzle piece icon in Chrome toolbar
2. Find "Glimpse"
3. Click the pin icon to keep it visible

---

## 🎯 First Use (Local Mode)

You can start using Glimpse immediately without any setup!

### Try Your First Search
1. Press **`Ctrl+Shift+F`** (or **`Cmd+Shift+F`** on Mac)
2. Type: `gmail` (or any site you have open)
3. See results appear instantly
4. Use **arrow keys** to navigate
5. Press **Enter** to jump to the tab

**That's it!** You're now using Glimpse with local search mode.

---

## 🤖 Optional: Enable AI Mode (5 minutes)

Want smarter, natural language search? Follow these steps:

### Step 1: Get a Free Google Gemini API Key
1. Visit: **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Get API key"** or **"Create API key"**
4. Click **"Create API key in new project"** (easiest option)
5. **Copy** the generated API key (starts with `AIzaSy...`)

> 💡 **Note**: The free tier includes:
> - 15 requests per minute
> - 1,500 requests per day
> - More than enough for personal use!

### Step 2: Add API Key to Glimpse
1. Open Glimpse (press `Ctrl+Shift+F`)
2. Click the **⚙️ settings icon** (top-right)
3. Paste your API key in the text field
4. Click **"Save API Key"**
5. You'll see a success message ✅

### Step 3: Switch to AI Mode
1. In settings, click **"AI Search"** mode button
2. It should highlight with a blue border
3. Close settings
4. You'll see **"🤖 AI Mode"** indicator below search box

### Step 4: Try AI Search!
Now you can use natural language:
- *"find my GitHub tab"*
- *"show bookmarks about React"*
- *"tabs with documentation"*
- *"my email"*

See the difference? AI understands context! 🎉

---

## 💡 Usage Tips

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+F` | Open Glimpse |
| `↑` / `↓` | Navigate results |
| `Enter` | Open selected result |
| `Escape` | Close Glimpse |

### Search Tips

**Local Mode** (exact matching):
- ✅ `github` - matches "GitHub" anywhere
- ✅ `react doc` - matches "React Documentation"
- ✅ Part of URL works too!

**AI Mode** (natural language):
- ✅ `find tabs about coding`
- ✅ `email inbox`
- ✅ `bookmarks from yesterday` (context-aware)
- ✅ `show me news articles`

### Pro Tips
1. **Search tabs across windows**: Glimpse finds tabs in ALL Chrome windows
2. **Search bookmarks**: It searches your entire bookmark library automatically
3. **Fast access**: Press `Ctrl+Shift+F` from anywhere in Chrome
4. **Privacy mode**: Use Local mode for 100% offline, private search

---

## 🎨 Interface Overview

```
┌─────────────────────────────────────┐
│  ⚡ Glimpse            ⚙️           │ ← Header
├─────────────────────────────────────┤
│  🔍 Search tabs and bookmarks...    │ ← Search box
│      🤖 AI Mode                      │ ← Mode indicator
├─────────────────────────────────────┤
│                                     │
│  📄 Result 1                   TAB  │
│  🌐 https://example.com        95%  │
│                                     │
│  📄 Result 2              BOOKMARK  │
│  🌐 https://another.com        88%  │ ← Results area
│                                     │
│  ...more results...                 │
│                                     │
├─────────────────────────────────────┤
│  Press Ctrl+Shift+F • Use ↑ ↓      │ ← Footer
└─────────────────────────────────────┘
```

---

## ⚙️ Settings Explained

Click the settings icon to access:

### 1. Google Gemini API Key
- **Purpose**: Enable AI-powered search
- **Required**: No (optional for AI mode)
- **Storage**: Saved locally on your device
- **Privacy**: Never shared with anyone

### 2. Search Mode Toggle
- **AI Search**: Smart, context-aware (needs API key)
- **Local Search**: Fast, exact matching (works offline)

### 3. Privacy Info
- Your data stays on your device
- No tracking or analytics
- Complete transparency

---

## ❓ Common Questions

### Q: Do I need to pay for the API key?
**A:** No! Google Gemini has a generous free tier (1,500 requests/day).

### Q: What if I don't want to use AI?
**A:** No problem! Local search mode works great without any API key.

### Q: Is my browsing data safe?
**A:** Absolutely! We never store or collect your data. See [PRIVACY.md](PRIVACY.md).

### Q: Can I customize the keyboard shortcut?
**A:** Yes! Go to `chrome://extensions/shortcuts/` to change it.

### Q: Does this work with bookmarks in folders?
**A:** Yes! It searches through all your bookmarks, including nested folders.

### Q: How many tabs/bookmarks can it search?
**A:** Unlimited! Though AI mode processes the first 100 for faster results.

---

## 🐛 Troubleshooting

### Search not working?
1. Refresh the extension: Go to `chrome://extensions/` and click reload
2. Check if you have tabs or bookmarks to search
3. Try a different search term

### AI mode not working?
1. Verify your API key is correct
2. Check internet connection
3. Make sure you're under the free tier limit (1,500/day)
4. Try switching to Local mode temporarily

### Keyboard shortcut not working?
1. Check `chrome://extensions/shortcuts/`
2. Make sure another extension isn't using the same shortcut
3. Try reassigning it

### Extension not appearing?
1. Make sure it's enabled in `chrome://extensions/`
2. Pin it using the puzzle piece icon
3. Try restarting Chrome

---

## 📚 Next Steps

### Learn More
- Read the full [README.md](README.md)
- Review the [Privacy Policy](PRIVACY.md)
- Check the [Testing Guide](TESTING.md)

### Get Help
- GitHub Issues: [Report a bug](#)
- Email: support@glimpseextension.com

### Contribute
- Star the project ⭐
- Share with friends
- Suggest features
- Report bugs

---

## 🎉 You're All Set!

You can now find any tab or bookmark in seconds. Happy searching!

**Quick Reminder:**
```
Press Ctrl+Shift+F anytime to open Glimpse
```

---

**Made with ❤️ by the Glimpse team**

© 2024 Glimpse Extension

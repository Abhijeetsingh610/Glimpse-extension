# Testing & Development Guide - Glimpse

## 🧪 Testing the Extension Locally

### 1. Load the Extension
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `glimpse-extension` folder
5. The extension should now appear in your extensions list

### 2. Verify Installation
- Check that the Glimpse icon appears in the Chrome toolbar
- Click the icon to verify the popup opens
- Verify the UI loads correctly

---

## 🔍 Testing Features

### Local Search Mode (No API Key)

**Test 1: Basic Tab Search**
1. Open several tabs with different websites (e.g., GitHub, Gmail, YouTube)
2. Press `Ctrl+Shift+F` to open Glimpse
3. Type "github"
4. Verify GitHub tab appears in results
5. Press Enter to navigate to it
6. Verify tab activates and window focuses

**Test 2: Bookmark Search**
1. Create a few test bookmarks with distinct names
2. Open Glimpse
3. Search for a bookmark name
4. Verify bookmark appears in results
5. Click or press Enter on the result
6. Verify bookmark opens in a new tab

**Test 3: Fuzzy Matching**
1. Open tabs with titles like "React Documentation"
2. Search for "react doc"
3. Verify partial matches work
4. Search for "documentation"
5. Verify it finds React documentation tab

**Test 4: Multiple Window Search**
1. Open multiple Chrome windows
2. Open tabs in each window
3. Use Glimpse to search
4. Verify results include tabs from all windows
5. Verify navigating to a tab in another window works

**Test 5: Empty States**
1. Open Glimpse with empty search
2. Verify empty state shows with examples
3. Type a query that has no matches
4. Verify "No results" state appears
5. Clear the search
6. Verify empty state returns

**Test 6: Keyboard Navigation**
1. Search for something with multiple results
2. Press `↓` arrow key
3. Verify selection moves down
4. Press `↑` arrow key
5. Verify selection moves up
6. Verify wrapping (top to bottom, bottom to top)
7. Verify selected item scrolls into view
8. Press `Escape`
9. Verify popup closes

---

### AI Search Mode (Requires API Key)

**Setup: Get a free Google Gemini API key**
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (starts with "AIzaSy...")

**Test 7: API Key Setup**
1. Open Glimpse settings
2. Paste your API key
3. Click "Save API Key"
4. Verify success message appears
5. Verify "Remove API Key" button appears
6. Verify AI mode becomes available

**Test 8: AI-Powered Search**
1. Switch to "AI Mode" in settings
2. Close settings
3. Verify mode indicator shows "🤖 AI Mode"
4. Search with natural language: "find my email tab"
5. Verify Gemini returns relevant results
6. Check confidence scores appear
7. Verify results are ranked by relevance

**Test 9: AI Context Understanding**
1. Open tabs about different topics (coding, news, shopping)
2. Search: "tabs about programming"
3. Verify AI identifies coding-related tabs
4. Search: "news articles"
5. Verify AI identifies news tabs

**Test 10: AI Fallback**
1. Enter an invalid API key
2. Try searching in AI mode
3. Verify it automatically falls back to local search
4. Verify error message appears (optional)

**Test 11: API Key Removal**
1. Go to settings
2. Click "Remove API Key"
3. Confirm deletion
4. Verify key is cleared
5. Verify mode switches to Local
6. Verify AI mode becomes disabled

---

### UI/UX Testing

**Test 12: Responsive Design**
1. Open Glimpse
2. Verify all elements fit properly
3. Check no horizontal scrolling
4. Verify scrollable results area

**Test 13: Loading States**
1. Search for something
2. Verify loading spinner appears briefly
3. Verify smooth transition to results

**Test 14: Animations**
1. Hover over result items
2. Verify smooth hover effects
3. Verify color transitions
4. Open/close settings panel
5. Verify slide animation

**Test 15: Favicons**
1. Search for tabs/bookmarks
2. Verify favicons load correctly
3. Test with sites that have no favicon
4. Verify placeholder icons show

**Test 16: Long Titles/URLs**
1. Create bookmark with very long title (100+ chars)
2. Create bookmark with very long URL
3. Search and find it
4. Verify text truncates with ellipsis
5. Verify no layout breaking

---

## 🐛 Edge Cases & Error Testing

**Test 17: No Tabs/Bookmarks**
1. Create a new Chrome profile
2. Close all tabs except one system tab
3. Open Glimpse and search
4. Verify appropriate message (no results)

**Test 18: Special Characters**
1. Search with special characters: `@#$%^&*()`
2. Verify no errors
3. Search with emoji: `🔥🎉`
4. Verify no crashes

**Test 19: Very Long Queries**
1. Paste 500+ character string into search
2. Verify no UI breaking
3. Verify search still works

**Test 20: Rapid Typing**
1. Type very quickly in search input
2. Verify debouncing works (not searching every keystroke)
3. Verify only last query is searched

**Test 21: Network Offline (AI Mode)**
1. Enable AI mode
2. Disconnect internet
3. Try searching
4. Verify graceful fallback to local search
5. Verify error message (optional)

**Test 22: Chrome Sync**
1. Sign in to Chrome with Google account
2. Save API key
3. Open Chrome on another device (signed in with same account)
4. Install extension
5. Verify API key syncs automatically

**Test 23: Incognito Mode**
1. Open incognito window
2. Try using Glimpse
3. Verify it works (note: may not have access to all tabs)

---

## ⚡ Performance Testing

**Test 24: Many Open Tabs**
1. Open 50+ tabs
2. Search for a specific tab
3. Verify results appear quickly (<500ms)
4. Monitor Chrome task manager
5. Verify no excessive memory usage

**Test 25: Many Bookmarks**
1. Import 1000+ bookmarks
2. Search for a specific bookmark
3. Verify search completes quickly
4. Verify no UI lag

**Test 26: Debounce Testing**
1. Type "test" very slowly (1 char per second)
2. Observe network tab or logs
3. Verify search only fires after 300ms pause

---

## 🔐 Security Testing

**Test 27: API Key Storage**
1. Save API key
2. Open Chrome DevTools
3. Go to Application → Storage → Extensions
4. Verify API key is in chrome.storage.sync
5. Verify it's not visible in page source

**Test 28: XSS Prevention**
1. Create bookmark with title: `<script>alert('XSS')</script>`
2. Search for it
3. Verify script doesn't execute
4. Verify title displays as plain text

**Test 29: HTTPS Verification**
1. Open DevTools Network tab
2. Perform AI search
3. Verify Gemini API calls use HTTPS
4. Verify no mixed content warnings

---

## 📊 Console Error Checking

**Test 30: Console Logs**
1. Open DevTools Console
2. Use all features of the extension
3. Verify no errors in console
4. Verify no warnings (minor warnings OK)
5. Verify no API key logged to console

---

## 🎯 Pre-Release Checklist

Before publishing to Chrome Web Store:

### Code Quality
- [ ] No `console.log()` statements in production
- [ ] No hardcoded API keys
- [ ] All `TODO` comments addressed
- [ ] Code follows best practices
- [ ] No unused files or code

### Functionality
- [ ] All features work as expected
- [ ] Local search works without API key
- [ ] AI search works with valid API key
- [ ] Keyboard shortcuts work
- [ ] Navigation works across windows
- [ ] Settings save and load correctly

### UI/UX
- [ ] No visual glitches
- [ ] Animations smooth
- [ ] Loading states display correctly
- [ ] Error messages clear and helpful
- [ ] All text readable and typo-free

### Privacy & Security
- [ ] No data collection code
- [ ] No analytics scripts
- [ ] API key stored securely
- [ ] No XSS vulnerabilities
- [ ] HTTPS for all external requests

### Documentation
- [ ] README complete and accurate
- [ ] Privacy policy comprehensive
- [ ] Chrome Store listing ready
- [ ] Code comments adequate

### Icons & Assets
- [ ] All icon sizes present (16, 48, 128)
- [ ] Icons display correctly
- [ ] No broken image references

### Permissions
- [ ] Only necessary permissions requested
- [ ] Permissions justified in description
- [ ] host_permissions correct

### Testing
- [ ] Tested on clean Chrome profile
- [ ] Tested with 0 bookmarks/tabs
- [ ] Tested with 100+ bookmarks/tabs
- [ ] Tested across multiple windows
- [ ] Tested keyboard navigation
- [ ] Tested error scenarios

---

## 🚨 Known Issues & Limitations

### Current Limitations
1. **Gemini API Rate Limits**: Free tier has rate limits
2. **Max Items for AI**: Only first 100 items sent to AI (performance)
3. **Incognito Tabs**: Limited access to incognito tabs
4. **Chrome-Only**: Only works in Chrome/Chromium browsers

### Future Improvements
- Cache AI results to reduce API calls
- Add more search filters
- Support tab grouping
- Add search history

---

## 📝 Reporting Bugs

If you find bugs during testing:

1. **Check Console**: Look for errors in DevTools
2. **Reproduce**: Try to reproduce the bug consistently
3. **Document**: Note exact steps to reproduce
4. **Screenshot**: Capture screenshots if visual bug
5. **Environment**: Note Chrome version, OS, extension version
6. **Report**: Create GitHub issue with all details

---

## 🛠️ Development Commands

### Reload Extension
After code changes:
1. Go to `chrome://extensions/`
2. Click reload icon on Glimpse card
3. Test changes

### Debug Background Worker
1. Go to `chrome://extensions/`
2. Click "Inspect views: service worker" on Glimpse
3. View background script logs

### Debug Popup
1. Right-click Glimpse icon
2. Click "Inspect"
3. View popup script logs & DOM

---

## ✅ Quick Test Commands

Open DevTools Console in popup and run:

```javascript
// Test search
chrome.runtime.sendMessage({
  action: 'search',
  query: 'test',
  mode: 'local'
}, console.log);

// Check stored API key
chrome.storage.sync.get(['apiKey', 'searchMode'], console.log);

// Clear all settings
chrome.storage.sync.clear(() => console.log('Cleared'));
```

---

**Happy Testing! 🧪**

Found a bug? Suggestions? Let us know!

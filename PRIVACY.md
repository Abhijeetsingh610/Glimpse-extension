# Privacy Policy for Glimpse Extension

**Last Updated**: November 27, 2024

## Overview

Glimpse ("we", "our", or "the extension") is committed to protecting your privacy. This Privacy Policy explains how we handle your data when you use the Glimpse Chrome extension.

## Our Privacy Commitment

**TL;DR: We don't collect, store, or transmit any of your data except your optional API key, which stays on your device.**

## Information We Collect

### 1. API Key (Optional)
- **What**: Your Google Gemini API key (if you choose to provide it)
- **How**: Stored locally using Chrome's `chrome.storage.sync` API
- **Where**: Only on your device and Chrome's sync storage (if you have Chrome Sync enabled)
- **Purpose**: To enable AI-powered search features
- **Control**: You can remove it anytime through the extension settings

### 2. Search Preferences
- **What**: Your search mode preference (AI or Local)
- **How**: Stored locally using Chrome's `chrome.storage.sync` API
- **Where**: Only on your device
- **Purpose**: To remember your preferred search mode

## Information We DO NOT Collect

✅ We do NOT collect:
- Your browsing history
- Your open tabs data
- Your bookmarks data
- Your search queries
- Any personal information
- Any usage analytics
- Any telemetry data
- IP addresses
- Device information
- Location data

## How We Use Your Information

### Tabs & Bookmarks
- **Access**: We temporarily access your tabs and bookmarks ONLY when you perform a search
- **Processing**: All processing happens locally in your browser
- **Storage**: We do NOT store or cache your tabs or bookmarks data
- **Transmission**: Tab and bookmark data never leaves your device (except when sent to Google Gemini API for AI search, see below)

### API Key Usage
If you provide a Google Gemini API key:
1. It's stored securely in Chrome's local storage
2. It's only used to authenticate API requests to Google Gemini
3. It's never sent to any server except Google's Gemini API
4. It's never logged or shared with third parties

### AI Search Feature
When you use AI-powered search:
1. Your search query and a subset of your tabs/bookmarks (titles and URLs only) are sent to Google Gemini API
2. This data is processed by Google to provide intelligent search results
3. Google's privacy policy applies to this data ([Google Privacy Policy](https://policies.google.com/privacy))
4. We do NOT store the data sent to or received from Google
5. You can disable AI mode and use local-only search to prevent any external data transmission

## Third-Party Services

### Google Gemini API
- **Service**: Google's Gemini AI model
- **Purpose**: Provide intelligent, natural language search capabilities
- **Data Shared**: Search query, tab titles, tab URLs, bookmark titles, bookmark URLs
- **When**: Only when AI mode is enabled and you perform a search
- **Their Policy**: [Google Privacy Policy](https://policies.google.com/privacy)

### Chrome Web Store
- **Service**: Google Chrome Web Store
- **Purpose**: Extension distribution and updates
- **Data**: Chrome may collect standard installation/update metrics
- **Their Policy**: [Chrome Web Store Terms](https://developer.chrome.com/docs/webstore/terms/)

## Data Storage & Security

### Local Storage
- API keys are stored using Chrome's `chrome.storage.sync` API
- This data is encrypted by Chrome when synced across devices
- You can clear this data by:
  - Removing your API key through extension settings
  - Uninstalling the extension
  - Clearing Chrome's extension data

### No Server Storage
- We do NOT operate any servers
- We do NOT have a database
- We do NOT store any user data remotely
- All data processing happens on your device

## Permissions Explained

Glimpse requires the following Chrome permissions:

### 1. `tabs`
- **Why**: To access and search through your open tabs
- **What**: Allows reading tab titles, URLs, and favicons
- **When**: Only when you perform a search
- **Note**: We never store tab data

### 2. `bookmarks`
- **Why**: To access and search through your bookmarks
- **What**: Allows reading bookmark titles and URLs
- **When**: Only when you perform a search
- **Note**: We never store bookmark data

### 3. `storage`
- **Why**: To save your API key and preferences locally
- **What**: Allows storing data in Chrome's local storage
- **When**: When you save settings
- **Note**: Only API key and search mode preference are stored

### 4. `host_permissions` (https://generativelanguage.googleapis.com/*)
- **Why**: To communicate with Google Gemini API
- **What**: Allows making API requests to Google's servers
- **When**: Only when AI mode is enabled and you perform a search
- **Note**: Required for AI-powered search

## Your Rights & Controls

You have full control over your data:

### View Data
- Your API key: Check extension settings
- Your search mode: Check extension settings
- Your tabs/bookmarks: Not stored by us

### Delete Data
- **Remove API Key**: Click "Remove API Key" in settings
- **Clear All Data**: Uninstall the extension
- **Reset Settings**: Remove and re-add API key

### Export Data
- We don't store any data to export
- Your API key can be copied from settings if needed

## Children's Privacy

Glimpse does not knowingly collect any information from children under 13 years of age. The extension is not directed at children.

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Changes will be reflected in the "Last Updated" date at the top of this document.

Material changes will be communicated through:
- Extension update notes in Chrome Web Store
- In-extension notifications (if applicable)

## Open Source

Glimpse is open source. You can review the entire source code to verify our privacy claims:
- **Repository**: [GitHub Link](#)
- **Code Review**: All code is publicly available for inspection

## Contact Us

If you have questions about this Privacy Policy or Glimpse's privacy practices:

- **Email**: privacy@glimpseextension.com
- **GitHub Issues**: [GitHub Issues](#)
- **Website**: [glimpseextension.com](#)

## Compliance

### GDPR (EU)
For EU users:
- **Data Controller**: Individual user (you control your data)
- **Legal Basis**: Consent (you choose to install and use the extension)
- **Data Processing**: Only local processing, no profiling
- **Right to Access**: View settings anytime
- **Right to Erasure**: Uninstall extension or remove API key
- **Right to Data Portability**: No data stored to export

### CCPA (California)
For California users:
- We do NOT sell your personal information
- We do NOT share your personal information with third parties (except Google Gemini when you use AI mode)
- You can request deletion by uninstalling the extension

### Chrome Web Store Compliance
This extension complies with:
- [Chrome Web Store Developer Program Policies](https://developer.chrome.com/docs/webstore/program-policies/)
- [Chrome Extension Best Practices](https://developer.chrome.com/docs/extensions/mv3/security/)
- [Limited Use Policy](https://developer.chrome.com/docs/webstore/program-policies/limited-use/)

## Data Security

We implement security best practices:
- ✅ Use HTTPS for all API communications
- ✅ No hardcoded credentials
- ✅ Minimal permission requests
- ✅ Regular security audits (open source)
- ✅ No external analytics or tracking scripts

## Transparency

We believe in full transparency:
- **Open Source**: All code is public
- **No Obfuscation**: Code is readable and auditable
- **No Hidden Features**: Everything we do is documented
- **No Backdoors**: No hidden data collection

## Summary

**In Plain English:**
- Glimpse only accesses your tabs and bookmarks when you search
- Your data is processed locally on your device
- If you use AI mode, your search data goes to Google Gemini (covered by Google's privacy policy)
- Your optional API key is stored locally on your device
- We never collect, store, or share your personal data
- You can use Local mode for 100% local, private searching

---

**Thank you for trusting Glimpse with your privacy!**

If you have any concerns or questions, please don't hesitate to contact us.

© 2024 Glimpse Extension. All rights reserved.

// popup.js - Main popup logic with API key management

// DOM Elements
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const settingsBtn = document.getElementById('settingsBtn');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const resultsContainer = document.getElementById('resultsContainer');
const emptyState = document.getElementById('emptyState');
const loadingState = document.getElementById('loadingState');
const noResults = document.getElementById('noResults');
const resultsList = document.getElementById('resultsList');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const searchMode = document.getElementById('searchMode');

// Settings Elements
const apiKeyInput = document.getElementById('apiKeyInput');
const toggleVisibilityBtn = document.getElementById('toggleVisibilityBtn');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const removeApiKeyBtn = document.getElementById('removeApiKeyBtn');
const apiKeyStatus = document.getElementById('apiKeyStatus');
const aiModeBtn = document.getElementById('aiModeBtn');
const localModeBtn = document.getElementById('localModeBtn');

// State
let currentResults = [];
let selectedIndex = -1;
let searchTimeout = null;
let currentMode = 'local'; // Default to local mode

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  searchInput.focus();
  setupEventListeners();
});

// Load saved settings
async function loadSettings() {
  try {
    const result = await chrome.storage.sync.get(['apiKey', 'searchMode']);
    
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey;
      removeApiKeyBtn.classList.remove('hidden');
      
      // Enable AI mode if API key exists
      if (result.searchMode === 'ai') {
        currentMode = 'ai';
        aiModeBtn.classList.add('active');
        localModeBtn.classList.remove('active');
        updateSearchModeIndicator('🤖 AI Mode');
      }
    }
    
    // Set mode (default to local if no API key)
    if (result.searchMode) {
      currentMode = result.searchMode;
      updateModeButtons();
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Search input
  searchInput.addEventListener('input', handleSearch);
  
  // Clear button
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    showEmptyState();
  });
  
  // Settings
  settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.remove('hidden');
  });
  
  closeSettingsBtn.addEventListener('click', () => {
    settingsPanel.classList.add('hidden');
  });
  
  // API Key visibility toggle
  toggleVisibilityBtn.addEventListener('click', () => {
    const type = apiKeyInput.type === 'password' ? 'text' : 'password';
    apiKeyInput.type = type;
  });
  
  // Save API Key
  saveApiKeyBtn.addEventListener('click', saveApiKey);
  
  // Remove API Key
  removeApiKeyBtn.addEventListener('click', removeApiKey);
  
  // Mode toggle
  aiModeBtn.addEventListener('click', () => setMode('ai'));
  localModeBtn.addEventListener('click', () => setMode('local'));
  
  // Keyboard navigation
  searchInput.addEventListener('keydown', handleKeyboard);
  
  // Allow Enter on API key input
  apiKeyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveApiKey();
    }
  });
}

// Handle Search with Debouncing
function handleSearch(e) {
  const query = e.target.value.trim();
  
  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  // Show empty state if no query
  if (!query) {
    showEmptyState();
    return;
  }
  
  // Show loading state immediately
  showLoadingState();
  
  // Debounce search (300ms)
  searchTimeout = setTimeout(async () => {
    await performSearch(query);
  }, 300);
}

// Perform Search
async function performSearch(query) {
  try {
    showLoadingState();
    
    // Send message to background script
    const response = await chrome.runtime.sendMessage({
      action: 'search',
      query: query,
      mode: currentMode
    });
    
    if (response.success) {
      currentResults = response.results;
      displayResults(response.results);
    } else {
      showError(response.error || 'Search failed');
    }
  } catch (error) {
    console.error('Search error:', error);
    showError('Failed to perform search. Please try again.');
  }
}

// Display Results
function displayResults(results) {
  if (!results || results.length === 0) {
    showNoResults();
    return;
  }
  
  // Hide all states
  hideAllStates();
  
  // Show results list
  resultsList.classList.remove('hidden');
  
  // Clear previous results
  resultsList.innerHTML = '';
  
  // Reset selected index
  selectedIndex = -1;
  
  // Create result items
  results.forEach((result, index) => {
    const item = createResultItem(result, index);
    resultsList.appendChild(item);
  });
}

// Create Result Item
function createResultItem(result, index) {
  const item = document.createElement('div');
  item.className = 'result-item';
  item.dataset.index = index;
  
  // Favicon
  const favicon = document.createElement('img');
  favicon.className = 'result-favicon';
  favicon.src = result.favIconUrl || getFaviconUrl(result.url);
  favicon.onerror = () => {
    favicon.src = getDefaultFavicon(result.type);
  };
  
  // Content
  const content = document.createElement('div');
  content.className = 'result-content';
  
  const title = document.createElement('div');
  title.className = 'result-title';
  title.textContent = result.title || 'Untitled';
  
  const url = document.createElement('div');
  url.className = 'result-url';
  url.textContent = truncateUrl(result.url);
  
  content.appendChild(title);
  content.appendChild(url);
  
  // Meta
  const meta = document.createElement('div');
  meta.className = 'result-meta';
  
  const type = document.createElement('span');
  type.className = `result-type ${result.type}`;
  type.textContent = result.type;
  
  meta.appendChild(type);
  
  // Confidence score (for AI mode)
  if (result.confidence !== undefined) {
    const confidence = document.createElement('span');
    confidence.className = 'result-confidence';
    confidence.textContent = `${Math.round(result.confidence)}%`;
    meta.appendChild(confidence);
  }
  
  // Assemble
  item.appendChild(favicon);
  item.appendChild(content);
  item.appendChild(meta);
  
  // Click handler
  item.addEventListener('click', () => navigateToResult(result));
  
  // Hover handler
  item.addEventListener('mouseenter', () => {
    selectResult(index);
  });
  
  return item;
}

// Get Favicon URL
function getFaviconUrl(url) {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
  } catch {
    return getDefaultFavicon('bookmark');
  }
}

// Get Default Favicon
function getDefaultFavicon(type) {
  return type === 'tab' 
    ? 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230EA5E9"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>'
    : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236B46C1"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
}

// Truncate URL
function truncateUrl(url) {
  if (url.length > 50) {
    return url.substring(0, 47) + '...';
  }
  return url;
}

// Navigate to Result
async function navigateToResult(result) {
  try {
    if (result.type === 'tab') {
      // Switch to existing tab
      await chrome.tabs.update(result.id, { active: true });
      
      // Focus the window
      if (result.windowId) {
        await chrome.windows.update(result.windowId, { focused: true });
      }
    } else if (result.type === 'bookmark') {
      // Open bookmark in new tab
      await chrome.tabs.create({ url: result.url });
    }
    
    // Close the popup
    window.close();
  } catch (error) {
    console.error('Navigation error:', error);
    showError('Failed to navigate. Please try again.');
  }
}

// Keyboard Navigation
function handleKeyboard(e) {
  const resultsVisible = !resultsList.classList.contains('hidden');
  
  if (!resultsVisible || currentResults.length === 0) {
    return;
  }
  
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      selectResult(selectedIndex + 1);
      break;
      
    case 'ArrowUp':
      e.preventDefault();
      selectResult(selectedIndex - 1);
      break;
      
    case 'Enter':
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < currentResults.length) {
        navigateToResult(currentResults[selectedIndex]);
      }
      break;
      
    case 'Escape':
      e.preventDefault();
      window.close();
      break;
  }
}

// Select Result
function selectResult(index) {
  // Bounds check
  if (index < 0) {
    index = currentResults.length - 1;
  } else if (index >= currentResults.length) {
    index = 0;
  }
  
  selectedIndex = index;
  
  // Update UI
  const items = resultsList.querySelectorAll('.result-item');
  items.forEach((item, i) => {
    if (i === selectedIndex) {
      item.classList.add('selected');
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      item.classList.remove('selected');
    }
  });
}

// Save API Key
async function saveApiKey() {
  const apiKey = apiKeyInput.value.trim();
  
  if (!apiKey) {
    showApiKeyError('Please enter a valid API key');
    return;
  }
  
  try {
    await chrome.storage.sync.set({ apiKey: apiKey });
    
    // Show success
    apiKeyStatus.classList.remove('hidden');
    removeApiKeyBtn.classList.remove('hidden');
    
    // Hide after 3 seconds
    setTimeout(() => {
      apiKeyStatus.classList.add('hidden');
    }, 3000);
    
    // Enable AI mode
    currentMode = 'ai';
    await chrome.storage.sync.set({ searchMode: 'ai' });
    updateModeButtons();
    updateSearchModeIndicator('🤖 AI Mode');
    
  } catch (error) {
    console.error('Error saving API key:', error);
    showApiKeyError('Failed to save API key');
  }
}

// Remove API Key
async function removeApiKey() {
  if (!confirm('Are you sure you want to remove your API key?')) {
    return;
  }
  
  try {
    await chrome.storage.sync.remove('apiKey');
    apiKeyInput.value = '';
    removeApiKeyBtn.classList.add('hidden');
    
    // Switch to local mode
    currentMode = 'local';
    await chrome.storage.sync.set({ searchMode: 'local' });
    updateModeButtons();
    updateSearchModeIndicator('⚡ Local Mode');
    
  } catch (error) {
    console.error('Error removing API key:', error);
  }
}

// Show API Key Error
function showApiKeyError(message) {
  apiKeyInput.style.borderColor = 'var(--color-error)';
  setTimeout(() => {
    apiKeyInput.style.borderColor = '';
  }, 2000);
}

// Set Search Mode
async function setMode(mode) {
  // Check if AI mode requires API key
  if (mode === 'ai') {
    const result = await chrome.storage.sync.get('apiKey');
    if (!result.apiKey) {
      alert('Please add your Google Gemini API key first to use AI mode.');
      return;
    }
  }
  
  currentMode = mode;
  await chrome.storage.sync.set({ searchMode: mode });
  updateModeButtons();
  updateSearchModeIndicator(mode === 'ai' ? '🤖 AI Mode' : '⚡ Local Mode');
}

// Update Mode Buttons
function updateModeButtons() {
  if (currentMode === 'ai') {
    aiModeBtn.classList.add('active');
    localModeBtn.classList.remove('active');
  } else {
    localModeBtn.classList.add('active');
    aiModeBtn.classList.remove('active');
  }
}

// Update Search Mode Indicator
function updateSearchModeIndicator(text) {
  const modeIndicator = searchMode.querySelector('.mode-indicator');
  if (modeIndicator) {
    modeIndicator.textContent = text;
  }
}

// UI State Management
function showEmptyState() {
  hideAllStates();
  emptyState.classList.remove('hidden');
  currentResults = [];
  selectedIndex = -1;
}

function showLoadingState() {
  hideAllStates();
  loadingState.classList.remove('hidden');
}

function showNoResults() {
  hideAllStates();
  noResults.classList.remove('hidden');
  currentResults = [];
  selectedIndex = -1;
}

function showError(message) {
  hideAllStates();
  errorState.classList.remove('hidden');
  errorMessage.textContent = message;
  currentResults = [];
  selectedIndex = -1;
}

function hideAllStates() {
  emptyState.classList.add('hidden');
  loadingState.classList.add('hidden');
  noResults.classList.add('hidden');
  resultsList.classList.add('hidden');
  errorState.classList.add('hidden');
}

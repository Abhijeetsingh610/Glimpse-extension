// service-worker.js - Background service worker with Gemini API integration

// Constants
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const MAX_RESULTS = 10;
const DEBOUNCE_DELAY = 300;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'search') {
    handleSearch(request.query, request.mode)
      .then(results => {
        sendResponse({ success: true, results });
      })
      .catch(error => {
        console.error('Search error:', error);
        sendResponse({ success: false, error: error.message });
      });
    
    // Return true to indicate async response
    return true;
  }
});

// Main Search Handler
async function handleSearch(query, mode) {
  try {
    // Fetch tabs and bookmarks
    const [tabs, bookmarks] = await Promise.all([
      getAllTabs(),
      getAllBookmarks()
    ]);
    
    // Combine data
    const allItems = [...tabs, ...bookmarks];
    
    if (allItems.length === 0) {
      return [];
    }
    
    // Choose search mode
    let results;
    if (mode === 'ai') {
      results = await performAISearch(query, allItems);
    } else {
      results = performLocalSearch(query, allItems);
    }
    
    return results.slice(0, MAX_RESULTS);
  } catch (error) {
    console.error('Error in handleSearch:', error);
    
    // Fallback to local search if AI fails
    const [tabs, bookmarks] = await Promise.all([
      getAllTabs(),
      getAllBookmarks()
    ]);
    const allItems = [...tabs, ...bookmarks];
    return performLocalSearch(query, allItems).slice(0, MAX_RESULTS);
  }
}

// Get All Tabs
async function getAllTabs() {
  try {
    const tabs = await chrome.tabs.query({});
    
    return tabs.map(tab => ({
      type: 'tab',
      id: tab.id,
      windowId: tab.windowId,
      title: tab.title || 'Untitled',
      url: tab.url || '',
      favIconUrl: tab.favIconUrl,
      active: tab.active
    }));
  } catch (error) {
    console.error('Error fetching tabs:', error);
    return [];
  }
}

// Get All Bookmarks
async function getAllBookmarks() {
  try {
    const bookmarkTree = await chrome.bookmarks.getTree();
    const bookmarks = [];
    
    // Traverse bookmark tree iteratively
    const stack = [...bookmarkTree];
    
    while (stack.length > 0) {
      const node = stack.pop();
      
      if (node.url) {
        // It's a bookmark (not a folder)
        bookmarks.push({
          type: 'bookmark',
          id: node.id,
          title: node.title || 'Untitled',
          url: node.url,
          dateAdded: node.dateAdded
        });
      }
      
      // Add children to stack
      if (node.children) {
        stack.push(...node.children);
      }
    }
    
    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
}

// Perform AI Search using Gemini
async function performAISearch(query, items) {
  try {
    // Get API key
    const { apiKey } = await chrome.storage.sync.get('apiKey');
    
    if (!apiKey) {
      console.warn('No API key found, falling back to local search');
      return performLocalSearch(query, items);
    }
    
    // Prepare data for AI (limit to avoid token limits)
    const itemsForAI = items.slice(0, 100).map(item => ({
      type: item.type,
      title: item.title,
      url: item.url
    }));
    
    // Create prompt
    const prompt = createGeminiPrompt(query, itemsForAI);
    
    // Call Gemini API
    const apiUrl = `${GEMINI_API_ENDPOINT}?key=${apiKey}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2000
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract response
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      throw new Error('Invalid API response');
    }
    
    // Parse AI response
    const rankedItems = parseGeminiResponse(aiResponse, items);
    
    return rankedItems;
  } catch (error) {
    console.error('AI search error:', error);
    // Fallback to local search
    return performLocalSearch(query, items);
  }
}

// Create Gemini Prompt
function createGeminiPrompt(query, items) {
  return `You are a search assistant helping users find tabs and bookmarks.

User Query: "${query}"

Available Items:
${JSON.stringify(items, null, 2)}

Instructions:
1. Analyze the user's query to understand their intent
2. Match the query against the titles and URLs of the items
3. Rank the items by relevance (most relevant first)
4. Return ONLY a JSON array of matched item indices with confidence scores
5. Include only the top 10 most relevant matches
6. Confidence should be 0-100 (100 = perfect match)

Response format (JSON only, no markdown):
[
  {"index": 0, "confidence": 95, "reason": "exact title match"},
  {"index": 2, "confidence": 80, "reason": "related content"}
]

Return empty array [] if no matches found.`;
}

// Parse Gemini Response
function parseGeminiResponse(responseText, allItems) {
  try {
    // Remove markdown code blocks if present
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/```json\n?/g, '');
    cleanText = cleanText.replace(/```\n?/g, '');
    cleanText = cleanText.trim();
    
    // Parse JSON
    const matches = JSON.parse(cleanText);
    
    if (!Array.isArray(matches)) {
      throw new Error('Response is not an array');
    }
    
    // Map indices to actual items
    const results = matches
      .filter(match => match.index >= 0 && match.index < allItems.length)
      .map(match => ({
        ...allItems[match.index],
        confidence: match.confidence || 50,
        reason: match.reason || ''
      }));
    
    return results;
  } catch (error) {
    console.error('Error parsing AI response:', error);
    console.log('Response text:', responseText);
    
    // Return empty array if parsing fails
    return [];
  }
}

// Perform Local Fuzzy Search
function performLocalSearch(query, items) {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) {
    return [];
  }
  
  // Score and filter items
  const scoredItems = items
    .map(item => {
      const title = (item.title || '').toLowerCase();
      const url = (item.url || '').toLowerCase();
      
      let score = 0;
      
      // Exact title match
      if (title === lowerQuery) {
        score = 100;
      }
      // Title starts with query
      else if (title.startsWith(lowerQuery)) {
        score = 90;
      }
      // Title contains query
      else if (title.includes(lowerQuery)) {
        score = 80;
      }
      // URL contains query
      else if (url.includes(lowerQuery)) {
        score = 60;
      }
      // Word-by-word matching
      else {
        const queryWords = lowerQuery.split(/\s+/);
        const titleWords = title.split(/\s+/);
        const urlWords = url.split(/[\s\/\.\-_]+/);
        
        let matchedWords = 0;
        queryWords.forEach(qWord => {
          if (titleWords.some(tWord => tWord.includes(qWord)) ||
              urlWords.some(uWord => uWord.includes(qWord))) {
            matchedWords++;
          }
        });
        
        if (matchedWords > 0) {
          score = Math.min(70, (matchedWords / queryWords.length) * 70);
        }
      }
      
      // Boost active tabs
      if (item.active) {
        score += 5;
      }
      
      return {
        ...item,
        confidence: score
      };
    })
    .filter(item => item.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence);
  
  return scoredItems;
}

// Keep service worker alive (prevent premature termination)
let keepAliveInterval;

function keepAlive() {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
  }
  
  keepAliveInterval = setInterval(() => {
    chrome.runtime.getPlatformInfo(() => {
      // Just to keep the service worker alive
    });
  }, 20000); // Every 20 seconds
}

// Initialize
chrome.runtime.onStartup.addListener(() => {
  keepAlive();
});

chrome.runtime.onInstalled.addListener((details) => {
  keepAlive();
  
  if (details.reason === 'install') {
    // First install - show welcome message
    console.log('Glimpse extension installed!');
  }
});

// Start keepalive
keepAlive();

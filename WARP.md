# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Progressive Web App (PWA) for rural STEM education with offline-first capabilities, targeting students in grades 6-12. The platform provides gamified learning experiences in Math, Science, and Coding with multilingual support (English and Hindi).

## Key Technical Decisions

### No Build Process
This project intentionally uses vanilla JavaScript without any build tools or package managers. This design choice enables:
- Direct deployment to any static hosting service
- Simplified offline functionality
- Reduced complexity for rural deployment scenarios
- Easy debugging without source maps

### Offline-First Architecture
The entire application works offline after the first load through Service Worker caching. All resources are cached on initial visit, and the app functions completely without internet connectivity.

## Development Commands

### Local Development Server

Using Python (recommended):
```bash
python -m http.server 8000
```

Using Node.js:
```bash
npx http-server -p 8000
```

Using PowerShell simple server:
```powershell
# For PowerShell users
$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add("http://localhost:8000/")
$http.Start()
```

### Testing Service Worker & PWA Features

Service Workers require HTTPS or localhost. To test PWA installation:
```bash
# Use localhost (not 127.0.0.1) for PWA features
# Access at: http://localhost:8000
```

### Cache Management

To force Service Worker update during development:
```javascript
// In browser console
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
  }
});
// Then refresh the page
```

Clear application data:
```javascript
// In browser console
localStorage.clear();
caches.keys().then(names => names.forEach(name => caches.delete(name)));
```

## Architecture & Module System

### Module Pattern
All JavaScript modules use the IIFE (Immediately Invoked Function Expression) pattern for encapsulation without requiring a module bundler:

```javascript
(function() {
  'use strict';
  // Module code
  window.moduleName = publicAPI;
})();
```

### Core Modules

1. **sw.js** - Service Worker
   - Handles offline caching strategy (cache-first, network fallback)
   - Caches all static resources on install
   - Updates cache on new deployments

2. **js/app.js** - Main Application Controller
   - Tab navigation management
   - PWA installation handling
   - Game module initialization
   - Keyboard navigation support

3. **js/i18n.js** - Internationalization System
   - Runtime language switching between English and Hindi
   - Fallback to embedded translations if locale files unavailable
   - Persistent language preference via localStorage

4. **js/progress.js** - Analytics & Progress Tracking
   - Tracks all game sessions and scores
   - Calculates engagement metrics
   - CSV export functionality
   - Teacher dashboard data provider

5. **Game Modules** (js/games/*)
   - Self-contained game logic
   - Lazy-loaded when tabs are accessed
   - Communicate with progress tracker via global API

### Data Flow

1. User interactions → app.js (navigation) → specific game module
2. Game events → progress.js → localStorage persistence
3. Language changes → i18n.js → DOM updates via data-i18n attributes
4. Offline requests → sw.js → cached responses

### State Management

- **localStorage**: User preferences, progress data, language settings
- **Service Worker Cache**: All static assets for offline use
- **Session State**: Maintained in module closures (not persistent)

## Adding New Features

### Adding a New Game Module

1. Create new file in `js/games/`:
```javascript
// js/games/new-game.js
(function() {
  'use strict';
  
  function initGame() {
    const container = document.getElementById('new-game');
    // Game initialization
  }
  
  window.initNewGame = initGame;
})();
```

2. Add script tag in `index.html`:
```html
<script src="js/games/new-game.js"></script>
```

3. Update Service Worker cache list in `sw.js`:
```javascript
const urlsToCache = [
  // ... existing URLs
  '/js/games/new-game.js'
];
```

4. Add tab initialization in `app.js`:
```javascript
case 'newgame':
  if (window.initNewGame) window.initNewGame();
  break;
```

### Adding New Languages

1. Create translation file in `locales/` (e.g., `locales/te.json`)
2. Add embedded fallback in `js/i18n.js` getEmbeddedTranslations()
3. Add option to language selector in `index.html`
4. Update Service Worker cache list

## Deployment Considerations

### Static Hosting Requirements
- HTTPS required for Service Worker and PWA features
- No server-side processing needed
- Supports any static host (Netlify, Vercel, GitHub Pages, etc.)

### Performance Constraints
- Optimized for low-end devices (minimal DOM manipulation)
- No external dependencies or CDN requirements
- Small resource footprint for limited bandwidth

### Offline Deployment
For completely offline deployment in schools:
1. Serve from local network server
2. Use self-signed certificates for HTTPS
3. Pre-cache all resources on first access

## Common Issues & Solutions

### Service Worker Not Updating
The Service Worker uses cache-first strategy. To force updates:
1. Change CACHE_NAME version in sw.js
2. Clear browser cache
3. Unregister old Service Worker

### Language Translations Not Loading
The app falls back to embedded translations if locale files fail to load. Check:
1. Locale files exist in `/locales/` directory
2. JSON syntax is valid
3. File paths in Service Worker cache list

### PWA Installation Not Available
Ensure:
1. Accessing via HTTPS or localhost
2. manifest.webmanifest is properly served
3. Service Worker is registered successfully

## Testing Approach

### Manual Testing Checklist
- [ ] Offline functionality after first load
- [ ] Language switching persists across sessions
- [ ] Progress tracking saves to localStorage
- [ ] CSV export contains correct data
- [ ] All games initialize properly
- [ ] PWA installs on supported browsers
- [ ] Keyboard navigation works

### Browser Testing
Test on:
- Chrome/Edge (primary PWA support)
- Firefox (limited PWA support)
- Safari (iOS PWA testing)
- Low-end Android devices

### Offline Testing
1. Load app completely
2. Enable airplane mode
3. Verify all features work
4. Check console for cache errors

## Code Style Guidelines

### JavaScript Patterns
- Use 'use strict' in all modules
- IIFE pattern for encapsulation
- Prefix private functions with underscore
- Export public API to window object

### DOM Manipulation
- Cache DOM queries when possible
- Use data attributes for i18n keys
- Avoid inline styles (use CSS classes)
- Handle missing elements gracefully

### Error Handling
- Fail silently for non-critical features
- Provide fallbacks for network failures
- Log errors to console for debugging

// Main Application Module
(function() {
  'use strict';
  
  let currentTab = 'home';
  let deferredPrompt = null;
  
  
  // Initialize app
  function init() {
    registerServiceWorker();
    attachNavigationListeners();
    attachHomeCardListeners();
    setupInstallButton();
    setupPrintButton();
    updateYear();
    
    // Gate behind login
    setupLogin();
    // Always require login on each visit
    showLogin();
  }
  
  // Register service worker for offline functionality
  async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('ServiceWorker registered:', registration);
      } catch (error) {
        console.log('ServiceWorker registration failed:', error);
      }
    }
  }
  
  // Tab navigation
  function showTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });
    
    const activeTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
    if (activeTab) {
      activeTab.classList.add('active');
      activeTab.setAttribute('aria-selected', 'true');
    }
    
    // Update views
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });
    
    const activeView = document.getElementById(tabName);
    if (activeView) {
      activeView.classList.add('active');
    }
    
    currentTab = tabName;
    
  // Initialize games when their tabs are shown
  switch(tabName) {
    case 'math':
      if (window.initMathGame) window.initMathGame();
      attachGameButtonListeners('math');
      break;
    case 'science':
      if (window.initScienceGame) window.initScienceGame();
      attachGameButtonListeners('science');
      break;
    case 'coding':
      if (window.initCodingGame) window.initCodingGame();
      attachGameButtonListeners('coding');
      break;
      case 'teacher':
        if (window.updateDashboard) window.updateDashboard();
        break;
      case 'leaderboard':
        if (window.socialFeatures) {
          const activeFilter = document.querySelector('.leaderboard-filters .filter-btn.active');
          const filter = activeFilter ? activeFilter.dataset.filter : 'overall';
          window.socialFeatures.displayLeaderboard(filter);
        }
        break;
      case 'profile':
        if (window.socialFeatures) {
          window.socialFeatures.updateProfileDisplay();
        }
        if (window.achievements) {
          window.achievements.render();
        }
        break;
    }
  }

  // Show only login view
  function showLogin() {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    const loginView = document.getElementById('login');
    if (loginView) loginView.classList.add('active');
    // Hide header/nav during login for focus
    const header = document.querySelector('header.app-header');
    const nav = document.querySelector('nav.tabs');
    if (header) header.style.display = 'none';
    if (nav) nav.style.display = 'none';
  }

  // Show main app starting at home
  function showMain() {
    const header = document.querySelector('header.app-header');
    const nav = document.querySelector('nav.tabs');
    if (header) header.style.display = '';
    if (nav) nav.style.display = '';
    showTab('home');
  }

  // Setup login handling
  function setupLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    const studentIdInput = document.getElementById('studentId');
    const schoolIdInput = document.getElementById('schoolId');
    const errorEl = document.getElementById('loginError');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const studentId = studentIdInput ? studentIdInput.value.trim() : '';
      const schoolId = schoolIdInput ? schoolIdInput.value.trim() : '';

      const valid = studentId.length > 0 && schoolId.length >= 6;
      if (!valid) {
        if (errorEl) errorEl.style.display = 'block';
        return;
      }

      if (errorEl) errorEl.style.display = 'none';
      // Persist simple session
      localStorage.setItem('session.studentId', studentId);
      localStorage.setItem('session.schoolId', schoolId);
      showMain();
    });
  }
  
  // Attach navigation listeners
  function attachNavigationListeners() {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        showTab(tabName);
      });
    });
  }
  
  // Attach home card listeners
  function attachHomeCardListeners() {
    document.querySelectorAll('.card[data-open]').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const tabName = e.currentTarget.dataset.open;
        showTab(tabName);
      });
    });
  }
  
  // Setup install button for PWA
  function setupInstallButton() {
    const installBtn = document.getElementById('installBtn');
    
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install button
      if (installBtn) {
        installBtn.hidden = false;
      }
    });
    
    // Handle install button click
    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        
        // Show install prompt
        deferredPrompt.prompt();
        
        // Wait for user response
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response: ${outcome}`);
        
        // Reset deferred prompt
        deferredPrompt = null;
        installBtn.hidden = true;
      });
    }
    
    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      console.log('App installed successfully');
      if (installBtn) {
        installBtn.hidden = true;
      }
    });
  }
  
  // Setup print functionality
  function setupPrintButton() {
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }
  
  // Update year in footer
  function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
  
  // Attach game button listeners for new games
  function attachGameButtonListeners(subject) {
    const gameButtons = document.querySelectorAll(`#${subject} .game-btn`);
    
    gameButtons.forEach(btn => {
      // Remove existing listeners to avoid duplicates
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      
      newBtn.addEventListener('click', (e) => {
        const game = e.target.dataset.game;
        const gameContainer = document.getElementById(`${subject}-game`);
        
        // Clear previous game
        if (gameContainer) {
          gameContainer.innerHTML = '';
        }
        
        // Initialize the selected game
        switch(game) {
          case 'quadratic':
          case 'fractions':
          case 'geometry':
          case 'algebra':
            if (subject === 'math' && window.initMathGame) {
              window.initMathGame(game);
            }
            break;
            
          case 'physics':
          case 'chemistry':
          case 'biology':
          case 'elements':
            if (subject === 'science' && window.initScienceGame) {
              window.initScienceGame(game);
            }
            break;
            
          case 'algorithms':
          case 'debugging':
          case 'datastructures':
          case 'patterns':
            if (subject === 'coding' && window.initCodingGame) {
              window.initCodingGame(game);
            }
            break;
            
          case 'tilematch':
            if (window.initTileMatch) {
              window.initTileMatch(subject, 'medium');
            }
            break;
            
          case 'wordgame':
            if (window.initWordGame) {
              window.initWordGame(subject, 'wordSearch');
            }
            break;
            
          case 'logicpuzzle':
            if (window.initLogicPuzzle) {
              window.initLogicPuzzle(subject, 'patterns');
            }
            break;
        }
        
        // Highlight active game button
        gameButtons.forEach(b => b.classList.remove('active'));
        newBtn.classList.add('active');
      });
    });
  }
  
  // Handle online/offline status
  function updateOnlineStatus() {
    const isOnline = navigator.onLine;
    console.log(`App is ${isOnline ? 'online' : 'offline'}`);
    
    // Could show a notification here
    if (!isOnline) {
      console.log('Working offline - all features still available!');
    }
  }
  
  // Listen for online/offline events
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    // Tab navigation with arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const tabs = Array.from(document.querySelectorAll('.tab'));
      const currentIndex = tabs.findIndex(tab => tab.classList.contains('active'));
      
      let newIndex;
      if (e.key === 'ArrowLeft') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      } else {
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      }
      
      const newTab = tabs[newIndex];
      if (newTab) {
        showTab(newTab.dataset.tab);
      }
    }
  });
  
  // Performance monitoring
  if ('performance' in window && 'measureUserAgentSpecificMemory' in performance) {
    // Monitor memory usage periodically
    setInterval(async () => {
      try {
        const memory = await performance.measureUserAgentSpecificMemory();
        console.log('Memory usage:', memory);
      } catch (error) {
        // API might not be available
      }
    }, 60000); // Every minute
  }
  
  // Error handling
  window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // Could send to analytics service
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send to analytics service
  });
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

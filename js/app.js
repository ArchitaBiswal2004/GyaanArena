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
    
    // Initialize first view
    showTab('home');
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
        break;
      case 'science':
        if (window.initScienceGame) window.initScienceGame();
        break;
      case 'coding':
        if (window.initCodingGame) window.initCodingGame();
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

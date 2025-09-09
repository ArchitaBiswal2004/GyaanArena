// Internationalization (i18n) Module
(function() {
  'use strict';
  
  let currentLang = localStorage.getItem('language') || 'en';
  let translations = {};
  
  // Initialize i18n
  async function init() {
    await loadTranslations(currentLang);
    updateUI();
    attachLanguageListener();
  }
  
  async function loadTranslations(lang) {
    try {
      const response = await fetch(`/locales/${lang}.json`);
      if (response.ok) {
        translations = await response.json();
      } else {
        // Fallback to embedded translations
        translations = getEmbeddedTranslations(lang);
      }
    } catch (error) {
      // Use embedded translations as fallback
      translations = getEmbeddedTranslations(lang);
    }
  }
  
  function getEmbeddedTranslations(lang) {
    const embedded = {
      en: {
        "app.title": "Rural STEM Learning",
        "actions.install": "Install App",
        "actions.print": "Print Progress",
        "tabs.home": "Home",
        "tabs.math": "Math",
        "tabs.science": "Science",
        "tabs.coding": "Coding",
        "tabs.teacher": "Teacher",
        "home.welcome": "Welcome to STEM Learning!",
        "home.intro": "Learn STEM subjects through fun, interactive games. Works offline and supports multiple languages!",
        "home.card_math": "Practice Math →",
        "home.card_science": "Explore Science →",
        "home.card_coding": "Learn Coding →",
        "math.title": "Math Quiz Challenge",
        "science.title": "Science Matching Game",
        "coding.title": "Coding Logic Puzzles",
        "teacher.title": "Teacher Dashboard",
        "dashboard.engagement": "Student Engagement",
        "dashboard.average_score": "Average Score",
        "dashboard.sessions": "Total Sessions",
        "dashboard.export": "Export Data (CSV)",
        "dashboard.reset": "Reset All Data"
      },
      hi: {
        "app.title": "ग्रामीण STEM शिक्षा",
        "actions.install": "ऐप इंस्टॉल करें",
        "actions.print": "प्रगति प्रिंट करें",
        "tabs.home": "होम",
        "tabs.math": "गणित",
        "tabs.science": "विज्ञान",
        "tabs.coding": "कोडिंग",
        "tabs.teacher": "शिक्षक",
        "home.welcome": "STEM शिक्षा में आपका स्वागत है!",
        "home.intro": "मजेदार, इंटरैक्टिव गेम्स के माध्यम से STEM विषय सीखें। ऑफलाइन काम करता है!",
        "home.card_math": "गणित अभ्यास →",
        "home.card_science": "विज्ञान खोजें →",
        "home.card_coding": "कोडिंग सीखें →",
        "math.title": "गणित प्रश्नोत्तरी चुनौती",
        "science.title": "विज्ञान मिलान खेल",
        "coding.title": "कोडिंग तर्क पहेली",
        "teacher.title": "शिक्षक डैशबोर्ड",
        "dashboard.engagement": "छात्र सहभागिता",
        "dashboard.average_score": "औसत स्कोर",
        "dashboard.sessions": "कुल सत्र",
        "dashboard.export": "डेटा निर्यात (CSV)",
        "dashboard.reset": "सभी डेटा रीसेट करें"
      }
    };
    
    return embedded[lang] || embedded.en;
  }
  
  function updateUI() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Update language selector
    const selector = document.getElementById('languageSwitcher');
    if (selector) {
      selector.value = currentLang;
    }
  }
  
  function attachLanguageListener() {
    const selector = document.getElementById('languageSwitcher');
    if (selector) {
      selector.addEventListener('change', async (e) => {
        currentLang = e.target.value;
        localStorage.setItem('language', currentLang);
        await loadTranslations(currentLang);
        updateUI();
      });
    }
  }
  
  // Public API
  window.i18n = {
    init: init,
    getCurrentLang: () => currentLang,
    translate: (key) => translations[key] || key,
    setLanguage: async (lang) => {
      currentLang = lang;
      localStorage.setItem('language', lang);
      await loadTranslations(lang);
      updateUI();
    }
  };
  
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

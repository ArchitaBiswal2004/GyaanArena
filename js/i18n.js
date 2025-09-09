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
        "app.title": "Gyaan Arena",
        "actions.install": "Install App",
        "actions.print": "Print Progress",
        "tabs.home": "Home",
        "tabs.math": "Math",
        "tabs.science": "Science",
        "tabs.coding": "Coding",
        "tabs.leaderboard": "Leaderboard",
        "tabs.profile": "Profile",
        "tabs.teacher": "Teacher",
        "home.welcome": "Welcome to Gyaan Arena!",
        "home.intro": "Master STEM subjects through interactive games and challenges. Learn, compete, and grow!",
        "home.card_math_title": "Mathematics Arena",
        "home.card_math_desc": "Quadratics, Fractions, Geometry & more →",
        "home.card_science_title": "Science Laboratory",
        "home.card_science_desc": "Physics, Chemistry, Biology challenges →",
        "home.card_coding_title": "Code Academy",
        "home.card_coding_desc": "Algorithms, Logic, Problem Solving →",
        "math.title": "Mathematics Arena",
        "math.quadratic": "Quadratic Equations",
        "math.fractions": "Fractions Master",
        "math.geometry": "Geometry Challenge",
        "math.algebra": "Algebra Puzzles",
        "science.title": "Science Laboratory",
        "science.physics": "Physics Simulations",
        "science.chemistry": "Chemistry Lab",
        "science.biology": "Biology Quiz",
        "science.elements": "Periodic Table",
        "coding.title": "Code Academy",
        "coding.algorithms": "Algorithm Challenge",
        "coding.debugging": "Debug the Code",
        "coding.datastructures": "Data Structures",
        "coding.patterns": "Pattern Recognition",
        "teacher.title": "Teacher Dashboard",
        "dashboard.engagement": "Student Engagement",
        "dashboard.average_score": "Average Score",
        "dashboard.sessions": "Total Sessions",
        "dashboard.export": "Export Data (CSV)",
        "dashboard.reset": "Reset All Data",
        "leaderboard.title": "Gyaan Arena Leaderboard",
        "leaderboard.overall": "Overall",
        "leaderboard.math": "Math",
        "leaderboard.science": "Science",
        "leaderboard.coding": "Coding",
        "leaderboard.weekly": "This Week",
        "profile.title": "Your Profile",
        "profile.username": "Enter your name",
        "profile.level": "Level",
        "profile.achievements": "Achievements",
        "profile.stats": "Your Statistics",
        "stats.streak": "Daily Streak",
        "stats.points": "Total Points",
        "stats.rank": "Your Rank",
        "stats.total_games": "Games Played",
        "stats.best_subject": "Best Subject",
        "stats.accuracy": "Accuracy",
        "stats.time_spent": "Time Spent",
        "social.share": "Share Your Progress",
        "footer.about": "About",
        "footer.privacy": "Privacy",
        "footer.help": "Help"
      },
      hi: {
        "app.title": "ज्ञान अरेना",
        "actions.install": "ऐप इंस्टॉल करें",
        "actions.print": "प्रगति प्रिंट करें",
        "tabs.home": "होम",
        "tabs.math": "गणित",
        "tabs.science": "विज्ञान",
        "tabs.coding": "कोडिंग",
        "tabs.leaderboard": "लीडरबोर्ड",
        "tabs.profile": "प्रोफ़ाइल",
        "tabs.teacher": "शिक्षक",
        "home.welcome": "ज्ञान अरेना में आपका स्वागत है!",
        "home.intro": "इंटरैक्टिव गेम्स और चुनौतियों के माध्यम से STEM विषयों में महारत हासिल करें!",
        "home.card_math_title": "गणित अरेना",
        "home.card_math_desc": "द्विघात, भिन्न, ज्यामिति और अधिक →",
        "home.card_science_title": "विज्ञान प्रयोगशाला",
        "home.card_science_desc": "भौतिकी, रसायन, जीवविज्ञान चुनौतियां →",
        "home.card_coding_title": "कोड अकादमी",
        "home.card_coding_desc": "एल्गोरिदम, तर्क, समस्या समाधान →",
        "math.title": "गणित अरेना",
        "math.quadratic": "द्विघात समीकरण",
        "math.fractions": "भिन्न मास्टर",
        "math.geometry": "ज्यामिति चुनौती",
        "math.algebra": "बीजगणित पहेली",
        "science.title": "विज्ञान प्रयोगशाला",
        "science.physics": "भौतिकी सिमुलेशन",
        "science.chemistry": "रसायन प्रयोगशाला",
        "science.biology": "जीवविज्ञान प्रश्नोत्तरी",
        "science.elements": "आवर्त सारणी",
        "coding.title": "कोड अकादमी",
        "coding.algorithms": "एल्गोरिदम चुनौती",
        "coding.debugging": "कोड डीबग करें",
        "coding.datastructures": "डेटा संरचनाएं",
        "coding.patterns": "पैटर्न पहचान",
        "teacher.title": "शिक्षक डैशबोर्ड",
        "dashboard.engagement": "छात्र सहभागिता",
        "dashboard.average_score": "औसत स्कोर",
        "dashboard.sessions": "कुल सत्र",
        "dashboard.export": "डेटा निर्यात (CSV)",
        "dashboard.reset": "सभी डेटा रीसेट करें",
        "leaderboard.title": "ज्ञान अरेना लीडरबोर्ड",
        "leaderboard.overall": "समग्र",
        "leaderboard.math": "गणित",
        "leaderboard.science": "विज्ञान",
        "leaderboard.coding": "कोडिंग",
        "leaderboard.weekly": "इस सप्ताह",
        "profile.title": "आपकी प्रोफ़ाइल",
        "profile.username": "अपना नाम दर्ज करें",
        "profile.level": "स्तर",
        "profile.achievements": "उपलब्धियां",
        "profile.stats": "आपके आंकड़े",
        "stats.streak": "दैनिक श्रृंखला",
        "stats.points": "कुल अंक",
        "stats.rank": "आपकी रैंक",
        "stats.total_games": "खेले गए गेम",
        "stats.best_subject": "सर्वश्रेष्ठ विषय",
        "stats.accuracy": "सटीकता",
        "stats.time_spent": "बिताया गया समय",
        "social.share": "अपनी प्रगति साझा करें",
        "footer.about": "के बारे में",
        "footer.privacy": "गोपनीयता",
        "footer.help": "मदद"
      },
      mr: {
        "app.title": "ज्ञान अरेना",
        "actions.install": "ॲप इन्स्टॉल करा",
        "actions.print": "प्रगती प्रिंट करा",
        "tabs.home": "मुख्यपृष्ठ",
        "tabs.math": "गणित",
        "tabs.science": "विज्ञान",
        "tabs.coding": "कोडिंग",
        "tabs.leaderboard": "लीडरबोर्ड",
        "tabs.profile": "प्रोफाइल",
        "tabs.teacher": "शिक्षक",
        "home.welcome": "ज्ञान अरेना मध्ये आपले स्वागत आहे!",
        "home.intro": "इंटरॅक्टिव्ह गेम आणि आव्हानांच्या माध्यमातून STEM विषयांमध्ये प्रभुत्व मिळवा!",
        "home.card_math_title": "गणित अरेना",
        "home.card_math_desc": "द्विघात, अपूर्णांक, भूमिती आणि अधिक →",
        "home.card_science_title": "विज्ञान प्रयोगशाळा",
        "home.card_science_desc": "भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र आव्हाने →",
        "home.card_coding_title": "कोड अकादमी",
        "home.card_coding_desc": "अल्गोरिदम, तर्क, समस्या सोडवणे →",
        "math.title": "गणित अरेना",
        "math.quadratic": "द्विघात समीकरणे",
        "math.fractions": "अपूर्णांक मास्टर",
        "math.geometry": "भूमिती आव्हान",
        "math.algebra": "बीजगणित कोडी",
        "science.title": "विज्ञान प्रयोगशाळा",
        "science.physics": "भौतिकशास्त्र सिम्युलेशन",
        "science.chemistry": "रसायनशास्त्र प्रयोगशाळा",
        "science.biology": "जीवशास्त्र प्रश्नमंजुषा",
        "science.elements": "आवर्त सारणी",
        "coding.title": "कोड अकादमी",
        "coding.algorithms": "अल्गोरिदम आव्हान",
        "coding.debugging": "कोड डीबग करा",
        "coding.datastructures": "डेटा संरचना",
        "coding.patterns": "पॅटर्न ओळख",
        "teacher.title": "शिक्षक डॅशबोर्ड",
        "dashboard.engagement": "विद्यार्थी सहभाग",
        "dashboard.average_score": "सरासरी गुण",
        "dashboard.sessions": "एकूण सत्रे",
        "dashboard.export": "डेटा निर्यात (CSV)",
        "dashboard.reset": "सर्व डेटा रीसेट करा",
        "leaderboard.title": "ज्ञान अरेना लीडरबोर्ड",
        "leaderboard.overall": "एकूण",
        "leaderboard.math": "गणित",
        "leaderboard.science": "विज्ञान",
        "leaderboard.coding": "कोडिंग",
        "leaderboard.weekly": "या आठवड्यात",
        "profile.title": "तुमची प्रोफाइल",
        "profile.username": "तुमचे नाव प्रविष्ट करा",
        "profile.level": "स्तर",
        "profile.achievements": "यश",
        "profile.stats": "तुमची आकडेवारी",
        "stats.streak": "दैनिक साखळी",
        "stats.points": "एकूण गुण",
        "stats.rank": "तुमची रँक",
        "stats.total_games": "खेळलेले खेळ",
        "stats.best_subject": "सर्वोत्तम विषय",
        "stats.accuracy": "अचूकता",
        "stats.time_spent": "घालवलेला वेळ",
        "social.share": "तुमची प्रगती शेअर करा",
        "footer.about": "माहिती",
        "footer.privacy": "गोपनीयता",
        "footer.help": "मदत"
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

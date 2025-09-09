// Achievements Module - Badges and Milestones
(function() {
  'use strict';

  const ACHIEVEMENTS_KEY = 'gyaan_arena_achievements';

  const ACHIEVEMENTS = [
    { id: 'first_win', name: 'First Win', desc: 'Answer your first question correctly', points: 10 },
    { id: 'math_master_1', name: 'Math Beginner', desc: 'Score 100 points in Math', points: 100 },
    { id: 'math_master_2', name: 'Math Adept', desc: 'Score 500 points in Math', points: 500 },
    { id: 'streak_3', name: 'On a Roll', desc: 'Maintain a 3-day streak', points: 30 },
    { id: 'streak_7', name: 'One Week Wonder', desc: 'Maintain a 7-day streak', points: 70 },
    { id: 'polyglot', name: 'Polyglot', desc: 'Use the app in 3 different languages', points: 30 },
    { id: 'sharing_is_caring', name: 'Sharing is Caring', desc: 'Share your progress', points: 10 }
  ];

  function getAchievementsState() {
    const state = localStorage.getItem(ACHIEVEMENTS_KEY);
    return state ? JSON.parse(state) : { unlocked: [], countByLang: {} };
  }

  function saveAchievementsState(state) {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(state));
  }

  function unlockAchievement(id) {
    const state = getAchievementsState();
    if (!state.unlocked.includes(id)) {
      state.unlocked.push(id);
      saveAchievementsState(state);
      renderAchievements();
      // Simple toast
      alert('Achievement unlocked: ' + ACHIEVEMENTS.find(a => a.id === id).name);
    }
  }

  function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;

    const state = getAchievementsState();
    let html = '';
    ACHIEVEMENTS.forEach(a => {
      const unlocked = state.unlocked.includes(a.id);
      html += `<div class="achievement ${unlocked ? 'unlocked' : ''}">` +
              `<div class="badge">${unlocked ? '🏅' : '🔒'}</div>` +
              `<div class="info"><div class="name">${a.name}</div><div class="desc">${a.desc}</div></div>` +
              `</div>`;
    });
    grid.innerHTML = html;
  }

  // Public API to check progress
  window.checkAchievements = function(subject, score, context) {
    const state = getAchievementsState();
    if (!state.unlocked.includes('first_win') && score > 0) {
      unlockAchievement('first_win');
    }
    if (!state.unlocked.includes('math_master_1') && subject === 'math' && score >= 100) {
      unlockAchievement('math_master_1');
    }
    if (!state.unlocked.includes('math_master_2') && subject === 'math' && score >= 500) {
      unlockAchievement('math_master_2');
    }
    renderAchievements();
  };

  // Track language switches for polyglot
  document.addEventListener('DOMContentLoaded', () => {
    renderAchievements();
  });

  window.achievements = { render: renderAchievements, unlock: unlockAchievement };
})();


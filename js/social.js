// Social Features Module - Leaderboards, Achievements, Sharing
(function() {
  'use strict';
  
  const LEADERBOARD_KEY = 'gyaan_arena_leaderboard';
  const USER_PROFILE_KEY = 'gyaan_arena_profile';
  
  // Initialize user profile
  function initUserProfile() {
    let profile = localStorage.getItem(USER_PROFILE_KEY);
    if (!profile) {
      profile = {
        username: 'Guest Player',
        avatar: 'G',
        level: 1,
        totalPoints: 0,
        dailyStreak: 0,
        lastPlayed: new Date().toISOString(),
        subjects: {
          math: { score: 0, gamesPlayed: 0, accuracy: 0 },
          science: { score: 0, gamesPlayed: 0, accuracy: 0 },
          coding: { score: 0, gamesPlayed: 0, accuracy: 0 }
        },
        achievements: [],
        joinDate: new Date().toISOString()
      };
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    }
    return JSON.parse(profile);
  }
  
  // Get user profile
  function getUserProfile() {
    const profile = localStorage.getItem(USER_PROFILE_KEY);
    return profile ? JSON.parse(profile) : initUserProfile();
  }
  
  // Update user profile
  function updateUserProfile(updates) {
    const profile = getUserProfile();
    Object.assign(profile, updates);
    
    // Calculate level based on total points
    profile.level = Math.floor(profile.totalPoints / 100) + 1;
    
    // Update daily streak
    const lastPlayed = new Date(profile.lastPlayed);
    const today = new Date();
    const daysDiff = Math.floor((today - lastPlayed) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      profile.dailyStreak++;
    } else if (daysDiff > 1) {
      profile.dailyStreak = 1;
    }
    
    profile.lastPlayed = today.toISOString();
    
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    updateProfileDisplay();
    return profile;
  }
  
  // Initialize leaderboard
  function initLeaderboard() {
    let leaderboard = localStorage.getItem(LEADERBOARD_KEY);
    if (!leaderboard) {
      leaderboard = {
        overall: [],
        math: [],
        science: [],
        coding: [],
        weekly: []
      };
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
    }
    return JSON.parse(leaderboard);
  }
  
  // Update leaderboard
  window.updateLeaderboard = function(subject, score) {
    const leaderboard = initLeaderboard();
    const profile = getUserProfile();
    
    const entry = {
      username: profile.username,
      score: score,
      level: profile.level,
      timestamp: new Date().toISOString()
    };
    
    // Update subject-specific leaderboard
    if (!leaderboard[subject]) {
      leaderboard[subject] = [];
    }
    
    // Check if user already has an entry
    const existingIndex = leaderboard[subject].findIndex(e => e.username === profile.username);
    if (existingIndex !== -1) {
      // Update if new score is higher
      if (score > leaderboard[subject][existingIndex].score) {
        leaderboard[subject][existingIndex] = entry;
      }
    } else {
      leaderboard[subject].push(entry);
    }
    
    // Sort by score
    leaderboard[subject].sort((a, b) => b.score - a.score);
    
    // Keep only top 10
    leaderboard[subject] = leaderboard[subject].slice(0, 10);
    
    // Update overall leaderboard
    const overallScore = profile.totalPoints;
    const overallEntry = {
      username: profile.username,
      score: overallScore,
      level: profile.level,
      timestamp: new Date().toISOString()
    };
    
    const overallIndex = leaderboard.overall.findIndex(e => e.username === profile.username);
    if (overallIndex !== -1) {
      leaderboard.overall[overallIndex] = overallEntry;
    } else {
      leaderboard.overall.push(overallEntry);
    }
    
    leaderboard.overall.sort((a, b) => b.score - a.score);
    leaderboard.overall = leaderboard.overall.slice(0, 10);
    
    // Update weekly leaderboard
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    leaderboard.weekly = leaderboard.overall.filter(e => 
      new Date(e.timestamp) > weekAgo
    );
    
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
    
    // Update display if on leaderboard page
    if (document.getElementById('leaderboard-content')) {
      displayLeaderboard('overall');
    }
  };
  
  // Display leaderboard
  function displayLeaderboard(filter) {
    const container = document.getElementById('leaderboard-content');
    if (!container) return;
    
    const leaderboard = initLeaderboard();
    const data = leaderboard[filter] || [];
    const profile = getUserProfile();
    
    if (data.length === 0) {
      container.innerHTML = '<p class="no-data">No data available yet. Start playing to appear on the leaderboard!</p>';
      return;
    }
    
    let html = '<div class="leaderboard-table">';
    html += '<div class="leaderboard-header">';
    html += '<span>Rank</span><span>Player</span><span>Level</span><span>Score</span>';
    html += '</div>';
    
    data.forEach((entry, index) => {
      const isCurrentUser = entry.username === profile.username;
      const rankDisplay = index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`;
      
      html += `<div class="leaderboard-row ${isCurrentUser ? 'current-user' : ''}">`;
      html += `<span class="rank">${rankDisplay}</span>`;
      html += `<span class="player">${entry.username}</span>`;
      html += `<span class="level">Lvl ${entry.level}</span>`;
      html += `<span class="score">${entry.score}</span>`;
      html += '</div>';
    });
    
    html += '</div>';
    
    // Add user's position if not in top 10
    const userRank = data.findIndex(e => e.username === profile.username);
    if (userRank === -1) {
      html += `<div class="user-rank-info">Your rank: Not ranked yet</div>`;
    }
    
    container.innerHTML = html;
  }
  
  // Share progress functionality
  function shareProgress() {
    const profile = getUserProfile();
    const shareText = `🎮 Gyaan Arena Progress\n` +
      `📊 Level: ${profile.level}\n` +
      `🏆 Total Points: ${profile.totalPoints}\n` +
      `🔥 Daily Streak: ${profile.dailyStreak} days\n` +
      `Join me in mastering STEM subjects!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Gyaan Arena Progress',
        text: shareText,
        url: window.location.href
      }).catch(err => console.log('Share cancelled'));
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Progress copied to clipboard! Share it with your friends!');
      });
    }
  }
  
  // Update profile display
  function updateProfileDisplay() {
    const profile = getUserProfile();
    
    // Update home stats
    const streakEl = document.getElementById('streakValue');
    if (streakEl) streakEl.textContent = profile.dailyStreak;
    
    const pointsEl = document.getElementById('totalPointsValue');
    if (pointsEl) pointsEl.textContent = profile.totalPoints;
    
    const rankEl = document.getElementById('rankValue');
    if (rankEl) {
      const leaderboard = initLeaderboard();
      const rank = leaderboard.overall.findIndex(e => e.username === profile.username) + 1;
      rankEl.textContent = rank > 0 ? `#${rank}` : '-';
    }
    
    // Update profile page
    const usernameEl = document.getElementById('username');
    if (usernameEl) {
      usernameEl.value = profile.username;
    }
    
    const levelEl = document.getElementById('userLevel');
    if (levelEl) levelEl.textContent = profile.level;
    
    const avatarEl = document.getElementById('avatarInitial');
    if (avatarEl) avatarEl.textContent = profile.username.charAt(0).toUpperCase();
    
    // Update stats
    const gamesPlayedEl = document.getElementById('gamesPlayedValue');
    if (gamesPlayedEl) {
      const totalGames = Object.values(profile.subjects).reduce((sum, subj) => sum + subj.gamesPlayed, 0);
      gamesPlayedEl.textContent = totalGames;
    }
    
    const bestSubjectEl = document.getElementById('bestSubjectValue');
    if (bestSubjectEl) {
      const bestSubject = Object.entries(profile.subjects)
        .sort((a, b) => b[1].score - a[1].score)[0];
      bestSubjectEl.textContent = bestSubject ? bestSubject[0].charAt(0).toUpperCase() + bestSubject[0].slice(1) : '-';
    }
    
    const accuracyEl = document.getElementById('accuracyValue');
    if (accuracyEl) {
      const totalAccuracy = Object.values(profile.subjects)
        .reduce((sum, subj) => sum + (subj.accuracy || 0), 0);
      const avgAccuracy = Object.values(profile.subjects).length > 0 
        ? Math.round(totalAccuracy / Object.values(profile.subjects).length) 
        : 0;
      accuracyEl.textContent = avgAccuracy + '%';
    }
    
    const timeSpentEl = document.getElementById('timeSpentValue');
    if (timeSpentEl) {
      const joinDate = new Date(profile.joinDate);
      const now = new Date();
      const hours = Math.floor((now - joinDate) / (1000 * 60 * 60));
      timeSpentEl.textContent = hours + 'h';
    }
  }
  
  // Track subject progress
  window.trackSubjectProgress = function(subject, correct, total) {
    const profile = getUserProfile();
    
    if (!profile.subjects[subject]) {
      profile.subjects[subject] = { score: 0, gamesPlayed: 0, accuracy: 0 };
    }
    
    profile.subjects[subject].gamesPlayed++;
    profile.subjects[subject].score += correct * 10;
    
    const prevAccuracy = profile.subjects[subject].accuracy || 0;
    const prevGames = profile.subjects[subject].gamesPlayed - 1;
    const newAccuracy = ((prevAccuracy * prevGames) + (correct / total * 100)) / profile.subjects[subject].gamesPlayed;
    profile.subjects[subject].accuracy = Math.round(newAccuracy);
    
    profile.totalPoints += correct * 10;
    
    updateUserProfile(profile);
  };
  
  // Initialize event listeners
  function initEventListeners() {
    // Leaderboard filters
    document.querySelectorAll('.leaderboard-filters .filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.leaderboard-filters .filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        displayLeaderboard(e.target.dataset.filter);
      });
    });
    
    // Share button
    const shareBtn = document.getElementById('shareProgressBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareProgress);
    }
    
    // Username input
    const usernameInput = document.getElementById('username');
    if (usernameInput) {
      usernameInput.addEventListener('change', (e) => {
        const profile = getUserProfile();
        profile.username = e.target.value || 'Guest Player';
        profile.avatar = profile.username.charAt(0).toUpperCase();
        updateUserProfile(profile);
      });
    }
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    initUserProfile();
    initLeaderboard();
    updateProfileDisplay();
    initEventListeners();
    
    // Display leaderboard if on that page
    if (document.getElementById('leaderboard-content')) {
      displayLeaderboard('overall');
    }
  });
  
  // Public API
  window.socialFeatures = {
    getUserProfile,
    updateUserProfile,
    updateLeaderboard,
    shareProgress,
    trackSubjectProgress
  };
})();

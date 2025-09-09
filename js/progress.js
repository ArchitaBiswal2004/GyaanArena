// Progress Tracking Module
(function() {
  'use strict';
  
  const STORAGE_KEY = 'rural_stem_progress';
  
  // Initialize progress data structure
  function initProgress() {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      const initialData = {
        sessions: [],
        games: {
          math: { totalScore: 0, questionsAnswered: 0, sessions: 0 },
          science: { totalMatches: 0, totalAttempts: 0, sessions: 0 },
          coding: { puzzlesSolved: 0, totalPuzzles: 0, sessions: 0 }
        },
        lastAccess: new Date().toISOString(),
        firstAccess: new Date().toISOString(),
        totalTime: 0
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(existing);
  }
  
  // Track game progress
  function trackProgress(game, score, total, completed = false) {
    const data = getProgressData();
    const now = new Date();
    
    // Update game-specific stats
    switch(game) {
      case 'math':
        data.games.math.totalScore += score;
        data.games.math.questionsAnswered += total;
        if (completed) data.games.math.sessions++;
        break;
      case 'science':
        data.games.science.totalMatches += score;
        data.games.science.totalAttempts += total;
        if (completed) data.games.science.sessions++;
        break;
      case 'coding':
        data.games.coding.puzzlesSolved += score;
        data.games.coding.totalPuzzles += total;
        if (completed) data.games.coding.sessions++;
        break;
    }
    
    // Add session record
    const session = {
      game: game,
      score: score,
      total: total,
      timestamp: now.toISOString(),
      completed: completed
    };
    
    data.sessions.push(session);
    data.lastAccess = now.toISOString();
    
    // Keep only last 100 sessions
    if (data.sessions.length > 100) {
      data.sessions = data.sessions.slice(-100);
    }
    
    saveProgressData(data);
    updateDashboard();
  }
  
  // Get progress data
  function getProgressData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : initProgress();
  }
  
  // Save progress data
  function saveProgressData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  
  // Calculate engagement metrics
  function calculateEngagement() {
    const data = getProgressData();
    const totalSessions = data.sessions.length;
    
    if (totalSessions === 0) return 0;
    
    // Calculate based on completion rate and frequency
    const completedSessions = data.sessions.filter(s => s.completed).length;
    const completionRate = (completedSessions / totalSessions) * 100;
    
    // Calculate daily active use (sessions in last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const recentSessions = data.sessions.filter(s => 
      new Date(s.timestamp) > weekAgo
    ).length;
    
    const frequencyScore = Math.min((recentSessions / 7) * 100, 100);
    
    // Weighted average
    return Math.round((completionRate * 0.6 + frequencyScore * 0.4));
  }
  
  // Calculate average score
  function calculateAverageScore() {
    const data = getProgressData();
    const games = data.games;
    
    let totalScore = 0;
    let totalPossible = 0;
    
    // Math scores
    if (games.math.questionsAnswered > 0) {
      totalScore += games.math.totalScore;
      totalPossible += games.math.questionsAnswered;
    }
    
    // Science scores (matches / attempts)
    if (games.science.totalAttempts > 0) {
      const scienceScore = (games.science.totalMatches / games.science.totalAttempts) * 100;
      totalScore += scienceScore;
      totalPossible += 100;
    }
    
    // Coding scores
    if (games.coding.totalPuzzles > 0) {
      const codingScore = (games.coding.puzzlesSolved / games.coding.totalPuzzles) * 100;
      totalScore += codingScore;
      totalPossible += 100;
    }
    
    return totalPossible > 0 ? Math.round(totalScore / totalPossible * 100) : 0;
  }
  
  // Update dashboard display
  function updateDashboard() {
    const data = getProgressData();
    
    // Update engagement
    const engagementEl = document.getElementById('engagementValue');
    if (engagementEl) {
      const engagement = calculateEngagement();
      engagementEl.textContent = engagement + '%';
      
      // Add color coding
      if (engagement >= 75) {
        engagementEl.style.color = 'var(--success)';
      } else if (engagement >= 50) {
        engagementEl.style.color = 'var(--secondary)';
      } else {
        engagementEl.style.color = 'var(--danger)';
      }
    }
    
    // Update average score
    const scoreEl = document.getElementById('avgScoreValue');
    if (scoreEl) {
      scoreEl.textContent = calculateAverageScore() + '%';
    }
    
    // Update total sessions
    const sessionsEl = document.getElementById('sessionsValue');
    if (sessionsEl) {
      sessionsEl.textContent = data.sessions.length;
    }
  }
  
  // Export data as CSV
  function exportToCSV() {
    const data = getProgressData();
    let csv = 'Timestamp,Game,Score,Total,Completed\n';
    
    data.sessions.forEach(session => {
      csv += `${session.timestamp},${session.game},${session.score},${session.total},${session.completed}\n`;
    });
    
    // Add summary
    csv += '\n\nSummary Statistics\n';
    csv += 'Metric,Value\n';
    csv += `Total Sessions,${data.sessions.length}\n`;
    csv += `Engagement Rate,${calculateEngagement()}%\n`;
    csv += `Average Score,${calculateAverageScore()}%\n`;
    csv += `Math Questions,${data.games.math.questionsAnswered}\n`;
    csv += `Science Matches,${data.games.science.totalMatches}\n`;
    csv += `Coding Puzzles,${data.games.coding.puzzlesSolved}\n`;
    
    // Create download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stem_progress_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  // Reset all data
  function resetData() {
    if (confirm('Are you sure you want to reset all progress data? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      initProgress();
      updateDashboard();
      alert('All progress data has been reset.');
    }
  }
  
  // Attach event listeners
  function attachEventListeners() {
    const exportBtn = document.getElementById('exportDataBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportToCSV);
    }
    
    const resetBtn = document.getElementById('resetDataBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetData);
    }
  }
  
  // Public API
  window.trackProgress = trackProgress;
  window.getProgressData = getProgressData;
  window.updateDashboard = updateDashboard;
  
  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initProgress();
    updateDashboard();
    attachEventListeners();
  });
})();

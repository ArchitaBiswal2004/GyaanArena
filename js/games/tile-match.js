// Enhanced Memory Matching Game Module - For all STEM subjects
(function() {
  'use strict';
  
  // Tile sets for different subjects with difficulty levels
  const tileSets = {
    math: {
      title: 'Math Concepts Memory Match',
      easy: [
        { id: 1, content: '2+2', match: '4', type: 'addition' },
        { id: 2, content: '5×3', match: '15', type: 'multiplication' },
        { id: 3, content: '10÷2', match: '5', type: 'division' },
        { id: 4, content: '7-3', match: '4', type: 'subtraction' },
        { id: 5, content: '1/2', match: '0.5', type: 'fraction' },
        { id: 6, content: '25%', match: '0.25', type: 'percentage' }
      ],
      medium: [
        { id: 1, content: 'π', match: '3.14159...', type: 'symbol' },
        { id: 2, content: '√16', match: '4', type: 'equation' },
        { id: 3, content: 'x²', match: 'Quadratic', type: 'term' },
        { id: 4, content: '∑', match: 'Summation', type: 'symbol' },
        { id: 5, content: '2³', match: '8', type: 'equation' },
        { id: 6, content: '½', match: '0.5', type: 'fraction' },
        { id: 7, content: '∞', match: 'Infinity', type: 'symbol' },
        { id: 8, content: 'sin(90°)', match: '1', type: 'trig' }
      ],
      hard: [
        { id: 1, content: '∫x dx', match: 'x²/2 + C', type: 'integral' },
        { id: 2, content: 'd/dx(x³)', match: '3x²', type: 'derivative' },
        { id: 3, content: 'lim(x→0)', match: 'Limit', type: 'calculus' },
        { id: 4, content: 'Σ(n=1→∞)', match: 'Series', type: 'series' },
        { id: 5, content: 'log₁₀(100)', match: '2', type: 'log' },
        { id: 6, content: 'e^(iπ)', match: '-1', type: 'euler' },
        { id: 7, content: 'nCr', match: 'Combination', type: 'combinatorics' },
        { id: 8, content: 'det(A)', match: 'Determinant', type: 'matrix' },
        { id: 9, content: '∇²', match: 'Laplacian', type: 'operator' },
        { id: 10, content: 'φ', match: 'Golden Ratio', type: 'constant' }
      ]
    },
    science: {
      title: 'Science Elements Memory Match',
      easy: [
        { id: 1, content: 'H₂O', match: 'Water', type: 'compound' },
        { id: 2, content: 'O₂', match: 'Oxygen', type: 'element' },
        { id: 3, content: 'CO₂', match: 'Carbon Dioxide', type: 'compound' },
        { id: 4, content: 'Sun', match: 'Star', type: 'astronomy' },
        { id: 5, content: 'Leaf', match: 'Photosynthesis', type: 'biology' },
        { id: 6, content: 'Magnet', match: 'Attraction', type: 'physics' }
      ],
      medium: [
        { id: 1, content: 'NaCl', match: 'Salt', type: 'compound' },
        { id: 2, content: 'pH 7', match: 'Neutral', type: 'chemistry' },
        { id: 3, content: 'DNA', match: 'Genetic Code', type: 'biology' },
        { id: 4, content: 'F=ma', match: 'Force Law', type: 'equation' },
        { id: 5, content: '9.8 m/s²', match: 'Gravity', type: 'physics' },
        { id: 6, content: 'ATP', match: 'Energy Currency', type: 'biology' },
        { id: 7, content: 'H⁺', match: 'Proton', type: 'particle' },
        { id: 8, content: 'C₆H₁₂O₆', match: 'Glucose', type: 'compound' }
      ],
      hard: [
        { id: 1, content: 'E=mc²', match: 'Mass-Energy', type: 'equation' },
        { id: 2, content: 'ΔG=ΔH-TΔS', match: 'Gibbs Energy', type: 'thermodynamics' },
        { id: 3, content: 'ψ', match: 'Wave Function', type: 'quantum' },
        { id: 4, content: 'Krebs Cycle', match: 'Citric Acid', type: 'biochemistry' },
        { id: 5, content: 'Heisenberg', match: 'Uncertainty', type: 'quantum' },
        { id: 6, content: 'Entropy', match: 'Disorder', type: 'thermodynamics' },
        { id: 7, content: 'Mitosis', match: 'Cell Division', type: 'biology' },
        { id: 8, content: 'Redox', match: 'Electron Transfer', type: 'chemistry' },
        { id: 9, content: 'Doppler', match: 'Frequency Shift', type: 'physics' },
        { id: 10, content: 'Catalyst', match: 'Reaction Speed', type: 'chemistry' }
      ]
    },
    coding: {
      title: 'Programming Concepts Memory Match',
      easy: [
        { id: 1, content: 'print()', match: 'Output', type: 'function' },
        { id: 2, content: 'variable', match: 'Storage', type: 'concept' },
        { id: 3, content: 'true/false', match: 'Boolean', type: 'datatype' },
        { id: 4, content: '1,2,3', match: 'Numbers', type: 'datatype' },
        { id: 5, content: '"text"', match: 'String', type: 'datatype' },
        { id: 6, content: 'loop', match: 'Repeat', type: 'control' }
      ],
      medium: [
        { id: 1, content: 'if/else', match: 'Conditional', type: 'control' },
        { id: 2, content: 'for loop', match: 'Iteration', type: 'control' },
        { id: 3, content: '[ ]', match: 'Array', type: 'structure' },
        { id: 4, content: '{ }', match: 'Object', type: 'structure' },
        { id: 5, content: 'function()', match: 'Method', type: 'concept' },
        { id: 6, content: '&&', match: 'AND', type: 'operator' },
        { id: 7, content: '||', match: 'OR', type: 'operator' },
        { id: 8, content: '!=', match: 'Not Equal', type: 'operator' }
      ],
      hard: [
        { id: 1, content: 'O(n)', match: 'Linear Time', type: 'complexity' },
        { id: 2, content: 'O(log n)', match: 'Logarithmic', type: 'complexity' },
        { id: 3, content: 'Recursion', match: 'Self-Call', type: 'technique' },
        { id: 4, content: 'Binary Tree', match: 'Hierarchical', type: 'datastructure' },
        { id: 5, content: 'Hash Map', match: 'Key-Value', type: 'datastructure' },
        { id: 6, content: 'API', match: 'Interface', type: 'concept' },
        { id: 7, content: 'Polymorphism', match: 'Many Forms', type: 'oop' },
        { id: 8, content: 'Lambda', match: 'Anonymous Fn', type: 'functional' },
        { id: 9, content: 'Async/Await', match: 'Promises', type: 'async' },
        { id: 10, content: 'SQL', match: 'Database Query', type: 'language' }
      ]
    }
  };
  
  let currentSubject = 'math';
  let currentDifficulty = 'medium';
  let currentTiles = [];
  let flippedTiles = [];
  let matchedPairs = [];
  let moves = 0;
  let startTime = null;
  let timerInterval = null;
  let score = 0;
  let gameActive = false;
  
  function initTileMatch(subject, difficulty) {
    currentSubject = subject || 'math';
    currentDifficulty = difficulty || 'medium';
    const tileSet = tileSets[currentSubject];
    
    if (!tileSet) {
      console.error('Invalid subject for tile match game');
      return;
    }
    
    // Reset game state
    currentTiles = [];
    flippedTiles = [];
    matchedPairs = [];
    moves = 0;
    score = 0;
    gameActive = true;
    startTime = Date.now();
    
    // Get tiles based on difficulty
    const tiles = tileSet[currentDifficulty] || tileSet.medium || tileSet.tiles;
    
    // Create tile pairs
    tiles.forEach(tile => {
      currentTiles.push({
        ...tile,
        pairId: tile.id,
        displayContent: tile.content,
        isMatch: false
      });
      currentTiles.push({
        ...tile,
        pairId: tile.id,
        displayContent: tile.match,
        isMatch: true
      });
    });
    
    // Shuffle tiles
    currentTiles = shuffleArray(currentTiles);
    
    renderTileGame();
    startGameTimer();
  }
  
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  function renderTileGame() {
    const container = document.getElementById(`${currentSubject}-game`);
    if (!container) return;
    
    const tileSet = tileSets[currentSubject];
    const tiles = tileSet[currentDifficulty] || tileSet.medium || tileSet.tiles;
    const totalPairs = tiles.length;
    
    container.innerHTML = `
      <div class="tile-match-game">
        <div class="tile-game-header">
          <h3>${tileSet.title}</h3>
          <div class="difficulty-selector">
            <button class="diff-btn ${currentDifficulty === 'easy' ? 'active' : ''}" data-diff="easy">Easy</button>
            <button class="diff-btn ${currentDifficulty === 'medium' ? 'active' : ''}" data-diff="medium">Medium</button>
            <button class="diff-btn ${currentDifficulty === 'hard' ? 'active' : ''}" data-diff="hard">Hard</button>
          </div>
          <div class="tile-game-stats">
            <span class="stat-item">
              <span class="stat-icon">🎯</span>
              Matched: <span id="matched-count">${matchedPairs.length}</span>/${totalPairs}
            </span>
            <span class="stat-item">
              <span class="stat-icon">👆</span>
              Moves: <span id="moves-count">${moves}</span>
            </span>
            <span class="stat-item">
              <span class="stat-icon">⏱️</span>
              Time: <span id="game-timer">0:00</span>
            </span>
            <span class="stat-item">
              <span class="stat-icon">⭐</span>
              Score: <span id="game-score">${score}</span>
            </span>
          </div>
        </div>
        
        <div class="tiles-grid" id="tiles-grid">
          ${currentTiles.map((tile, index) => `
            <div class="tile-card" data-index="${index}" data-pair="${tile.pairId}">
              <div class="tile-inner">
                <div class="tile-front">
                  <span class="tile-icon">${getSubjectIcon(currentSubject)}</span>
                </div>
                <div class="tile-back">
                  <span class="tile-content">${tile.displayContent}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="tile-game-controls">
          <button class="game-control-btn" id="restart-tile-game">
            <span class="btn-icon">🔄</span> New Game
          </button>
          <button class="game-control-btn" id="hint-tile-game">
            <span class="btn-icon">💡</span> Hint
          </button>
          <button class="game-control-btn" id="pause-tile-game">
            <span class="btn-icon">⏸️</span> Pause
          </button>
        </div>
        
        <div class="tile-feedback" id="tile-feedback"></div>
      </div>
    `;
    
    attachTileListeners();
    
    // Add CSS classes for grid layout based on tile count
    const grid = document.getElementById('tiles-grid');
    if (grid) {
      const tileCount = currentTiles.length;
      if (tileCount <= 12) {
        grid.classList.add('grid-small');
      } else if (tileCount <= 16) {
        grid.classList.add('grid-medium');
      } else {
        grid.classList.add('grid-large');
      }
    }
  }
  
  function getSubjectIcon(subject) {
    const icons = {
      math: '🔢',
      science: '🔬',
      coding: '💻'
    };
    return icons[subject] || '📚';
  }
  
  function attachTileListeners() {
    // Tile click listeners
    document.querySelectorAll('.tile-card').forEach(tile => {
      tile.addEventListener('click', handleTileClick);
    });
    
    // Difficulty button listeners
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const diff = e.target.dataset.diff;
        initTileMatch(currentSubject, diff);
      });
    });
    
    // Control button listeners
    document.getElementById('restart-tile-game')?.addEventListener('click', () => {
      initTileMatch(currentSubject, currentDifficulty);
    });
    
    document.getElementById('hint-tile-game')?.addEventListener('click', showHint);
    
    document.getElementById('pause-tile-game')?.addEventListener('click', togglePause);
  }
  
  function handleTileClick(e) {
    if (!gameActive) return;
    
    const tile = e.currentTarget;
    const index = parseInt(tile.dataset.index);
    const pairId = parseInt(tile.dataset.pair);
    
    // Ignore if tile is already flipped or matched
    if (tile.classList.contains('flipped') || tile.classList.contains('matched')) {
      return;
    }
    
    // Flip the tile
    tile.classList.add('flipped');
    flippedTiles.push({ tile, index, pairId });
    
    // Check for match when two tiles are flipped
    if (flippedTiles.length === 2) {
      moves++;
      updateStats();
      checkForMatch();
    }
  }
  
  function checkForMatch() {
    const [first, second] = flippedTiles;
    
    if (first.pairId === second.pairId) {
      // Match found!
      setTimeout(() => {
        first.tile.classList.add('matched');
        second.tile.classList.add('matched');
        
        matchedPairs.push(first.pairId);
        flippedTiles = [];
        
        // Calculate score
        const timeBonus = Math.max(0, 100 - Math.floor((Date.now() - startTime) / 1000));
        const moveBonus = Math.max(0, 50 - moves);
        score += 10 + timeBonus + moveBonus;
        
        updateStats();
        showFeedback('Match found! +' + (10 + timeBonus + moveBonus) + ' points', 'success');
        
        // Check for game completion
        if (matchedPairs.length === tileSets[currentSubject].tiles.length) {
          endGame();
        }
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        first.tile.classList.remove('flipped');
        second.tile.classList.remove('flipped');
        flippedTiles = [];
        showFeedback('Not a match! Try again', 'error');
      }, 1000);
    }
  }
  
  function showHint() {
    if (!gameActive || matchedPairs.length === tileSets[currentSubject].tiles.length) return;
    
    // Find an unmatched pair
    const unmatchedTiles = currentTiles.filter((tile, index) => {
      const tileElement = document.querySelector(`.tile-card[data-index="${index}"]`);
      return !tileElement.classList.contains('matched');
    });
    
    if (unmatchedTiles.length >= 2) {
      // Find a matching pair
      const firstTile = unmatchedTiles[0];
      const matchingTile = unmatchedTiles.find(tile => 
        tile.pairId === firstTile.pairId && tile !== firstTile
      );
      
      if (matchingTile) {
        // Briefly highlight the matching tiles
        const firstIndex = currentTiles.indexOf(firstTile);
        const matchIndex = currentTiles.indexOf(matchingTile);
        
        const firstElement = document.querySelector(`.tile-card[data-index="${firstIndex}"]`);
        const matchElement = document.querySelector(`.tile-card[data-index="${matchIndex}"]`);
        
        firstElement.classList.add('hint-highlight');
        matchElement.classList.add('hint-highlight');
        
        setTimeout(() => {
          firstElement.classList.remove('hint-highlight');
          matchElement.classList.remove('hint-highlight');
        }, 1500);
        
        // Deduct points for using hint
        score = Math.max(0, score - 5);
        updateStats();
        showFeedback('Hint used! -5 points', 'warning');
      }
    }
  }
  
  function togglePause() {
    const pauseBtn = document.getElementById('pause-tile-game');
    if (!pauseBtn) return;
    
    gameActive = !gameActive;
    
    if (gameActive) {
      pauseBtn.innerHTML = '<span class="btn-icon">⏸️</span> Pause';
      startGameTimer();
      showFeedback('Game resumed!', 'info');
    } else {
      pauseBtn.innerHTML = '<span class="btn-icon">▶️</span> Resume';
      clearInterval(timerInterval);
      showFeedback('Game paused', 'info');
    }
  }
  
  function updateStats() {
    document.getElementById('matched-count').textContent = matchedPairs.length;
    document.getElementById('moves-count').textContent = moves;
    document.getElementById('game-score').textContent = score;
  }
  
  function startGameTimer() {
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
      if (!gameActive) return;
      
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      const timerElement = document.getElementById('game-timer');
      if (timerElement) {
        timerElement.textContent = display;
      }
    }, 1000);
  }
  
  function showFeedback(message, type) {
    const feedbackElement = document.getElementById('tile-feedback');
    if (!feedbackElement) return;
    
    feedbackElement.className = `tile-feedback ${type}`;
    feedbackElement.textContent = message;
    feedbackElement.style.display = 'block';
    
    setTimeout(() => {
      feedbackElement.style.display = 'none';
    }, 2000);
  }
  
  function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    // Calculate final score with bonuses
    const perfectBonus = moves === tileSets[currentSubject].tiles.length ? 100 : 0;
    const finalScore = score + perfectBonus;
    
    // Show completion message
    const message = `
      🎉 Congratulations! 
      Time: ${minutes}:${seconds.toString().padStart(2, '0')}
      Moves: ${moves}
      Final Score: ${finalScore}
      ${perfectBonus > 0 ? '⭐ Perfect Match Bonus: +100' : ''}
    `;
    
    showFeedback(message, 'success');
    
    // Track progress
    if (window.trackProgress) {
      window.trackProgress(currentSubject, finalScore, moves);
    }
    
    // Update leaderboard
    if (window.updateLeaderboard) {
      window.updateLeaderboard(currentSubject, finalScore);
    }
  }
  
  // Public API
  window.initTileMatch = initTileMatch;
  
  // Auto-initialize when game selector is clicked
  document.addEventListener('DOMContentLoaded', () => {
    // Add tile match to game selectors
    ['math', 'science', 'coding'].forEach(subject => {
      const selector = document.querySelector(`#${subject} .game-selector`);
      if (selector && !selector.querySelector('[data-game="tilematch"]')) {
        const btn = document.createElement('button');
        btn.className = 'game-btn';
        btn.dataset.game = 'tilematch';
        btn.textContent = 'Tile Match';
        btn.addEventListener('click', () => {
          initTileMatch(subject);
        });
        selector.appendChild(btn);
      }
    });
  });
})();

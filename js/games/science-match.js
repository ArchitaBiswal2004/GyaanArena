// Science Matching Game Module - Enhanced with Periodic Table
(function() {
  'use strict';
  
  // Original matching data for elements game
  const elementData = [
    { term: 'H', match: 'Hydrogen' },
    { term: 'He', match: 'Helium' },
    { term: 'Li', match: 'Lithium' },
    { term: 'C', match: 'Carbon' },
    { term: 'N', match: 'Nitrogen' },
    { term: 'O', match: 'Oxygen' },
    { term: 'Na', match: 'Sodium' },
    { term: 'Mg', match: 'Magnesium' },
    { term: 'Al', match: 'Aluminum' },
    { term: 'Si', match: 'Silicon' },
    { term: 'Cl', match: 'Chlorine' },
    { term: 'K', match: 'Potassium' },
    { term: 'Ca', match: 'Calcium' },
    { term: 'Fe', match: 'Iron' },
    { term: 'Cu', match: 'Copper' },
    { term: 'Zn', match: 'Zinc' },
    { term: 'Ag', match: 'Silver' },
    { term: 'Au', match: 'Gold' },
    { term: 'Hg', match: 'Mercury' },
    { term: 'Pb', match: 'Lead' }
  ];
  
  const scienceData = [
    { term: 'H₂O', match: 'Water' },
    { term: 'CO₂', match: 'Carbon Dioxide' },
    { term: 'O₂', match: 'Oxygen Gas' },
    { term: 'NaCl', match: 'Salt' },
    { term: 'H₂SO₄', match: 'Sulfuric Acid' },
    { term: 'NH₃', match: 'Ammonia' },
    { term: 'CH₄', match: 'Methane' },
    { term: 'Photosynthesis', match: 'Plants make food' },
    { term: 'Gravity', match: 'Pulls objects down' },
    { term: 'Evaporation', match: 'Liquid to gas' },
    { term: 'Condensation', match: 'Gas to liquid' },
    { term: 'Atom', match: 'Smallest unit' },
    { term: 'Cell', match: 'Basic unit of life' },
    { term: 'Solar System', match: 'Sun and planets' },
    { term: 'Ecosystem', match: 'Living community' },
    { term: 'Energy', match: 'Ability to do work' }
  ];
  
  let currentPairs = [];
  let selectedCard = null;
  let matchedPairs = 0;
  let attempts = 0;
  let startTime = null;
  let currentGameMode = 'elements'; // Default to periodic table
  
  function getRandomPairs(count = 6) {
    const dataSource = currentGameMode === 'elements' ? elementData : scienceData;
    const shuffled = [...dataSource].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
  
  function shuffleCards(pairs) {
    const cards = [];
    pairs.forEach((pair, index) => {
      cards.push({ text: pair.term, pairId: index, type: 'term' });
      cards.push({ text: pair.match, pairId: index, type: 'match' });
    });
    return cards.sort(() => Math.random() - 0.5);
  }
  
  function renderGame(gameMode) {
    const gameContainer = document.getElementById('science-game');
    if (!gameContainer) return;
    
    // Set game mode if provided
    if (gameMode) {
      currentGameMode = gameMode;
    }
    
    // Reset game state
    currentPairs = getRandomPairs();
    const cards = shuffleCards(currentPairs);
    selectedCard = null;
    matchedPairs = 0;
    attempts = 0;
    startTime = Date.now();
    
    const gameTitle = currentGameMode === 'elements' ? 'Periodic Table Match' : 'Science Concepts Match';
    
    gameContainer.innerHTML = `
      <div class="game-header">
        <h4>${gameTitle}</h4>
      </div>
      <div class="game-stats">
        <span>Matched: ${matchedPairs}/${currentPairs.length}</span>
        <span>Attempts: ${attempts}</span>
        <span id="science-timer">Time: 0s</span>
      </div>
      <div class="cards-grid">
        ${cards.map((card, idx) => `
          <div class="match-card" data-id="${idx}" data-pair="${card.pairId}" data-type="${card.type}">
            <div class="card-inner">
              <div class="card-front">?</div>
              <div class="card-back">${card.text}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="feedback" id="science-feedback"></div>
      <button id="science-new-btn" class="game-btn">New Game</button>
    `;
    
    attachEventListeners();
    startTimer();
  }
  
  function attachEventListeners() {
    const cards = document.querySelectorAll('#science-game .match-card');
    cards.forEach(card => {
      card.addEventListener('click', handleCardClick);
    });
    
    const newBtn = document.getElementById('science-new-btn');
    if (newBtn) {
      newBtn.addEventListener('click', () => renderGame(currentGameMode));
    }
    
    // Handle game selector buttons if they exist
    document.querySelectorAll('#science .game-selector .game-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const gameType = e.target.dataset.game;
        document.querySelectorAll('#science .game-selector .game-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        // Map game types to our modes
        if (gameType === 'elements') {
          renderGame('elements');
        } else if (gameType === 'physics' || gameType === 'chemistry' || gameType === 'biology') {
          // Use science-advanced for these
          if (window.initScienceAdvanced) {
            window.initScienceAdvanced(gameType);
          }
        } else {
          renderGame('concepts');
        }
      });
    });
  }
  
  function handleCardClick(e) {
    const card = e.currentTarget;
    
    // Ignore if card is already matched or flipped
    if (card.classList.contains('matched') || card.classList.contains('flipped')) {
      return;
    }
    
    card.classList.add('flipped');
    
    if (!selectedCard) {
      selectedCard = card;
    } else {
      attempts++;
      checkMatch(selectedCard, card);
    }
  }
  
  function checkMatch(card1, card2) {
    const pair1 = card1.dataset.pair;
    const pair2 = card2.dataset.pair;
    const feedback = document.getElementById('science-feedback');
    
    if (pair1 === pair2) {
      // Match found!
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedPairs++;
      
      feedback.innerHTML = '<span class="correct">✓ Match found!</span>';
      
      if (matchedPairs === currentPairs.length) {
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        feedback.innerHTML = `<span class="success">🎉 All matched in ${timeTaken}s with ${attempts} attempts!</span>`;
        window.trackProgress && window.trackProgress('science', matchedPairs, attempts);
      }
      
      selectedCard = null;
    } else {
      // No match
      feedback.innerHTML = '<span class="incorrect">✗ Try again!</span>';
      
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        selectedCard = null;
        feedback.innerHTML = '';
      }, 1500);
    }
    
    updateStats();
  }
  
  function updateStats() {
    const statsContainer = document.querySelector('#science-game .game-stats');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <span>Matched: ${matchedPairs}/${currentPairs.length}</span>
        <span>Attempts: ${attempts}</span>
        <span id="science-timer">Time: 0s</span>
      `;
    }
  }
  
  function startTimer() {
    const timerInterval = setInterval(() => {
      if (!startTime) {
        clearInterval(timerInterval);
        return;
      }
      
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const timerElement = document.getElementById('science-timer');
      if (timerElement) {
        timerElement.textContent = `Time: ${elapsed}s`;
      }
      
      if (matchedPairs === currentPairs.length) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }
  
  // Initialize when tab is shown
  window.initScienceGame = function() {
    const activeBtn = document.querySelector('#science .game-selector .game-btn.active');
    if (activeBtn) {
      const gameType = activeBtn.dataset.game;
      if (gameType === 'elements') {
        renderGame('elements');
      } else if (gameType === 'physics' || gameType === 'chemistry' || gameType === 'biology') {
        if (window.initScienceAdvanced) {
          window.initScienceAdvanced(gameType);
        }
      } else {
        renderGame('concepts');
      }
    } else {
      renderGame('elements'); // Default to periodic table
    }
  };
  
  window.initScienceAdvanced = function(gameType) {
    // Delegate to science-advanced.js if it exists
    const advancedScript = document.querySelector('script[src*="science-advanced"]');
    if (advancedScript && window.renderScienceAdvanced) {
      window.renderScienceAdvanced(gameType);
    }
  };
})();

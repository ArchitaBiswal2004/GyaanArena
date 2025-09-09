// Science Matching Game Module
(function() {
  'use strict';
  
  const scienceData = [
    { term: 'H₂O', match: 'Water' },
    { term: 'CO₂', match: 'Carbon Dioxide' },
    { term: 'O₂', match: 'Oxygen' },
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
  
  function getRandomPairs(count = 6) {
    const shuffled = [...scienceData].sort(() => Math.random() - 0.5);
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
  
  function renderGame() {
    const gameContainer = document.getElementById('science-game');
    if (!gameContainer) return;
    
    // Reset game state
    currentPairs = getRandomPairs();
    const cards = shuffleCards(currentPairs);
    selectedCard = null;
    matchedPairs = 0;
    attempts = 0;
    startTime = Date.now();
    
    gameContainer.innerHTML = `
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
      newBtn.addEventListener('click', renderGame);
    }
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
  window.initScienceGame = renderGame;
})();

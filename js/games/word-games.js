// Word Games Module - Word Search and Vocabulary Games for STEM
(function() {
  'use strict';
  
  // Word game data for different subjects
  const wordGames = {
    math: {
      title: 'Math Word Search & Vocabulary',
      wordSearch: {
        words: ['ALGEBRA', 'GEOMETRY', 'CALCULUS', 'FRACTION', 'EQUATION', 
                'VARIABLE', 'FUNCTION', 'INTEGRAL', 'DERIVATIVE', 'MATRIX',
                'VECTOR', 'THEOREM', 'PROOF', 'AXIOM', 'GRAPH'],
        gridSize: 15
      },
      vocabulary: [
        { word: 'POLYNOMIAL', definition: 'An expression with multiple terms involving powers of variables' },
        { word: 'HYPOTENUSE', definition: 'The longest side of a right triangle' },
        { word: 'COEFFICIENT', definition: 'A numerical factor in a term of an algebraic expression' },
        { word: 'ASYMPTOTE', definition: 'A line that a curve approaches but never touches' },
        { word: 'PERMUTATION', definition: 'An arrangement of objects in a specific order' },
        { word: 'LOGARITHM', definition: 'The inverse operation to exponentiation' },
        { word: 'TANGENT', definition: 'A line that touches a curve at exactly one point' },
        { word: 'QUADRATIC', definition: 'A polynomial of degree 2' },
        { word: 'FACTORIAL', definition: 'Product of all positive integers less than or equal to n' },
        { word: 'MEDIAN', definition: 'The middle value in a sorted list of numbers' }
      ],
      scramble: [
        { scrambled: 'TIDARQUCA', answer: 'QUADRATIC', hint: 'Second degree polynomial' },
        { scrambled: 'NUFOCTNI', answer: 'FUNCTION', hint: 'Maps input to output' },
        { scrambled: 'RLAEBAG', answer: 'ALGEBRA', hint: 'Branch of math using symbols' },
        { scrambled: 'OMTEEYGR', answer: 'GEOMETRY', hint: 'Study of shapes and spaces' },
        { scrambled: 'LACLUCUS', answer: 'CALCULUS', hint: 'Study of continuous change' }
      ]
    },
    science: {
      title: 'Science Word Search & Vocabulary',
      wordSearch: {
        words: ['ATOM', 'MOLECULE', 'ELECTRON', 'PROTON', 'NEUTRON',
                'ELEMENT', 'COMPOUND', 'REACTION', 'ENERGY', 'FORCE',
                'GRAVITY', 'VELOCITY', 'MOMENTUM', 'PHOTON', 'QUANTUM'],
        gridSize: 15
      },
      vocabulary: [
        { word: 'PHOTOSYNTHESIS', definition: 'Process by which plants convert light into chemical energy' },
        { word: 'MITOCHONDRIA', definition: 'The powerhouse of the cell' },
        { word: 'ECOSYSTEM', definition: 'A community of organisms and their environment' },
        { word: 'CATALYST', definition: 'A substance that speeds up a chemical reaction' },
        { word: 'ISOTOPE', definition: 'Atoms with same protons but different neutrons' },
        { word: 'OSMOSIS', definition: 'Movement of water through a semipermeable membrane' },
        { word: 'ENTROPY', definition: 'Measure of disorder in a system' },
        { word: 'CHROMOSOME', definition: 'Structure containing genetic information' },
        { word: 'HYPOTHESIS', definition: 'A proposed explanation for observations' },
        { word: 'EQUILIBRIUM', definition: 'State of balance in a system' }
      ],
      scramble: [
        { scrambled: 'LCMOEELU', answer: 'MOLECULE', hint: 'Group of bonded atoms' },
        { scrambled: 'CNEELRTO', answer: 'ELECTRON', hint: 'Negative particle' },
        { scrambled: 'ERYGEN', answer: 'ENERGY', hint: 'Ability to do work' },
        { scrambled: 'ARVIYTG', answer: 'GRAVITY', hint: 'Force of attraction' },
        { scrambled: 'TUMPQAN', answer: 'QUANTUM', hint: 'Smallest discrete unit' }
      ]
    },
    coding: {
      title: 'Coding Word Search & Vocabulary',
      wordSearch: {
        words: ['ALGORITHM', 'FUNCTION', 'VARIABLE', 'LOOP', 'ARRAY',
                'CLASS', 'METHOD', 'OBJECT', 'DEBUG', 'COMPILE',
                'SYNTAX', 'BINARY', 'STRING', 'BOOLEAN', 'INTEGER'],
        gridSize: 15
      },
      vocabulary: [
        { word: 'RECURSION', definition: 'A function that calls itself' },
        { word: 'INHERITANCE', definition: 'Mechanism where a class derives from another class' },
        { word: 'POLYMORPHISM', definition: 'Ability of objects to take multiple forms' },
        { word: 'ENCAPSULATION', definition: 'Bundling data and methods within a class' },
        { word: 'ABSTRACTION', definition: 'Hiding complex implementation details' },
        { word: 'INTERFACE', definition: 'Contract defining methods a class must implement' },
        { word: 'DATABASE', definition: 'Organized collection of structured data' },
        { word: 'FRAMEWORK', definition: 'Platform for developing software applications' },
        { word: 'REPOSITORY', definition: 'Central location for storing and managing code' },
        { word: 'PARAMETER', definition: 'Variable used in function definition' }
      ],
      scramble: [
        { scrambled: 'MRTIHGLAO', answer: 'ALGORITHM', hint: 'Step-by-step procedure' },
        { scrambled: 'RVBALAEI', answer: 'VARIABLE', hint: 'Storage location with name' },
        { scrambled: 'NCUNOTFI', answer: 'FUNCTION', hint: 'Reusable block of code' },
        { scrambled: 'RAYAR', answer: 'ARRAY', hint: 'Ordered collection' },
        { scrambled: 'GEBUD', answer: 'DEBUG', hint: 'Find and fix errors' }
      ]
    }
  };
  
  let currentSubject = 'math';
  let currentGame = 'wordSearch';
  let selectedWords = [];
  let foundWords = [];
  let grid = [];
  let startTime = null;
  let score = 0;
  let currentVocabIndex = 0;
  let currentScrambleIndex = 0;
  
  function initWordGame(subject, gameType) {
    currentSubject = subject || 'math';
    currentGame = gameType || 'wordSearch';
    
    const gameData = wordGames[currentSubject];
    if (!gameData) {
      console.error('Invalid subject for word game');
      return;
    }
    
    // Reset game state
    selectedWords = [];
    foundWords = [];
    grid = [];
    score = 0;
    startTime = Date.now();
    currentVocabIndex = 0;
    currentScrambleIndex = 0;
    
    if (currentGame === 'wordSearch') {
      initWordSearch();
    } else if (currentGame === 'vocabulary') {
      initVocabulary();
    } else if (currentGame === 'scramble') {
      initWordScramble();
    }
  }
  
  function initWordSearch() {
    const gameData = wordGames[currentSubject].wordSearch;
    const gridSize = gameData.gridSize;
    
    // Select random words for this game
    selectedWords = shuffleArray(gameData.words).slice(0, 10);
    foundWords = [];
    
    // Create empty grid
    grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    
    // Place words in grid
    selectedWords.forEach(word => {
      placeWordInGrid(word, gridSize);
    });
    
    // Fill empty cells with random letters
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
    
    renderWordSearch();
  }
  
  function placeWordInGrid(word, gridSize) {
    const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal down-right
      [-1, 1],  // diagonal up-right
      [0, -1],  // horizontal backward
      [-1, 0],  // vertical backward
      [-1, -1], // diagonal up-left
      [1, -1]   // diagonal down-left
    ];
    
    let placed = false;
    let attempts = 0;
    
    while (!placed && attempts < 100) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const startRow = Math.floor(Math.random() * gridSize);
      const startCol = Math.floor(Math.random() * gridSize);
      
      if (canPlaceWord(word, startRow, startCol, direction, gridSize)) {
        for (let i = 0; i < word.length; i++) {
          const row = startRow + i * direction[0];
          const col = startCol + i * direction[1];
          grid[row][col] = word[i];
        }
        placed = true;
      }
      attempts++;
    }
  }
  
  function canPlaceWord(word, startRow, startCol, direction, gridSize) {
    for (let i = 0; i < word.length; i++) {
      const row = startRow + i * direction[0];
      const col = startCol + i * direction[1];
      
      if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
        return false;
      }
      
      if (grid[row][col] !== '' && grid[row][col] !== word[i]) {
        return false;
      }
    }
    return true;
  }
  
  function renderWordSearch() {
    const container = document.getElementById(`${currentSubject}-game`);
    if (!container) return;
    
    const gameData = wordGames[currentSubject];
    
    container.innerHTML = `
      <div class="word-search-game">
        <div class="word-game-header">
          <h3>${gameData.title} - Word Search</h3>
          <div class="game-type-selector">
            <button class="type-btn ${currentGame === 'wordSearch' ? 'active' : ''}" data-type="wordSearch">Word Search</button>
            <button class="type-btn ${currentGame === 'vocabulary' ? 'active' : ''}" data-type="vocabulary">Vocabulary</button>
            <button class="type-btn ${currentGame === 'scramble' ? 'active' : ''}" data-type="scramble">Word Scramble</button>
          </div>
          <div class="word-game-stats">
            <span>Found: ${foundWords.length}/${selectedWords.length}</span>
            <span>Score: ${score}</span>
          </div>
        </div>
        
        <div class="word-search-content">
          <div class="word-grid" id="wordGrid">
            ${grid.map((row, i) => 
              row.map((cell, j) => 
                `<div class="grid-cell" data-row="${i}" data-col="${j}">${cell}</div>`
              ).join('')
            ).join('')}
          </div>
          
          <div class="word-list">
            <h4>Find these words:</h4>
            <div class="words-to-find">
              ${selectedWords.map(word => 
                `<div class="word-item ${foundWords.includes(word) ? 'found' : ''}" data-word="${word}">
                  ${word}
                </div>`
              ).join('')}
            </div>
          </div>
        </div>
        
        <div class="word-game-controls">
          <button id="hint-word-game">💡 Hint</button>
          <button id="new-word-game">🔄 New Game</button>
        </div>
      </div>
    `;
    
    attachWordSearchListeners();
  }
  
  function initVocabulary() {
    const gameData = wordGames[currentSubject].vocabulary;
    currentVocabIndex = 0;
    renderVocabulary();
  }
  
  function renderVocabulary() {
    const container = document.getElementById(`${currentSubject}-game`);
    if (!container) return;
    
    const gameData = wordGames[currentSubject];
    const vocab = gameData.vocabulary[currentVocabIndex];
    
    container.innerHTML = `
      <div class="vocabulary-game">
        <div class="word-game-header">
          <h3>${gameData.title} - Vocabulary Match</h3>
          <div class="game-type-selector">
            <button class="type-btn ${currentGame === 'wordSearch' ? 'active' : ''}" data-type="wordSearch">Word Search</button>
            <button class="type-btn ${currentGame === 'vocabulary' ? 'active' : ''}" data-type="vocabulary">Vocabulary</button>
            <button class="type-btn ${currentGame === 'scramble' ? 'active' : ''}" data-type="scramble">Word Scramble</button>
          </div>
          <div class="vocab-progress">
            Question ${currentVocabIndex + 1} of ${gameData.vocabulary.length}
            <span>Score: ${score}</span>
          </div>
        </div>
        
        <div class="vocab-content">
          <div class="definition-card">
            <p class="definition">${vocab.definition}</p>
          </div>
          
          <div class="word-options">
            ${generateVocabOptions(vocab.word).map(option => 
              `<button class="vocab-option" data-word="${option}">${option}</button>`
            ).join('')}
          </div>
        </div>
        
        <div class="vocab-feedback" id="vocabFeedback"></div>
        
        <div class="vocab-controls">
          <button id="skip-vocab">Skip →</button>
        </div>
      </div>
    `;
    
    attachVocabularyListeners();
  }
  
  function generateVocabOptions(correctWord) {
    const allWords = wordGames[currentSubject].vocabulary.map(v => v.word);
    const options = [correctWord];
    
    while (options.length < 4) {
      const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }
    }
    
    return shuffleArray(options);
  }
  
  function initWordScramble() {
    const gameData = wordGames[currentSubject].scramble;
    currentScrambleIndex = 0;
    renderWordScramble();
  }
  
  function renderWordScramble() {
    const container = document.getElementById(`${currentSubject}-game`);
    if (!container) return;
    
    const gameData = wordGames[currentSubject];
    const scramble = gameData.scramble[currentScrambleIndex];
    
    container.innerHTML = `
      <div class="scramble-game">
        <div class="word-game-header">
          <h3>${gameData.title} - Word Scramble</h3>
          <div class="game-type-selector">
            <button class="type-btn ${currentGame === 'wordSearch' ? 'active' : ''}" data-type="wordSearch">Word Search</button>
            <button class="type-btn ${currentGame === 'vocabulary' ? 'active' : ''}" data-type="vocabulary">Vocabulary</button>
            <button class="type-btn ${currentGame === 'scramble' ? 'active' : ''}" data-type="scramble">Word Scramble</button>
          </div>
          <div class="scramble-progress">
            Puzzle ${currentScrambleIndex + 1} of ${gameData.scramble.length}
            <span>Score: ${score}</span>
          </div>
        </div>
        
        <div class="scramble-content">
          <div class="scrambled-word">
            ${scramble.scrambled.split('').map((letter, i) => 
              `<span class="scramble-letter" data-index="${i}">${letter}</span>`
            ).join('')}
          </div>
          
          <div class="hint-text">Hint: ${scramble.hint}</div>
          
          <div class="answer-input">
            <input type="text" id="scrambleAnswer" placeholder="Enter your answer..." maxlength="${scramble.answer.length}">
            <button id="checkScramble">Check</button>
          </div>
          
          <div class="letter-bank" id="letterBank">
            ${scramble.scrambled.split('').map((letter, i) => 
              `<button class="letter-btn" data-letter="${letter}" data-index="${i}">${letter}</button>`
            ).join('')}
          </div>
        </div>
        
        <div class="scramble-feedback" id="scrambleFeedback"></div>
        
        <div class="scramble-controls">
          <button id="reveal-letter">Reveal Letter (-5 pts)</button>
          <button id="skip-scramble">Skip →</button>
        </div>
      </div>
    `;
    
    attachScrambleListeners();
  }
  
  function attachWordSearchListeners() {
    // Word selection logic
    let isSelecting = false;
    let selectedCells = [];
    
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
      cell.addEventListener('mousedown', startSelection);
      cell.addEventListener('mouseover', continueSelection);
      cell.addEventListener('mouseup', endSelection);
    });
    
    function startSelection(e) {
      isSelecting = true;
      selectedCells = [e.target];
      e.target.classList.add('selecting');
    }
    
    function continueSelection(e) {
      if (isSelecting && !selectedCells.includes(e.target)) {
        selectedCells.push(e.target);
        e.target.classList.add('selecting');
      }
    }
    
    function endSelection() {
      if (isSelecting) {
        const word = selectedCells.map(cell => cell.textContent).join('');
        const reverseWord = word.split('').reverse().join('');
        
        if (selectedWords.includes(word) && !foundWords.includes(word)) {
          foundWords.push(word);
          selectedCells.forEach(cell => cell.classList.add('found'));
          document.querySelector(`[data-word="${word}"]`).classList.add('found');
          score += 10;
          updateWordSearchStats();
          
          if (foundWords.length === selectedWords.length) {
            showWordGameComplete();
          }
        } else if (selectedWords.includes(reverseWord) && !foundWords.includes(reverseWord)) {
          foundWords.push(reverseWord);
          selectedCells.forEach(cell => cell.classList.add('found'));
          document.querySelector(`[data-word="${reverseWord}"]`).classList.add('found');
          score += 10;
          updateWordSearchStats();
          
          if (foundWords.length === selectedWords.length) {
            showWordGameComplete();
          }
        }
        
        selectedCells.forEach(cell => cell.classList.remove('selecting'));
        selectedCells = [];
        isSelecting = false;
      }
    }
    
    // Game type switcher
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        initWordGame(currentSubject, type);
      });
    });
    
    // Control buttons
    document.getElementById('new-word-game')?.addEventListener('click', () => {
      initWordGame(currentSubject, 'wordSearch');
    });
    
    document.getElementById('hint-word-game')?.addEventListener('click', showWordHint);
  }
  
  function attachVocabularyListeners() {
    document.querySelectorAll('.vocab-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedWord = e.target.dataset.word;
        const correctWord = wordGames[currentSubject].vocabulary[currentVocabIndex].word;
        
        if (selectedWord === correctWord) {
          e.target.classList.add('correct');
          score += 15;
          showVocabFeedback('Correct! Well done!', 'success');
          
          setTimeout(() => {
            currentVocabIndex++;
            if (currentVocabIndex < wordGames[currentSubject].vocabulary.length) {
              renderVocabulary();
            } else {
              showWordGameComplete();
            }
          }, 1500);
        } else {
          e.target.classList.add('incorrect');
          score = Math.max(0, score - 5);
          showVocabFeedback('Try again!', 'error');
        }
      });
    });
    
    document.getElementById('skip-vocab')?.addEventListener('click', () => {
      currentVocabIndex++;
      if (currentVocabIndex < wordGames[currentSubject].vocabulary.length) {
        renderVocabulary();
      } else {
        showWordGameComplete();
      }
    });
    
    // Game type switcher
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        initWordGame(currentSubject, type);
      });
    });
  }
  
  function attachScrambleListeners() {
    const input = document.getElementById('scrambleAnswer');
    const checkBtn = document.getElementById('checkScramble');
    
    checkBtn?.addEventListener('click', checkScrambleAnswer);
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        checkScrambleAnswer();
      }
    });
    
    // Letter bank interaction
    let answerArray = [];
    document.querySelectorAll('.letter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!e.target.disabled) {
          answerArray.push(e.target.dataset.letter);
          input.value = answerArray.join('');
          e.target.disabled = true;
        }
      });
    });
    
    // Allow backspace to return letters
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && answerArray.length > 0) {
        answerArray.pop();
        document.querySelectorAll('.letter-btn').forEach(btn => {
          if (btn.disabled && !answerArray.includes(btn.dataset.letter)) {
            btn.disabled = false;
          }
        });
      }
    });
    
    document.getElementById('reveal-letter')?.addEventListener('click', () => {
      const answer = wordGames[currentSubject].scramble[currentScrambleIndex].answer;
      const current = input.value;
      if (current.length < answer.length) {
        input.value = answer.substring(0, current.length + 1);
        score = Math.max(0, score - 5);
      }
    });
    
    document.getElementById('skip-scramble')?.addEventListener('click', () => {
      currentScrambleIndex++;
      if (currentScrambleIndex < wordGames[currentSubject].scramble.length) {
        renderWordScramble();
      } else {
        showWordGameComplete();
      }
    });
    
    // Game type switcher
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        initWordGame(currentSubject, type);
      });
    });
  }
  
  function checkScrambleAnswer() {
    const input = document.getElementById('scrambleAnswer');
    const answer = input.value.toUpperCase();
    const correct = wordGames[currentSubject].scramble[currentScrambleIndex].answer;
    
    if (answer === correct) {
      score += 20;
      showScrambleFeedback('Excellent! That\'s correct!', 'success');
      
      setTimeout(() => {
        currentScrambleIndex++;
        if (currentScrambleIndex < wordGames[currentSubject].scramble.length) {
          renderWordScramble();
        } else {
          showWordGameComplete();
        }
      }, 1500);
    } else {
      score = Math.max(0, score - 3);
      showScrambleFeedback('Not quite right. Try again!', 'error');
    }
  }
  
  function showWordHint() {
    const unfoundWords = selectedWords.filter(word => !foundWords.includes(word));
    if (unfoundWords.length > 0) {
      const hintWord = unfoundWords[0];
      // Find first letter of the word in grid
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          if (grid[i][j] === hintWord[0]) {
            const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
            cell.classList.add('hint-highlight');
            setTimeout(() => cell.classList.remove('hint-highlight'), 2000);
            score = Math.max(0, score - 5);
            return;
          }
        }
      }
    }
  }
  
  function updateWordSearchStats() {
    const statsElement = document.querySelector('.word-game-stats');
    if (statsElement) {
      statsElement.innerHTML = `
        <span>Found: ${foundWords.length}/${selectedWords.length}</span>
        <span>Score: ${score}</span>
      `;
    }
  }
  
  function showVocabFeedback(message, type) {
    const feedback = document.getElementById('vocabFeedback');
    if (feedback) {
      feedback.className = `vocab-feedback ${type}`;
      feedback.textContent = message;
      setTimeout(() => {
        feedback.textContent = '';
      }, 2000);
    }
  }
  
  function showScrambleFeedback(message, type) {
    const feedback = document.getElementById('scrambleFeedback');
    if (feedback) {
      feedback.className = `scramble-feedback ${type}`;
      feedback.textContent = message;
      setTimeout(() => {
        feedback.textContent = '';
      }, 2000);
    }
  }
  
  function showWordGameComplete() {
    const container = document.getElementById(`${currentSubject}-game`);
    if (!container) return;
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    container.innerHTML += `
      <div class="game-complete-overlay">
        <div class="complete-message">
          <h2>🎉 Game Complete!</h2>
          <p>Time: ${minutes}:${seconds.toString().padStart(2, '0')}</p>
          <p>Final Score: ${score}</p>
          <button onclick="initWordGame('${currentSubject}', '${currentGame}')">Play Again</button>
        </div>
      </div>
    `;
  }
  
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  // Public API
  window.initWordGame = initWordGame;
})();

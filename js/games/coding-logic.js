// Coding Logic Puzzle Game Module
(function() {
  'use strict';
  
  const puzzles = [
    {
      title: 'Fix the Loop',
      code: 'for (let i = 0; i < 5; ???) {\n  console.log(i);\n}',
      answer: 'i++',
      options: ['i++', 'i--', 'i+2', 'i*2'],
      hint: 'We need to increment i by 1 each time'
    },
    {
      title: 'Complete the Condition',
      code: 'if (x ??? 10) {\n  console.log("x is greater than 10");\n}',
      answer: '>',
      options: ['>', '<', '==', '!='],
      hint: 'Which operator checks if x is greater than 10?'
    },
    {
      title: 'Array Access',
      code: 'const fruits = ["apple", "banana", "orange"];\nconst first = fruits???;',
      answer: '[0]',
      options: ['[0]', '[1]', '(0)', '.first'],
      hint: 'Arrays start at index 0'
    },
    {
      title: 'Function Return',
      code: 'function add(a, b) {\n  ??? a + b;\n}',
      answer: 'return',
      options: ['return', 'give', 'send', 'output'],
      hint: 'What keyword sends a value back from a function?'
    },
    {
      title: 'Variable Declaration',
      code: '??? name = "Student";\nconsole.log(name);',
      answer: 'let',
      options: ['let', 'var', 'const', 'set'],
      hint: 'Which keyword declares a variable that can be changed?'
    },
    {
      title: 'Boolean Logic',
      code: 'const isReady = true;\nif (???isReady) {\n  console.log("Not ready");\n}',
      answer: '!',
      options: ['!', '?', '~', '-'],
      hint: 'Which operator makes true become false?'
    }
  ];
  
  let currentPuzzle = null;
  let currentIndex = 0;
  let score = 0;
  let hintsUsed = 0;
  
  function renderGame() {
    const gameContainer = document.getElementById('coding-game');
    if (!gameContainer) return;
    
    currentPuzzle = puzzles[currentIndex];
    
    gameContainer.innerHTML = `
      <div class="game-stats">
        <span>Puzzle: ${currentIndex + 1}/${puzzles.length}</span>
        <span>Score: ${score}</span>
        <span>Hints Used: ${hintsUsed}</span>
      </div>
      <div class="puzzle-container">
        <h3>${currentPuzzle.title}</h3>
        <pre class="code-block">${highlightPlaceholder(currentPuzzle.code)}</pre>
        <div class="options-row">
          ${currentPuzzle.options.map(opt => 
            `<button class="code-option" data-value="${opt}"><code>${opt}</code></button>`
          ).join('')}
        </div>
        <div class="puzzle-controls">
          <button id="hint-btn" class="hint-btn">💡 Hint</button>
          <button id="skip-btn" class="skip-btn">Skip →</button>
        </div>
        <div class="feedback" id="coding-feedback"></div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${(currentIndex / puzzles.length) * 100}%"></div>
      </div>
    `;
    
    attachEventListeners();
  }
  
  function highlightPlaceholder(code) {
    return code.replace('???', '<span class="placeholder">???</span>');
  }
  
  function attachEventListeners() {
    const optionBtns = document.querySelectorAll('#coding-game .code-option');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', checkAnswer);
    });
    
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) {
      hintBtn.addEventListener('click', showHint);
    }
    
    const skipBtn = document.getElementById('skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', nextPuzzle);
    }
  }
  
  function checkAnswer(e) {
    const selected = e.target.dataset.value || e.target.parentElement.dataset.value;
    const feedback = document.getElementById('coding-feedback');
    
    if (selected === currentPuzzle.answer) {
      score++;
      feedback.innerHTML = '<span class="correct">✓ Correct! Well done!</span>';
      e.target.classList.add('correct');
      
      // Show completed code
      const codeBlock = document.querySelector('#coding-game .code-block');
      if (codeBlock) {
        codeBlock.innerHTML = currentPuzzle.code.replace('???', 
          `<span class="answer">${currentPuzzle.answer}</span>`);
      }
      
      // Auto-progress after 2 seconds
      setTimeout(nextPuzzle, 2000);
    } else {
      feedback.innerHTML = '<span class="incorrect">✗ Not quite, try again!</span>';
      e.target.classList.add('incorrect');
      e.target.disabled = true;
    }
    
    // Track progress
    window.trackProgress && window.trackProgress('coding', score, currentIndex + 1);
  }
  
  function showHint() {
    const feedback = document.getElementById('coding-feedback');
    feedback.innerHTML = `<span class="hint">💡 ${currentPuzzle.hint}</span>`;
    hintsUsed++;
    
    // Update stats
    const statsContainer = document.querySelector('#coding-game .game-stats');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <span>Puzzle: ${currentIndex + 1}/${puzzles.length}</span>
        <span>Score: ${score}</span>
        <span>Hints Used: ${hintsUsed}</span>
      `;
    }
  }
  
  function nextPuzzle() {
    currentIndex++;
    
    if (currentIndex >= puzzles.length) {
      // Game complete
      const gameContainer = document.getElementById('coding-game');
      gameContainer.innerHTML = `
        <div class="game-complete">
          <h2>🎉 All Puzzles Complete!</h2>
          <div class="final-stats">
            <p>Final Score: ${score}/${puzzles.length}</p>
            <p>Hints Used: ${hintsUsed}</p>
            <p>Accuracy: ${Math.round((score / puzzles.length) * 100)}%</p>
          </div>
          <button id="restart-coding-btn" class="game-btn">Play Again</button>
        </div>
      `;
      
      document.getElementById('restart-coding-btn').addEventListener('click', () => {
        currentIndex = 0;
        score = 0;
        hintsUsed = 0;
        renderGame();
      });
      
      // Track completion
      window.trackProgress && window.trackProgress('coding', score, puzzles.length, true);
    } else {
      renderGame();
    }
  }
  
  // Initialize when tab is shown
  window.initCodingGame = renderGame;
})();

// Math Quiz Game Module
(function() {
  'use strict';
  
  let currentQuestion = null;
  let score = 0;
  let questionsAnswered = 0;
  let difficulty = 1;
  
  function generateQuestion() {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let a, b, answer;
    
    switch(difficulty) {
      case 1: // Easy
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        break;
      case 2: // Medium
        a = Math.floor(Math.random() * 50) + 1;
        b = Math.floor(Math.random() * 20) + 1;
        break;
      case 3: // Hard
        a = Math.floor(Math.random() * 100) + 1;
        b = Math.floor(Math.random() * 50) + 1;
        break;
    }
    
    switch(operation) {
      case '+':
        answer = a + b;
        break;
      case '-':
        answer = a - b;
        break;
      case '*':
        answer = a * b;
        break;
    }
    
    return {
      question: `${a} ${operation} ${b}`,
      answer: answer,
      options: generateOptions(answer)
    };
  }
  
  function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    while (options.length < 4) {
      const variation = Math.floor(Math.random() * 20) - 10;
      const option = correctAnswer + variation;
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    return shuffleArray(options);
  }
  
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  function renderGame() {
    const gameContainer = document.getElementById('math-game');
    if (!gameContainer) return;
    
    currentQuestion = generateQuestion();
    
    gameContainer.innerHTML = `
      <div class="game-stats">
        <span>Score: ${score}</span>
        <span>Questions: ${questionsAnswered}</span>
        <span>Level: ${difficulty}</span>
      </div>
      <div class="question-container">
        <h3 class="question">${currentQuestion.question} = ?</h3>
        <div class="options-grid">
          ${currentQuestion.options.map((opt, idx) => 
            `<button class="option-btn" data-value="${opt}">${opt}</button>`
          ).join('')}
        </div>
        <div class="feedback" id="math-feedback"></div>
      </div>
      <div class="game-controls">
        <button id="math-difficulty-btn">Change Difficulty</button>
        <button id="math-new-btn">New Question</button>
      </div>
    `;
    
    attachEventListeners();
  }
  
  function attachEventListeners() {
    const optionBtns = document.querySelectorAll('#math-game .option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', checkAnswer);
    });
    
    const diffBtn = document.getElementById('math-difficulty-btn');
    if (diffBtn) {
      diffBtn.addEventListener('click', changeDifficulty);
    }
    
    const newBtn = document.getElementById('math-new-btn');
    if (newBtn) {
      newBtn.addEventListener('click', renderGame);
    }
  }
  
  function checkAnswer(e) {
    const selected = parseInt(e.target.dataset.value);
    const feedback = document.getElementById('math-feedback');
    questionsAnswered++;
    
    if (selected === currentQuestion.answer) {
      score++;
      feedback.innerHTML = '<span class="correct">✓ Correct!</span>';
      e.target.classList.add('correct');
      
      // Auto-progress after success
      setTimeout(renderGame, 1500);
    } else {
      feedback.innerHTML = `<span class="incorrect">✗ Try again! The answer is ${currentQuestion.answer}</span>`;
      e.target.classList.add('incorrect');
    }
    
    // Disable all buttons after answer
    document.querySelectorAll('#math-game .option-btn').forEach(btn => {
      btn.disabled = true;
    });
    
    // Track progress
    window.trackProgress && window.trackProgress('math', score, questionsAnswered);
  }
  
  function changeDifficulty() {
    difficulty = difficulty >= 3 ? 1 : difficulty + 1;
    const levels = ['Easy', 'Medium', 'Hard'];
    alert(`Difficulty changed to: ${levels[difficulty - 1]}`);
    renderGame();
  }
  
  // Initialize when tab is shown
  window.initMathGame = renderGame;
})();

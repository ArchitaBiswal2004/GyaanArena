// Advanced Math Games Module - Quadratic Equations, Fractions, Geometry, Algebra
(function() {
  'use strict';
  
  let currentGame = 'quadratic';
  let currentQuestion = null;
  let score = 0;
  let questionsAnswered = 0;
  let difficulty = 1;
  
  // Quadratic Equation Generator
  function generateQuadraticQuestion() {
    let a, b, c, discriminant, solutions;
    
    switch(difficulty) {
      case 1: // Easy - perfect squares
        a = 1;
        const root = Math.floor(Math.random() * 5) + 1;
        b = -2 * root;
        c = root * root;
        solutions = [root];
        break;
        
      case 2: // Medium - factorizable
        a = 1;
        const root1 = Math.floor(Math.random() * 5) + 1;
        const root2 = Math.floor(Math.random() * 5) + 1;
        b = -(root1 + root2);
        c = root1 * root2;
        solutions = [root1, root2].sort((x, y) => x - y);
        break;
        
      case 3: // Hard - quadratic formula needed
        a = Math.floor(Math.random() * 3) + 1;
        b = Math.floor(Math.random() * 10) - 5;
        c = Math.floor(Math.random() * 10) - 5;
        discriminant = b * b - 4 * a * c;
        
        if (discriminant >= 0) {
          const sqrtDisc = Math.sqrt(discriminant);
          const sol1 = (-b + sqrtDisc) / (2 * a);
          const sol2 = (-b - sqrtDisc) / (2 * a);
          solutions = [Math.round(sol1 * 100) / 100, Math.round(sol2 * 100) / 100].sort((x, y) => x - y);
        } else {
          solutions = ['No real solutions'];
        }
        break;
    }
    
    const equation = `${a === 1 ? '' : a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0`;
    
    return {
      question: `Solve: ${equation}`,
      answer: solutions,
      type: 'quadratic',
      options: generateQuadraticOptions(solutions)
    };
  }
  
  // Fraction Question Generator
  function generateFractionQuestion() {
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, den1, num2, den2, answerNum, answerDen;
    
    switch(difficulty) {
      case 1: // Easy - same denominators or simple
        den1 = Math.floor(Math.random() * 5) + 2;
        den2 = den1;
        num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
        num2 = Math.floor(Math.random() * (den2 - 1)) + 1;
        break;
        
      case 2: // Medium - different denominators
        den1 = Math.floor(Math.random() * 6) + 2;
        den2 = Math.floor(Math.random() * 6) + 2;
        num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
        num2 = Math.floor(Math.random() * (den2 - 1)) + 1;
        break;
        
      case 3: // Hard - mixed numbers
        den1 = Math.floor(Math.random() * 8) + 2;
        den2 = Math.floor(Math.random() * 8) + 2;
        num1 = Math.floor(Math.random() * (den1 * 2)) + 1;
        num2 = Math.floor(Math.random() * (den2 * 2)) + 1;
        break;
    }
    
    // Calculate answer based on operation
    switch(operation) {
      case '+':
        answerNum = num1 * den2 + num2 * den1;
        answerDen = den1 * den2;
        break;
      case '-':
        answerNum = num1 * den2 - num2 * den1;
        answerDen = den1 * den2;
        break;
      case '*':
        answerNum = num1 * num2;
        answerDen = den1 * den2;
        break;
      case '/':
        answerNum = num1 * den2;
        answerDen = den1 * num2;
        break;
    }
    
    // Simplify fraction
    const gcd = findGCD(Math.abs(answerNum), answerDen);
    answerNum = answerNum / gcd;
    answerDen = answerDen / gcd;
    
    const questionText = `${num1}/${den1} ${operation} ${num2}/${den2}`;
    const answerText = answerDen === 1 ? `${answerNum}` : `${answerNum}/${answerDen}`;
    
    return {
      question: questionText,
      answer: answerText,
      type: 'fraction',
      options: generateFractionOptions(answerNum, answerDen)
    };
  }
  
  // Geometry Question Generator
  function generateGeometryQuestion() {
    const shapes = ['triangle', 'rectangle', 'circle', 'square'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const problemType = Math.random() > 0.5 ? 'area' : 'perimeter';
    
    let question, answer;
    
    switch(shape) {
      case 'triangle':
        const base = Math.floor(Math.random() * 10) + 3;
        const height = Math.floor(Math.random() * 10) + 3;
        const side1 = base;
        const side2 = Math.floor(Math.random() * 8) + 5;
        const side3 = Math.floor(Math.random() * 8) + 5;
        
        if (problemType === 'area') {
          question = `Find the area of a triangle with base ${base} units and height ${height} units`;
          answer = (base * height) / 2;
        } else {
          question = `Find the perimeter of a triangle with sides ${side1}, ${side2}, and ${side3} units`;
          answer = side1 + side2 + side3;
        }
        break;
        
      case 'rectangle':
        const length = Math.floor(Math.random() * 15) + 5;
        const width = Math.floor(Math.random() * 10) + 3;
        
        if (problemType === 'area') {
          question = `Find the area of a rectangle with length ${length} units and width ${width} units`;
          answer = length * width;
        } else {
          question = `Find the perimeter of a rectangle with length ${length} units and width ${width} units`;
          answer = 2 * (length + width);
        }
        break;
        
      case 'circle':
        const radius = Math.floor(Math.random() * 10) + 2;
        
        if (problemType === 'area') {
          question = `Find the area of a circle with radius ${radius} units (use π = 3.14)`;
          answer = Math.round(3.14 * radius * radius * 100) / 100;
        } else {
          question = `Find the circumference of a circle with radius ${radius} units (use π = 3.14)`;
          answer = Math.round(2 * 3.14 * radius * 100) / 100;
        }
        break;
        
      case 'square':
        const side = Math.floor(Math.random() * 12) + 3;
        
        if (problemType === 'area') {
          question = `Find the area of a square with side ${side} units`;
          answer = side * side;
        } else {
          question = `Find the perimeter of a square with side ${side} units`;
          answer = 4 * side;
        }
        break;
    }
    
    return {
      question: question,
      answer: answer,
      type: 'geometry',
      options: generateNumericOptions(answer)
    };
  }
  
  // Algebra Question Generator
  function generateAlgebraQuestion() {
    let question, answer;
    
    switch(difficulty) {
      case 1: // Simple linear equations
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        question = `Solve for x: ${a}x + ${b} = ${a * 5 + b}`;
        answer = 5;
        break;
        
      case 2: // Two-step equations
        const c = Math.floor(Math.random() * 5) + 2;
        const d = Math.floor(Math.random() * 10) + 1;
        const e = Math.floor(Math.random() * 10) + 1;
        const result = c * 3 + d - e;
        question = `Solve for x: ${c}x + ${d} - ${e} = ${result}`;
        answer = 3;
        break;
        
      case 3: // Systems or complex equations
        const f = Math.floor(Math.random() * 3) + 1;
        const g = Math.floor(Math.random() * 3) + 1;
        const h = Math.floor(Math.random() * 10) + 1;
        const solution = 4;
        const total = f * solution + g * solution;
        question = `Solve: ${f}x + ${g}x = ${total}`;
        answer = solution;
        break;
    }
    
    return {
      question: question,
      answer: answer,
      type: 'algebra',
      options: generateNumericOptions(answer)
    };
  }
  
  // Helper function to find GCD
  function findGCD(a, b) {
    return b === 0 ? a : findGCD(b, a % b);
  }
  
  // Generate options for quadratic equations
  function generateQuadraticOptions(correct) {
    if (correct[0] === 'No real solutions') {
      return ['No real solutions', 'x = 0', 'x = 1', 'x = -1'];
    }
    
    const options = [correct.join(', ')];
    while (options.length < 4) {
      const variation = Math.floor(Math.random() * 10) - 5;
      const fakeAnswer = correct.map(x => x + variation).join(', ');
      if (!options.includes(fakeAnswer)) {
        options.push(fakeAnswer);
      }
    }
    return shuffleArray(options);
  }
  
  // Generate options for fractions
  function generateFractionOptions(correctNum, correctDen) {
    const correctAnswer = correctDen === 1 ? `${correctNum}` : `${correctNum}/${correctDen}`;
    const options = [correctAnswer];
    
    while (options.length < 4) {
      const varNum = correctNum + Math.floor(Math.random() * 5) - 2;
      const varDen = correctDen + Math.floor(Math.random() * 3) - 1;
      const option = varDen === 1 ? `${varNum}` : `${varNum}/${Math.max(1, varDen)}`;
      
      if (!options.includes(option) && varNum !== 0) {
        options.push(option);
      }
    }
    
    return shuffleArray(options);
  }
  
  // Generate numeric options
  function generateNumericOptions(correct) {
    const options = [correct];
    const range = Math.max(10, Math.abs(correct) * 0.5);
    
    while (options.length < 4) {
      const variation = (Math.random() * range * 2) - range;
      const option = Math.round((correct + variation) * 100) / 100;
      
      if (!options.includes(option) && option > 0) {
        options.push(option);
      }
    }
    
    return shuffleArray(options);
  }
  
  // Shuffle array
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  // Render the game based on selected type
  function renderGame(gameType) {
    currentGame = gameType || currentGame;
    const gameContainer = document.getElementById('math-game');
    if (!gameContainer) return;
    
    // Generate question based on game type
    switch(currentGame) {
      case 'quadratic':
        currentQuestion = generateQuadraticQuestion();
        break;
      case 'fractions':
        currentQuestion = generateFractionQuestion();
        break;
      case 'geometry':
        currentQuestion = generateGeometryQuestion();
        break;
      case 'algebra':
        currentQuestion = generateAlgebraQuestion();
        break;
      default:
        currentQuestion = generateQuadraticQuestion();
    }
    
    gameContainer.innerHTML = `
      <div class="game-stats">
        <span>Score: ${score}</span>
        <span>Questions: ${questionsAnswered}</span>
        <span>Level: ${difficulty}</span>
        <span>Type: ${currentGame}</span>
      </div>
      <div class="question-container">
        <h3 class="question">${currentQuestion.question}</h3>
        <div class="options-grid">
          ${currentQuestion.options.map(opt => 
            `<button class="option-btn" data-value="${opt}" aria-label="Select ${opt}">${opt}</button>`
          ).join('')}
        </div>
        <div class="feedback" id="math-feedback" role="alert"></div>
      </div>
      <div class="game-controls">
        <button id="math-difficulty-btn" aria-label="Change difficulty level">Change Difficulty</button>
        <button id="math-new-btn" aria-label="Get new question">New Question</button>
        <button id="math-hint-btn" aria-label="Get a hint">Get Hint</button>
      </div>
    `;
    
    attachEventListeners();
  }
  
  // Attach event listeners
  function attachEventListeners() {
    // Option buttons
    document.querySelectorAll('#math-game .option-btn').forEach(btn => {
      btn.addEventListener('click', checkAnswer);
    });
    
    // Control buttons
    const diffBtn = document.getElementById('math-difficulty-btn');
    if (diffBtn) {
      diffBtn.addEventListener('click', changeDifficulty);
    }
    
    const newBtn = document.getElementById('math-new-btn');
    if (newBtn) {
      newBtn.addEventListener('click', () => renderGame(currentGame));
    }
    
    const hintBtn = document.getElementById('math-hint-btn');
    if (hintBtn) {
      hintBtn.addEventListener('click', showHint);
    }
    
    // Game selector buttons
    document.querySelectorAll('.game-selector .game-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const gameType = e.target.dataset.game;
        // Update active state
        document.querySelectorAll('.game-selector .game-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderGame(gameType);
      });
    });
  }
  
  // Check answer
  function checkAnswer(e) {
    const selected = e.target.dataset.value;
    const feedback = document.getElementById('math-feedback');
    questionsAnswered++;
    
    const correctAnswer = Array.isArray(currentQuestion.answer) 
      ? currentQuestion.answer.join(', ') 
      : currentQuestion.answer.toString();
    
    if (selected === correctAnswer) {
      score += difficulty * 10; // More points for harder questions
      feedback.innerHTML = '<span class="correct">✓ Excellent! That\'s correct!</span>';
      e.target.classList.add('correct');
      
      // Track achievement progress
      if (window.checkAchievements) {
        window.checkAchievements('math', score, currentGame);
      }
      
      // Auto-progress after success
      setTimeout(() => renderGame(currentGame), 2000);
    } else {
      feedback.innerHTML = `<span class="incorrect">✗ Not quite. The answer is ${correctAnswer}</span>`;
      e.target.classList.add('incorrect');
    }
    
    // Disable all buttons after answer
    document.querySelectorAll('#math-game .option-btn').forEach(btn => {
      btn.disabled = true;
    });
    
    // Track progress
    if (window.trackProgress) {
      window.trackProgress('math', score, questionsAnswered, true);
    }
    
    // Update leaderboard
    if (window.updateLeaderboard) {
      window.updateLeaderboard('math', score);
    }
  }
  
  // Show hint
  function showHint() {
    const feedback = document.getElementById('math-feedback');
    let hint = '';
    
    switch(currentQuestion.type) {
      case 'quadratic':
        hint = 'Try using the quadratic formula: x = (-b ± √(b²-4ac)) / 2a';
        break;
      case 'fraction':
        hint = 'Remember to find a common denominator when adding or subtracting fractions';
        break;
      case 'geometry':
        hint = 'Area formulas: Triangle = ½×base×height, Rectangle = length×width, Circle = πr²';
        break;
      case 'algebra':
        hint = 'Isolate the variable by performing the same operation on both sides';
        break;
    }
    
    feedback.innerHTML = `<span class="hint">💡 Hint: ${hint}</span>`;
  }
  
  // Change difficulty
  function changeDifficulty() {
    difficulty = difficulty >= 3 ? 1 : difficulty + 1;
    const levels = ['Easy', 'Medium', 'Hard'];
    alert(`Difficulty changed to: ${levels[difficulty - 1]}`);
    renderGame(currentGame);
  }
  
  // Public API
  window.initAdvancedMath = function(gameType) {
    renderGame(gameType || 'quadratic');
  };
  
  // Also hook into the main math game initializer
  const originalInitMath = window.initMathGame;
  window.initMathGame = function() {
    // Check if a specific game is selected
    const activeGameBtn = document.querySelector('.game-selector .game-btn.active');
    if (activeGameBtn) {
      renderGame(activeGameBtn.dataset.game);
    } else {
      renderGame('quadratic'); // Default to quadratic
    }
  };
})();

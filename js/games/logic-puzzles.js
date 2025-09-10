// Logic Puzzle Games Module - Pattern Recognition and Problem Solving
(function() {
  'use strict';
  
  // Logic puzzle data for different subjects
  const logicPuzzles = {
    math: {
      title: 'Math Logic Puzzles',
      patterns: [
        {
          sequence: [2, 4, 8, 16, '?'],
          answer: 32,
          hint: 'Each number is doubled',
          type: 'multiplication'
        },
        {
          sequence: [1, 1, 2, 3, 5, '?'],
          answer: 8,
          hint: 'Fibonacci sequence',
          type: 'fibonacci'
        },
        {
          sequence: [3, 6, 9, 12, '?'],
          answer: 15,
          hint: 'Add 3 each time',
          type: 'addition'
        },
        {
          sequence: [100, 90, 81, 73, '?'],
          answer: 66,
          hint: 'Subtract decreasing amounts',
          type: 'subtraction'
        },
        {
          sequence: [1, 4, 9, 16, '?'],
          answer: 25,
          hint: 'Perfect squares',
          type: 'squares'
        }
      ],
      sudoku: {
        easy: [
          [5,3,0,0,7,0,0,0,0],
          [6,0,0,1,9,5,0,0,0],
          [0,9,8,0,0,0,0,6,0],
          [8,0,0,0,6,0,0,0,3],
          [4,0,0,8,0,3,0,0,1],
          [7,0,0,0,2,0,0,0,6],
          [0,6,0,0,0,0,2,8,0],
          [0,0,0,4,1,9,0,0,5],
          [0,0,0,0,8,0,0,7,9]
        ]
      },
      logic: [
        {
          question: 'If all roses are flowers and some flowers fade quickly, can we conclude that some roses fade quickly?',
          options: ['Yes', 'No', 'Maybe', 'Not enough information'],
          answer: 'No',
          explanation: 'We cannot make this conclusion. While all roses are flowers, we only know that SOME flowers fade quickly, not which ones.'
        },
        {
          question: 'A train travels 60 miles in 1 hour. How far will it travel in 3.5 hours at the same speed?',
          options: ['180 miles', '210 miles', '200 miles', '240 miles'],
          answer: '210 miles',
          explanation: '60 miles/hour × 3.5 hours = 210 miles'
        }
      ]
    },
    science: {
      title: 'Science Logic Puzzles',
      patterns: [
        {
          sequence: ['H', 'He', 'Li', 'Be', '?'],
          answer: 'B',
          hint: 'Periodic table order',
          type: 'elements'
        },
        {
          sequence: ['Solid', 'Liquid', 'Gas', '?'],
          answer: 'Plasma',
          hint: 'States of matter',
          type: 'states'
        },
        {
          sequence: [0, 100, 37, '?'],
          answer: 98.6,
          hint: 'Temperature scales (C to F)',
          type: 'temperature'
        },
        {
          sequence: ['Red', 'Orange', 'Yellow', 'Green', '?'],
          answer: 'Blue',
          hint: 'Visible light spectrum',
          type: 'spectrum'
        },
        {
          sequence: [1, 8, 27, 64, '?'],
          answer: 125,
          hint: 'Cubes of natural numbers',
          type: 'cubes'
        }
      ],
      classification: [
        {
          items: ['Mercury', 'Venus', 'Earth', 'Mars', 'Pluto'],
          oddOne: 'Pluto',
          reason: 'Pluto is a dwarf planet, others are planets'
        },
        {
          items: ['Photosynthesis', 'Respiration', 'Digestion', 'Evaporation', 'Metabolism'],
          oddOne: 'Evaporation',
          reason: 'Evaporation is a physical process, others are biological'
        }
      ],
      logic: [
        {
          question: 'If water boils at 100°C at sea level, what happens at higher altitudes?',
          options: ['Boils at higher temperature', 'Boils at lower temperature', 'No change', 'Freezes instead'],
          answer: 'Boils at lower temperature',
          explanation: 'At higher altitudes, atmospheric pressure is lower, so water boils at a lower temperature.'
        },
        {
          question: 'A chemical reaction releases heat. This reaction is:',
          options: ['Endothermic', 'Exothermic', 'Isothermic', 'Neutral'],
          answer: 'Exothermic',
          explanation: 'Exothermic reactions release heat to the surroundings.'
        }
      ]
    },
    coding: {
      title: 'Coding Logic Puzzles',
      patterns: [
        {
          sequence: [1, 2, 4, 8, 16, '?'],
          answer: 32,
          hint: 'Powers of 2 (binary)',
          type: 'binary'
        },
        {
          sequence: [0, 1, 1, 0, '?'],
          answer: 1,
          hint: 'XOR operation pattern',
          type: 'boolean'
        },
        {
          sequence: ['if', 'else if', '?'],
          answer: 'else',
          hint: 'Conditional statement flow',
          type: 'control'
        },
        {
          sequence: ['{', '[', '(', ')', ']', '?'],
          answer: '}',
          hint: 'Bracket matching',
          type: 'syntax'
        },
        {
          sequence: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', '?'],
          answer: 'O(n²)',
          hint: 'Algorithm complexity order',
          type: 'complexity'
        }
      ],
      debugging: [
        {
          code: 'for (i = 0; i < 10; i++) { console.log(i) }',
          error: 'Missing variable declaration',
          fix: 'for (let i = 0; i < 10; i++) { console.log(i) }'
        },
        {
          code: 'if (x = 5) { return true; }',
          error: 'Assignment instead of comparison',
          fix: 'if (x == 5) { return true; }' 
        }
      ],
      logic: [
        {
          question: 'What is the time complexity of binary search?',
          options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
          answer: 'O(log n)',
          explanation: 'Binary search divides the search space in half each iteration.'
        },
        {
          question: 'Which data structure uses LIFO (Last In First Out)?',
          options: ['Queue', 'Stack', 'Array', 'Tree'],
          answer: 'Stack',
          explanation: 'Stack follows LIFO principle - last element added is first removed.'
        }
      ]
    }
  };
  
  let currentSubject = 'math';
  let currentPuzzleType = 'patterns';
  let currentPuzzleIndex = 0;
  let score = 0;
  let startTime = null;
  let sudokuGrid = [];
  let sudokuSolution = [];
  
  function initLogicPuzzle(subject, puzzleType) {
    currentSubject = subject || 'math';
    currentPuzzleType = puzzleType || 'patterns';
    currentPuzzleIndex = 0;
    score = 0;
    startTime = Date.now();
    
    const puzzleData = logicPuzzles[currentSubject];
    if (!puzzleData) {
      console.error('Invalid subject for logic puzzle');
      return;
    }
    
    if (currentPuzzleType === 'patterns') {
      renderPatternPuzzle();
    } else if (currentPuzzleType === 'sudoku') {
      initSudoku();
    } else if (currentPuzzleType === 'logic') {
      renderLogicPuzzle();
    } else if (currentPuzzleType === 'classification' && puzzleData.classification) {
      renderClassificationPuzzle();
    } else if (currentPuzzleType === 'debugging' && puzzleData.debugging) {
      renderDebuggingPuzzle();
    }
  }
  
  function renderPatternPuzzle() {
    const container = document.getElementById(`${currentSubject}-game`);
    if (!container) return;
    
    const puzzleData = logicPuzzles[currentSubject];
    const pattern = puzzleData.patterns[currentPuzzleIndex];
    
    container.innerHTML = `
      <div class="logic-puzzle-game">
        <div class="puzzle-header">
          <h3>${puzzleData.title} - Pattern Recognition</h3>
          <div class="puzzle-type-selector">
            <button class="ptype-btn ${currentPuzzleType === 'patterns' ? 'active' : ''}" data-ptype="patterns">Patterns</button>
            ${puzzleData.sudoku ? `<button class="ptype-btn ${currentPuzzleType === 'sudoku' ? 'active' : ''}" data-ptype="sudoku">Sudoku</button>` : ''}
            <button class="ptype-btn ${currentPuzzleType === 'logic' ? 'active' : ''}" data-ptype="logic">Logic</button>
            ${puzzleData.classification ? `<button class="ptype-btn ${currentPuzzleType === 'classification' ? 'active' : ''}" data-ptype="classification">Classification</button>` : ''}
            ${puzzleData.debugging ? `<button class="ptype-btn ${currentPuzzleType === 'debugging' ? 'active' : ''}" data-ptype="debugging">Debug</button>` : ''}
          </div>
          <div class="puzzle-stats">
            <span>Puzzle ${currentPuzzleIndex + 1}/${puzzleData.patterns.length}</span>
            <span>Score: ${score}</span>
          </div>
        </div>
        
        <div class="pattern-content">
          <h4>Find the next in the sequence:</h4>
          <div class="pattern-sequence">
            ${pattern.sequence.map((item, i) => 
              item === '?' 
                ? `<div class="sequence-item unknown">?</div>`
                : `<div class="sequence-item">${item}</div>`
            ).join('<div class="sequence-arrow">→</div>')}
          </div>
          
          <div class="hint-box">
            <button id="show-hint">💡 Show Hint (-5 points)</button>
            <p id="hint-text" style="display:none;">${pattern.hint}</p>
          </div>
          
          <div class="answer-section">
            <input type="text" id="patternAnswer" placeholder="Enter your answer">
            <button id="checkPattern">Check Answer</button>
          </div>
          
          <div class="pattern-feedback" id="patternFeedback"></div>
        </div>
        
        <div class="puzzle-controls">
          <button id="skip-puzzle">Skip →</button>
        </div>
      </div>
    `;
    
    attachPatternListeners();
  }
  
  function initSudoku() {
    const puzzleData = logicPuzzles[currentSubject].sudoku;
    if (!puzzleData) return;
    
    // Clone the puzzle
    sudokuGrid = puzzleData.easy.map(row => [...row]);
    sudokuSolution = solveSudoku(puzzleData.easy.map(row => [...row]));
    
    renderSudoku();
  }
  
  function renderSudoku() {
    const container = document.getElementById(`${currentSubject}-game`);
    if (!container) return;
    
    const puzzleData = logicPuzzles[currentSubject];
    
    container.innerHTML = `
      <div class="sudoku-game">
        <div class="puzzle-header">
          <h3>${puzzleData.title} - Mini Sudoku</h3>
          <div class="puzzle-type-selector">
            <button class="ptype-btn ${currentPuzzleType === 'patterns' ? 'active' : ''}" data-ptype="patterns">Patterns</button>
            <button class="ptype-btn ${currentPuzzleType === 'sudoku' ? 'active' : ''}" data-ptype="sudoku">Sudoku</button>
            <button class="ptype-btn ${currentPuzzleType === 'logic' ? 'active' : ''}" data-ptype="logic">Logic</button>
          </div>
          <div class="sudoku-stats">
            <span>Score: ${score}</span>
            <button id="check-sudoku">Check Solution</button>
          </div>
        </div>
        
        <div class="sudoku-grid">
          ${sudokuGrid.map((row, i) => 
            `<div class="sudoku-row">
              ${row.map((cell, j) => 
                `<input type="text" 
                  class="sudoku-cell ${cell !== 0 ? 'fixed' : ''}" 
                  data-row="${i}" 
                  data-col="${j}"
                  value="${cell !== 0 ? cell : ''}"
                  ${cell !== 0 ? 'readonly' : ''}
                  maxlength="1"
                  pattern="[1-9]">`
              ).join('')}
            </div>`
          ).join('')}
        </div>
        
        <div class="sudoku-controls">
          <button id="hint-sudoku">Hint (-10 points)</button>
          <button id="clear-sudoku">Clear</button>
          <button id="new-sudoku">New Puzzle</button>
        </div>
        
        <div class="sudoku-feedback" id="sudokuFeedback"></div>
      </div>
    `;
    
    attachSudokuListeners();
  }
  
  function renderLogicPuzzle() {
    const container = document.getElementById(`${currentSubject}-game`);
    if (!container) return;
    
    const puzzleData = logicPuzzles[currentSubject];
    const logic = puzzleData.logic[currentPuzzleIndex];
    
    container.innerHTML = `
      <div class="logic-question-game">
        <div class="puzzle-header">
          <h3>${puzzleData.title} - Logic Questions</h3>
          <div class="puzzle-type-selector">
            <button class="ptype-btn ${currentPuzzleType === 'patterns' ? 'active' : ''}" data-ptype="patterns">Patterns</button>
            ${puzzleData.sudoku ? `<button class="ptype-btn ${currentPuzzleType === 'sudoku' ? 'active' : ''}" data-ptype="sudoku">Sudoku</button>` : ''}
            <button class="ptype-btn ${currentPuzzleType === 'logic' ? 'active' : ''}" data-ptype="logic">Logic</button>
            ${puzzleData.classification ? `<button class="ptype-btn ${currentPuzzleType === 'classification' ? 'active' : ''}" data-ptype="classification">Classification</button>` : ''}
            ${puzzleData.debugging ? `<button class="ptype-btn ${currentPuzzleType === 'debugging' ? 'active' : ''}" data-ptype="debugging">Debug</button>` : ''}
          </div>
          <div class="logic-progress">
            Question ${currentPuzzleIndex + 1}/${puzzleData.logic.length}
            <span>Score: ${score}</span>
          </div>
        </div>
        
        <div class="logic-content">
          <div class="question-box">
            <p>${logic.question}</p>
          </div>
          
          <div class="options-grid">
            ${logic.options.map(option => 
              `<button class="logic-option" data-answer="${option}">${option}</button>`
            ).join('')}
          </div>
          
          <div class="explanation-box" id="explanationBox" style="display:none;">
            <h4>Explanation:</h4>
            <p>${logic.explanation}</p>
          </div>
        </div>
        
        <div class="logic-feedback" id="logicFeedback"></div>
        
        <div class="logic-controls">
          <button id="skip-logic">Skip →</button>
        </div>
      </div>
    `;
    
    attachLogicListeners();
  }
  
  function renderClassificationPuzzle() {
    const container = document.getElementById(`${currentSubject}-game`);
    if (!container) return;
    
    const puzzleData = logicPuzzles[currentSubject];
    const classification = puzzleData.classification[currentPuzzleIndex];
    
    container.innerHTML = `
      <div class="classification-game">
        <div class="puzzle-header">
          <h3>${puzzleData.title} - Classification</h3>
          <div class="puzzle-type-selector">
            <button class="ptype-btn ${currentPuzzleType === 'patterns' ? 'active' : ''}" data-ptype="patterns">Patterns</button>
            <button class="ptype-btn ${currentPuzzleType === 'classification' ? 'active' : ''}" data-ptype="classification">Classification</button>
            <button class="ptype-btn ${currentPuzzleType === 'logic' ? 'active' : ''}" data-ptype="logic">Logic</button>
          </div>
          <div class="class-progress">
            Puzzle ${currentPuzzleIndex + 1}/${puzzleData.classification.length}
            <span>Score: ${score}</span>
          </div>
        </div>
        
        <div class="classification-content">
          <h4>Which one doesn't belong?</h4>
          <div class="items-grid">
            ${classification.items.map(item => 
              `<button class="class-item" data-item="${item}">${item}</button>`
            ).join('')}
          </div>
          
          <div class="reason-box" id="reasonBox" style="display:none;">
            <h4>Reason:</h4>
            <p>${classification.reason}</p>
          </div>
        </div>
        
        <div class="class-feedback" id="classFeedback"></div>
        
        <div class="class-controls">
          <button id="skip-class">Skip →</button>
        </div>
      </div>
    `;
    
    attachClassificationListeners();
  }
  
  function renderDebuggingPuzzle() {
    const container = document.getElementById(`${currentSubject}-game`);
    if (!container) return;
    
    const puzzleData = logicPuzzles[currentSubject];
    const debug = puzzleData.debugging[currentPuzzleIndex];
    
    container.innerHTML = `
      <div class="debugging-game">
        <div class="puzzle-header">
          <h3>${puzzleData.title} - Debug the Code</h3>
          <div class="puzzle-type-selector">
            <button class="ptype-btn ${currentPuzzleType === 'patterns' ? 'active' : ''}" data-ptype="patterns">Patterns</button>
            <button class="ptype-btn ${currentPuzzleType === 'debugging' ? 'active' : ''}" data-ptype="debugging">Debug</button>
            <button class="ptype-btn ${currentPuzzleType === 'logic' ? 'active' : ''}" data-ptype="logic">Logic</button>
          </div>
          <div class="debug-progress">
            Problem ${currentPuzzleIndex + 1}/${puzzleData.debugging.length}
            <span>Score: ${score}</span>
          </div>
        </div>
        
        <div class="debug-content">
          <h4>Find and fix the error:</h4>
          <div class="code-block">
            <pre><code>${debug.code}</code></pre>
          </div>
          
          <div class="error-hint">
            <p>Error Type: <span id="errorType" style="display:none;">${debug.error}</span></p>
            <button id="show-error">Show Error Type (-5 points)</button>
          </div>
          
          <div class="fix-input">
            <label>Your fix:</label>
            <textarea id="debugFix" rows="3" placeholder="Enter the corrected code...">${debug.code}</textarea>
            <button id="checkDebug">Check Fix</button>
          </div>
          
          <div class="correct-solution" id="correctSolution" style="display:none;">
            <h4>Correct Solution:</h4>
            <pre><code>${debug.fix}</code></pre>
          </div>
        </div>
        
        <div class="debug-feedback" id="debugFeedback"></div>
        
        <div class="debug-controls">
          <button id="skip-debug">Skip →</button>
        </div>
      </div>
    `;
    
    attachDebuggingListeners();
  }
  
  function attachPatternListeners() {
    document.getElementById('checkPattern')?.addEventListener('click', checkPatternAnswer);
    document.getElementById('patternAnswer')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkPatternAnswer();
    });
    
    document.getElementById('show-hint')?.addEventListener('click', () => {
      document.getElementById('hint-text').style.display = 'block';
      score = Math.max(0, score - 5);
      updatePuzzleStats();
    });
    
    document.getElementById('skip-puzzle')?.addEventListener('click', nextPattern);
    
    // Puzzle type switcher
    document.querySelectorAll('.ptype-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.ptype;
        initLogicPuzzle(currentSubject, type);
      });
    });
  }
  
  function attachSudokuListeners() {
    document.querySelectorAll('.sudoku-cell:not(.fixed)').forEach(cell => {
      cell.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value && (isNaN(value) || value < 1 || value > 9)) {
          e.target.value = '';
        }
      });
    });
    
    document.getElementById('check-sudoku')?.addEventListener('click', checkSudokuSolution);
    document.getElementById('clear-sudoku')?.addEventListener('click', clearSudoku);
    document.getElementById('new-sudoku')?.addEventListener('click', () => initSudoku());
    
    document.getElementById('hint-sudoku')?.addEventListener('click', () => {
      // Find an empty cell and fill it
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
          if (cell && !cell.value && sudokuSolution[i][j]) {
            cell.value = sudokuSolution[i][j];
            cell.classList.add('hint');
            score = Math.max(0, score - 10);
            updatePuzzleStats();
            return;
          }
        }
      }
    });
    
    // Puzzle type switcher
    document.querySelectorAll('.ptype-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.ptype;
        initLogicPuzzle(currentSubject, type);
      });
    });
  }
  
  function attachLogicListeners() {
    document.querySelectorAll('.logic-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedAnswer = e.target.dataset.answer;
        const correctAnswer = logicPuzzles[currentSubject].logic[currentPuzzleIndex].answer;
        
        if (selectedAnswer === correctAnswer) {
          e.target.classList.add('correct');
          score += 20;
          showLogicFeedback('Correct! Well done!', 'success');
          document.getElementById('explanationBox').style.display = 'block';
          
          setTimeout(nextLogic, 3000);
        } else {
          e.target.classList.add('incorrect');
          score = Math.max(0, score - 5);
          showLogicFeedback('Try again!', 'error');
        }
        updatePuzzleStats();
      });
    });
    
    document.getElementById('skip-logic')?.addEventListener('click', nextLogic);
    
    // Puzzle type switcher
    document.querySelectorAll('.ptype-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.ptype;
        initLogicPuzzle(currentSubject, type);
      });
    });
  }
  
  function attachClassificationListeners() {
    document.querySelectorAll('.class-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selected = e.target.dataset.item;
        const correct = logicPuzzles[currentSubject].classification[currentPuzzleIndex].oddOne;
        
        if (selected === correct) {
          e.target.classList.add('correct');
          score += 15;
          showClassFeedback('Correct!', 'success');
          document.getElementById('reasonBox').style.display = 'block';
          
          setTimeout(nextClassification, 3000);
        } else {
          e.target.classList.add('incorrect');
          score = Math.max(0, score - 5);
          showClassFeedback('Try again!', 'error');
        }
        updatePuzzleStats();
      });
    });
    
    document.getElementById('skip-class')?.addEventListener('click', nextClassification);
    
    // Puzzle type switcher
    document.querySelectorAll('.ptype-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.ptype;
        initLogicPuzzle(currentSubject, type);
      });
    });
  }
  
  function attachDebuggingListeners() {
    document.getElementById('checkDebug')?.addEventListener('click', checkDebugFix);
    
    document.getElementById('show-error')?.addEventListener('click', () => {
      document.getElementById('errorType').style.display = 'inline';
      score = Math.max(0, score - 5);
      updatePuzzleStats();
    });
    
    document.getElementById('skip-debug')?.addEventListener('click', nextDebug);
    
    // Puzzle type switcher
    document.querySelectorAll('.ptype-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.ptype;
        initLogicPuzzle(currentSubject, type);
      });
    });
  }
  
  function checkPatternAnswer() {
    const input = document.getElementById('patternAnswer');
    const answer = input.value.trim();
    const correct = logicPuzzles[currentSubject].patterns[currentPuzzleIndex].answer.toString();
    
    if (answer.toLowerCase() === correct.toLowerCase()) {
      score += 25;
      showPatternFeedback('Excellent! Pattern recognized!', 'success');
      setTimeout(nextPattern, 2000);
    } else {
      score = Math.max(0, score - 5);
      showPatternFeedback('Not quite. Try again!', 'error');
    }
    updatePuzzleStats();
  }
  
  function checkSudokuSolution() {
    let isCorrect = true;
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
        if (cell) {
          const value = parseInt(cell.value);
          if (value !== sudokuSolution[i][j]) {
            isCorrect = false;
            cell.classList.add('error');
          } else {
            cell.classList.remove('error');
          }
        }
      }
    }
    
    if (isCorrect) {
      score += 50;
      showSudokuFeedback('Perfect! Sudoku solved!', 'success');
    } else {
      showSudokuFeedback('Some cells are incorrect', 'error');
    }
    updatePuzzleStats();
  }
  
  function checkDebugFix() {
    const input = document.getElementById('debugFix');
    const fix = input.value.trim();
    const correct = logicPuzzles[currentSubject].debugging[currentPuzzleIndex].fix;
    
    // Simple comparison - in real app would parse and compare code structure
    if (fix.replace(/\s+/g, '') === correct.replace(/\s+/g, '')) {
      score += 30;
      showDebugFeedback('Perfect! Bug fixed!', 'success');
      document.getElementById('correctSolution').style.display = 'block';
      setTimeout(nextDebug, 3000);
    } else {
      score = Math.max(0, score - 5);
      showDebugFeedback('Not quite right. Check your syntax!', 'error');
    }
    updatePuzzleStats();
  }
  
  function clearSudoku() {
    document.querySelectorAll('.sudoku-cell:not(.fixed)').forEach(cell => {
      cell.value = '';
      cell.classList.remove('error', 'hint');
    });
  }
  
  function solveSudoku(board) {
    // Simple sudoku solver for the solution
    const solution = board.map(row => [...row]);
    
    function isValid(board, row, col, num) {
      // Check row
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
      }
      
      // Check column
      for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
      }
      
      // Check 3x3 box
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
          if (board[i][j] === num) return false;
        }
      }
      
      return true;
    }
    
    function solve(board) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (solve(board)) return true;
                board[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    }
    
    solve(solution);
    return solution;
  }
  
  function nextPattern() {
    currentPuzzleIndex++;
    if (currentPuzzleIndex < logicPuzzles[currentSubject].patterns.length) {
      renderPatternPuzzle();
    } else {
      showPuzzleComplete();
    }
  }
  
  function nextLogic() {
    currentPuzzleIndex++;
    if (currentPuzzleIndex < logicPuzzles[currentSubject].logic.length) {
      renderLogicPuzzle();
    } else {
      showPuzzleComplete();
    }
  }
  
  function nextClassification() {
    currentPuzzleIndex++;
    if (currentPuzzleIndex < logicPuzzles[currentSubject].classification.length) {
      renderClassificationPuzzle();
    } else {
      showPuzzleComplete();
    }
  }
  
  function nextDebug() {
    currentPuzzleIndex++;
    if (currentPuzzleIndex < logicPuzzles[currentSubject].debugging.length) {
      renderDebuggingPuzzle();
    } else {
      showPuzzleComplete();
    }
  }
  
  function updatePuzzleStats() {
    const statsElements = document.querySelectorAll('.puzzle-stats span, .sudoku-stats span, .logic-progress span, .class-progress span, .debug-progress span');
    statsElements.forEach(el => {
      if (el.textContent.includes('Score:')) {
        el.textContent = `Score: ${score}`;
      }
    });
  }
  
  function showPatternFeedback(message, type) {
    const feedback = document.getElementById('patternFeedback');
    if (feedback) {
      feedback.className = `pattern-feedback ${type}`;
      feedback.textContent = message;
    }
  }
  
  function showSudokuFeedback(message, type) {
    const feedback = document.getElementById('sudokuFeedback');
    if (feedback) {
      feedback.className = `sudoku-feedback ${type}`;
      feedback.textContent = message;
    }
  }
  
  function showLogicFeedback(message, type) {
    const feedback = document.getElementById('logicFeedback');
    if (feedback) {
      feedback.className = `logic-feedback ${type}`;
      feedback.textContent = message;
    }
  }
  
  function showClassFeedback(message, type) {
    const feedback = document.getElementById('classFeedback');
    if (feedback) {
      feedback.className = `class-feedback ${type}`;
      feedback.textContent = message;
    }
  }
  
  function showDebugFeedback(message, type) {
    const feedback = document.getElementById('debugFeedback');
    if (feedback) {
      feedback.className = `debug-feedback ${type}`;
      feedback.textContent = message;
    }
  }
  
  function showPuzzleComplete() {
    const container = document.getElementById(`${currentSubject}-game`);
    if (!container) return;
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    container.innerHTML = `
      <div class="puzzle-complete">
        <h2>🎉 All Puzzles Complete!</h2>
        <p>Time: ${minutes}:${seconds.toString().padStart(2, '0')}</p>
        <p>Final Score: ${score}</p>
        <button onclick="initLogicPuzzle('${currentSubject}', '${currentPuzzleType}')">Play Again</button>
      </div>
    `;
  }
  
  // Public API
  window.initLogicPuzzle = initLogicPuzzle;
})();

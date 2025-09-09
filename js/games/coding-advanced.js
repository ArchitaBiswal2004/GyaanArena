// Advanced Coding Games Module - Algorithms, Debugging, Data Structures
(function() {
  'use strict';
  
  let currentGame = 'algorithms';
  let score = 0;
  
  // Algorithm Challenge Questions
  function generateAlgorithmQuestion() {
    const questions = [
      {
        q: 'What is the time complexity of binary search?',
        a: 'O(log n)',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)']
      },
      {
        q: 'Which sorting algorithm has best case O(n)?',
        a: 'Bubble Sort',
        options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Heap Sort']
      },
      {
        q: 'Find the output: for(i=0; i<3; i++) { print(i*2) }',
        a: '0 2 4',
        options: ['0 2 4', '0 1 2', '2 4 6', '1 2 3']
      }
    ];
    
    return questions[Math.floor(Math.random() * questions.length)];
  }
  
  // Debugging Challenge
  function generateDebuggingQuestion() {
    const bugs = [
      {
        q: 'Fix the bug: if (x = 5) { return true; }',
        a: 'if (x == 5) { return true; }',
        options: [
          'if (x == 5) { return true; }',
          'if (x = 5) { return true; }',
          'if (x === 5) return true;',
          'if x == 5 { return true; }'
        ]
      },
      {
        q: 'Fix the infinite loop: while(i < 10) { console.log(i); }',
        a: 'while(i < 10) { console.log(i); i++; }',
        options: [
          'while(i < 10) { console.log(i); i++; }',
          'while(i <= 10) { console.log(i); }',
          'for(i < 10) { console.log(i); }',
          'while(i < 10) { console.log(i); break; }'
        ]
      }
    ];
    
    return bugs[Math.floor(Math.random() * bugs.length)];
  }
  
  // Data Structure Questions
  function generateDataStructureQuestion() {
    const questions = [
      {
        q: 'Which data structure uses LIFO principle?',
        a: 'Stack',
        options: ['Queue', 'Stack', 'Array', 'Tree']
      },
      {
        q: 'What is the average time to access an element in a hash table?',
        a: 'O(1)',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)']
      },
      {
        q: 'Which traversal visits root first in a binary tree?',
        a: 'Preorder',
        options: ['Inorder', 'Preorder', 'Postorder', 'Level order']
      }
    ];
    
    return questions[Math.floor(Math.random() * questions.length)];
  }
  
  // Pattern Recognition Questions
  function generatePatternQuestion() {
    const patterns = [
      {
        q: 'Complete the pattern: 1, 1, 2, 3, 5, ?',
        a: '8',
        options: ['6', '7', '8', '9']
      },
      {
        q: 'Next in series: 2, 4, 8, 16, ?',
        a: '32',
        options: ['24', '32', '20', '28']
      },
      {
        q: 'Pattern output: * ** *** ****. How many stars in line 5?',
        a: '5',
        options: ['4', '5', '6', '10']
      }
    ];
    
    return patterns[Math.floor(Math.random() * patterns.length)];
  }
  
  function renderGame(gameType) {
    currentGame = gameType || currentGame;
    const gameContainer = document.getElementById('coding-game');
    if (!gameContainer) return;
    
    let currentQuestion;
    switch(currentGame) {
      case 'algorithms':
        currentQuestion = generateAlgorithmQuestion();
        break;
      case 'debugging':
        currentQuestion = generateDebuggingQuestion();
        break;
      case 'datastructures':
        currentQuestion = generateDataStructureQuestion();
        break;
      case 'patterns':
        currentQuestion = generatePatternQuestion();
        break;
      default:
        currentQuestion = generateAlgorithmQuestion();
    }
    
    gameContainer.innerHTML = `
      <div class="game-stats">
        <span>Score: ${score}</span>
        <span>Topic: ${currentGame}</span>
      </div>
      <div class="question-container">
        <h3 class="question">${currentQuestion.q}</h3>
        <div class="options-grid">
          ${currentQuestion.options.map(opt => 
            `<button class="option-btn coding-opt" data-value="${opt}">
              <code>${opt}</code>
            </button>`
          ).join('')}
        </div>
        <div class="feedback" id="coding-feedback"></div>
      </div>
      <div class="game-controls">
        <button id="coding-new-btn">New Challenge</button>
      </div>
    `;
    
    attachEventListeners(currentQuestion);
  }
  
  function attachEventListeners(currentQuestion) {
    document.querySelectorAll('.coding-opt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selected = e.currentTarget.dataset.value;
        const feedback = document.getElementById('coding-feedback');
        
        if (selected === currentQuestion.a) {
          score += 10;
          feedback.innerHTML = '<span class="correct">✓ Excellent! That\'s correct!</span>';
          e.currentTarget.classList.add('correct');
          
          if (window.trackSubjectProgress) {
            window.trackSubjectProgress('coding', 1, 1);
          }
          
          setTimeout(() => renderGame(currentGame), 1500);
        } else {
          feedback.innerHTML = `<span class="incorrect">✗ The answer is: ${currentQuestion.a}</span>`;
          e.currentTarget.classList.add('incorrect');
        }
        
        document.querySelectorAll('.coding-opt').forEach(b => b.disabled = true);
      });
    });
    
    const newBtn = document.getElementById('coding-new-btn');
    if (newBtn) {
      newBtn.addEventListener('click', () => renderGame(currentGame));
    }
    
    // Game selector
    document.querySelectorAll('#coding .game-selector .game-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#coding .game-selector .game-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderGame(e.target.dataset.game);
      });
    });
  }
  
  // Hook into main coding game initializer
  window.initCodingGame = function() {
    const activeBtn = document.querySelector('#coding .game-selector .game-btn.active');
    renderGame(activeBtn ? activeBtn.dataset.game : 'algorithms');
  };
})();

// Advanced Science Games Module - Physics, Chemistry, Biology
(function() {
  'use strict';
  
  let currentGame = 'physics';
  let score = 0;
  
  // Physics Simulation Questions
  function generatePhysicsQuestion() {
    const topics = ['motion', 'force', 'energy', 'waves'];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    const questions = {
      motion: [
        { q: 'A car travels 120 km in 2 hours. What is its average speed?', a: '60 km/h' },
        { q: 'If velocity = 20 m/s and time = 5s, what is the distance?', a: '100 m' }
      ],
      force: [
        { q: 'Mass = 10kg, Acceleration = 5 m/s². What is the force?', a: '50 N' },
        { q: 'What is the weight of a 5kg object on Earth (g=10 m/s²)?', a: '50 N' }
      ],
      energy: [
        { q: 'What is the kinetic energy of a 2kg object moving at 10 m/s?', a: '100 J' },
        { q: 'Potential energy of 5kg at height 10m (g=10)?', a: '500 J' }
      ],
      waves: [
        { q: 'Wave speed = 340 m/s, frequency = 170 Hz. What is wavelength?', a: '2 m' },
        { q: 'Period of a wave with frequency 50 Hz?', a: '0.02 s' }
      ]
    };
    
    const selected = questions[topic][Math.floor(Math.random() * questions[topic].length)];
    return {
      question: selected.q,
      answer: selected.a,
      options: generateOptions(selected.a)
    };
  }
  
  // Chemistry Lab Questions
  function generateChemistryQuestion() {
    const questions = [
      { q: 'What is the pH of a neutral solution?', a: '7' },
      { q: 'How many protons are in Carbon-12?', a: '6' },
      { q: 'What is the chemical formula for water?', a: 'H₂O' },
      { q: 'How many electrons in a sodium ion (Na⁺)?', a: '10' }
    ];
    
    const selected = questions[Math.floor(Math.random() * questions.length)];
    return {
      question: selected.q,
      answer: selected.a,
      options: generateChemOptions(selected.a)
    };
  }
  
  // Biology Quiz Questions
  function generateBiologyQuestion() {
    const questions = [
      { q: 'What is the powerhouse of the cell?', a: 'Mitochondria' },
      { q: 'How many chambers does the human heart have?', a: '4' },
      { q: 'What process do plants use to make food?', a: 'Photosynthesis' },
      { q: 'What is the basic unit of life?', a: 'Cell' }
    ];
    
    const selected = questions[Math.floor(Math.random() * questions.length)];
    return {
      question: selected.q,
      answer: selected.a,
      options: generateBioOptions(selected.a)
    };
  }
  
  function generateOptions(correct) {
    const options = [correct];
    // Generate similar looking wrong answers
    if (correct.includes('km/h')) {
      options.push('40 km/h', '80 km/h', '100 km/h');
    } else if (correct.includes('m')) {
      options.push('50 m', '150 m', '200 m');
    } else if (correct.includes('N')) {
      options.push('25 N', '75 N', '100 N');
    } else if (correct.includes('J')) {
      options.push('50 J', '200 J', '150 J');
    } else {
      options.push('1', '5', '10');
    }
    return shuffleArray(options.slice(0, 4));
  }
  
  function generateChemOptions(correct) {
    const allOptions = ['7', '14', '0', '6', '8', '12', 'H₂O', 'CO₂', 'NaCl', 'O₂', '10', '11', '12', '9'];
    const options = [correct];
    while (options.length < 4) {
      const opt = allOptions[Math.floor(Math.random() * allOptions.length)];
      if (!options.includes(opt)) options.push(opt);
    }
    return shuffleArray(options);
  }
  
  function generateBioOptions(correct) {
    const allOptions = ['Mitochondria', 'Nucleus', 'Ribosome', 'Chloroplast', '4', '2', '3', '6', 
                        'Photosynthesis', 'Respiration', 'Digestion', 'Circulation', 'Cell', 'Tissue', 'Organ', 'Atom'];
    const options = [correct];
    while (options.length < 4) {
      const opt = allOptions[Math.floor(Math.random() * allOptions.length)];
      if (!options.includes(opt)) options.push(opt);
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
  
  function renderGame(gameType) {
    currentGame = gameType || currentGame;
    const gameContainer = document.getElementById('science-game');
    if (!gameContainer) return;
    
    let currentQuestion;
    switch(currentGame) {
      case 'physics':
        currentQuestion = generatePhysicsQuestion();
        break;
      case 'chemistry':
        currentQuestion = generateChemistryQuestion();
        break;
      case 'biology':
        currentQuestion = generateBiologyQuestion();
        break;
      default:
        currentQuestion = generatePhysicsQuestion();
    }
    
    gameContainer.innerHTML = `
      <div class="game-stats">
        <span>Score: ${score}</span>
        <span>Subject: ${currentGame}</span>
      </div>
      <div class="question-container">
        <h3 class="question">${currentQuestion.question}</h3>
        <div class="options-grid">
          ${currentQuestion.options.map(opt => 
            `<button class="option-btn science-opt" data-value="${opt}">${opt}</button>`
          ).join('')}
        </div>
        <div class="feedback" id="science-feedback"></div>
      </div>
      <div class="game-controls">
        <button id="science-new-btn">New Question</button>
      </div>
    `;
    
    attachEventListeners(currentQuestion);
  }
  
  function attachEventListeners(currentQuestion) {
    document.querySelectorAll('.science-opt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selected = e.target.dataset.value;
        const feedback = document.getElementById('science-feedback');
        
        if (selected === currentQuestion.answer) {
          score += 10;
          feedback.innerHTML = '<span class="correct">✓ Correct!</span>';
          e.target.classList.add('correct');
          
          if (window.trackSubjectProgress) {
            window.trackSubjectProgress('science', 1, 1);
          }
          
          setTimeout(() => renderGame(currentGame), 1500);
        } else {
          feedback.innerHTML = `<span class="incorrect">✗ The answer is ${currentQuestion.answer}</span>`;
          e.target.classList.add('incorrect');
        }
        
        document.querySelectorAll('.science-opt').forEach(b => b.disabled = true);
      });
    });
    
    const newBtn = document.getElementById('science-new-btn');
    if (newBtn) {
      newBtn.addEventListener('click', () => renderGame(currentGame));
    }
    
    // Game selector
    document.querySelectorAll('#science .game-selector .game-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#science .game-selector .game-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderGame(e.target.dataset.game);
      });
    });
  }
  
  // Hook into main science game initializer
  window.initScienceGame = function() {
    const activeBtn = document.querySelector('#science .game-selector .game-btn.active');
    renderGame(activeBtn ? activeBtn.dataset.game : 'physics');
  };
})();

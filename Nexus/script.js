const quotes = [
  "Stay focused and never give up.",
  "Deep work creates real value.",
  "Distraction is the enemy of progress.",
  "You are what you do, not what you say you'll do.",
  "One thing at a time.",
  "Great things are done by a series of small things brought together.",
  "Focus is the new IQ.",
  "You are making progress. Keep going. Every step counts.",
  "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
  "Focus on being productive instead of busy.",
  "Where focus goes, energy flows.",
  "The main thing is to keep the main thing the main thing.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Stay present, stay focused.",
  "Quality over quantity.",
  "Focus on the journey, not the destination.",
  "Small progress is still progress.",
  "Your focus determines your reality.",
  "The difference between ordinary and extraordinary is that little extra.",
  "Focus on what matters most.",
  "The power of concentration is the key to success.",
  "In the midst of chaos, find your focus.",
  "Your mind is like water. When it's agitated, it becomes difficult to see. But if you allow it to settle, the answer becomes clear.",
  "The successful warrior is the average man, with laser-like focus.",
  "Focus on the possibilities for success, not on the potential for failure.",
  "The more you focus on time, the more time seems to pass.",
  "Concentration is the secret of strength.",
  "The key to success is to focus our conscious mind on things we desire, not things we fear.",
  "When you focus on problems, you get more problems. When you focus on possibilities, you get more opportunities.",
  "The successful person is the one who can focus on the task at hand without being distracted by the noise around them.",
  "Focus on the step in front of you, not the whole staircase.",
  "The art of concentration is the art of eliminating distractions.",
  "Your focus is your reality.",
  "The main thing is to keep the main thing the main thing.",
  "Focus on the present moment, for that is where your power lies.",
  "The difference between successful people and very successful people is that very successful people say 'no' to almost everything.",
  "Focus on being productive instead of busy.",
  "The key to productivity is not working harder, but working smarter.",
  "Your focus determines your reality.",
  "The successful person is the one who can focus on the task at hand without being distracted by the noise around them.",
  "Focus on the possibilities for success, not on the potential for failure.",
  "The power of concentration is the key to success.",
  "In the midst of chaos, find your focus.",
  "Your mind is like water. When it's agitated, it becomes difficult to see. But if you allow it to settle, the answer becomes clear.",
  "The successful warrior is the average man, with laser-like focus.",
  "Focus on the possibilities for success, not on the potential for failure.",
  "The more you focus on time, the more time seems to pass.",
  "Concentration is the secret of strength.",
  "The key to success is to focus our conscious mind on things we desire, not things we fear."
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const timerDisplay = document.getElementById('timer');
  const startBtn = document.getElementById('startBtn');
  const taskInput = document.getElementById('taskInput');
  const quoteEl = document.getElementById('quote');
  const focusContainer = document.querySelector('.focus-container');
  const sessionLength = document.getElementById('sessionLength');
  const customSessionLength = document.getElementById('customSessionLength');

  let timer = null;
  let quoteTimer = null;
  let timeLeft = 25 * 60; // 25 minutes
  let isFocusing = false;
  let lastQuoteIndex = -1;

  function updateTimerDisplay() {
    const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const sec = String(timeLeft % 60).padStart(2, '0');
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `${min}:${sec}`;
    timerDisplay.style.display = 'block';
    timerDisplay.style.visibility = 'visible';
    timerDisplay.style.opacity = '1';
  }

  function getRandomQuote() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === lastQuoteIndex && quotes.length > 1);
    lastQuoteIndex = newIndex;
    return quotes[newIndex];
  }

  function showRandomQuote() {
    const newQuote = getRandomQuote();
    
    // Add fade-out animation
    quoteEl.classList.add('fade-out');
    
    // Wait for fade-out to complete before changing quote
    setTimeout(() => {
      quoteEl.textContent = newQuote;
      quoteEl.classList.remove('fade-out');
      quoteEl.classList.add('fade-in');
      
      // Remove fade-in class after animation completes
      setTimeout(() => {
        quoteEl.classList.remove('fade-in');
      }, 500);
    }, 500);
  }

  function startQuoteRotation() {
    // Change quote every 30 seconds
    quoteTimer = setInterval(showRandomQuote, 30000);
  }

  function stopQuoteRotation() {
    if (quoteTimer) {
      clearInterval(quoteTimer);
      quoteTimer = null;
    }
  }

  function getSessionLengthMinutes() {
    const custom = parseInt(customSessionLength.value, 10);
    if (!isNaN(custom) && custom > 0) {
      return custom;
    }
    return parseInt(sessionLength.value, 10);
  }

  function startFocus() {
    // Clear any existing timers
    if (timer) {
      clearInterval(timer);
    }
    stopQuoteRotation();

    // Validate task input
    if (!taskInput.value.trim()) {
      taskInput.focus();
      taskInput.style.borderColor = '#ff4444';
      setTimeout(() => {
        taskInput.style.borderColor = '#eee';
      }, 2000);
      return;
    }

    isFocusing = true;
    
    // Hide all elements except timer, quote, and task
    const elements = focusContainer.children;
    for (let element of elements) {
      if (!element.classList.contains('timer') && 
          !element.classList.contains('quote') && 
          !element.classList.contains('task-section') &&
          !element.classList.contains('app-title')) {
        element.style.display = 'none';
      }
    }

    // Add fullscreen class and update styles
    focusContainer.classList.add('fullscreen');
    document.body.style.overflow = 'hidden';
    startBtn.disabled = true;
    taskInput.disabled = true;
    
    // Ensure timer is visible and properly styled
    const timerElement = document.getElementById('timer');
    timerElement.style.display = 'block';
    timerElement.style.visibility = 'visible';
    timerElement.style.opacity = '1';
    
    // Update task input for fullscreen
    taskInput.style.textAlign = 'center';
    taskInput.style.width = '100%';
    taskInput.style.maxWidth = '600px';
    taskInput.style.fontSize = '1.4rem';
    taskInput.style.background = 'transparent';
    taskInput.style.border = 'none';
    taskInput.style.margin = '1rem auto';
    taskInput.style.color = '#222';
    taskInput.style.fontWeight = '500';
    
    // Hide subtitle in fullscreen mode
    const subtitle = document.querySelector('.sub-title');
    if (subtitle) {
      subtitle.style.display = 'none';
    }
    
    showRandomQuote();
    startQuoteRotation();
    timeLeft = getSessionLengthMinutes() * 60;
    updateTimerDisplay();

    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        endFocus();
      }
    }, 1000);

    window.onbeforeunload = () => 'You are in a focus session!';
  }

  function endFocus() {
    isFocusing = false;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    stopQuoteRotation();
    
    // Show all elements again
    const elements = focusContainer.children;
    for (let element of elements) {
      element.style.display = '';
    }
    
    // Reset task input styles
    taskInput.style.textAlign = '';
    taskInput.style.width = '';
    taskInput.style.maxWidth = '';
    taskInput.style.fontSize = '';
    taskInput.style.background = '';
    taskInput.style.border = '';
    taskInput.style.margin = '';
    taskInput.style.color = '';
    taskInput.style.fontWeight = '';
    
    // Show subtitle again
    const subtitle = document.querySelector('.sub-title');
    if (subtitle) {
      subtitle.style.display = '';
    }
    
    focusContainer.classList.remove('fullscreen');
    document.body.style.overflow = '';
    startBtn.disabled = false;
    taskInput.disabled = false;
    window.onbeforeunload = null;
    showRandomQuote();
  }

  // Event Listeners
  startBtn.addEventListener('click', startFocus);

  document.addEventListener('keydown', (e) => {
    if (isFocusing && e.key === 'Escape') {
      endFocus();
    }
  });

  // Show initial quote and timer
  showRandomQuote();
  updateTimerDisplay();

  // Update timer display if session length changes and not focusing
  function updateSessionLengthDisplay() {
    if (!isFocusing) {
      timeLeft = getSessionLengthMinutes() * 60;
      updateTimerDisplay();
    }
  }

  sessionLength.addEventListener('change', updateSessionLengthDisplay);
  customSessionLength.addEventListener('input', updateSessionLengthDisplay);
});

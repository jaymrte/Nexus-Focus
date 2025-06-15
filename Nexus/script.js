const quotes = [
  "Stay focused and never give up.",
  "Deep work creates real value.",
  "Distraction is the enemy of progress.",
  "You are what you do, not what you say you'll do.",
  "One thing at a time.",
  "Great things are done by a series of small things brought together.",
  "Focus is the new IQ.",
  "You are making progress. Keep going. Every step counts.",
];

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const taskInput = document.getElementById('taskInput');
const quoteEl = document.getElementById('quote');
const focusContainer = document.querySelector('.focus-container');
const sessionLength = document.getElementById('sessionLength');
const customSessionLength = document.getElementById('customSessionLength');

let timer = null;
let timeLeft = 25 * 60; // 25 minutes
let isFocusing = false;

function updateTimerDisplay() {
  const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const sec = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
}

function showRandomQuote() {
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

function getSessionLengthMinutes() {
  const custom = parseInt(customSessionLength.value, 10);
  if (!isNaN(custom) && custom > 0) {
    return custom;
  }
  return parseInt(sessionLength.value, 10);
}

function startFocus() {
  if (!taskInput.value.trim()) {
    taskInput.focus();
    return;
  }
  isFocusing = true;
  focusContainer.classList.add('fullscreen');
  document.body.style.overflow = 'hidden';
  startBtn.disabled = true;
  taskInput.disabled = true;
  showRandomQuote();
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
  clearInterval(timer);
  focusContainer.classList.remove('fullscreen');
  document.body.style.overflow = '';
  startBtn.disabled = false;
  taskInput.disabled = false;
  window.onbeforeunload = null;
  showRandomQuote();
}

startBtn.addEventListener('click', startFocus);

document.addEventListener('keydown', (e) => {
  if (isFocusing && e.key === 'Escape') {
    endFocus();
  }
});

// Show a quote on load
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

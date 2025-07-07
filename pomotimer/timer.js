const WORK_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

let timerDisplay = document.getElementById('timer');
let statusDisplay = document.getElementById('status');
let startBtn = document.getElementById('startBtn');
let pauseBtn = document.getElementById('pauseBtn');
let resetBtn = document.getElementById('resetBtn');

let isWorking = true;
let remainingTime = WORK_TIME;
let timerInterval = null;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingTime);
    statusDisplay.textContent = isWorking ? 'Working' : 'Break';
}

function startTimer() {
    if (timerInterval) return; // prevent multiple intervals
    timerInterval = setInterval(() => {
        remainingTime--;
        updateDisplay();
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            isWorking = !isWorking;
            remainingTime = isWorking ? WORK_TIME : BREAK_TIME;
            updateDisplay();
            alert(isWorking ? 'Work session started!' : 'Break time!');
            startTimer();
        }
    }, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function resetTimer() {
    pauseTimer();
    isWorking = true;
    remainingTime = WORK_TIME;
    updateDisplay();
    statusDisplay.textContent = 'Ready to work';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();

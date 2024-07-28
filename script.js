let score = 0;
let timeLeft = 30;
let gameInterval;
const words = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'kiwi', 'lemon', 'mango', 'orange'];
const targetWordElement = document.getElementById('target-key');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const wordInput = document.getElementById('word-input');
const keys = document.querySelectorAll('.key');
let gameStarted = false;

function displayInitialTargetWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    targetWordElement.textContent = randomWord;
}

displayInitialTargetWord();

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = `Score: ${score}`;
    timeElement.textContent = `Time left: ${timeLeft}s`;
    gameInterval = setInterval(updateTime, 1000);
    gameStarted = true;
    wordInput.focus();
}

function nextTargetWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    targetWordElement.textContent = randomWord;
}

function updateTime() {
    timeLeft--;
    timeElement.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    alert(`Time's up! Your final score is ${score}`);
    gameStarted = false;
    displayInitialTargetWord();
    wordInput.blur();
}

function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    const keyElement = document.querySelector(`.key[data-key="${key}"]`);
    
    if (keyElement) {
        keyElement.classList.add('pressed');
        setTimeout(() => keyElement.classList.remove('pressed'), 100);
    }
    
    if (!gameStarted) {
        startGame();
    } else {
        wordInput.focus();
    }
}

function handleInput(event) {
    if (event.key === 'Enter' && wordInput.value.toLowerCase() === targetWordElement.textContent.toLowerCase()) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        wordInput.value = '';
        nextTargetWord();
    }
}

document.addEventListener('keydown', handleKeyPress);
wordInput.addEventListener('keydown', handleInput);

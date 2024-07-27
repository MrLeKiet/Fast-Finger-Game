let score = 0;
let timeLeft = 10;
let gameInterval;
const words = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'kiwi', 'lemon', 'mango', 'orange'];
const targetWordElement = document.getElementById('target-key');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const startButton = document.getElementById('start-button');

function startGame() {
    score = 0;
    timeLeft = 10;
    scoreElement.textContent = `Score: ${score}`;
    timeElement.textContent = `Time left: ${timeLeft}s`;
    startButton.disabled = true;
    nextTargetWord();
    gameInterval = setInterval(updateTime, 1000);
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
    startButton.disabled = false;
    targetWordElement.textContent = '';
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && document.getElementById('word-input').value === targetWordElement.textContent) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        document.getElementById('word-input').value = '';
        nextTargetWord();
    }
});

startButton.addEventListener('click', startGame);

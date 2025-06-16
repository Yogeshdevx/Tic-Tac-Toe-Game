const board = document.getElementById('board');
const statusText = document.getElementById('status');
let currentPlayer = 'O';
let gameActive = true;
let gameState = Array(9).fill('');

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== '' || !gameActive) return;
  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkResult();
}

function checkResult() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }
  }
  if (!gameState.includes('')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
  statusText.textContent = `Current Player: ${currentPlayer}`;
}

function resetGame() {
  gameState.fill('');
  board.innerHTML = '';
  currentPlayer = 'O';
  gameActive = true;
  statusText.textContent = `Current Player: ${currentPlayer}`;
  createBoard();
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

createBoard();

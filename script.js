const board = document.getElementById('board');
const statusText = document.getElementById('statusText');
const xScoreElement = document.getElementById('xScore');
const oScoreElement = document.getElementById('oScore');

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let active = true;
let scores = { X: 0, O: 0 };

const createBoard = () => {
    board.innerHTML = "";
    cells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-index', index);
        cellElement.addEventListener('click', handleMove);
        board.appendChild(cellElement);
        updateCell(cellElement, cell);
    });
};

function updateCell(cellElement, value) {
    cellElement.innerText = value;
    cellElement.classList.remove('winner');
}

function handleMove(event) {
    const index = event.target.getAttribute('data-index');
    if (cells[index] === '' && active) {
        cells[index] = currentPlayer;
        updateCell(event.target, currentPlayer);
        
        if (checkWinner()) {
            handleWin();
        } else if (checkTie()) {
            handleTie();
        } else {
            switchPlayer();
        }
    }
}

function checkWinner() {
    return WINNING_COMBINATIONS.some(combination => {
        const [a, b, c] = combination;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            highlightWinningCells(combination);
            return true;
        }
        return false;
    });
}

function highlightWinningCells(combination) {
    combination.forEach(index => {
        document.querySelector(`[data-index="${index}"]`).classList.add('winner');
    });
}

function handleWin() {
    active = false;
    scores[currentPlayer]++;
    updateScores();
    statusText.innerText = `Player ${currentPlayer} Wins! 🎉`;
}

function checkTie() {
    return !cells.includes('');
}

function handleTie() {
    active = false;
    statusText.innerText = "It's a Tie! 🤝";
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

function updateScores() {
    xScoreElement.textContent = scores.X;
    oScoreElement.textContent = scores.O;
}

function resetGame() {
    currentPlayer = 'X';
    cells = ['', '', '', '', '', '', '', '', ''];
    active = true;
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
    createBoard();
}

// Initialize the game
createBoard();
updateScores();
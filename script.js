// Script file
const board = document.getElementById('board');
const statusText = document.getElementById('statusText');

let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let active = true;

let createBoard = () => {
    board.innerHTML ="";
    cells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerHTML = cell;
        cellElement.setAttribute('data-index', index);
        cellElement.innerText = cell;
        cellElement.addEventListener('click', handleMove);
        board.appendChild(cellElement);
    });
};

function handleMove(event){
    const index = event.target.getAttribute('data-index');
    if(cells[index] === '' && active){
        cells[index] = currentPlayer;
        event.target.innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerText = active?`Player ${currentPlayer}'s turn`:statusText.innerText;
    }
}

function checkWinner(){
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let winner = false;
    for (const combo of winningConditions) {
        const [a, b, c] = combo; 
        if(cells[a] && cells[a] === cells[b] && cells[a] === cells[c]){
            winner = true;
            active = false;
            statusText.innerText = `Player ${currentPlayer} has won!`;
            return;
        }
    }

    if(!cells.includes('') && !winner){
        active = false;
        statusText.innerText = 'It\'s a tie!';
    }
}

function resetGame(){
    currentPlayer = 'X';
    cells = ['', '', '', '', '', '', '', '', ''];
    active = true;
    statusText.innerText = `Player ${currentPlayer}'s turn`;
    createBoard();
}
createBoard();
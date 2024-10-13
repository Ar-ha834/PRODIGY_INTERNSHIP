const cells = document.querySelectorAll('.cell');
const gameMessage = document.getElementById('gameMessage');
const playerTurn = document.getElementById('playerTurn');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

/* Define winning combinations */
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

/* Function to handle a player's move */
function handleCellPlayed(clickedCell, index) {
    gameBoard[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;
}

/* Function to switch players */
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.textContent = `Player ${currentPlayer}'s Story Turn`;
}

/* Function to check the result after each turn */
function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameMessage.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!gameBoard.includes('')) {
        gameMessage.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

/* Handle clicks on each cell */
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameBoard[index] === '' && gameActive) {
            handleCellPlayed(cell, index);
            checkResult();
        }
    });
});

/* Restart the game when the restart button is clicked */
restartButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    playerTurn.textContent = `Player ${currentPlayer}'s Story Turn`;
    gameMessage.textContent = '';
    cells.forEach(cell => (cell.textContent = ''));
});

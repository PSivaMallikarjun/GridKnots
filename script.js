let board = ['', '', '', '', '', '', '', '', '']; // Board state
let currentPlayer = 'X'; // Current player (X starts)
let gameActive = true;

const statusElement = document.getElementById('status');
const cells = document.querySelectorAll('.cell');

const winningCombination = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

function makeMove(index) {
    if (board[index] !== '' || !gameActive) return; // Ignore if cell is taken or game over

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer); // Add class to style X and O differently
    
    if (checkWin()) {
        statusElement.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        statusElement.textContent = 'It\'s a Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winningCombination.some(combination => {
        const [a, b, c] = combination;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    statusElement.textContent = `${currentPlayer}'s Turn`;
}

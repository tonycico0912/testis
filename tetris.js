const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const linesElement = document.getElementById('lines');
const gameOverElement = document.getElementById('gameOver');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

let board = [];
let score = 0;
let level = 1;
let lines = 0;
let currentPiece = null;
let gameOver = false;
let isPaused = false;
let dropCounter = 0;
let lastTime = 0;

const PIECES = [
    {
        name: 'I',
        color: '#00f0f0',
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    },
    {
        name: 'O',
        color: '#f0f000',
        shape: [
            [1, 1],
            [1, 1]
        ]
    },
    {
        name: 'T',
        color: '#a000f0',
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]
    },
    {
        name: 'S',
        color: '#00f000',
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ]
    },
    {
        name: 'Z',
        color: '#f00000',
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ]
    },
    {
        name: 'J',
        color: '#0000f0',
        shape: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]
    },
    {
        name: 'L',
        color: '#f0a000',
        shape: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ]
    }
];

class Piece {
    constructor() {
        const piece = PIECES[Math.floor(Math.random() * PIECES.length)];
        this.name = piece.name;
        this.color = piece.color;
        this.shape = piece.shape;
        this.x = Math.floor(COLS / 2) - Math.floor(this.shape[0].length / 2);
        this.y = 0;
    }

    rotate() {
        const rotated = [];
        const n = this.shape.length;
        for (let i = 0; i < n; i++) {
            rotated[i] = [];
            for (let j = 0; j < n; j++) {
                rotated[i][j] = this.shape[n - j - 1][i];
            }
        }
        return rotated;
    }
}

function init() {
    board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    score = 0;
    level = 1;
    lines = 0;
    gameOver = false;
    isPaused = false;
    gameOverElement.style.display = 'none';
    updateScore();
    currentPiece = new Piece();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#333';
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
    }
    
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x]) {
                ctx.fillStyle = board[y][x];
                ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeStyle = '#000';
                ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }
    
    if (currentPiece) {
        ctx.fillStyle = currentPiece.color;
        for (let y = 0; y < currentPiece.shape.length; y++) {
            for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (currentPiece.shape[y][x]) {
                    ctx.fillRect(
                        (currentPiece.x + x) * BLOCK_SIZE,
                        (currentPiece.y + y) * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE
                    );
                    ctx.strokeStyle = '#000';
                    ctx.strokeRect(
                        (currentPiece.x + x) * BLOCK_SIZE,
                        (currentPiece.y + y) * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE
                    );
                }
            }
        }
    }
}

function isValidMove(piece, offsetX = 0, offsetY = 0, newShape = null) {
    const shape = newShape || piece.shape;
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const newX = piece.x + x + offsetX;
                const newY = piece.y + y + offsetY;
                
                if (newX < 0 || newX >= COLS || newY >= ROWS) {
                    return false;
                }
                
                if (newY >= 0 && board[newY][newX]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function lockPiece() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x]) {
                const boardY = currentPiece.y + y;
                const boardX = currentPiece.x + x;
                if (boardY >= 0) {
                    board[boardY][boardX] = currentPiece.color;
                }
            }
        }
    }
}

function clearLines() {
    let linesCleared = 0;
    
    for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y].every(cell => cell !== 0)) {
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
            y++;
        }
    }
    
    if (linesCleared > 0) {
        lines += linesCleared;
        score += linesCleared * 100 * level;
        level = Math.floor(lines / 10) + 1;
        updateScore();
    }
}

function updateScore() {
    scoreElement.textContent = score;
    levelElement.textContent = level;
    linesElement.textContent = lines;
}

function dropPiece() {
    if (isValidMove(currentPiece, 0, 1)) {
        currentPiece.y++;
    } else {
        lockPiece();
        clearLines();
        currentPiece = new Piece();
        
        if (!isValidMove(currentPiece)) {
            gameOver = true;
            gameOverElement.style.display = 'block';
        }
    }
}

function hardDrop() {
    while (isValidMove(currentPiece, 0, 1)) {
        currentPiece.y++;
        score += 2;
    }
    updateScore();
    lockPiece();
    clearLines();
    currentPiece = new Piece();
    
    if (!isValidMove(currentPiece)) {
        gameOver = true;
        gameOverElement.style.display = 'block';
    }
}

function rotatePiece() {
    const rotated = currentPiece.rotate();
    if (isValidMove(currentPiece, 0, 0, rotated)) {
        currentPiece.shape = rotated;
    }
}

function gameLoop(time = 0) {
    if (!gameOver && !isPaused) {
        const deltaTime = time - lastTime;
        lastTime = time;
        
        dropCounter += deltaTime;
        if (dropCounter > (1000 / level)) {
            dropPiece();
            dropCounter = 0;
        }
        
        draw();
    }
    
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (gameOver) return;
    
    if (e.key === 'p' || e.key === 'P') {
        isPaused = !isPaused;
        return;
    }
    
    if (isPaused) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            if (isValidMove(currentPiece, -1, 0)) {
                currentPiece.x--;
            }
            break;
        case 'ArrowRight':
            if (isValidMove(currentPiece, 1, 0)) {
                currentPiece.x++;
            }
            break;
        case 'ArrowDown':
            dropPiece();
            score++;
            updateScore();
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
        case ' ':
            hardDrop();
            break;
    }
});

function resetGame() {
    init();
}

init();
gameLoop();
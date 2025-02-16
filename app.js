const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ballRadius = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let ballX = canvasWidth / 2;
let ballY = canvasHeight - 30;
let ballSpeedX = 0;
const ballSpeedY = 5;

let obstacles = [];
let score = 0;
let gameOver = false;

// Engel ayarları
const obstacleWidth = 40;
const obstacleHeight = 20;
const obstacleSpeed = 4;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.beginPath();
        ctx.rect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
    });
}

function moveBall() {
    ballX += ballSpeedX;

    // Topun kenarlara çarpmasını engelle
    if (ballX + ballRadius > canvasWidth) {
        ballX = canvasWidth - ballRadius;
    }
    if (ballX - ballRadius < 0) {
        ballX = ballRadius;
    }
}

function moveObstacles() 
    for (let i = 0; i < obstacles.length; i++) 
        obstacles[i].y += obstacleSpeed;

        // Engel ekranın dışına çıkarsa tekrar üstten

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

function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacleSpeed;

        // Engel ekranın dışına çıkarsa tekrar üstten eklenir
        if (obstacles[i].y > canvasHeight) {
            obstacles[i].y = -obstacleHeight;
            obstacles[i].x = Math.random() * (canvasWidth - obstacleWidth);
            score++;
        }

        // Engel ile topun çarpışmasını kontrol et
        if (
            ballX > obstacles[i].x &&
            ballX < obstacles[i].x + obstacleWidth &&
            ballY - ballRadius < obstacles[i].y + obstacleHeight
        ) {
            gameOver = true;
        }
    }
}

function generateObstacles() {
    if (Math.random() < 0.02) {  // %2 ihtimalle yeni engel ekle
        obstacles.push({
            x: Math.random() * (canvasWidth - obstacleWidth),
            y: -obstacleHeight
        });
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText("Skor: " + score, 8, 20);
}

function drawGameOver() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("Oyun Bitti!", canvasWidth / 2 - 100, canvasHeight / 2);
}

function updateGame() {
    if (gameOver) {
        drawGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Ekranı temizle
    drawBall();
    drawObstacles();
    drawScore();
    moveBall();
    moveObstacles();
    generateObstacles();
    requestAnimationFrame(updateGame);
}

// Klavye ile hareket
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        ballSpeedX = -5;
    } else if (event.key === "ArrowRight") {
        ballSpeedX = 5;
    }
});

document.addEventListener("keyup", function () {
    ballSpeedX = 0;
});

updateGame();

const canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
const feedWater = document.getElementById('feedWater'); 

const marmiteImg = new Image();
marmiteImg.src = './images/marmite.png';

const marmiteImgWidth = 150;
const marmiteImgHeight = 80;

let x, y;

function randomPosition() {
    x = Math.floor(Math.random() * (canvas.width - marmiteImgWidth));
    y = Math.floor(Math.random() * (canvas.height - marmiteImgHeight));
}

function drawMarmite() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(marmiteImg, x, y, marmiteImgWidth, marmiteImgHeight);
}

marmiteImg.onload = function() {
    randomPosition();
    drawMarmite();
}

const showScore = document.getElementById('score');
let score = 0;

canvas.addEventListener("click", function(event) {
    if (!feedWater.classList.contains('active')) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (
        clickX >= x &&
        clickX <= x + marmiteImgWidth &&
        clickY >= y &&
        clickY <= y + marmiteImgHeight
    ) {
        randomPosition();
        drawMarmite();
        score++;
        showScore.textContent = 'Score : ' + score;
    }
});

const showChrono = document.getElementById('chrono');
let startTime;
let interval;

feedWater.addEventListener('click', () => {
    if (feedWater.classList.contains('active')) {
        feedWater.classList.remove('active');
        clearInterval(interval);
        showChrono.textContent = '0.00 secondes';
        score = 0;
        showScore.textContent = 'Score : 0';
    } else {
        showScore.textContent = 'Score : 0';
        score = 0;
        feedWater.classList.toggle('active');
        startTime = performance.now();

        interval = setInterval(() => {
            const now = performance.now();
            const elapsed = (now - startTime) / 1000;

            if (elapsed >= 15) {
                clearInterval(interval);
                showChrono.textContent = '15.00 secondes';
                feedWater.classList.remove('active');
            } else {   
                showChrono.textContent = '' + elapsed.toFixed(2) + ' secondes';
            }
        }, 10);
    }
});

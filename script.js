// Récupération des éléments dans le DOM
const canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
const startBtn = document.getElementById('startBtn'); 
const showScore = document.getElementById('score');
const showChrono = document.getElementById('chrono');
const saveSettingBtn = document.getElementById('save-settings-btn');
const resetSettingBtn = document.getElementById('reset-settings-btn');

// Initialisation des constantes
const redDottImg = new Image();
redDottImg.src = './images/redDott.png';

// Initialisation des variables
let x, y;
let score;
let startTime;
let interval;
let timer = 15;
let redDottSize = 80;

// Valeurs de base de chaque paramètre
const defaultSetting = {
    defaultTimer: 15,
    redDottSize: 80
};

// Fonctions qui randomise la position de l'image
function randomPosition() {
    x = Math.floor(Math.random() * (canvas.width - redDottSize));
    y = Math.floor(Math.random() * (canvas.height - redDottSize));
}

// Fonctions qui affiche l'image
function drawredDott() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(redDottImg, x, y, redDottSize, redDottSize);
}

// Affiche l'image à une position alléatoire au chargement
redDottImg.onload = function() {
    randomPosition();
    drawredDott();
}

// Gère les événement sur l'image et le score
canvas.addEventListener("click", function(event) {
    if (!startBtn.classList.contains('active')) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (
        clickX >= x &&
        clickX <= x + redDottSize &&
        clickY >= y &&
        clickY <= y + redDottSize
    ) {
        randomPosition();
        drawredDott();
        score++;
        showScore.textContent = 'Score : ' + score;
    } else {
        if (score === 0) {
            score = 0;
        } else {
            score--;
        }

        showScore.textContent = 'Score : ' + score;
    }
});

// Passe startBtn en "active" ou l'enlève lors d'un clic,
// déclanche le timer et initialise le score si besoins
startBtn.addEventListener('click', () => {
    if (startBtn.classList.contains('active')) {
        startBtn.classList.remove('active');
        startBtn.textContent = 'Start Aim Test'
        document.getElementById('timer').value = timer;
        document.getElementById('redDott').value = redDottSize;
        clearInterval(interval);
        score = 0;
    } else {
        startBtn.textContent = 'Stop Aim Test'
        showScore.textContent = 'Score : 0';
        score = 0;
        startBtn.classList.toggle('active');
        startTime = performance.now();

        document.getElementById('timer').value = timer;
        document.getElementById('redDott').value = redDottSize;

        interval = setInterval(() => {
            const now = performance.now();
            const elapsed = (now - startTime) / 1000;

            if (elapsed >= timer) {
                clearInterval(interval);
                showChrono.textContent = `${timer} Seconds`;
                startBtn.classList.remove('active');
            } else {   
                showChrono.textContent = '' + elapsed.toFixed(2) + ' Seconds';
            }
        }, 10);
    }
});

// Récupère les valeurs des paramètres et les sauvegardent
// pour les prochaines parties
saveSettingBtn.addEventListener('click', () => {
    saveSettingBtn.classList.add('active');
    setTimeout(() => {
        saveSettingBtn.classList.remove('active');
    }, 1000);

    const basedTimer = timer;
    const basedRedDottSize = redDottSize;

    if (startBtn.classList.contains('active')) {
        startBtn.classList.remove('active');
        timer = basedTimer;
        document.getElementById('timer').value = basedTimer;
        redDottSize = basedRedDottSize;
        document.getElementById('redDott').value = basedRedDottSize;
        randomPosition();
        drawredDott();
        clearInterval(interval);
        return;
    }

    timer = parseInt(document.getElementById('timer').value);
    if (timer < 10) {
        timer = basedTimer;
        document.getElementById('timer').value = basedTimer;
        window.alert('The timer cannot be set below 10 seconds !');
    }

    redDottSize = parseInt(document.getElementById('redDott').value);
    randomPosition();
    drawredDott();
    if (redDottSize < 40 || redDottSize > 200) {
        redDottSize = basedRedDottSize;
        document.getElementById('redDott').value = basedRedDottSize;
        randomPosition();
        drawredDott();
        window.alert('The size of the aim cannot be set below 40px and above 200px !');
    }
});

// Reset les valeurs par défauts de chaques paramètres
resetSettingBtn.addEventListener('click', () => {
    resetSettingBtn.classList.add('active');
    setTimeout(() => {
        resetSettingBtn.classList.remove('active');
    }, 600);

    timer = defaultSetting.defaultTimer;
    document.getElementById('timer').value = defaultSetting.defaultTimer;
    redDott = defaultSetting.redDottSize;
    document.getElementById('redDott').value = defaultSetting.redDottSize;
    randomPosition();
    drawredDott();
});


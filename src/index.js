let fallingAnimationTime = 1800;
let playerMovement = 2;
let playerScore = 0;
let gameDifficulty = 1000;
let gameEnded = false;
let lastRandom = 1;
let facingRight = false;

const body = document.querySelector('body');
const gameContainer = document.querySelector('#gameContainer');

let player = document.getElementsByClassName('player');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const player3 = document.querySelector('#player3');
const player4 = document.querySelector('#player4');
const player5 = document.querySelector('#player5');
const player6 = document.querySelector('#player6');

const chef1 = document.querySelector('#chef1');
const chef2 = document.querySelector('#chef2');
const chef3 = document.querySelector('#chef3');
const chef4 = document.querySelector('#chef4');
const chef5 = document.querySelector('#chef5');
const chef6 = document.querySelector('#chef6');

const screen1 = document.querySelector('#screen1');
const screen2 = document.querySelector('#screen2');
const screen3 = document.querySelector('#screen3');
const screen4 = document.querySelector('#screen4');
const screen5 = document.querySelector('#screen5');
const screen6 = document.querySelector('#screen6');

const leftBut = document.querySelector('#leftButton');
const rightBut = document.querySelector('#rightButton');

function showOrHide(showOrHide, object) {
    if (showOrHide === 'show') {
        object.style.display = 'flex';
    } else if (showOrHide === 'hide') {
        object.style.display = 'none';
    } else {
        console.log('show n hide ERROR');
    }
}

function scoreAndLoose(number) {
    if (number === playerMovement) {
        console.log('+1');
        playerScore++;
    } else {
        gameEnded = true;
        console.log('no points game ended');
    }
}

function createFallingObj(screenObj, numId) {
    let randomNum = Math.floor(Math.random() * 2);
    let pizzaImg = document.createElement('img');
    pizzaImg.src = '/src/img/pizza.svg';
    if (randomNum === 0) {
        pizzaImg.classList.add('flip');
    }
    let fallingObj = document.createElement('div');
    fallingObj.classList.add('fallingObject');
    fallingObj.appendChild(pizzaImg);

    screenObj.appendChild(fallingObj);
    //WHERE TO PUT THE GAME LOGIC
    setTimeout(() => {
        // console.log('Falling obj timeout');
        fallingObj.style.display = 'none';
        scoreAndLoose(numId);
    }, fallingAnimationTime);
}

function showAndHideChef(chefTag) {
    let newTime = fallingAnimationTime - 1000;
    chefTag.style.display = 'flex';
    setTimeout(() => {
        chefTag.style.display = 'none';
    }, newTime);
}

function randomObject() {
    let randomNum = Math.floor(Math.random() * 6);
    if (randomNum === lastRandom) {
        randomNum = Math.floor(Math.random() * 6);
    }
    console.log(randomNum);
    if (randomNum === 0) {
        createFallingObj(screen1, 1);
        showAndHideChef(chef1);
    } else if (randomNum === 1) {
        createFallingObj(screen2, 2);
        showAndHideChef(chef2);
    } else if (randomNum === 2) {
        createFallingObj(screen3, 3);
        showAndHideChef(chef3);
    } else if (randomNum === 3) {
        createFallingObj(screen4, 4);
        showAndHideChef(chef4);
    } else if (randomNum === 4) {
        createFallingObj(screen5, 5);
        showAndHideChef(chef5);
    } else if (randomNum === 5) {
        createFallingObj(screen6, 6);
        showAndHideChef(chef6);
    } else {
        console.log('random OBJ error randomNum: ' + randomNum);
    }
    lastRandom = randomNum;
}

function updatePlayerMovement() {
    if (playerMovement === 1) {
        showOrHide('show', player1);
        showOrHide('hide', player2);
        showOrHide('hide', player3);
        showOrHide('hide', player4);
        showOrHide('hide', player5);
        showOrHide('hide', player6);
    } else if (playerMovement === 2) {
        showOrHide('hide', player1);
        showOrHide('show', player2);
        showOrHide('hide', player3);
        showOrHide('hide', player4);
        showOrHide('hide', player5);
        showOrHide('hide', player6);
    } else if (playerMovement === 3) {
        showOrHide('hide', player1);
        showOrHide('hide', player2);
        showOrHide('show', player3);
        showOrHide('hide', player4);
        showOrHide('hide', player5);
        showOrHide('hide', player6);
    } else if (playerMovement === 4) {
        showOrHide('hide', player1);
        showOrHide('hide', player2);
        showOrHide('hide', player3);
        showOrHide('show', player4);
        showOrHide('hide', player5);
        showOrHide('hide', player6);
    } else if (playerMovement === 5) {
        showOrHide('hide', player1);
        showOrHide('hide', player2);
        showOrHide('hide', player3);
        showOrHide('hide', player4);
        showOrHide('show', player5);
        showOrHide('hide', player6);
    } else if (playerMovement === 6) {
        showOrHide('hide', player1);
        showOrHide('hide', player2);
        showOrHide('hide', player3);
        showOrHide('hide', player4);
        showOrHide('hide', player5);
        showOrHide('show', player6);
    } else {
        console.log('player move ERROR');
    }
}

function gameLoop() {
    if (gameEnded != true) {
        randomObject();
    }
}

function startGame() {
    setInterval(gameLoop, gameDifficulty);
}
startGame();

const counter = document.querySelector('#moveCount');

function flipCharacter() {
    if (facingRight === true) {
        player1.classList.add('flip');
        player2.classList.add('flip');
        player3.classList.add('flip');
        player4.classList.add('flip');
        player5.classList.add('flip');
        player6.classList.add('flip');
    } else if (facingRight === false) {
        player1.classList.remove('flip');
        player2.classList.remove('flip');
        player3.classList.remove('flip');
        player4.classList.remove('flip');
        player5.classList.remove('flip');
        player6.classList.remove('flip');
    }
}

function updateAnimations() {
    counter.innerHTML = `${playerScore}`;
    updatePlayerMovement();
    flipCharacter();
}
function animationLoop() {
    updateAnimations();
}
function startAnimation() {
    setInterval(animationLoop, 100);
}
startAnimation();

leftBut.addEventListener('click', () => {
    facingRight = false;
    if (playerMovement === 1) {
        playerMovement = 6;
    } else {
        playerMovement--;
    }
});

rightBut.addEventListener('click', () => {
    facingRight = true;
    if (playerMovement === 6) {
        playerMovement = 1;
    } else {
        playerMovement++;
    }
});

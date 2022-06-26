let playerScore = 0;
let movementState = -1;
let fallingAnimationTime = 2000;
let gameEnded = false;
let faceRight = false;
let faceLeft = false;

const moveCount = document.querySelector('#moveCount');
const leftButton = document.querySelector('#leftButton');
const rightButton = document.querySelector('#rightButton');
const leftScreenButton = document.querySelector('#leftScreenButton');
const rightScreenButton = document.querySelector('#rightScreenButton');

const leftCharacter = document.querySelector('#leftCharacter');
const middleCharacter = document.querySelector('#middleCharacter');
const rightCharacter = document.querySelector('#rightCharacter');
const character = document.getElementsByClassName('character');

const leftScreenCont = document.querySelector('#leftScreen');
const middleScreenCont = document.querySelector('#middleScreen');
const rightScreenCont = document.querySelector('#rightScreen');

function showOrHide(showOrHide, obj) {
    if (showOrHide === 'show') {
        return (obj.style.display = 'flex');
    } else if (showOrHide === 'hide') {
        return (obj.style.display = 'none');
    } else {
        console.error('ERROR');
    }
}

function updatePlayerMovement() {
    if (movementState === -1) {
        showOrHide('show', leftCharacter);
        showOrHide('hide', middleCharacter);
        showOrHide('hide', rightCharacter);
    } else if (movementState === 0) {
        showOrHide('hide', leftCharacter);
        showOrHide('show', middleCharacter);
        showOrHide('hide', rightCharacter);
    } else if (movementState === 1) {
        showOrHide('hide', leftCharacter);
        showOrHide('hide', middleCharacter);
        showOrHide('show', rightCharacter);
    }
}
function updatePlayerStance() {
    if (faceLeft === true) {
        leftCharacter.classList.remove('right');
        middleCharacter.classList.remove('right');
        rightCharacter.classList.remove('right');
    } else if (faceRight === true) {
        leftCharacter.classList.add('right');
        middleCharacter.classList.add('right');
        rightCharacter.classList.add('right');
    }
}

function dropRightSide() {
    const randomNum = Math.floor(Math.random() * 2);
    const fallingObj = document.createElement('div');
    fallingObj.classList.add('fallingObject');
    const pizzaImg = document.createElement('img');
    pizzaImg.src = '/src/img/pizza.svg';
    if (randomNum === 0) {
        pizzaImg.classList.add('right');
    }
    fallingObj.appendChild(pizzaImg);
    rightScreenCont.appendChild(fallingObj);
    setTimeout(() => {
        fallingObj.style.display = 'none';
        if (movementState === 1 && gameEnded != true) {
            playerScore++;
        } else {
            gameEnded = true;
        }
    }, fallingAnimationTime);
}
function dropMiddle() {
    const randomNum = Math.floor(Math.random() * 2);
    const fallingObj = document.createElement('div');
    fallingObj.classList.add('fallingObject');
    const pizzaImg = document.createElement('img');
    pizzaImg.src = '/src/img/pizza.svg';
    if (randomNum === 0) {
        pizzaImg.classList.add('right');
    }
    fallingObj.appendChild(pizzaImg);
    middleScreenCont.appendChild(fallingObj);
    setTimeout(() => {
        fallingObj.style.display = 'none';
        if (movementState === 0 && gameEnded != true) {
            playerScore++;
        } else {
            gameEnded = true;
        }
    }, fallingAnimationTime);
}
function dropLeftSide() {
    const randomNum = Math.floor(Math.random() * 2);
    const fallingObj = document.createElement('div');
    fallingObj.classList.add('fallingObject');
    const pizzaImg = document.createElement('img');
    pizzaImg.src = '/src/img/pizza.svg';
    if (randomNum === 0) {
        pizzaImg.classList.add('right');
    }
    fallingObj.appendChild(pizzaImg);
    leftScreenCont.appendChild(fallingObj);
    setTimeout(() => {
        fallingObj.style.display = 'none';
        if (movementState === -1 && gameEnded != true) {
            playerScore++;
        } else {
            gameEnded = true;
        }
    }, fallingAnimationTime);
}

function gameAutoDrop() {
    let randomNum = Math.floor(Math.random() * 3);
    if (randomNum === 0) {
        dropLeftSide();
    } else if (randomNum === 1) {
        dropMiddle();
    } else if (randomNum === 2) {
        dropRightSide();
    }
}

function gameLoop() {
    if (gameEnded != true) {
        gameAutoDrop();
    }
}
function animationLoop() {
    if (gameEnded === false) {
        moveCount.innerHTML = `${playerScore} pizzas`;
    } else if (gameEnded === true) {
        moveCount.innerHTML = `You LOST! with ${playerScore} pizzas!`;
    }
    updatePlayerMovement();
    updatePlayerStance();
}
function startGame() {
    setInterval(gameLoop, 650);
}
function startAnimate() {
    setInterval(animationLoop, 100);
}
startGame();
startAnimate();

leftButton.addEventListener('click', function () {
    faceLeft = true;
    faceRight = false;
    if (movementState === -1) {
        movementState = 1;
    } else {
        movementState = movementState - 1;
    }
});

rightButton.addEventListener('click', function () {
    faceLeft = false;
    faceRight = true;
    if (movementState === 1) {
        movementState = -1;
    } else {
        movementState = movementState + 1;
    }
});
leftScreenButton.addEventListener('click', () => {
    if (movementState === -1) {
        movementState = 1;
    } else {
        movementState = movementState - 1;
    }
});
rightScreenButton.addEventListener('click', () => {
    if (movementState === 1) {
        movementState = -1;
    } else {
        movementState = movementState + 1;
    }
});

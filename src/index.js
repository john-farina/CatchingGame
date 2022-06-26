let playerScore = 0;
let movementState = -1;
let fallingAnimationTime = 2000;
let gameEnded = false;

const moveCount = document.querySelector('#moveCount');
const leftButton = document.querySelector('#leftButton');
const rightButton = document.querySelector('#rightButton');

const leftCharacter = document.querySelector('#leftCharacter');
const middleCharacter = document.querySelector('#middleCharacter');
const rightCharacter = document.querySelector('#rightCharacter');

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

function dropRightSide() {
    const fallingObj = document.createElement('div');
    fallingObj.classList.add('fallingObject');
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
    const fallingObj = document.createElement('div');
    fallingObj.classList.add('fallingObject');
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
    const fallingObj = document.createElement('div');
    fallingObj.classList.add('fallingObject');
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
        moveCount.innerHTML = `${playerScore} points`;
    } else if (gameEnded === true) {
        moveCount.innerHTML = `You LOST! with ${playerScore} points`;
    }
    updatePlayerMovement();
}
function startGame() {
    setInterval(gameLoop, 1000);
}
function startAnimate() {
    setInterval(animationLoop, 100);
}
startGame();
startAnimate();

leftButton.addEventListener('click', function () {
    if (movementState === -1) {
        movementState = 1;
    } else {
        movementState = movementState - 1;
    }
});

rightButton.addEventListener('click', function () {
    if (movementState === 1) {
        movementState = -1;
    } else {
        movementState = movementState + 1;
    }
});

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "green", "purple", "red"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");


// Load High Score When Page Loads
if (localStorage.getItem("highScore")) {
    highScore = Number(localStorage.getItem("highScore"));
    h3.innerText = `Highest Score : ${highScore}`;
}


// Start Game
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});


// Game Flash
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}


// User Flash
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}


// Level Up
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * btns.length);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`#${ranColor}`);

    gameSeq.push(ranColor);
    gameFlash(ranBtn);
}


// Check Answer
function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }

    } else {

        let score = level - 1;

        // Update High Score
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            h3.innerText = `Highest Score : ${highScore}`;
        }

        h2.innerHTML = `Game Over! Your score was <b>${score}</b> <br> Press any key to start`;

        document.body.style.backgroundColor = "red";
        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 200);

        reset();
    }
}


// Button Press
function btnPress() {

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}


// Add Click Event
let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


// Reset Game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

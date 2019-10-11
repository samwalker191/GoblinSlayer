const Game = require("./classes/game");
const LevelOne = require("./util/levels/level1");
const GameView = require("./classes/game_view");
const whichTransitionEvent = require('./util/transition_detect_util');

document.addEventListener("DOMContentLoaded", () => {
    const boardCanvas = document.getElementById('board-canvas');
    const animateCanvas = document.getElementById('animate-canvas');
    const attackCanvas = document.getElementById('attack-canvas');
    const level1 = new LevelOne();
    let levels = [level1];
    const game = new Game(boardCanvas, animateCanvas, attackCanvas, levels);
    const gameView = new GameView(game)

    const startButton = document.getElementById('start-btn');
    startButton.addEventListener('click', () => {
        gameView.start();
    })

    const instructionsButton = document.getElementById('instructions-btn');
    const instructions = document.getElementsByClassName('instructions')[0];
    const menu = document.getElementsByTagName('ul')[0];
    const goBackButton = document.getElementsByTagName('button')[0];
    let transitionEvent;

    const transitionFunc = () => {
        menu.classList.remove('hidden');
    }

    instructionsButton.addEventListener('click', () => {
        menu.classList.add('hidden');
        instructions.classList.remove('animate-expand');
        goBackButton.classList.remove('animate-expand');
        if (transitionEvent) {
            instructions.removeEventListener(transitionEvent, transitionFunc);
        }
    })

    goBackButton.addEventListener('click', () => {
        instructions.classList.add('animate-expand');
        goBackButton.classList.add('animate-expand');
        transitionEvent = whichTransitionEvent();

        if (transitionEvent) {
            instructions.addEventListener(transitionEvent, transitionFunc);
        }
    })

    setTimeout(() => {
        const header = document.getElementsByTagName('header')[0];
        header.classList.add('active');
        
    }, 400);
});
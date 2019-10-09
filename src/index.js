const Game = require("./classes/game");
const LevelOne = require("./util/levels/level1");
const GameView = require("./classes/game_view");

console.log('its working');
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
    instructionsButton.addEventListener('click', () => {
        let menu = document.getElementsByTagName('ul')[0];
        menu.classList.add('hidden');
        let instructions = document.getElementsByClassName('instructions')[0];
        instructions.classList.remove('animate-expand');
    })
    setTimeout(() => {
        const header = document.getElementsByTagName('header')[0];
        header.classList.add('active');
        
    }, 500);
});
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
    
    setTimeout(() => {
        const header = document.getElementsByTagName('header')[0];
        header.classList.add('active');
        const game = new Game(boardCanvas, animateCanvas, attackCanvas, levels);
        const gameView = new GameView(game)
        setTimeout(() => {
            gameView.start();
            const gameContainer = document.getElementsByClassName('game-container')[0];
            gameContainer.classList.remove('game-container');
            gameContainer.classList.add('game-container-active');
        }, 1000);
    }, 500);
});
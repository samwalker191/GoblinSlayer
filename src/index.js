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
    
    setTimeout(() => {
        const header = document.getElementsByTagName('header')[0];
        const ul = document.getElementsByTagName('ul')[0];
        header.classList.add('active');
        ul.classList.add('active');
        
    }, 500);
});
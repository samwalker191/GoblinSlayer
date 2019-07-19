const Game = require("./classes/game");
const LevelOne = require("./util/levels/level1");
const GameView = require("./classes/game_view");

console.log('its working');
document.addEventListener("DOMContentLoaded", () => {
    const boardCanvas = document.getElementById('board-canvas');
    const animateCanvas = document.getElementById('animate-canvas');
    const level1 = new LevelOne();
    let levels = [level1];
    const game = new Game(boardCanvas, animateCanvas, levels);
    
    const gameView = new GameView(game)
    gameView.start();
    // new GameView(game, ctx).start();
});
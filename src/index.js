const Game = require("./classes/game");
const LevelOne = require("./util/levels/level1");
// const GameView = require("./game_view");

console.log('its working');
document.addEventListener("DOMContentLoaded", () => {
    const boardCanvas = document.getElementById('board-canvas');
    const animateCanvas = document.getElementById('animate-canvas');
    // canvasEl.width = Game.DIM_X;
    // canvasEl.height = Game.DIM_Y;
    const game = new Game(boardCanvas, animateCanvas);
    // const level1 = new LevelOne();
    game.start();
    // new GameView(game, ctx).start();
});
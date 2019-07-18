const Game = require("./game");
const LevelOne = require("./util/levels/level1");
// const GameView = require("./game_view");

console.log('its working');
document.addEventListener("DOMContentLoaded", () => {
    const gameCanvas = document.getElementById('game-canvas');

    // canvasEl.width = Game.DIM_X;
    // canvasEl.height = Game.DIM_Y;
    const game = new Game(gameCanvas);
    const level1 = new LevelOne();
    game.drawLevel(level1);
    // new GameView(game, ctx).start();
});
const Game = require("./game");
// const GameView = require("./game_view");

console.log('its working');
document.addEventListener("DOMContentLoaded", () => {
    const gameCanvas = document.getElementById('game-canvas');

    // canvasEl.width = Game.DIM_X;
    // canvasEl.height = Game.DIM_Y;
    const ctx = gameCanvas.getContext("2d");
    const game = new Game(ctx);
    game.drawBoard();
    // new GameView(game, ctx).start();
});
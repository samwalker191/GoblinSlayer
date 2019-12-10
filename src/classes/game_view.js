const LevelOne = require("../util/levels/level1");
const Game = require("./game");

class GameView {
    constructor(game) {
        this.game = game;
    }

    start() {
        this.game.bindKeyListeners();
        this.lastTime = 0;
        this.game.drawBoard(this.game.levels[0]);
        this.showGame();
        requestAnimationFrame(this.animate.bind(this));
    }

    restart() {
        let gameOver = document.getElementsByClassName('game-over')[0];
        gameOver.classList.remove('animate-fade');
        
        this.game.bindKeyListeners();
        this.game.reset();
    }

    gameOver() {
        let boardCanvas = document.getElementById('board-canvas');
        let animateCanvas = document.getElementById('animate-canvas');
        let attackCanvas = document.getElementById('attack-canvas');
        let level1 = new LevelOne();
        let levels = [level1];
        this.game = new Game(boardCanvas, animateCanvas, attackCanvas, levels);
        this.restart();
    }

    animate(time) {
        requestAnimationFrame(this.animate.bind(this));
        const timeDelta = time - this.lastTime;
        if (this.game.checkGameOver()) {
            this.gameOver();
        }
        this.game.step(timeDelta);
        this.lastTime = time;
    }

    showGame() {
        const gameContainer = document.getElementsByClassName('game-container')[0];
        gameContainer.classList.remove('game-container');
        gameContainer.classList.add('game-container-active');
        const notGameElements = document.getElementsByClassName('not-game');
        Array.from(notGameElements).forEach((ele) => ele.classList.add('hidden'));
    }
}

module.exports = GameView;
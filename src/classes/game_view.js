const Game = require("./game");
const LevelOne = require("../util/levels/level1");
const whichTransitionEvent = require('../util/transition_detect_util');

class GameView {
    constructor(game) {
        this.game = game;
        this.pause = false;
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
        let cont = document.getElementsByClassName('cont')[0];
        let kills = document.getElementById('kills');
        let transitionEvent;
        kills.innerHTML = `Goblins Slain: ${this.game.kills}`;

        const gameOverFadeOut = (e) => {
            e.preventDefault();

            this.newGame();
            this.game.bindKeyListeners();
            this.pause = false;

            gameOver.classList.add('hidden');
            cont.classList.add('hidden');
            cont.classList.add('animate-fade');
            kills.classList.add('hidden');
            kills.classList.add('animate-fade');
            
            document.removeEventListener('keydown', gameOverFadeOut);
        }
        const transitionFunc = () => {
                cont.classList.remove('animate-fade');
                document.addEventListener('keydown', gameOverFadeOut)
                gameOver.removeEventListener(transitionEvent, transitionFunc);
        }
        const ded = () => {
            if (Array.from(gameOver.classList).includes('hidden')) {
                gameOver.classList.remove('hidden');
                gameOver.classList.add('animate-fade');
                cont.classList.remove('hidden');
                cont.classList.add('animate-fade');
                kills.classList.remove('hidden');
                kills.classList.add('animate-fade');
            } else {
                gameOver.classList.remove('animate-fade');
                kills.classList.remove('animate-fade');
            }

            transitionEvent = whichTransitionEvent();

            if (transitionEvent) {
                gameOver.addEventListener(transitionEvent, transitionFunc);
            } 
        };

        ded();
    }

    newGame() {
        let boardCanvas = document.getElementById('board-canvas');
        let animateCanvas = document.getElementById('animate-canvas');
        let attackCanvas = document.getElementById('attack-canvas');
        let level1 = new LevelOne();
        let levels = [level1];
        this.game = new Game(boardCanvas, animateCanvas, attackCanvas, levels);
    }

    gameOver() {
        this.pause = true;
        this.restart();
    }

    animate(time) {
        requestAnimationFrame(this.animate.bind(this));
        const timeDelta = time - this.lastTime;
        if (this.game.checkGameOver()) {
            this.gameOver();
        }
        if (!this.pause) {
            this.game.step(timeDelta);
        }
        this.lastTime = time;
    }

    showGame() {
        let gameOver = document.getElementsByClassName('game-over')[0];
        gameOver.classList.remove('hidden');
        const gameContainer = document.getElementsByClassName('game-container')[0];
        gameContainer.classList.remove('game-container');
        gameContainer.classList.add('game-container-active');
        const notGameElements = document.getElementsByClassName('not-game');
        Array.from(notGameElements).forEach((ele) => ele.classList.add('hidden'));
    }
}

module.exports = GameView;
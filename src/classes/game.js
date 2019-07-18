const Constants = require('../util/constants');
const LevelOne = require('../util/levels/level1');
const Player = require('./player');
const spriteSheet = require('../assets/images/spritesheet.png');

const FPS = 60;
class Game {
    constructor(boardCanvas, animateCanvas) {
        this.boardCanvas = boardCanvas;
        this.animateCanvas = animateCanvas;
        this.level1 = new LevelOne();
        this.player = new Player({ x: 1, y: 7 });
        this.img = new Image();
        this.img.src = spriteSheet;
        this.drawBoard();
    }

    start() {
        console.log('starting game');
        this.lastTime = 0;
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime;

        this.drawEntities()
        this.lastTime = time;
        requestAnimationFrame(this.animate.bind(this));
    }

    drawBoard() {
        // let img = new Image();
        // img.src = spriteSheet;
        window.onload = () => {
            this.level1.drawLevel(this.boardCanvas);
        }
    }

    drawEntities() {
        let img = new Image();
        img.src = spriteSheet;
        // window.onload = () => {
            this.player.drawPlayer(this.animateCanvas, this.level1);
        // }
    }
}

module.exports = Game
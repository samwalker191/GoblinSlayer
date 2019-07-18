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
    }    

    allObjects() {
        return [].concat(this.player);
    }

    step(inputs, timeDelta) {
        this.allObjects().forEach(obj => {
            obj.move(inputs, timeDelta);
        })
        this.drawEntities();
    }

    drawBoard(level) {
        // let img = new Image();
        // img.src = spriteSheet;
        window.onload = () => {
            level.drawLevel(this.boardCanvas);
        }
    }

    drawEntities() {
        let img = new Image();
        img.src = spriteSheet;
        this.player.drawPlayer(this.animateCanvas, this.level1);
    }
}

module.exports = Game
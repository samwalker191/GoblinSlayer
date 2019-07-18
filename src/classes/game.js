const Constants = require('../util/constants');
const LevelOne = require('../util/levels/level1');
const Player = require('./player');
const spriteSheet = require('../assets/images/spritesheet.png');

const FPS = 60;
class Game {
    constructor(boardCanvas, animateCanvas, levels) {
        this.boardCanvas = boardCanvas;
        this.animateCanvas = animateCanvas;
        this.levels = levels
        this.player = new Player({ x: 1, y: 7 });
        this.img = new Image();
        this.img.src = spriteSheet;
        this.drawBoard(this.levels[0]);
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

    bindKeyListeners() {
        document.addEventListener("keydown", (e) => {
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 87: // W
                    if (this.player.state === null) {
                        this.player.state = 'MOVING_UP';
                        this.player.destination = { x: this.player.pos.x, y: this.player.pos.y - 1 };
                    }
                    break;
                case 65: // A
                    if (this.player.state === null) {
                        this.player.state = 'MOVING_LEFT';
                        this.player.destination = { x: this.player.pos.x - 1, y: this.player.pos.y };
                    }
                    break;
                case 83: // S
                    if (this.player.state === null) {
                        this.player.state = 'MOVING_DOWN';
                        this.player.destination = { x: this.player.pos.x, y: this.player.pos.y + 1 };
                    }
                    break;
                case 68: // D
                    if (this.player.state === null) {
                        this.player.state = 'MOVING_RIGHT';
                        this.player.destination = { x: this.player.pos.x + 1, y: this.player.pos.y };
                    }
                    break;
                default:
                    break;
            }
        })
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
        this.player.drawPlayer(this.animateCanvas, this.levels[0]);
    }
}

module.exports = Game
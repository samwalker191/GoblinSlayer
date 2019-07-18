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
        this.currentLevel = levels[0];
        this.player = new Player({ col: 1, row: 2 }, this.currentLevel);
        this.img = new Image();
        this.img.src = spriteSheet;
        this.drawBoard(this.levels[0]);
    }    

    allObjects() {
        return [].concat(this.player);
    }

    step(timeDelta) {
        this.allObjects().forEach(obj => {
            obj.move(timeDelta);
        })
        this.drawEntities();
    }

    bindKeyListeners() {
        document.addEventListener("keydown", (e) => {
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 87: // W
                case 38: // UpArrow
                    if (this.player.state === null) {
                        this.player.state = 'MOVING_UP';
                        this.player.destination = { col: this.player.pos.col, row: this.player.pos.row - 1 };
                    }
                    break;
                case 65: // A
                case 37L // LeftArrow
                    if (this.player.state === null) {
                        this.player.state = 'MOVING_LEFT';
                        this.player.destination = { col: this.player.pos.col - 1, row: this.player.pos.row };
                    }
                    break;
                case 83: // S
                    if (this.player.state === null) {
                        this.player.state = 'MOVING_DOWN';
                        this.player.destination = { col: this.player.pos.col, row: this.player.pos.row + 1 };
                    }
                    break;
                case 68: // D
                case 39: // RightArrow
                    if (this.player.state === null) {
                        this.player.state = 'MOVING_RIGHT';
                        this.player.destination = { col: this.player.pos.col + 1, row: this.player.pos.row };
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
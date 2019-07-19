const Constants = require('../util/constants');
const LevelOne = require('../util/levels/level1');
const Player = require('./player');
const Goblin = require('./goblin');
const spriteSheet = require('../assets/images/spritesheet.png');

const FPS = 60;
class Game {
    constructor(boardCanvas, animateCanvas, levels) {
        this.boardCanvas = boardCanvas;
        this.animateCanvas = animateCanvas;
        this.aniCtx = this.animateCanvas.getContext('2d');
        this.levels = levels
        this.currentLevel = levels[0];
        this.player = new Player({ col: 1, row: 2 }, this.currentLevel, this.animateCanvas);
        this.goblin = new Goblin({ col: 2, row: 2 }, this.currentLevel, this.animateCanvas);
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
        this.aniCtx.save();
        this.drawEntities();
        this.aniCtx.restore();
    }

    bindKeyListeners() {
        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 87: // W
                case 38: // UpArrow
                    if (this.player.state === 'IDLE') {
                        this.player.state = 'MOVING_UP';
                        this.player.destination = { col: this.player.pos.col, row: this.player.pos.row - 1 };
                    }
                    break;
                case 65: // A
                case 37: // LeftArrow
                    if (this.player.state === 'IDLE') {
                        this.player.state = 'MOVING_LEFT';
                        this.player.destination = { col: this.player.pos.col - 1, row: this.player.pos.row };
                    }
                    break;
                case 83: // S
                case 40:
                    if (this.player.state === 'IDLE') {
                        this.player.state = 'MOVING_DOWN';
                        this.player.destination = { col: this.player.pos.col, row: this.player.pos.row + 1 };
                    }
                    break;
                case 68: // D
                case 39: // RightArrow
                    if (this.player.state === 'IDLE') {
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
        this.aniCtx.clearRect(0,0, 800, 800);

        this.aniCtx.save();
        this.player.draw(this.levels[0]);
        this.aniCtx.restore();

        this.aniCtx.save();
        this.goblin.draw(this.levels[0]);
        this.aniCtx.restore();

    }
}

module.exports = Game
const Constants = require('../util/constants');
const LevelOne = require('../util/levels/level1');
const Player = require('./player');
const Goblin = require('./goblin');
const Entity = require('./entity');
const spriteSheet = require('../assets/images/spritesheet.png');

const FPS = 60;
class Game {
    constructor(boardCanvas, animateCanvas, levels) {
        this.levels = levels
        this.currentLevel = levels[0];
        this.boardCanvas = boardCanvas;
        this.animateCanvas = animateCanvas;
        this.animateCanvas.width = this.currentLevel.tileSize * this.currentLevel.cols;
        this.animateCanvas.height = this.currentLevel.tileSize * this.currentLevel.rows;
        this.aniCtx = this.animateCanvas.getContext('2d');
        this.player = new Player({ col: 1, row: 2 }, this.currentLevel, this.animateCanvas);
        this.goblins = [];
        this.img = new Image();
        this.img.src = spriteSheet;
        this.drawBoard(this.levels[0]);
    }    

    allObjects() {
        return [].concat(this.player).concat(this.goblins);
    }

    addGoblin() {
        let goblin = new Goblin({ col: 7, row: 7 }, this.currentLevel, this.animateCanvas, this.player.pos);
        this.goblins.push(goblin);
    }

    step(timeDelta) {
        this.allObjects().forEach(obj => {
            obj.move(timeDelta);
        })
        // this.aniCtx.save();
        this.drawEntities();
        // this.aniCtx.restore();
    }

    bindKeyListeners() {
        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 87: // W
                
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_UP';
                        this.player.destination = { col: this.player.pos.col, row: this.player.pos.row - 1 };
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                    break;
                case 65: // A
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_LEFT';
                        this.player.destination = { col: this.player.pos.col - 1, row: this.player.pos.row }; 
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                    break;
                case 83: // S
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_DOWN';
                        this.player.destination = { col: this.player.pos.col, row: this.player.pos.row + 1 };   
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                    break;
                case 68: // D
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_RIGHT';
                        this.player.destination = { col: this.player.pos.col + 1, row: this.player.pos.row };    
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                    break;
                case 38: // UpArrow
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state === 'ATTACK_UP';
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                case 37: // LeftArrow
                case 40: // DownArrow
                case 39: // RightArrow

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
        this.aniCtx.clearRect(0,0, 5000, 5000);
        console.log(this.allObjects());
        
        // this.aniCtx.save();
        this.allObjects().forEach(obj => obj.draw(this.currentLevel));
        // this.goblin.draw(this.levels[0]);
        // this.player.draw(this.levels[0]);
        // this.aniCtx.restore();

        // this.aniCtx.save();
        // this.aniCtx.restore();

    }
}

module.exports = Game
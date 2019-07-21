const Constants = require('../util/constants');
const Util = require('../util/game_util');
const LevelOne = require('../util/levels/level1');
const Player = require('./player');
const Goblin = require('./goblin');
const Entity = require('./entity');
const spriteSheet = require('../assets/images/spritesheet.png');

const FPS = 60;
class Game {
    constructor(boardCanvas, animateCanvas, attackCanvas, levels) {
        this.levels = levels
        this.kills = 0;
        this.currentLevel = levels[0];
        this.boardCanvas = boardCanvas;
        this.animateCanvas = animateCanvas;
        this.animateCanvas.width = this.currentLevel.tileSize * this.currentLevel.cols;
        this.animateCanvas.height = this.currentLevel.tileSize * this.currentLevel.rows;
        this.attackCanvas = attackCanvas;
        this.attackCanvas.width = this.currentLevel.tileSize * this.currentLevel.cols;
        this.attackCanvas.height = this.currentLevel.tileSize * this.currentLevel.rows;
        this.aniCtx = this.animateCanvas.getContext('2d');
        this.attackCtx = this.attackCanvas.getContext('2d');
        this.player = new Player({ col: 1, row: 2 }, this.currentLevel, this.animateCanvas, this.attackCanvas);
        this.goblins = [];
        this.img = new Image();
        this.img.src = spriteSheet;
        this.drawBoard(this.levels[0]);
    }    

    allObjects() {
        return [].concat(this.player).concat(this.goblins);
    }

    allEnemies() {
        return [].concat(this.goblins);
    }

    allOccupiedTiles() {
        let occupiedTiles = [];
        occupiedTiles.push(this.player.pos);
        this.goblins.forEach(goblin => {
            occupiedTiles.push(goblin.pos);
        })
        return occupiedTiles;
    }

    randomPos() {
        let pos = { col: Util.randomInt(1, 9), row: Util.randomInt(2, 8) };

    }

    addGoblin() {
        let goblin1 = new Goblin({ col: 9, row: 8 }, this.currentLevel, this.animateCanvas, this.player.pos);
        let goblin2 = new Goblin({ col: 1, row: 8 }, this.currentLevel, this.animateCanvas, this.player.pos);
        let goblin3 = new Goblin({ col: 2, row: 8 }, this.currentLevel, this.animateCanvas, this.player.pos);
        let goblin4 = new Goblin({ col: 9, row: 7 }, this.currentLevel, this.animateCanvas, this.player.pos);
        this.goblins.push(goblin1, goblin2, goblin3, goblin4);
    }

    step(timeDelta) {
        console.log(this.currentLevel.board);
        this.aniCtx.clearRect(0, 0, 5000, 5000);
        if (this.player.state.includes('ATTACK')) {
            this.player.drawAttack();            
            this.goblins.forEach((goblin, idx) => {
                if (this.player.attack(goblin)) {
                    this.goblins.splice(idx, 1);
                    this.kills += 1;
                }
            })
        }
        this.allObjects().forEach(obj => {
            obj.move(timeDelta);
        })
        this.drawEntities();
    }

    bindKeyListeners() {
        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 87: // W
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_UP';
                        this.player.destination = { col: this.player.pos.col, row: this.player.pos.row - 1 };
                        this.player.oldPos = { col: this.player.pos.col, row: this.player.pos.row };
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                    break;
                case 65: // A
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_LEFT';
                        this.player.destination = { col: this.player.pos.col - 1, row: this.player.pos.row }; 
                        this.player.oldPos = { col: this.player.pos.col, row: this.player.pos.row };
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                    break;
                case 83: // S
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_DOWN';
                        this.player.destination = { col: this.player.pos.col, row: this.player.pos.row + 1 };   
                        this.player.oldPos = { col: this.player.pos.col, row: this.player.pos.row };
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                    break;
                case 68: // D
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_RIGHT';
                        this.player.destination = { col: this.player.pos.col + 1, row: this.player.pos.row };    
                        this.player.oldPos = { col: this.player.pos.col, row: this.player.pos.row };
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                    break;
                case 38: // UpArrow
                    e.preventDefault();
                    if (this.player.state === 'IDLE' && this.player.attacking <= 0 && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'ATTACK_UP';
                        this.player.attacking = 100;
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                case 37: // LeftArrow
                    e.preventDefault();
                    if (this.player.state === 'IDLE' && this.player.attacking <= 0 && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'ATTACK_LEFT';
                        this.player.attacking = 100;
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                case 40: // DownArrow
                    e.preventDefault();
                    if (this.player.state === 'IDLE' && this.player.attacking <= 0 && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'ATTACK_DOWN';
                        this.player.attacking = 100;
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                case 39: // RightArrow
                    e.preventDefault();
                    if (this.player.state === 'IDLE' && this.player.attacking <= 0 && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'ATTACK_RIGHT';
                        this.player.attacking = 100;
                        this.goblins.forEach(goblin => goblin.state = 'MOVING');
                    }
                default:
                    break;
            }
        })
    }

    drawBoard(level) {
        window.onload = () => {
            level.drawLevel(this.boardCanvas);
        }
    }

    drawEntities() {
        this.allObjects().forEach(obj => obj.draw(this.currentLevel));
    }
}

module.exports = Game
const Constants = require('../util/constants');
const Util = require('../util/game_util');
const LevelOne = require('../util/levels/level1');
const Player = require('./player');
const Goblin = require('./goblin');
const spriteSheet = require('../assets/images/spritesheet.png');

class Game {
    constructor(boardCanvas, animateCanvas, attackCanvas, levels) {
        this.levels = levels
        this.kills = 0;
        this.limit = 1;
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

    resolveCollisions() {
        for (let i = 0; i < this.goblins.length; i++) {
            for (let j = i+1; j < this.goblins.length; j++) {
                if ((this.goblins[i].pos.col === this.goblins[j].pos.col) && (this.goblins[i].pos.row === this.goblins[j].pos.row)) {
                    this.goblins.splice(i, 1);
                }
            }
        }
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
        this.allOccupiedTiles().forEach(tile => {
            while (pos.col === tile.col && pos.row === tile.row) {
                pos = { col: Util.randomInt(1, 9), row: Util.randomInt(2, 8) };
            }
        })
        return pos;
    }

    addGoblins() {
        while (this.goblins.length < this.limit) {
            this.goblins.push(new Goblin(this.randomPos(), this.currentLevel, this.animateCanvas, this.player.pos));
        }
    }
    
    updateBoard() {
        if (Number.isInteger(this.player.pos.row) && Number.isInteger(this.player.pos.col)) {
            this.currentLevel.board[this.player.pos.row][this.player.pos.col] = -1;
        }

        this.goblins.forEach(goblin => {
            if (Number.isInteger(goblin.pos.row) && Number.isInteger(goblin.pos.col)) {
                this.currentLevel.board[goblin.pos.row][goblin.pos.col] = -2;
            }
        })
    }

    increaseDifficulty() {
        this.limit = Math.ceil(this.kills / 2.5);
    }

    step(timeDelta) {
        this.aniCtx.clearRect(0, 0, 5000, 5000);
        this.resolveCollisions();
        if (this.player.state.includes('ATTACK')) {
            this.player.drawAttack();            
            this.goblins.forEach((goblin, idx) => {
                if (this.player.attack(goblin)) {
                    this.goblins.splice(idx, 1);
                    this.currentLevel.board[goblin.pos.row][goblin.pos.col] = 0;
                    this.kills += 1;
                }
            })
        }
        this.allObjects().forEach(obj => {
            obj.move(timeDelta);
        })
        if (this.goblins.length === 0) {
            this.addGoblins();
        }
        this.drawEntities();
        this.updateBoard();
        this.increaseDifficulty();
    }

    bindKeyListeners() {
        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 87: // W
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_UP';
                        this.player.destination = { col: this.player.pos.col, row: this.player.pos.row - 1 };
                        this.player.oldPos = { col: this.player.pos.col, row: this.player.pos.row };
                        this.goblins.forEach(goblin => {
                            goblin.state = 'MOVING';
                        });
                    }
                    break;
                case 65: // A
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_LEFT';
                        this.player.destination = { col: this.player.pos.col - 1, row: this.player.pos.row }; 
                        this.player.oldPos = { col: this.player.pos.col, row: this.player.pos.row };
                        this.goblins.forEach(goblin => {
                            
                            goblin.state = 'MOVING';
                        });                    
                    }
                    break;
                case 83: // S
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_DOWN';
                        this.player.destination = { col: this.player.pos.col, row: this.player.pos.row + 1 };   
                        this.player.oldPos = { col: this.player.pos.col, row: this.player.pos.row };
                        this.goblins.forEach(goblin => {
                            goblin.state = 'MOVING';
                        });                    
                    }
                    break;
                case 68: // D
                    if (this.player.state === 'IDLE' && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.player.state = 'MOVING_RIGHT';
                        this.player.destination = { col: this.player.pos.col + 1, row: this.player.pos.row };    
                        this.player.oldPos = { col: this.player.pos.col, row: this.player.pos.row };
                        this.goblins.forEach(goblin => {
                            goblin.state = 'MOVING';
                        });                    
                    }
                    break;
                case 38: // UpArrow
                    e.preventDefault();
                    if (this.player.state === 'IDLE' && this.player.attacking <= 0 && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.swordAudio();
                        this.player.state = 'ATTACK_UP';
                        this.player.attacking = 100;
                        this.goblins.forEach(goblin => {
                            goblin.state = 'MOVING';
                        });                    
                    }
                case 37: // LeftArrow
                    e.preventDefault();
                    if (this.player.state === 'IDLE' && this.player.attacking <= 0 && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.swordAudio();
                        this.player.state = 'ATTACK_LEFT';
                        this.player.attacking = 100;
                        this.goblins.forEach(goblin => {
                            goblin.state = 'MOVING';
                        });                    
                    }
                case 40: // DownArrow
                    e.preventDefault();
                    if (this.player.state === 'IDLE' && this.player.attacking <= 0 && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.swordAudio();
                        this.player.state = 'ATTACK_DOWN';
                        this.player.attacking = 100;
                        this.goblins.forEach(goblin => {
                            goblin.state = 'MOVING';
                        });                    
                    }
                case 39: // RightArrow
                    e.preventDefault();
                    if (this.player.state === 'IDLE' && this.player.attacking <= 0 && this.goblins.every(goblin => goblin.state === 'IDLE')) {
                        this.swordAudio();                    
                        this.player.state = 'ATTACK_RIGHT';
                        this.player.attacking = 100;
                        this.goblins.forEach(goblin => {
                            goblin.state = 'MOVING';
                        });                    
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

    swordAudio() { //“Sound effects obtained from https://www.zapsplat.com“
        let sound = document.getElementById("sword-slash");
        sound.play();
    }
}

module.exports = Game
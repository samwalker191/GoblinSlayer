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
        this.spawnAmount = 1;
        this.spawnCounter = 0;
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
        this.player = new Player({ col: 5, row: 5 }, this.currentLevel, this.animateCanvas, this.attackCanvas);
        this.goblins = [];
        this.img = new Image();
        this.img.src = spriteSheet;
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

    reset() {
        this.goblins = [];
        this.player.pos = {col: 5, row: 5};
        this.kills = 0;
        this.limit = 1;
    }

    checkGameOver() {
        let playerPosX = this.player.pos.col;
        let playerPosY = this.player.pos.row;
        for (let idx = 0; idx < this.goblins.length; idx++) {
            let goblinPosX = this.goblins[idx].pos.col;
            let goblinPosY = this.goblins[idx].pos.row;
            if (goblinPosX === playerPosX && goblinPosY === playerPosY) {
                return true;
            }
        }
        return false;
    }

    randomPos() {
        let idx = Util.randomInt(0, Util.outerPos.length); 
        let posArr = Util.outerPos[idx];
        let pos = { col: posArr[0], row: posArr[1] }
        return pos;
       
    }

    addGoblins() {
        if (this.goblins.length < this.limit) {
            for (let i = 0; i < this.spawnAmount; i++) {
                this.goblins.push(new Goblin(this.randomPos(), this.currentLevel, this.animateCanvas, this.player.pos));
            }
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
        if (this.kills > 0) {
            if (this.kills % 4 === 0) {
                this.limit += 1;
            }
            if (this.kills % 10 === 0) {
                this.spawnAmount += 1;
            }
        }
    }

    step(timeDelta) {
        this.aniCtx.clearRect(0, 0, 5000, 5000);
        
        if (this.player.state.includes('ATTACK')) {
            this.player.drawAttack();            
            this.goblins.forEach((goblin, idx) => {
                if (this.player.attack(goblin)) {
                    this.goblins[idx] = '';
                    this.currentLevel.board[goblin.pos.row][goblin.pos.col] = 0;
                    this.kills += 1;
                }
            })
            this.goblins = this.goblins.filter(Boolean);
        }
        this.allObjects().forEach(obj => {
            obj.move(timeDelta);
        })
     
        if (this.spawnCounter === 0) {
            this.addGoblins();
            this.spawnCounter = 3;
            this.increaseDifficulty();
        }
        this.drawEntities();
        this.updateBoard();
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
                        this.spawnCounter -= 1;
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
                        this.spawnCounter -= 1;
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
                        this.spawnCounter -= 1;
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
                        this.spawnCounter -= 1;
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
                        this.spawnCounter -= 1;
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
                        this.spawnCounter -= 1;
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
                        this.spawnCounter -= 1;
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
                        this.spawnCounter -= 1;
                    }
                default:
                    break;
            }
        })
    }

    drawBoard(level) {
        level.drawLevel(this.boardCanvas);
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
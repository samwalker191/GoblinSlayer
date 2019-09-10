const Entity = require('./entity');
const Sprite = require('../util/sprite_util');
const AttackSprite = require('../util/attack_sprite');
const Constants = require('../util/constants');

class Player extends Entity {
    constructor(pos, currentlevel, canvas, attackCanvas) {
        super(pos, currentlevel, canvas);
        this.size = { w: 64, h: 112 };
        this.oldPos = this.pos;
        this.state = 'IDLE';
        this.attacking = 0;
        this.tileToAttack = null;
        this.attackCanvas = attackCanvas;
        this.playerSprite = new Sprite({
            ctx: canvas.getContext('2d'),
            img: this.img,
            ticksPerFrame: 4,
            numberOfFrames: 4,
            loop: true
        });
        this.attackSprite = new AttackSprite({
            ctx: this.attackCanvas.getContext('2d'),
            img: this.img,
            ticksPerRotate: 0.5,
            numberOfRotations: 6,
            rotateDegrees: 45,
            loop: false
        });
    }

    setTileToAttack() {
        // this.attacking = 4;
        if (this.state === 'ATTACK_UP') {
            this.tileToAttack = { col: this.pos.col, row: this.pos.row - 1 };
        } else if (this.state === 'ATTACK_LEFT') {
            this.tileToAttack = { col: this.pos.col - 1, row: this.pos.row };
        } else if (this.state === 'ATTACK_DOWN') {
            this.tileToAttack = { col: this.pos.col, row: this.pos.row + 1 };
        } else if (this.state === 'ATTACK_RIGHT') {
            this.tileToAttack = { col: this.pos.col + 1, row: this.pos.row };
        } 
    }

    attack(enemy) {
        this.setTileToAttack();
        // this.drawAttack();
        // this.state = 'IDLE';
        return (enemy.pos.col === this.tileToAttack.col && enemy.pos.row === this.tileToAttack.row);
    }

    move(timeDelta) {
        if (this.attacking > 0) {
            this.attacking -= timeDelta;
            return;
        } else if (this.attacking < 0) {
            this.attacking = 0;
            this.state = 'IDLE';
        }
        if (this.state === 'MOVING_UP') {
            if (this.validMove(this.destination)) {
                if (Math.ceil(this.pos.row) === this.destination.row) {
                    this.pos.row = this.destination.row;
                    this.currentLevel.board[this.oldPos.col][this.oldPos.row] = 0;
                    this.currentLevel.board[this.destination.col][this.destination.row] = -1;
                    this.state = 'IDLE';
                    return;
                } else {
                    this.pos.row += -2 / timeDelta;
                }
            } else {
                this.state = 'IDLE';
            }
        } else if (this.state === 'MOVING_LEFT') {
            if (this.validMove(this.destination)) {
                if (Math.ceil(this.pos.col) === this.destination.col) {
                    this.pos.col = this.destination.col;
                    this.currentLevel.board[this.oldPos.row][this.oldPos.col] = 0;
                    this.currentLevel.board[this.destination.row][this.destination.col] = -1;
                    this.state = 'IDLE';
                    return;
                } else {
                    this.pos.col += -2 / timeDelta;
                }
            } else {
                this.state = 'IDLE';
            }
        } else if (this.state === 'MOVING_DOWN') {
            if (this.validMove(this.destination)) {
                if (Math.floor(this.pos.row) === this.destination.row) {
                    this.pos.row = this.destination.row;
                    this.currentLevel.board[this.oldPos.row][this.oldPos.col] = 0;
                    this.currentLevel.board[this.destination.row][this.destination.col] = -1;
                    this.state = 'IDLE';
                    return;
                } else {
                    this.pos.row += 2 / timeDelta;
                }
            } else {
                this.state = 'IDLE';
            }
        } else if (this.state === 'MOVING_RIGHT') {
            if (this.validMove(this.destination)) {
                if (Math.floor(this.pos.col) === this.destination.col) {
                    this.pos.col = this.destination.col;
                    this.currentLevel.board[this.oldPos.row][this.oldPos.col] = 0;
                    this.currentLevel.board[this.destination.row][this.destination.col] = -1;
                    this.state = 'IDLE';
                    return;
                } else {
                    this.pos.col += 2 / timeDelta;
                }
            } else {
                this.state = 'IDLE';
            }
        }
    }

    draw() {
        this.playerSprite.update();
        if (this.state === "IDLE") {
            this.playerSprite.render(
                this.pos.col,
                this.pos.row,
                this.size.w,
                this.size.h,
                128,
                68,
                16,
                28,
                64
            );
        } else if (this.state.includes('MOVING')) {
            this.playerSprite.render(
                this.pos.col,
                this.pos.row,
                this.size.w,
                this.size.h,
                192,
                68,
                16,
                28,
                64
            )
        } else {
            this.playerSprite.render(
                this.pos.col,
                this.pos.row,
                this.size.w,
                this.size.h,
                128,
                68,
                16,
                28,
                64
            );
        }
    }

    drawAttack() {
        let ctx = this.attackCanvas.getContext('2d');
        let offsetX;
        let offsetY;
        let rotateBy;
        if (this.state === 'ATTACK_UP') {
            this.attackSprite.rotateDegrees = -45;
            offsetX = -64;
            offsetY = 0;
            rotateBy = 11.125;
        } else if (this.state === 'ATTACK_LEFT') {
            this.attackSprite.rotateDegrees = 0;
            offsetX = -64;
            offsetY = -0;
            rotateBy = -11.125;
        } else if (this.state === 'ATTACK_DOWN') {
            this.attackSprite.rotateDegrees = 90;
            offsetX = -64;
            offsetY = 0;
            rotateBy = 11.125;
        } else if (this.state === 'ATTACK_RIGHT') {
            this.attackSprite.rotateDegrees = 0;
            offsetX = -64;
            offsetY = 0;
            rotateBy = 11.125;
        }
        this.attackSprite.update();
        this.attackSprite.render(
            this.pos.col, // col
            this.pos.row, // row
            40, // width
            84, // height
            323, // sheetPosX
            26, // sheetPosY
            10, // spriteSizeW
            21, // spriteSizeH
            offsetX,
            offsetY,
            rotateBy
        );
        if (this.attacking <= 0) {
            this.attackSprite.frameIndex = 0;
            ctx.clearRect(0, 0, 5000, 5000);
        }
    }
}

module.exports = Player;
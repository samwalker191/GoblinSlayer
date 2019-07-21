const Entity = require('./entity');
const Sprite = require('../util/sprite_util');
const Constants = require('../util/constants');

class Player extends Entity {
    constructor(pos, currentlevel, canvas) {
        super(pos, currentlevel, canvas);
        this.size = { w: 64, h: 112 };
        this.state = 'IDLE';
        this.tileToAttack = null;
        this.playerSprite = new Sprite({
            ctx: canvas.getContext('2d'),
            width: 128 * 4,
            height: 68,
            img: this.img,
            ticksPerFrame: 5,
            numberOfFrames: 4,
            loop: true
        });
    }

    setTileToAttack() {
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
        this.state = 'IDLE';
        return (enemy.pos.col === this.tileToAttack.col && enemy.pos.row === this.tileToAttack.row);
    }

    move(timeDelta) {
        if (this.state === 'MOVING_UP') {
            if (this.validMove(this.destination)) {
                if (Math.ceil(this.pos.row) === this.destination.row) {
                    this.pos.row = this.destination.row;
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

    draw(level) {
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
        // ctx1.drawImage(
        //     img, 128, 68, 16, 28,
        //     this.pos.col * Constants.TILE_SIZE,
        //     this.pos.row * Constants.TILE_SIZE - 64,
        //     this.size.w,
        //     this.size.h
        // )

    }

    drawAttack(ctx) {
        // if (this.state.includes('ATTACK')) {
            
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.msImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;
            ctx.save();
            ctx.translate(this.pos.col * Constants.TILE_SIZE, this.pos.row * Constants.TILE_SIZE);
            ctx.rotate(90 * Math.PI / 180);
            ctx.translate(-this.pos.col * Constants.TILE_SIZE, -this.pos.row * Constants.TILE_SIZE);
            ctx.drawImage(
                this.img,
                323, // sheetPosX
                26, // sheetPosY
                10, // spriteSizeW
                21, // spriteSizeH
                this.pos.col * Constants.TILE_SIZE, // posX on canvas to draw 
                this.pos.row * Constants.TILE_SIZE - 112, // posY on canvas to draw
                40, // sizeW to draw on canvas
                84 // sizeH to draw on canvas
            )
            ctx.restore();
        // }
    }
}

module.exports = Player;
const Entity = require('./entity');
const Sprite = require('../util/sprite_util');

class Player extends Entity {
    constructor(pos, currentlevel, canvas) {
        super(pos, currentlevel, canvas);
        this.size = { w: 64, h: 112 };
        this.state = 'IDLE';
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
        debugger
        // this.canvas.width = level.tileSize * level.cols;
        // this.canvas.height = level.tileSize * level.rows;
        
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
        }
        // ctx1.drawImage(
        //     img, 128, 68, 16, 28,
        //     this.pos.col * Constants.TILE_SIZE,
        //     this.pos.row * Constants.TILE_SIZE - 64,
        //     this.size.w,
        //     this.size.h
        // )

    }

    // drawPlayer(canvas, level) {
    //     let playerSprite = new Sprite({
    //         ctx: canvas.getContext('2d');
    //     })
    //     let ctx1 = canvas.getContext('2d');
    //     canvas.width = level.tileSize * level.cols;
    //     canvas.height = level.tileSize * level.rows;
    //     let img = new Image();
    //     img.src = spriteSheet;
    //     ctx1.mozImageSmoothingEnabled = false;
    //     ctx1.webkitImageSmoothingEnabled = false;
    //     ctx1.msImageSmoothingEnabled = false;
    //     ctx1.imageSmoothingEnabled = false;
        // ctx1.clearRect(this.pos.col, this.pos.row, this.size.w, this.size.h);
    //     ctx1.drawImage(
    //         img, 128, 68, 16, 28,
    //         this.pos.col * Constants.TILE_SIZE,
    //         this.pos.row * Constants.TILE_SIZE - 64,
    //         this.size.w,
    //         this.size.h
    //     )

    // }
};

module.exports = Player;
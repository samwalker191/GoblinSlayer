const Util = require('../util/game_util');
const MovingObject = require('./moving_object');
const spriteSheet = require('../assets/images/spritesheet.png');
const Constants = require('../util/constants');

class Player extends MovingObject {
    constructor(pos, currentlevel) {
        super(pos);
        this.size = { w: 64, h: 112 };
        this.state = null;
        this.destination = null;
        this.currentLevel = currentlevel;
    }

    updatePos() {

    }

    validMove(destination) {
        // console.log(`playerPos: ${this.pos}`);
        // console.log(`Destination: ${destination}`);
        // console.log(this.currentLevel.board[destination.col][destination.row])
        console.log(this.pos);
        return this.currentLevel.board[destination.row][destination.col] < 1;
    }

    move(timeDelta) {
        if (this.state === 'MOVING_UP') {
            if (this.validMove(this.destination)) {
                if (Math.ceil(this.pos.row) === this.destination.row) {
                    this.pos.row = this.destination.row;
                    this.state = null;
                    return;
                } else {
                    this.pos.row += -2 / timeDelta;
                }
            } else {
                this.state = null;
            }
        } else if (this.state === 'MOVING_LEFT') {
            if (this.validMove(this.destination)) {
                if (Math.ceil(this.pos.col) === this.destination.col) {
                    this.pos.col = this.destination.col;
                    this.state = null;
                    return;
                } else {
                    this.pos.col += -2 / timeDelta;
                }
            } else {
                this.state = null;
            }
        } else if (this.state === 'MOVING_DOWN') {
            if (this.validMove(this.destination)) {
                if (Math.floor(this.pos.row) === this.destination.row) {
                    this.pos.row = this.destination.row;
                    this.state = null;
                    return;
                } else {
                    this.pos.row += 2 / timeDelta;
                }
            } else {
                this.state = null;
            }
        } else if (this.state === 'MOVING_RIGHT') {
            if (this.validMove(this.destination)) {
                if (Math.floor(this.pos.col) === this.destination.col) {
                    this.pos.col = this.destination.col;
                    this.state = null;
                    return;
                } else {
                    this.pos.col += 2 / timeDelta;
                }
            } else {
                this.state = null;
            }
        }
    }

    sprite(options) {
        var that = {};

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;
    }

    updateDraw(

    )

    drawPlayer(canvas, level) {
        let ctx1 = canvas.getContext('2d');
        canvas.width = level.tileSize * level.cols;
        canvas.height = level.tileSize * level.rows;
        let img = new Image();
        img.src = spriteSheet;
        ctx1.mozImageSmoothingEnabled = false;
        ctx1.webkitImageSmoothingEnabled = false;
        ctx1.msImageSmoothingEnabled = false;
        ctx1.imageSmoothingEnabled = false;
        ctx1.clearRect(this.pos.col, this.pos.row, this.size.w, this.size.h);
        ctx1.drawImage(
            img, 128, 68, 16, 28,
            this.pos.col * Constants.TILE_SIZE,
            this.pos.row * Constants.TILE_SIZE - 64,
            this.size.w,
            this.size.h
        )

    }
};

module.exports = Player;
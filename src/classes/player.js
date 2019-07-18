const Util = require('../util/game_util');
const MovingObject = require('./moving_object');
const spriteSheet = require('../assets/images/spritesheet.png');
const Constants = require('../util/constants');

class Player extends MovingObject {
    constructor(pos, currentlevel) {
        super(pos);
        this.size = { w: 64, h: 112 };
        this.vel = { x: 0, y: 0 };
        this.state = null;
        this.destination = null;
        this.currentLevel = currentlevel;
    }

    updatePos() {

    }

    validMove(destination) {
        
        return this.currentLevel.board[destination.x][destination.y] <= 2;
    }

    move(timeDelta) {
        if (this.state === 'MOVING_UP') {
            console.log(this.validMove(this.destination));
            if (this.validMove(this.destination)) {
                if (Math.ceil(this.pos.y) === this.destination.y) {
                    this.pos.y = this.destination.y;
                    this.state = null;
                    return;
                } else {
                    this.pos.y += -2 / timeDelta;
                }
            } else {
                this.state = null;
            }
        } else if (this.state === 'MOVING_LEFT') {
            if (Math.ceil(this.pos.x) === this.destination.x) {
                this.pos.x = this.destination.x;
                this.state = null;
                return;
            } else {
                this.pos.x += -2 / timeDelta;
            }
        } else if (this.state === 'MOVING_DOWN') {
            if (Math.floor(this.pos.y) === this.destination.y) {
                this.pos.y = this.destination.y;
                this.state = null;
                return;
            } else {
                this.pos.y += 2 / timeDelta;
            }
        } else if (this.state === 'MOVING_RIGHT') {
            if (Math.floor(this.pos.x) === this.destination.x) {
                this.pos.x = this.destination.x;
                this.state = null;
                return;
            } else {
                this.pos.x += 2 / timeDelta;
            }
        }
    }

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
        ctx1.clearRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
        ctx1.drawImage(
            img, 128, 68, 16, 28,
            this.pos.x * Constants.TILE_SIZE,
            this.pos.y * Constants.TILE_SIZE,
            this.size.w,
            this.size.h
        )

    }
};

module.exports = Player;
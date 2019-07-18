const Util = require('../util/game_util');
const MovingObject = require('./movingObject');
const spriteSheet = require('../../assets/spritesheet.png');
const Constants = require('../util/constants');

class Player extends MovingObject {
    constructor(pos) {
        super(pos);
        this.size = { w: 16, h: 28 };

    }

    draw(ctx) {
        let img = new Image();
        img.src = spriteSheet;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
        window.onload = () => {
            ctx.drawImage(
                img, 128, 68, this.size.w, this.size.h,
                this.pos.x * Constants.TILE_SIZE,
                this.pos.y * Constants.TILE_SIZE,
                this.size.w,
                this.size.h
            )
        };
    }
};

module.exports = Player;
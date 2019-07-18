const Util = require('../util/game_util');
const MovingObject = require('./movingObject');
const spriteSheet = require('../assets/images/spritesheet.png');
const Constants = require('../util/constants');

class Player extends MovingObject {
    constructor(pos) {
        super(pos);
        this.size = { w: 64, h: 112 };
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
        // window.onload = () => {
            ctx1.drawImage(
                img, 128, 68, 16, 28,
                this.pos.x * Constants.TILE_SIZE,
                this.pos.y * Constants.TILE_SIZE,
                this.size.w,
                this.size.h
            )

        // }
    }
};

module.exports = Player;
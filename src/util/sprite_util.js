const Constants = require('./constants');

class Sprite {
    constructor(options) {
        this.ctx = options.ctx;
        this.img = options.img;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;
        this.loop = options.loop;
    }

    update() {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;

            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex += 1;
            } else if (this.loop) {
                this.frameIndex = 0;
            }
        }
        
    }

    render(col, row, width, height, sheetPosX, sheetPosY, spriteSizeW, spriteSizeH, pixelOffSet) {
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        // this.ctx.clearRect(col, row, width, height)
        // this.ctx.save();
        this.ctx.drawImage(
            this.img,
            (this.frameIndex * 16) + sheetPosX,
            sheetPosY,
            spriteSizeW,
            spriteSizeH,
            col * Constants.TILE_SIZE,
            row * Constants.TILE_SIZE - pixelOffSet,
            width,
            height
        );
        // this.ctx.restore();
    }
}

module.exports = Sprite;
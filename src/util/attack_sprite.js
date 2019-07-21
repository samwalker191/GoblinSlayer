const Constants = require('./constants');

class AttackSprite {
    constructor(options) {
        this.ctx = options.ctx;
        this.img = options.img;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerRotate = options.ticksPerRotate || 0;
        this.numberOfRotations = options.numberOfRotations || 1;
        this.rotateDegrees = options.rotateDegrees;
        this.startDegrees = options.rotateDegrees;
        this.loop = options.loop;
    }

    update() {
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerRotate) {
            this.tickCount = 0;

            if (this.frameIndex < this.numberOfRotations - 1) {
                this.frameIndex += 1;
            } else if (this.loop) {
                this.frameIndex = 0;
            }
        }
    }

    render(col, row, width, height, sheetPosX, sheetPosY, spriteSizeW, spriteSizeH, pixelOffSet, rotation) {
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        debugger
        // for (let i = 0; i < this.numberOfRotations - 1; i++) {
            this.ctx.clearRect(0, 0, 5000, 5000);
            this.ctx.save();
            this.ctx.translate(col * Constants.TILE_SIZE, row * Constants.TILE_SIZE);
            this.ctx.rotate(this.rotateDegrees + (7.5 * this.frameIndex) * Math.PI / 180);
            this.ctx.translate((-col * Constants.TILE_SIZE), (-row * Constants.TILE_SIZE));
            this.ctx.drawImage(
                this.img,
                sheetPosX,
                sheetPosY,
                spriteSizeW,
                spriteSizeH,
                col * Constants.TILE_SIZE,
                row * Constants.TILE_SIZE - 112,
                width,
                height
            );
            this.ctx.restore();
        // }
    }
}

module.exports = AttackSprite;
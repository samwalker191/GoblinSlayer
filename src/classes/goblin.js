const Entity = require('./entity');
const Sprite = require('../util/sprite_util');

// goblin_idle_anim 368 32 16 16 4
// goblin_run_anim 432 32 16 16 4

class Goblin extends Entity {
    constructor(pos, currentlevel, canvas) {
        super(pos, currentlevel, canvas);
        this.size = { w: 64, h: 64 };
        this.state = 'IDLE';
        this.goblinSprite = new Sprite({
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
        
    }

    draw(level) {
        this.canvas.width = level.tileSize * level.cols;
        this.canvas.height = level.tileSize * level.rows;

        this.goblinSprite.update();
        if (this.state === "IDLE") {
            this.goblinSprite.render(
                this.pos.col,
                this.pos.row,
                this.size.w,
                this.size.h,
                368,
                32,
                16,
                16,
                16
            );
        } else {
            this.goblinSprite.render(
                this.pos.col,
                this.pos.row,
                this.size.w,
                this.size.h,
                432,
                32,
                16,
                16,
                16
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
}

module.exports = Goblin;


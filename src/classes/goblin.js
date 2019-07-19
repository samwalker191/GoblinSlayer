const Entity = require('./entity');
const Sprite = require('../util/sprite_util');
const findPath = require('../util/movement_util');

// goblin_idle_anim 368 32 16 16 4
// goblin_run_anim 432 32 16 16 4

class Goblin extends Entity {
    constructor(pos, currentlevel, canvas, playerPos) {
        super(pos, currentlevel, canvas);
        this.playerPos = playerPos;
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
        let destination;
        // if (this.state === 'IDLE') {
            destination = findPath(
                this.currentLevel.board, 
                this.pos, 
                { col: Math.round(this.playerPos.col), row: Math.round(this.playerPos.row) }
            )[1];
        // } 
        if (this.state === 'MOVING') {

            if (destination.row === this.pos.row - 1) { // MOVING UP
                while (Math.ceil(this.pos.row) !== destination.row) {
                    this.pos.row += -2 / timeDelta;
                }
                this.pos.row = destination.row;
                this.state = 'IDLE';
                return;
            }

            if (destination.col === this.pos.col - 1) { // MOVING LEFT
                while (Math.ceil(this.pos.col) !== destination.col) {
                    this.pos.col += -2 / timeDelta;
                }
                this.pos.col = destination.col;
                this.state = 'IDLE';
                return;
            }

            if (destination.row === this.pos.row + 1) { // MOVING DOWN
                while (Math.floor(this.pos.row) !== destination.row) {
                    this.pos.row += 2 / timeDelta;
                }
                this.pos.row = destination.row;
                this.state = 'IDLE';
                return;
            }

            if (destination.col === this.pos.col + 1) { // MOVING RIGHT
                while (Math.ceil(this.pos.col) !== destination.col) {
                    this.pos.col += 2 / timeDelta;
                }
                this.pos.col = destination.col;
                this.state = 'IDLE';
                return;
            }
        }     
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


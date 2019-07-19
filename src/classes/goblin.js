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

    setMoveDirection() {
        if (this.state === 'IDLE') {
            this.destination = findPath(
                this.currentLevel.board,
                this.pos,
                { col: Math.round(this.playerPos.col), row: Math.round(this.playerPos.row) }
            )[1];
        } else if (this.state === 'MOVING') {
            if (this.destination.row === Math.ceil(this.pos.row) - 1) {
                this.state = 'MOVING_UP';
            } else if (this.destination.col === this.pos.col - 1) {
                this.state = 'MOVING_LEFT';
            } else if (this.destination.row === this.pos.row + 1) {
                this.state = "MOVING_DOWN";
            } else if (this.destination.col === this.pos.col + 1) {
                this.state = "MOVING_RIGHT";
            } else {
                this.state = 'IDLE';
            }
        }
        
    }


    move(timeDelta) {
        this.setMoveDirection();
        if (this.state === 'MOVING_UP') {
            
                if (Math.ceil(this.pos.row) === this.destination.row) {
                    this.pos.row = this.destination.row;
                    this.state = 'IDLE';
                    return;
                } else {
                    this.pos.row += -2 / timeDelta;
                }
        } else if (this.state === 'MOVING_LEFT') {
            
                if (Math.ceil(this.pos.col) === this.destination.col) {
                    this.pos.col = this.destination.col;
                    this.state = 'IDLE';
                    return;
                } else {
                    this.pos.col += -2 / timeDelta;
                }
        } else if (this.state === 'MOVING_DOWN') {
            
                if (Math.floor(this.pos.row) === this.destination.row) {
                    this.pos.row = this.destination.row;
                    this.state = 'IDLE';
                    return;
                } else {
                    this.pos.row += 2 / timeDelta;
                }
        } else if (this.state === 'MOVING_RIGHT') {
            
                if (Math.floor(this.pos.col) === this.destination.col) {
                    this.pos.col = this.destination.col;
                    this.state = 'IDLE';
                    return;
                } else {
                    this.pos.col += 2 / timeDelta;
                }
        }

        // if (this.state === 'IDLE') {
        //     this.destination = findPath(
        //         this.currentLevel.board, 
        //         this.pos, 
        //         { col: Math.round(this.playerPos.col), row: Math.round(this.playerPos.row) }
        //     )[1];
        // }
        // if (this.state === 'MOVING') {
            
        //     if (this.destination.row === Math.ceil(this.pos.row) - 1) { // MOVING UP
        //         debugger
        //         if (Math.ceil(this.pos.row) === this.destination.row) {
        //             debugger
        //             this.pos.row = this.destination.row;
        //             this.state = 'IDLE';
                    
        //             return;
        //         } else {
        //             this.pos.row += -2 / timeDelta;
        //         }
        //     }

        //     if (this.destination.col === this.pos.col - 1) { // MOVING LEFT
        //         if (Math.ceil(this.pos.col) === this.destination.col) {
        //             this.pos.col = this.destination.col;
        //             this.state = 'IDLE';
        //             return;
        //         } else {
        //             this.pos.col += -2 / timeDelta;
        //         }
        //     }

        //     if (this.destination.row === this.pos.row + 1) { // MOVING DOWN
        //         if (Math.floor(this.pos.row) === this.destination.row) {
        //             this.pos.row = this.destination.row;
        //             this.state = 'IDLE';
        //             return;
        //         } else {
        //             this.pos.row += 2 / timeDelta;
        //         }
        //     }

        //     if (this.destination.col === this.pos.col + 1) { // MOVING RIGHT
        //         if (Math.floor(this.pos.col) === this.destination.col) {
        //             this.pos.col = this.destination.col;
        //             this.state = 'IDLE';
        //             return;
        //         } else {
        //             this.pos.col += 2 / timeDelta;
        //         }
        //     }
        // }     
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


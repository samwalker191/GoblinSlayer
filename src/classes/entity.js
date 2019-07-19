const Util = require('../util/game_util');
const spriteSheet = require('../assets/images/spritesheet.png');


class Entity {
    constructor(pos, currentLevel, canvas) {
        this.pos = pos;
        this.canvas = canvas
        this.currentLevel = currentLevel;
        this.destination = null;
        this.img = new Image();
        this.img.src = spriteSheet;
    }

    validMove(destination) {
        // console.log(`playerPos: ${this.pos}`);
        // console.log(`Destination: ${destination}`);
        // console.log(this.currentLevel.board[destination.col][destination.row])
        return this.currentLevel.board[destination.row][destination.col] < 1;
    }
}

module.exports = Entity;
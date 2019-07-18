const Constants = require('../util/constants');
const LevelOne = require('../util/levels/level1');
class Game {
    constructor(canvas) {
        this.canvas = canvas;
    }

    drawLevel(level) {
        level.drawLevel(this.canvas);
    }
}

module.exports = Game
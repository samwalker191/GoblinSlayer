const Constants = require('./util/constants');
class Game {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawLevel(level) {
        level.drawLevel(this.ctx);
    }
}

module.exports = Game
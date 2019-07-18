const Constants = require('./util/constants');
class Game {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawBoard() {
        this.ctx.clearRect(0, 0, Constants.WIDTH, Constants.HEIGHT);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        this.ctx.fillRect(0, 0, Constants.WIDTH, Constants.HEIGHT);
    }
}

module.exports = Game
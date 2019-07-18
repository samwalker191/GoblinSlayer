const Constants = require('./util/constants');
class Game {
    constructor() {

    }

    drawBoard(ctx) {
        ctx.clearRect(0, 0, Constants.WIDTH, Constants.HEIGHT);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, Constants.WIDTH, Constants.HEIGHT);
    }
}

module.exports = Game
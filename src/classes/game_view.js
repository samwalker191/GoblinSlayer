class GameView {
    constructor(game) {
        this.game = game;
    }

    start() {
        this.game.bindKeyListeners();
        this.lastTime = 0;
        this.game.drawBoard(this.game.levels[0]);
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        requestAnimationFrame(this.animate.bind(this));
        const timeDelta = time - this.lastTime;
        this.game.step(timeDelta);
        this.lastTime = time;
    }
}

module.exports = GameView;
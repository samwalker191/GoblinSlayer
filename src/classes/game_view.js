class GameView {
    constructor(game) {
        this.game = game;
    }

    start() {
        console.log('starting game');
        this.game.bindKeyListeners();
        this.lastTime = 0;
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime;

        this.game.step(timeDelta);
        this.lastTime = time;
        requestAnimationFrame(this.animate.bind(this));
    }
}

module.exports = GameView;
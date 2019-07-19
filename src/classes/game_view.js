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
        debugger
        requestAnimationFrame(this.animate.bind(this));
        const timeDelta = time - this.lastTime;
        // this.game.aniCtx.save();
        this.game.step(timeDelta);
        // this.game.aniCtx.restore();
        this.lastTime = time;
        debugger
    }
}

module.exports = GameView;
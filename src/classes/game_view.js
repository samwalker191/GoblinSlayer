class GameView {
    constructor(game) {
        this.game = game;
        this.player = this.game.player;
    }

    start() {
        console.log('starting game');
        this.game.bindKeyListeners();
        this.lastTime = 0;
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        // console.log('running')
        const timeDelta = time - this.lastTime;

        this.game.step(this.inputs, timeDelta);
        this.lastTime = time;
        requestAnimationFrame(this.animate.bind(this));
    }
}

module.exports = GameView;
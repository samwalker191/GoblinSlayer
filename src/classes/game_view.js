class GameView {
    constructor(game) {
        this.game = game;
    }

    start() {
        console.log('starting game');
        this.game.bindKeyListeners();
        this.game.addGoblin();
        this.lastTime = 0;
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        
        requestAnimationFrame(this.animate.bind(this));
        const timeDelta = time - this.lastTime;
        // this.game.aniCtx.save();
        this.game.step(timeDelta);
        // this.game.aniCtx.restore();
        this.lastTime = time;
        
    }
}

module.exports = GameView;
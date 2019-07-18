class GameView {
    constructor(game, levels) {
        this.game = game;
        this.levels = levels;
        this.game.drawBoard(this.levels.level1);
    }

    start() {
        console.log('starting game');
        this.lastTime = 0;
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime;

        this.game.drawEntities()
        this.lastTime = time;
        requestAnimationFrame(this.animate.bind(this));
    }
}

module.exports = GameView;
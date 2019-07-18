class GameView {
    constructor(game, levels) {
        this.game = game;
        this.player = this.game.player;
        this.levels = levels;
        this.game.drawBoard(this.levels.level1);
        this.inputs = { w: false, a: false, s: false, d: false}
    }

    bindKeyListeners() {
        document.addEventListener("keydown", (e) => {
            console.log(e.keyCode);
            switch(e.keyCode){
                case 87: // W
                    if (this.player.state === null) {
                        this.player.state = 'MOVING_UP';
                        this.player.destination = { x: this.player.pos.x, y: this.player.pos.y - 1 };
                    }
                    break;
                case 65: // A
                    if (this.game.player.state === null) {
                        this.game.player.state = 'MOVING_LEFT';
                        this.player.destination = { x: this.player.pos.x - 1, y: this.player.pos.y };
                    }
                    break;
                case 83: // S
                    if (this.game.player.state === null) {
                        this.game.player.state = 'MOVING_DOWN';
                        this.player.destination = { x: this.player.pos.x, y: this.player.pos.y + 1 };
                    }
                    break;
                case 68: // D
                    if (this.game.player.state === null) {
                        this.game.player.state = 'MOVING_RIGHT';
                        this.player.destination = { x: this.player.pos.x + 1, y: this.player.pos.y };
                    }                    
                    break;
                default: 
                    break;
            }
        })
    }

    start() {
        console.log('starting game');
        this.bindKeyListeners();
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
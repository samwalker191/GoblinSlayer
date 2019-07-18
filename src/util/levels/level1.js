const spriteSheet = require('../../assets/spritesheet.png');

class LevelOne {
    constructor() {
        this.rows = 9;
        this.cols = 11;
        this.tileSize = 16;

        this.board = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }

    drawLevel(canvas) {
        let ctx = canvas.getContext('2d');
        canvas.width = this.tileSize * this.cols;
        canvas.height = this.tileSize * this.rows;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < this.rows; i++) {
            for (j = 0; j < this.cols; j++) {
                if (this.board[i][j] === 0) {
                    ctx.drawImage(
                        spriteSheet,
                        16, //src x
                        64, //src y
                        this.tileSize, //src width
                        this.tileSize, //src height
                        j * this.tileSize, // canvas x
                        i * this.tileSize, // canvas y
                        this.tileSize, //canvas width
                        this.tileSize //canvas height
                    );
                } else if (this.board[i][j] === 1) {
                    ctx.fillStyle = "#00FF00";
                    ctx.fillRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    }
}

module.exports = LevelOne;
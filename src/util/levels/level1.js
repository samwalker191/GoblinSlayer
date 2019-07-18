const spriteSheet = require('../../assets/images/spritesheet.png');
const Constants = require('../constants');

class LevelOne {
    constructor() {
        this.rows = 11;
        this.cols = 11;
        this.tileSize = Constants.TILE_SIZE;

        this.board = [
            [7, 6, 6, 6, 6, 6, 6, 6, 6, 6, 8],
            [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [12, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14],
            [13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 15]
        ];
    }
    drawLevel(canvas) {
        let img = new Image();
        img.src = spriteSheet;
        let ctx = canvas.getContext('2d');
        canvas.width = this.tileSize * this.cols;
        canvas.height = this.tileSize * this.rows;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                switch (this.board[i][j]) {
                    case 0:
                        ctx.drawImage(
                            img, 16, 64, 16, 16,
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 1:
                        ctx.drawImage(
                            img,
                            32, //src x
                            16, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 2:
                        ctx.drawImage(
                            img,
                            96, //src x
                            160, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 3:
                        ctx.drawImage(
                            img,
                            16, //src x
                            128, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 4:
                        ctx.drawImage(
                            img,
                            0, //src x
                            128, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 5:
                        ctx.drawImage(
                            img,
                            0, //src x
                            128, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 6:
                        ctx.drawImage(
                            img,
                            32, //src x
                            0, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 7:
                        ctx.drawImage(
                            img,
                            0, //src x
                            112, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 8:
                        ctx.drawImage(
                            img,
                            16, //src x
                            112, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 9:
                        ctx.drawImage(
                            img,
                            32, //src x
                            144, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 10:
                        ctx.drawImage(
                            img,
                            16, //src x
                            112, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 11:
                        ctx.drawImage(
                            img,
                            96, //src x
                            176, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 12:
                        ctx.drawImage(
                            img,
                            112, //src x
                            160, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 13:
                        ctx.drawImage(
                            img,
                            112, //src x
                            176, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 14:
                        ctx.drawImage(
                            img,
                            112, //src x
                            128, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    case 15:
                        ctx.drawImage(
                            img,
                            112, //src x
                            144, //src y
                            16, //src width
                            16, //src height
                            j * this.tileSize, // canvas x
                            i * this.tileSize, // canvas y
                            this.tileSize, //canvas width
                            this.tileSize //canvas height
                        );
                        break;
                    default:
                        break;
                }
            }
        }
    }
}

module.exports = LevelOne;
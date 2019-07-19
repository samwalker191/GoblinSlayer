
const findPath = (board, pathStart, pathEnd) => {
    let walkableTileValue = 0;
    let boardWidth = board[0].length;
    let boardHeight = board.length;
    let boardSize = boardWidth * boardHeight;

    let distanceFunction = manhattanDistance;
    let findNeighbours = () => {};

    const manhattanDistance = (start, goal) => {
        return Math.abs(start.x - goal.x) + Math.abs(start.y - goal.y);
    };

    const validTile = (col, row) => {
        return ((board[col] !== null) && (board[col][row] !== null) && (board[col][row] <= walkableTileValue));
    };

    const Neighbours = (col, row) => {
        let up = row - 1;
        let left = col - 1;
        let down = row + 1;
        let right = col + 1;
        let canMoveUp = up > -1 && validTile(col, up);
        let canMoveLeft = left > -1 && validTile(left, row);
        let canMoveDown = down < worldHeight && validTile(col, down);
        let canMoveRight = right < worldWidth && validTile(right, row);
        let result = [];
        if (canMoveUp) {
            result.push({ col: col, row: up });
        }

        if (canMoveLeft) {
            result.push({ col: left, row: row });
        }

        if (canMoveDown) {
            result.push({ col: col, row: down });
        }

        if (canMoveRight) {
            result.push({ col: right, row: row });
        }
        return result;
    };
}
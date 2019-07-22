const findPath = (board, pathStart, pathEnd) => {
    
    let walkableTileValue = 0;
    let boardWidth = board[0].length;
    let boardHeight = board.length;
    let boardSize = boardWidth * boardHeight;

    let findNeighbours = () => {};

    const manhattanDistance = (point, goal) => {
        return Math.abs(point.col - goal.col) + Math.abs(point.row - goal.row);
    };
    let distanceFunction = manhattanDistance;

    const validTile = (col, row) => {
        return ((board[row] !== null) && (board[row][col] !== null) && ((board[row][col] <= walkableTileValue) && board[row][col] !== -2));
    };

    const Neighbours = (col, row) => {
        let up = row - 1;
        let left = col - 1;
        let down = row + 1;
        let right = col + 1;
        let canMoveUp = up > -1 && validTile(col, up);
        let canMoveLeft = left > -1 && validTile(left, row);
        let canMoveDown = down < boardHeight && validTile(col, down);
        let canMoveRight = right < boardWidth && validTile(right, row);
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

    const Node = (parent, point) => {
        let newNode = {
            parent: parent,
            value: point.col + (point.row * boardWidth),
            col: point.col,
            row: point.row,
            costFromStart: 0,
            costToGoal: 0
        };
        return newNode;
    };

    const calculatePath = () => {
        
        let myPathStart = Node(null, { col: pathStart.col, row: pathStart.row });
        let myPathEnd = Node(null, { col: pathEnd.col, row: pathEnd.row });
        let aStar = new Array(boardSize);
        let open = [myPathStart];
        let closed = [];
        let result = [];
        let myNeighbors;
        let myNode;
        let myPath;
        let length;
        let max;
        let min;
        let i;
        let j;
        
        while (length = open.length) {
            max = boardSize;
            min = -1;
            for (i = 0; i < length; i++) {
                if (open[i].costFromStart < max) {
                    max = open[i].costFromStart;
                    min = i;
                }
            }

            myNode = open.splice(min, 1)[0];

            if (myNode.value === myPathEnd.value) {
                myPath = closed[closed.push(myNode) - 1];
                do {
                    result.push({ col: myPath.col, row: myPath.row });
                } while (myPath = myPath.parent);
                aStar = [];
                closed = [];
                open = [];
                result.reverse();
            } else {
                myNeighbors = Neighbours(myNode.col, myNode.row); //array of neighbors

                for(i = 0; i < myNeighbors.length; i++) {
                    myPath = Node(myNode, myNeighbors[i]);
                    if (!aStar[myPath.value]) {
                        myPath.costToGoal = myNode.costToGoal + distanceFunction(myNeighbors[i], myNode);
                        myPath.costFromStart = myPath.costToGoal + distanceFunction(myNeighbors[i], myPathEnd);
                        open.push(myPath);
                        aStar[myPath.value] = true;
                    }
                }
                closed.push(myNode);
            }
        }
        return result;
    }
    return calculatePath();
}

module.exports = findPath;
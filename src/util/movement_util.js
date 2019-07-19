const findPath = (board, pathStart, pathEnd) => {
    let walkableTileValue = 0;
    let boardWidth = board[0].length;
    let boardHeight = board.length;
    let boardSize = boardWidth * boardHeight;

    let distanceFunction = manhattanDistance;
    let findNeighbours = () => {};

    const manhattanDistance = (point, goal) => {
        return Math.abs(point.x - goal.x) + Math.abs(point.y - goal.y);
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

    const Node = (parent, point) => {
        let newNode = {
            parent: parent,
            value: point.x + (point.y * worldWidth),
            x: point.x,
            y: point.y,
            costFromStart: 0,
            costToGoal: 0
        };
        return newNode;
    };

    const calculatePath = () => {
        let myPathStart = Node(null, { x: pathStart.x, y: pathStart.y });
        let myPathEnd = Node(null, { x: pathEnd.x, y: pathEnd.y });
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
                    result.push({ col: myPath.x, row: myPath.y });
                } while (myPath = myPath.parent);
                aStar = [];
                closed = [];
                open = [];
                result.reverse();
            } else {
                myNeighbors = Neighbours(myNode.x, myNode.y); //array of neighbors

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
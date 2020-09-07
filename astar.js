/// <reference path="./p5.global-mode.d.ts" />


class Astar {
    constructor() {
        this.openSet = [];
        this.closedSet = [];
        this.path = [];
        this.start;
        this.end;

        this.grid = []
    }

    createGrid(numCols) {
        this.grid = new Array(numCols);

        for (var i = 0; i < cols; i++) {
            this.grid[i] = new Array(rows);
        }

        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                this.grid[i][j] = new Node(i, j);
            }
        }

        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                this.grid[i][j].addNeighbors(this.grid);
            }
        }
    }

    rmFromOpenSet(elem) {
        for (var i = this.openSet.length - 1; i >= 0; i--) {
            if (this.openSet[i] == elem) {
                this.openSet.splice(i, 1);
            }
        }
    }

    heuristic(nodeA, nodeB) {
        // var distance = dist(nodeA.x, nodeA.y, nodeB.x, nodeB.y);  // Euclidean Distance
        var distance = abs(nodeA.x - nodeB.x) + abs(nodeA.y - nodeB.y);  // Manhattan Distance
        return distance;
    }
}

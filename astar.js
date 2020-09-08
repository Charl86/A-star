/// <reference path="./p5.global-mode.d.ts" />


class Astar {
    constructor(circles=false) {
        this.grid = []
        this.openSet = [];
        this.closedSet = [];
        this.path = [];

        this.start;
        this.end;

        this.circles = circles;
    }

    show() {
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                this.grid[i][j].show(color(255), this.circles);
            }
        }
        for (var i = 0; i < this.closedSet.length; i++) {
            this.closedSet[i].show(color(255, 0, 0), this.circles);
        }
        for (var i = 0; i < this.openSet.length; i++) {
            this.openSet[i].show(color(0, 255, 0), this.circles);
        }
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

    revealPath(currNode) {
        this.path.splice(0, this.path.length);
        var temp = currNode;
        this.path.push(temp);
        while (temp.previous) {
            this.path.push(temp.previous);
            temp = temp.previous;
        }

        if (!this.circles) {
            for (var i = 0; i < this.path.length; i++)
                this.path[i].show(color(0, 0, 255));
        }
        else {
            noFill();
            stroke(0, 0, 255);
            strokeWeight((width/cols)/2);
            beginShape();
            for (var i = 0; i < this.path.length; i++) {
                vertex(
                    this.path[i].x * this.path[i].width + this.path[i].width / 2,
                    this.path[i].y * this.path[i].height + this.path[i].height / 2
                );
            }
            endShape();
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

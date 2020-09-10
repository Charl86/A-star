/// <reference path="./p5.global-mode.d.ts" />


// A* Algorithm Class
class Astar {
    constructor(circles=false) {
        this.grid = []  // Grid in which cells live.
        this.openSet = [];  // Possible paths.
        this.closedSet = [];  // Discarded nodes.
        this.path = [];  // List of nodes that make up shortest path.

        this.currentNode = undefined;
        this.start;  // Start node.
        this.end;  // Goal node.

        this.circles = circles;  // Draw squares or circles.
    }

    // Nodes and sets display method.
    show() {
        // Iterate through grid cells and call show() method.
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                this.grid[i][j].show(color(255), this.circles);
            }
        }
        // Iterate through closed set and display nodes as red.
        for (var i = 0; i < this.closedSet.length; i++) {
            this.closedSet[i].show(color(255, 0, 0), this.circles);
        }
        // Iterate through open set and display nodes as green.
        for (var i = 0; i < this.openSet.length; i++) {
            this.openSet[i].show(color(0, 255, 0), this.circles);
        }
    }

    // Grid initialization method:
    createGrid(numCols) {
        // Initialize grid as array with amount of elements equal to numCols.
        this.grid = new Array(numCols);

        for (var i = 0; i < cols; i++) {
            // Redefine each element as array of rows elements.
            this.grid[i] = new Array(rows);
        }

        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                /* Redefine each elements of current array as Node object
                with (i, j) coordinates. */
                this.grid[i][j] = new Node(i, j);
            }
        }

        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                // Initialize each node's neighbors.
                this.grid[i][j].addNeighbors(this.grid);
            }
        }
    }

    // Reveal nodes of shortest path to current node.
    revealPath() {
        var temp = this.currentNode;
        this.path = [temp];  // Initialize path with current node.
        while (temp.previous) {
            // Append to path the current node's parent.
            this.path.push(temp.previous);
            temp = temp.previous;
        }
        // If drawing squares
        if (!this.circles) {
            for (var i = 0; i < this.path.length; i++)
                // If path[i] is the currentNode, paint yellow.
                if (this.path[i] == this.currentNode)
                    this.path[i].show(color(255, 255, 0), this.circles);
                else  // Otherwise paint blue.
                    this.path[i].show(color(0, 0, 255), this.circles);
        }
        else {  // If displaying circles
            noFill();
            stroke(0, 0, 255);  // Path color.
            strokeWeight((width/cols)/2);  // Path width.
            beginShape();  // Hold down pen.
            for (var i = 0; i < this.path.length; i++) {
                vertex(
                    // Draw circle with center at half the width and height of node.
                    this.path[i].x * this.path[i].width + this.path[i].width / 2,
                    this.path[i].y * this.path[i].height + this.path[i].height / 2
                );
            }
            endShape();  // Lift pen up.
        }
    }

    // Remove element from open set method.
    rmFromOpenSet(elem) {
        // Linearly search the target node.
        for (var i = this.openSet.length - 1; i >= 0; i--) {
            if (this.openSet[i] == elem) {  // If target node found
                this.openSet.splice(i, 1);  // Cut node out of set.
            }
        }
    }
}

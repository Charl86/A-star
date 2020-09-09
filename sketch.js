/// <reference path="./p5.global-mode.d.ts" />

var cols = 50;
var rows = 50;

var astar = new Astar(circles=true);


function setup() {
	createCanvas(640, 640);
	console.log("A*");

	// Creating grid that using a 2D-array implementation:
	astar.createGrid(cols);

	// Making the upmost top-left corner cell the starting point
	astar.start = astar.grid[0][0];
	// and the bottom-right cell the goal
	astar.end = astar.grid[cols - 1][rows - 1];

	// Unblocking starting and ending cell in case they're blocked:
	astar.start.blocked = false;
	astar.end.blocked = false;

	astar.openSet.push(astar.start);
}


function draw() {
    // While there are possible node paths available:
	if (astar.openSet.length > 0) {
        var lowestFidx = 0;
        for (var i = 0; i < astar.openSet.length; i++) {
            if (astar.openSet[lowestFidx].fscore > astar.openSet[i].fscore)
                lowestFidx = i;
        }
        var currentNode = astar.openSet[lowestFidx];

        if (currentNode == astar.end) {
            noLoop();
            console.log("Finished.");
        }

        astar.rmFromOpenSet(currentNode);
        astar.closedSet.push(currentNode);
        for (var i = 0; i < currentNode.neighbors.length; i++) {
            neighbor = currentNode.neighbors[i];

            if (!astar.closedSet.includes(neighbor) && !neighbor.blocked) {
				var tempG = currentNode.gscore + 1;

				var newPath = false;
				if (astar.openSet.includes(neighbor)) {
					if (tempG < neighbor.gscore) {
						newPath = true;
						neighbor.gscore = tempG;
					}
				}
				else {
					newPath = true;
					neighbor.gscore = tempG;
					astar.openSet.push(neighbor);
				}

				if (newPath) {
					neighbor.hscore = astar.heuristic(neighbor, astar.end);
					neighbor.fscore = neighbor.gscore + neighbor.hscore;
					neighbor.previous = currentNode;
				}
            }
        }
    }
	// No solution
	else {
		console.log("No solution.");
		noLoop();
		return;
	}

	background(0);

	astar.show();
	astar.revealPath(currentNode);
}
/// <reference path="./p5.global-mode.d.ts" />

var cols = 50;
var rows = 50;

var astar = new Astar(circles=false);


function setup() {
	// frameRate(1);
	createCanvas(825, 825);
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
	// While there are possible nodes/paths to go through:
	if (astar.openSet.length > 0) {
		// Find the node with the smallest cost amount.
        var lowestFidx = 0;
        for (var i = 0; i < astar.openSet.length; i++) {
			if (astar.openSet[lowestFidx].fscore > astar.openSet[i].fscore)
			lowestFidx = i;
		}
		// Make that the current node.
		astar.currentNode = astar.openSet[lowestFidx];

		// If the current node is equal to the goal node, exit loop.
        if (astar.currentNode == astar.end) {
			noLoop();
            console.log("Finished.");
        }

		// Make currentNode impossible to pick again.
		astar.rmFromOpenSet(astar.currentNode);
		astar.closedSet.push(astar.currentNode);
		// For each neighbor of currentNode:
        for (var i = 0; i < astar.currentNode.neighbors.length; i++) {
			neighbor = astar.currentNode.neighbors[i];

			// If neighbor not in closedSet and neighbor is not an obstacle:
            if (!astar.closedSet.includes(neighbor) && !neighbor.blocked) {
				var distFromCurrent = dist(astar.currentNode.x, astar.currentNode.y,
											neighbor.x, neighbor.y);

				// Set tempG equal to current gscore + neighbor's distance from current.
				var tempG = astar.currentNode.gscore + distFromCurrent;
				/* If this temporary gscore is less than neighbor's or neighbor has never
				been picked: */
				if (tempG < neighbor.gscore || !astar.openSet.includes(neighbor)) {
					// Update neighbor's members.
					neighbor.gscore = tempG;
					neighbor.fscore = neighbor.gscore + neighbor.heuristic(astar.end);
					neighbor.previous = astar.currentNode;

					// Add neighbor to list of possible paths if it's not already there.
					if (!astar.openSet.includes(neighbor))
						astar.openSet.push(neighbor);
				}
            }
        }
    }
	else {  // There is no node that leads to the goal.
		console.log("No solution.");
		noLoop();
		return;
	}
	background(255, 255, 255);

	astar.show();  // Draw all cells on the screen with respective colors.
	astar.revealPath();  // Reveal shortest path to the latest node.
}
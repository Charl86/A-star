/// <reference path="./p5.global-mode.d.ts" />

var cols = 50;
var rows = 50;

var astar = new Astar();


function setup() {
	createCanvas(540, 540);
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
		var leastCostIdx = 0;
		for (var i = 0; i < astar.openSet.length; i++) {
			if (astar.openSet[leastCostIdx].fscore > astar.openSet[i].fscore) {
				leastCostIdx = i;
			}
		}
		var currentNode = astar.openSet[leastCostIdx];

		if (currentNode == astar.end) {
			noLoop();
			console.log("Finished.");
		}

		astar.rmFromOpenSet(currentNode);
		astar.closedSet.push(currentNode);

		for (var i = 0; i < currentNode.neighbors.length; i++) {
			var neighbor = currentNode.neighbors[i];

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

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			astar.grid[i][j].show(color(255));
		}
	}
	for (var i = 0; i < astar.closedSet.length; i++) {
		astar.closedSet[i].show(color(255, 0, 0));
	}
	for (var i = 0; i < astar.openSet.length; i++) {
		astar.openSet[i].show(color(0, 255, 0));
	}

	// Find the path:
	astar.path = [];
	var temp = currentNode;
	astar.path.push(temp);
	while (temp.previous) {
		astar.path.push(temp.previous);
		temp = temp.previous;
	}

	var circle = false;  // Draw circle instead of square
	if (!circle) {
		for (var i = 0; i < astar.path.length; i++)
		astar.path[i].show(color(0, 0, 255));
	}
	else {
		noFill();
		stroke(0, 0, 255);
		strokeWeight((width/cols)/2);
		beginShape();
		for (var i = 0; i < astar.path.length; i++) {
			vertex(
				astar.path[i].x * astar.path[i].width + astar.path[i].width / 2,
				astar.path[i].y * astar.path[i].height + astar.path[i].height / 2
			);
		}
		endShape();
	}
}
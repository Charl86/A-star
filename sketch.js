var cols = 50;
var rows = 50;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var path = [];
var start;
var end;


class Node {
	constructor(x, y) {
		this.width = width / cols;
		this.height = height / rows;
		this.x = x;
		this.y = y;

		this.f = 0;
		this.g = 0;
		this.h = 0;

		this.wall = false;
		if (random(1) < 0.3)
			this.wall = true;
		this.previous = undefined;
		this.neighbors = [];
	}
	show(color) {
		// fill(color);
		if (this.wall) {
			fill(0);
			noStroke();
			ellipse(
				this.x * this.width + this.width/2,
				this.y * this.height + this.height/2,
				this.width/2,
				this.height/2
			);
		}
		// rect(
		// 	this.x * this.width,
		// 	this.y * this.height,
		// 	this.width - 1,
		// 	this.height - 1
		// );
	}

	addNeighbors(grid) {
		if (this.x < cols - 1) {
			this.neighbors.push(grid[this.x + 1][this.y]);
		}
		if (this.x > 0) {
			this.neighbors.push(grid[this.x - 1][this.y]);
		}
		if (this.y < rows - 1) {
			this.neighbors.push(grid[this.x][this.y + 1]);
		}
		if (this.y > 0) {
			this.neighbors.push(grid[this.x][this.y - 1]);
		}
		if (this.x > 0 && this.y > 0) {
			this.neighbors.push(grid[this.x - 1][this.y - 1]);
		}
		if (this.x < cols - 1 && this.y > 0) {
			this.neighbors.push(grid[this.x + 1][this.y - 1]);
		}
		if (this.x > 0 && this.y < rows - 1) {
			this.neighbors.push(grid[this.x - 1][this.y + 1]);
		}
		if (this.x < cols - 1 && this.y < rows - 1) {
			this.neighbors.push(grid[this.x + 1][this.y + 1]);
		}
	}
}


function removeFromArray(arr, elem) {
	for (var i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elem) {
			arr.splice(i, 1);
		}
	}
}


function heuristic(a, b) {
	var distance = dist(a.x, a.y, b.x, b.y);
	// var distance = abs(a.x - b.x) + abs(a.y - b.y);
	return distance;
}


function setup() {
	createCanvas(400, 400);
	console.log("A*");

	// Creating 2D array:
	for (var i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Node(i, j);
		}
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid);
		}
	}

	start = grid[0][0];
	end = grid[cols - 1][rows - 1];
	start.wall = false;
	end.wall = false;

	openSet.push(start);
	console.log(grid)
}

function draw() {
	if (openSet.length > 0) {  // Forward:

		var winner = 0;
		for (var i = 0; i < openSet.length; i++) {
			if (openSet[i].f < openSet[winner].f) {
				winner = i;
			}
		}
		var current = openSet[winner];

		if (current == end) {
			noLoop();
			console.log("DONE!");
		}

		removeFromArray(openSet, current);
		closedSet.push(current);

		var neighbors = current.neighbors;
		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i];

			if (!closedSet.includes(neighbor) && !neighbor.wall) {
				var tempG = current.g + 1;

				var newPath = false;
				if (openSet.includes(neighbor)) {
					if (tempG < neighbor.g) {
						newPath = true;
						neighbor.g = tempG;
					}
				}
				else {
					newPath = true;
					neighbor.g = tempG;
					openSet.push(neighbor);
				}

				if (newPath) {
					neighbor.h = heuristic(neighbor, end);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = current;
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
	background(255);

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show(color(255));
		}
	}
	for (var i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(255, 0, 0));
	}
	for (var i = 0; i < openSet.length; i++) {
		openSet[i].show(color(0, 255, 0));
	}

	// Find the path:
	path = [];
	var temp = current;
	path.push(temp);
	while (temp.previous) {
		path.push(temp.previous);
		temp = temp.previous;
	}

	// for (var i = 0; i < path.length; i++) {
	// 	path[i].show(color(0, 0, 255));
	// }
	noFill();
	stroke(0, 255, 255);
	strokeWeight((width/cols)/2);
	beginShape();
	for (var i = 0; i < path.length; i++) {
		vertex(
			path[i].x * path[i].width + path[i].width / 2,
			path[i].y * path[i].height + path[i].height / 2
		);
	}
	endShape();
}
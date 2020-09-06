var cols = 5;
var rows = 5;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;


class Node {
	constructor(i, j) {
		this.f = 0;
		this.g = 0;
		this.h = 0;

		this.width = width / cols;
		this.height = height / rows;
		this.x = i;
		this.y = j;

		this.neighbors = [];
	}
	show(color) {
		fill(color);
		noStroke();
		rect(
			this.x * this.width,
			this.y * this.height,
			this.width - 1,
			this.height - 1
		);
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

	openSet.push(start);
	console.log(grid)
}

function draw() {
	if (openSet.length > 0) {  // Fowards
		var winner = 0;
		for (var i = 0; i < openSet.length; i++) {
			if (openSet[i].f < openSet[winner].f) {
				winner = i;
			}
		}
		var current = openSet[winner];

		if (current == end) {
			console.log("DONE!");
		}
		removeFromArray(openSet, current);
		closedSet.push(current);

		var neighbors = current.neighbors;
		for (var i = 0; i < neighbors.length; i++) {
			var neighbor = neighbors[i];

			if (!closedSet.includes(neighbor)) {
				var tempG = current.g + 1;

				if (openSet.includes(neighbor)) {
					if (tempG < neighbor.g) {
						neighbor.g = tempG;
					}
				}
				else {
					neighbor.g = tempG;
					openSet.push(neighbor);
				}
			}

			neighbor.h = heuristic(neighbor, end);
			neighbor.f = neighbor.g + neighbor.h;
		}
	}
	else {  // No solution
	}
	background(0);

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
}
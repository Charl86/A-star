/// <reference path="./p5.global-mode.d.ts" />


var cols = 50;
var rows = 50;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var path = [];
var start;
var end;


class Astar {
	constructor() {

	}
}


class Node {
	constructor(x, y) {
		this.width = width / cols;
		this.height = height / rows;
		this.x = x;
		this.y = y;

		this.fscore = 0;
		this.gscore = 0;
		this.hscore = 0;

		this.wall = false;
		if (random(1) < 0.3)
			this.wall = true;
		this.previous = undefined;
		this.neighbors = [];
	}
	show(color, circle=true) {
		if (circle) {
			fill(color);
			if (this.wall)
				fill(0);
			noStroke();
			ellipse(
				this.x * this.width + this.width / 2,
				this.y * this.height + this.height / 2,
				this.width / 2,
				this.height / 2
			);
		}
		else {
			fill(color);
			if (this.wall)
				fill(0);
			noStroke();
			rect(
				this.x * this.width,
				this.y * this.height,
				this.width - 1,
				this.height - 1
			);
		}
	}

	addNeighbors(grid, diagonal=true) {
		for (var i = 0; i < 4; i++) {
			var newX = round(cos(90 * i) + this.x);
			var newY = round(sin(90 * i) + this.y);

			if ((0 <= newX && newX < cols) && (0 <= newY && newY < rows))
				this.neighbors.push(grid[newX][newY]);

			var diagonX = round(sqrt(2) * cos(90 * i + 45) + this.x);
			var diagonY = round(sqrt(2) * sin(90 * i + 45) + this.y);
			if (diagonal) {
				if ((0 <= diagonX && diagonX < cols) && (0 <= diagonY && diagonY < rows))
					this.neighbors.push(grid[diagonX][diagonY]);
			}
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
	createCanvas(540, 540);
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
}

function draw() {
	if (openSet.length > 0) {  // Forward:

		var leastCostIdx = 0;
		for (var i = 0; i < openSet.length; i++) {
			if (openSet[leastCostIdx].fscore > openSet[i].fscore) {
				leastCostIdx = i;
			}
		}
		var currentNode = openSet[leastCostIdx];

		if (currentNode == end) {
			noLoop();
			console.log("Finished.");
		}

		removeFromArray(openSet, currentNode);
		closedSet.push(currentNode);

		for (var i = 0; i < currentNode.neighbors.length; i++) {
			var neighbor = currentNode.neighbors[i];

			if (!closedSet.includes(neighbor) && !neighbor.wall) {
				var tempG = currentNode.gscore + 1;

				var newPath = false;
				if (openSet.includes(neighbor)) {
					if (tempG < neighbor.gscore) {
						newPath = true;
						neighbor.gscore = tempG;
					}
				}
				else {
					newPath = true;
					neighbor.gscore = tempG;
					openSet.push(neighbor);
				}

				if (newPath) {
					neighbor.hscore = heuristic(neighbor, end);
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
	var circle = true;  // Draw circle instead of square
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

	// Find the path:
	path = [];
	var temp = currentNode;
	path.push(temp);
	while (temp.previous) {
		path.push(temp.previous);
		temp = temp.previous;
	}

	if (!circle) {
		for (var i = 0; i < path.length; i++)
			path[i].show(color(0, 0, 255));
	}
	else {
		noFill();
		stroke(0, 0, 255);
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
}
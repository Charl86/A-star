/// <reference path="./p5.global-mode.d.ts" />


// Node class
class Node {
	constructor(x, y) {
		this.width = width / cols;
		this.height = height / rows;
		this.x = x;  // X coordinate in 2D grid.
		this.y = y;  // Y coordinate in 2D grid.

		this.fscore = 0;  // Scores for weight value.
		this.gscore = 0;  // Scores for weight value.
		this.hscore = 0;  // Scores for weight value.

		this.neighbors = [];  // Neighboring nodes.
		this.previous = undefined;  // Node's parent.
		this.blocked = false;  // Determine if this node turns into an obstacle.
		if (random(1) < 0.3)
			this.blocked = true;  // If randomly selected, turn node into obstacle.
	}

	// Node display method.
	show(color, shape="square", stroke=true) {
		// If node is not obstacle, fill with given color.
		if (!this.blocked)
			fill(color);
		else  // Else fill as black.
			fill(0);

		// If drawing circles
		if (shape.toLowerCase() == "circle" || shape.toLowerCase() == "circles") {
			noStroke();  // No border drawing.
			ellipse(  // Draw circle at half the width and height of node plus its coordinates.
				this.x * this.width + this.width / 2, this.y * this.height + this.height / 2,
				this.width / 2, this.height / 2
			);
		}
		else {  // Else
			if (!stroke)
				noStroke();
			rect(  // Draw rectangle.
				this.x * this.width, this.y * this.height,
				this.width, this.height
			);
		}
	}

	// Neighbors initialization method.
	addNeighbors(grid, diagonal=false) {
		/* Instead of hardcoding neighbors coordinates, I attempted to use some
		trigonometry. */
		for (var i = 0; i < 4; i++) {  // For each cardinal direction, starting from East
			/* Coordinate of current neighbor node is:
			cos(90i) + x, -sin(90i) + y,  with 0 <= i <= 3  (also in degrees)*/
			var newX = round(cos(radians(90) * i) + this.x);
			var newY = round(-sin(radians(90) * i) + this.y);
			/* Have to negate sin(x) since coordinate system in p5 is analogous
			to the 4th quadrant of the cartesian plane, and not centered around
			the origin. */

			/* If this newfound coordinate is within bounds, then add the neighbor with said
			coordinates. */
			if ((0 <= newX && newX < cols) && (0 <= newY && newY < rows))
				this.neighbors.push(grid[newX][newY]);

			if (diagonal) {  // If diagonal move is allowed
				// Expand circle by sqrt(2) to reach diagonal coordinates and rotate by 45 degrees.
				var diagonX = round(sqrt(2) * cos(90 * i + 45) + this.x);
				var diagonY = round(sqrt(2) * sin(90 * i + 45) + this.y);
					if ((0 <= diagonX && diagonX < cols) && (0 <= diagonY && diagonY < rows))
						this.neighbors.push(grid[diagonX][diagonY]);
			}
		}
	}

	// Method to calculate heuristic value of node.
	heuristic(goal, dist="man") {
		var hscore;
		if (dist == "euc" || dist == "euclidean")
			hscore = dist(this.x, this.y, goal.x, goal.y);  // Euclidean Distance
		else if (dist == "man" || dist == "manhattan")
			hscore = abs(this.x - goal.x) + abs(this.y - goal.y);  // Manhattan Distance
		this.hscore = hscore;
        return this.hscore;
    }
}

/// <reference path="./p5.global-mode.d.ts" />


class Node {
	constructor(x, y) {
		this.width = width / cols;
		this.height = height / rows;
		this.x = x;
		this.y = y;

		this.fscore = 0;
		this.gscore = 0;
		this.hscore = 0;

		this.neighbors = [];
		this.previous = undefined;
		this.blocked = false;
		if (random(1) < 0.3)
			this.blocked = true;
	}

	show(color, circles=false) {
		if (!this.blocked)
			fill(color);
		else
			fill(0);

		if (circles) {
			noStroke();
			ellipse(
				this.x * this.width + this.width / 2, this.y * this.height + this.height / 2,
				this.width / 2, this.height / 2
			);
		}
		else {
			noStroke();
			rect(
				this.x * this.width, this.y * this.height,
				this.width, this.height
			);
		}
	}

	addNeighbors(grid, diagonal=false) {
		for (var i = 0; i < 4; i++) {
			var newX = round(cos(radians(90) * i) + this.x);
			var newY = round(-sin(radians(90) * i) + this.y);

			if ((0 <= newX && newX < cols) && (0 <= newY && newY < rows))
				this.neighbors.push(grid[newX][newY]);

			if (diagonal) {
				var diagonX = round(sqrt(2) * cos(90 * i + 45) + this.x);
				var diagonY = round(sqrt(2) * sin(90 * i + 45) + this.y);
					if ((0 <= diagonX && diagonX < cols) && (0 <= diagonY && diagonY < rows))
						this.neighbors.push(grid[diagonX][diagonY]);
			}
		}
	}

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

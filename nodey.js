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

		this.blocked = false;
		if (random(1) < 0.3)
			this.blocked = true;
		this.previous = undefined;
		this.neighbors = [];
	}

	show(color, circle=false) {
		if (circle) {
			fill(color);
			if (this.blocked)
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
			if (this.blocked)
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

	addNeighbors(grid, diagonal=false) {
		for (var i = 0; i < 4; i++) {
			var newX = round(cos(90 * i) + this.x);
			var newY = round(sin(90 * i) + this.y);

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
}

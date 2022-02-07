const cell_n = 4;
const line_n = 1000;
const step = 0.01;
const amplitude = 2.0;

let cells = [];
let points = [];
let cell_size;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	blendMode(SCREEN);

	for (let i = 0; i < cell_n * width / height; i++) {
		let cells_x = [];
		for (let j = 0; j < cell_n; j++) {
			cells_x.push({x: random(), y: random()});
		}
		cells.push(cells_x);
	}

	for (let i = 0; i < line_n; i++) {
		points.push({x: random(width), y: random(height)});
	}
}

function draw() {
	cell_size = height / cell_n;
	
	for (let i = 0; i < line_n; i++) {
		const hue = int(calculate_d(points[i].x, points[i].y) / cell_size * 400) % 360;

		const v = curl(points[i].x, points[i].y);

		stroke(color(`hsb(${hue}, 70%, 50%)`));
		line(points[i].x, points[i].y, points[i].x + v.x, points[i].y + v.y);

		points[i].x += v.x;
		points[i].y += v.y;
	}
}

function calculate_d(x, y) {
	const xn = int(x / cell_size);
	const yn = int(y / cell_size);
	let min_d = 1e3;
	for (let xx = max(-1, -xn); xx <= min(1, cells.length-xn-1); xx++) {
		for (let yy = max(-1, -yn); yy <= min(1, cell_n-yn-1); yy++) {
			const d = dist(
				(xn + xx + cells[xn+xx][yn+yy].x) * cell_size,
				(yn + yy + cells[xn+xx][yn+yy].y) * cell_size,
				x,
				y);
			min_d = min(min_d, d);
		}
	}

	return min_d;
}

function curl(x, y) {
	const x1 = calculate_d(x + 1, y) / cell_size + noise((x + 1) * step, y * step) * amplitude;
	const x2 = calculate_d(x - 1, y) / cell_size + noise((x - 1) * step, y * step) * amplitude;
	const y1 = calculate_d(x, y + 1) / cell_size + noise(x * step, (y + 1) * step) * amplitude;
	const y2 = calculate_d(x, y - 1) / cell_size + noise(x * step, (y - 1) * step) * amplitude;
	
	return {x: (y1 - y2) / 2 * cell_size, y: (x2 - x1) / 2 * cell_size};
}
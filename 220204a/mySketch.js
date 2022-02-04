let font;
let step;
let m;
let vectors = [];

function preload() {
	font = loadFont("SourceHanSans-Regular.otf");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	blendMode(SCREEN);

	step = random(0.001, 0.01);
	m = random(2, 6);

	const points = font.textToPoints('育', 0, 0, 320, {
		sampleFactor: 1,
		simplifyThreshold: 0
	});
	const bounds = font.textBounds("育", 0, 0, 320);

	for (let i = 0; i < points.length; i++) {
		vectors.push(new p5.Vector(points[i].x + width / 2 - bounds.x - bounds.w / 2, points[i].y + height / 2 - bounds.y - bounds.h / 2));
	}
}

function draw() {
	for (let i = 0; i < vectors.length; i++) {
		stroke(color(`hsb(${int(i / vectors.length * 360)}, 80%, 10%)`));
		point(vectors[i]);
		const angle = TWO_PI * m * noise(vectors[i].x * step, vectors[i].y * step);
		vectors[i].add(p5.Vector.fromAngle(angle));
	}
}
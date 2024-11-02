function getTargetSize(target) {
	const targetElem = document.getElementById(target);
	const width = targetElem.clientWidth - (2 * 64);
	const height = targetElem.clientHeight - (2 * 64);

	return { width, height }
}

const colors = ['#C6E4FF', '#A9CBFF', '#8BB2FF', '#6C9AFF', '#4883FF', '#0D6DFD', '#0058E3', '#003FC4', '#0031B0', '#002097', '#00117F', '#FBBF24'];


let currentColorSubset = [];

function updateColorSubset(colorCount) {
	// Randomly shuffle the colors array
	const shuffled = [...colors].sort(() => Math.random() - 0.5);
	// Take the first 'colorCount' number of colors from the shuffled array
	currentColorSubset = shuffled.slice(0, colorCount);
}

function getRandomColorFromSubset() {
	// Get a random color from the current subset
	return currentColorSubset[Math.floor(Math.random() * currentColorSubset.length)];
}

function randomizeControls() {
	['separation', 'grid', 'color'].forEach(control => {
		const slider = controls.sliders[control];
		// Generate random value between min and max of each slider
		const randomValue = Math.floor(Math.random() * (slider.max - slider.min + 1)) + parseInt(slider.min);
		// Update slider value
		slider.value = randomValue;
		// Update display
		updateDisplay(control, randomValue);
	});
	// Generate new elements with random values
	generateElems(wrapperSize, controls.sliders.grid.value, controls.sliders.separation.value, controls.sliders.color.value);
}

function createSvg(svgSize) {
	const { width, height } = svgSize;
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", width);
	svg.setAttribute("height", height);
	return svg;
}

function randomSize(number) {
	const random = Math.random() * 0.1 + 0.8;
	return Math.floor(random * number);
}

// function getPolygonPoints(svgWidth, svgHeight) {
// 	const points = [`0,0 ${randomSize(svgWidth)},0 0,${randomSize(svgHeight)} z`, `0,${randomSize(svgHeight)} ${randomSize(svgWidth)},0 ${randomSize(svgWidth)},${randomSize(svgHeight)} z`];
// 	return points[Math.floor(Math.random() * 2)];
// }

function createPolygons(svgSize, separation, colorCount) {
	const { width, height } = svgSize;
	const polygons = [];
	// randomize 1 or 2 polygons
	const numPolygons = Math.floor(Math.random() * 2) + 1;
	// 2 points for 1 polygon, 3 points for 2 polygons
	const points = [`0,0 ${randomSize(width)},0 0,${randomSize(height)} z`, `0,${randomSize(height)} ${randomSize(width)},0 ${randomSize(width)},${randomSize(height)} z`];

	for (let i = 0; i < numPolygons; i++) {
		const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		// When 2 polygons, first uses points[0], second uses points[1]
		polygon.setAttribute("points", numPolygons === 2 ? points[i] : points[Math.floor(Math.random() * 2)]);
		polygon.setAttribute("fill", getRandomColorFromSubset(colorCount));
		polygon.setAttribute("stroke", "white");
		polygon.setAttribute("stroke-width", separation);
		polygon.setAttribute("stroke-linejoin", "round");
		polygons.push(polygon);
	}
	return polygons;
}

function generateElems(wrapperSize, gridSize, separation, colorCount) {
	updateColorSubset(colorCount);

	// Clear wrapper
	wrapper.innerHTML = "";

	const { width, height } = wrapperSize;

	// Use gridSize for both width and height of SVGs
	const svgSize = {
		width: gridSize,
		height: gridSize
	};

	const horizontalCount = Math.floor(width / gridSize);
	const verticalCount = Math.floor(height / gridSize);

	wrapper.style.gridTemplateColumns = `repeat(${horizontalCount}, ${gridSize}px)`;
	wrapper.style.gridTemplateRows = `repeat(${verticalCount}, ${gridSize}px)`;

	const numElements = horizontalCount * verticalCount;

	for (let i = 0; i < numElements; i++) {
		const svg = createSvg(svgSize);
		const polygons = createPolygons(svgSize, separation, colorCount);
		polygons.forEach(polygon => svg.appendChild(polygon));
		wrapper.appendChild(svg);
	}
}

let wrapper;
let wrapperSize;
let sizeText;
const controls = {
	sliders: {},
	displays: {}
};

function updateDisplay(control, value) {
	controls.displays[control].textContent = value;
}

document.addEventListener("DOMContentLoaded", () => {
	wrapper = document.getElementById("wrapper");
	wrapperSize = getTargetSize("wrapper");

	['separation', 'grid', 'color'].forEach(control => {
		controls.sliders[control] = document.getElementById(`${control}Slider`);
		controls.displays[control] = document.getElementById(`${control}Display`);
		controls.sliders[control].addEventListener("input", () => {
			generateElems(wrapperSize, controls.sliders.grid.value, controls.sliders.separation.value, controls.sliders.color.value);
			updateDisplay(control, controls.sliders[control].value);
		});
		updateDisplay(control, controls.sliders[control].value);
	});

	generateElems(wrapperSize, controls.sliders.grid.value, controls.sliders.separation.value, controls.sliders.color.value);

	const randomizeButton = document.getElementById('randomizeButton');
	randomizeButton.addEventListener('click', randomizeControls);
});

window.addEventListener("resize", function () {
	wrapperSize = getTargetSize("wrapper");
	generateElems(wrapperSize, controls.sliders.grid.value, controls.sliders.separation.value, controls.sliders.color.value);
});

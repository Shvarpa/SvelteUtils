// const padsAll = ["padding-top", "padding-bottom", "margin-top", "margin-bottom"];
const pads = ["padding-top", "margin-top"];
// const pads = ["margin-top", "margin-bottom"];
// const pads = [];

const getBaseHeight = (node: HTMLElement) => node.offsetHeight;

const getHeight = (node: HTMLElement) => {
	let style = window.getComputedStyle(node);
	return pads.map(key => parseInt(style.getPropertyValue(key))).reduce((prev, cur) => prev + cur, 0);
};

export const getTotalHeight = (node: HTMLElement) => {
	let cords = Array.prototype.map.call(node.children, (child: HTMLElement) => [child, child.getBoundingClientRect().y]);
	let last;
	let relevent = cords.filter(([child, y]) => {
		if (!last || last != y) {
			last = y;
			return true;
		}
	});
	let num = Array.prototype.reduce.call(
		// node.children,
		relevent,
		(p, [c]) => {
			return p + getHeight(c) + getBaseHeight(c);
		},
		0
	);
	// console.log(num);
	return num + getHeight(node);
};

export const getSize = (node: HTMLElement) => {
	let min, max, minEl, maxEl;
	let cords = Array.prototype.map.call(node.children, (child: HTMLElement) => [child, child.getBoundingClientRect().y]);
	cords.forEach(([child, y]) => {
		if (!min || y <= min) {
			min = y;
			minEl = child;
		}
		if (!max || y >= max) {
			max = y;
			maxEl = child;
		}
	});
	let addition = 0;
	if (maxEl) {
		let style = window.getComputedStyle(maxEl);
		addition = pads.map(key => parseInt(style.getPropertyValue(key))).reduce((prev, cur) => prev + cur, 0) + getBaseHeight(maxEl);
	}
	// console.log({ max, min });
	return (max || 0) - (min || 0) + addition;
};

interface Params {
	transition: string;
	show: boolean;
}

export const height = (node: HTMLElement, params: Params) => {
	const update = (params: Params) => {
		// node.style.height = params.show || true ? getTotalHeight(node) + "px" : "0";
		node.style.height = params.show || true ? getSize(node) + "px" : "0";
	};
	node.style.transition = `height ${params.transition || "2s ease"}`;
	node.style.overflow = "hidden";
	update(params);
	return {
		update,
		destroy: () => {}
	};
};

export default height;

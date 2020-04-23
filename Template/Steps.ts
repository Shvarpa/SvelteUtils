import { Store } from "../Store";

import { writable, Readable } from "svelte/store";

interface Level {
	level: number;
}

interface Methods {
	increase: () => void;
	decrease: () => void;
}

export const Steps = (levels: number, def?: number): Readable<Level> & Methods => {
	let level = !def || def < 0 || levels <= def ? 0 : def;
	let state = Store({ level });

	const increase = () => {
		state.level = Math.min(state.level + 1, levels);
	};

	const decrease = () => {
		state.level = Math.max(state.level - 1, 0);
	};

	return {
		subscribe: state.subscribe,
		increase,
		decrease
	};
};

export default Steps;

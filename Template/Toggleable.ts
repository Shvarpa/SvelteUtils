import { createEventDispatcher } from "svelte";
import { Store } from "../Store";
import { Readable } from "svelte/store";

interface Active {
	active: boolean;
}

interface Methods {
	start: () => void;
	stop: () => void;
	toggle: () => void;
}

export const Toggleable = (def?: boolean): Readable<Active> & Methods => {
	let state = Store({ active: def ?? false });
	const dispatch = createEventDispatcher();

	const start = () => {
		state.active = true;
		dispatch("start");
	};

	const stop = () => {
		state.active = false;
		dispatch("stop");
	};

	const toggle = () => {
      state.active ? stop() : start();
   };

	return {
		subscribe: state.subscribe,
		start,
		stop,
		toggle
	};
};

export default Toggleable;

<script context="module">
	import { getCode, keyCodes } from "./keys";
	export { getCode, keyCodes };
	const relevent = (combo, ev) => {
		let code = getCode(ev);
		let key = ev.key;
		return combo.includes(code) ? code : combo.includes(key) ? key : undefined;
	};
</script>

<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let time = 2000;
	export let combo = ["Escape"];
	if (typeof combo == "string") {
		combo = [combo];
	}

	let held = {};
	let timeout;
	let sent = false;

	const keycombo = () => {
		dispatch("keycombo");
		sent = true;
		cancel();
	};
	const start = () => {
		if (sent || timeout) return;
		if (time == 0) keycombo();
		else timeout = setTimeout(keycombo, time);
	};
	const cancel = () => {
		if (timeout) clearTimeout(timeout);
		timeout = undefined;
	};
	const clear = () => {
		sent = false;
		cancel();
	};
	const evalute = held => {
		if (Object.keys(held).length != combo.length) clear();
		else start();
	};
	const keydown = ev => {
		let key = relevent(combo, ev);
		if (!key) return;
		held[key] = true;
	};
	const keyup = ev => {
		let key = relevent(combo, ev);
		if (!key) return;
		delete held[key];
		held = held;
	};
	const blur = ev => {
		held = {};
	}
	$: evalute(held);
</script>

<svelte:window on:keydown="{keydown}" on:keyup="{keyup}" on:blur="{blur}" />

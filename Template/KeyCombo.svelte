<script context="module">
	import { getCode, keyCodes } from "./keys"
	export { getCode, keyCodes };
</script>

<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let time = 2000;
	export let combo = ["Escape"];
	if(typeof combo == "string") { combo = [combo]}

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
	const detectKey = (ev) => combo.includes(ev.code) || combo.includes(ev.key)
	const keydown = ev => {
		if (detectKey(ev)) held[ev.code] = true;
	};
	const keyup = ev => {
		if (detectKey(ev)) {
			delete held[ev.code];
			held = held;
		}
	};
	const evalute = size => {
		if (size != combo.length) clear();
		else start();
	};

	$: evalute(Object.keys(held).length);
</script>

<svelte:window on:keydown="{keydown}" on:keyup="{keyup}" />

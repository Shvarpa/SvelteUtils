<script>
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";

	export let duration = 3000;
	export let position = "bottom";
	export let text = undefined;
	export let distance = 10;

	let displayedText;
	let stopTimeout;
	let transition = {
		y: position == "bottom" ? distance : position == "top" ? -distance : 0,
		x: position == "right" ? distance : position == "left" ? -distance : 0,
		duration: duration > 0 ? duration / 10 : 50
	};

	export let active = true;

	const _stop = () => {
		active = false;
	};

	export const stop = () => {
		_stop();
		if (stopTimeout) clearTimeout(stopTimeout);
	};

	export const restart = () => {
		active = true;
		if (duration > 0) {
			if (stopTimeout) clearTimeout(stopTimeout);
			stopTimeout = setTimeout(_stop, duration);
		}
	};

	export const update = text => {
		if (text == undefined || text == "") stop();
		else {
			displayedText = text;
			if (duration > 0) restart();
		}
	};

	$: if (text !== undefined && displayedText != text) {
		update(text);
	}

	onMount(restart);
</script>

{#if active && displayedText}
	<div style="{`--distance: ${distance}px`}" transition:fly="{transition}" class="{`toast ${position} ${$$props.class || ''}`}">{displayedText}</div>
{/if}

<style>
	.toast {
		position: absolute;
		z-index: 50;
	}
	.bottom {
		bottom: var(--distance);
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.top {
		top: var(--distance);
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.left {
		left: var(--distance);
		top: 50%;
		transform: translate(0, -50%);
	}
	.right {
		right: var(--distance);
		top: 50%;
		transform: translate(0, -50%);
	}
</style>

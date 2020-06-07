<script>
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";

	export let duration = 3000;
	export let position = "bottom";
	export let text = "";
	export let distance = 10;

	let displayedText = text;
	let stopTimeout;
	let transition = {
		y: position == "bottom" ? 30 : position == "top" ? -30 : 0,
		duration: duration / 10
	};

	let active = true;

	const stop = () => {
		active = false;
	};

	const restart = () => {
		active = true;
		if (stopTimeout) clearTimeout(stopTimeout);
		stopTimeout = setTimeout(stop, duration);
	};

	$: if (displayedText != text) {
		displayedText = text;
		restart();
	}

	onMount(restart);
</script>

{#if active}
	<div style={`--distance: ${distance}px`} transition:fly="{transition}" class="{`toast ${position} ${$$props.class || ''}`}">{displayedText}</div>
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
</style>

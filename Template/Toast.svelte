<script>
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";
	export let duration = 3000;
	export let position = "bottom";
	export let text = "";
	let restartTimeout;
	let stopTimeout;
	let transition = {
		y: position == "bottom" ? 30 : position == "top" ? -30 : 0,
		duration: duration / 3
	};

	let active = false;

	const restart = () => {
		active = false;
		if (restartTimeout) clearTimeout(restartTimeout);
		restartTimeout = setTimeout(() => (active = true), duration / 3);
	};

	const stay = () => {
		if (stopTimeout) clearTimeout(stopTimeout);
		stopTimeout = setTimeout(() => (active = false), duration);
	};

	setTimeout(() => (active = true), 500);

	$: if (text) {
		stay();
	}

	onMount(restart);
</script>

{#if active}
	<div transition:fly="{transition}" class="{`toast ${position} ${$$props.class || ''}`}">{text}</div>
{/if}

<style>
	.toast {
		position: absolute;
	}
	.bottom {
		bottom: 30px;
		left: 50%;
	}
	.top {
		top: 30px;
		left: 50%;
	}
</style>

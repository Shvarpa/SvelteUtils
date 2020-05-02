<script>
	import { fly } from "svelte/transition";
	export let tip;
	export let active = false;
	export let delay = 1000;

	let timeout;
	const hideable = active != undefined ? !active : true;
	const enter = () => {
		timeout = setTimeout(show, delay);
	};
	const leave = () => {
		if (timeout) clearTimeout(timeout);
		hide();
	};
	const show = () => {
		if (hideable) active = true;
	};
	const hide = () => {
		if (hideable) active = false;
	};
	export let width = "max-content";
</script>

<div class="tooltip-wrapper" on:mouseenter="{enter}" on:mouseleave="{leave}">
	<slot />
	{#if active && tip != undefined}
		<div transition:fly="{{ y: -10, duration: 200 }}" class="{`tooltip ${$$props.class || ''}`}" style="{`width: ${width};`}">{tip}</div>
	{/if}
</div>

<style>
	.tooltip-wrapper {
		position: relative;
		display: inline-block;
	}
	.tooltip {
		position: absolute;
		padding: 8px 16px;
		z-index: 50;
		min-width: fit-content;
	}

	.bottom,
	.top {
		left: 0%;
	}
	.top {
		bottom: calc(100% + 5px);
	}
	.bottom {
		top: calc(100% + 5px);
	}
	.right,
	.left {
		top: 0;
	}
	.left {
		right: calc(100% + 10px);
	}
	.right {
		left: calc(100% + 10px);
	}
</style>

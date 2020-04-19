<script>
	import { fly } from "svelte/transition"
	export let tip;
	export let active = false;
	export let delay = 500;

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
</script>

<div on:mouseenter="{enter}" on:mouseleave="{leave}">
	<slot />
	{#if active && tip != undefined}
		<div transition:fly={{y:-10,duration:200}} class="{`tooltip ${$$restProps.class ? $$restProps.class : ''}`}">{tip}</div>
	{/if}
</div>

<style>
	.tooltip {
		position: absolute;
		/* padding: 8px 16px; */
		right: 10px;
	}
</style>

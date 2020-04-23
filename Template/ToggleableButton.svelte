<script>
	import Toggleable from "./Toggleable.svelte";
	export let startLabel = "Start";
	export let stopLabel = "Stop";
	export let active = false;
</script>

<Toggleable let:toggle {active} on:start on:stop>
	<button {...$$restProps} class="{`button ${$$props.class || ''}`}" on:click="{toggle}">{active ? stopLabel : startLabel}</button>
</Toggleable>

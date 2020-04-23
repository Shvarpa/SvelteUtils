<script>
	import Toggleable from "./Toggleable";
	export let startLabel = "Start";
	export let stopLabel = "Stop";
	export let active = false;

	let state = Toggleable(active);
</script>

<button on:start on:stop {...$$restProps} class="{`button ${$$props.class || ''}`}" on:click="{state.toggle}">{active ? stopLabel : startLabel}</button>

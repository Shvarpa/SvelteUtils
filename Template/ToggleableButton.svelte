<script>
	import Toggleable from "./Toggleable";
	export let startLabel = "Start";
	export let stopLabel = "Stop";
	export let active = false;

	let toggleable = Toggleable(active);
</script>

<button on:start on:stop {...$$restProps} class="{`button ${$$props.class || ''}`}" on:click="{toggleable.toggle}">{active ? stopLabel : startLabel}</button>

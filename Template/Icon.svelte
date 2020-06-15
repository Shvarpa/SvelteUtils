<script>
	export let data;
	export let style;
	let path = [];
	let viewBox = "";
	$: viewBox = "0 0 " + data.icon[0] + " " + data.icon[1];
	$: path = data.icon[4];
</script>

<svg {style} aria-hidden="true" class="{`fa-svelte ${$$props.class || ''}`}" role="img" xmlns="http://www.w3.org/2000/svg" {viewBox}>
	<path fill="currentColor" d="{path}"></path>
</svg>

<style>
	@import url("./fa.css");
	.hidden {
		visibility: hidden;
	}
	.fa-svelte {
		/* width: 1em; */
		height: 1em;
		overflow: visible;
		display: inline-block;
	}
</style>

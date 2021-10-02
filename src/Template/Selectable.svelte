<script>
	export let selected;
	export let id;
	let isSelected = false;
	$: isSelected = selected == id;
	const select = () => {
		selected = id;
	};
</script>

<div class="box" class:isSelected on:click="{select}">
	<slot />
</div>

<style>
	.isSelected {
		transition: 0.2s ease all;
		background-color: aqua;
	}
</style>

<script>
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let isActive = true;
	const close = () => {
		isActive = false;
		dispatch("close");
	};
	const outside = () => {
		dispatch("outside",close)
	}
	const handleKey = event => {
		if (event.code == "Escape") close();
	};
</script>

<svelte:window on:keydown="{handleKey}" />

<div class="modal" class:is-active="{isActive}">
	<div class="modal-background" on:click="{outside}"></div>
	<div class="modal-content notification">
		<button class="delete" on:click="{close}"></button>
		<slot {close} />
	</div>
</div>

<style>
	.modal-content {
		overflow: visible;
	}
</style>

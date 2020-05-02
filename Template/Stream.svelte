<script context="module">
	const srcObjectAction = (node, srcObject) => {
		node.srcObject = srcObject;
	};
	export { srcObjectAction as srcObject };
	import KeyCombo from "./KeyCombo.svelte";
</script>

<script>
	export let srcObject;
	export let isAudio = false;
	const { autoplay, controls } = $$restProps;

	export let mediaElement = undefined;

	const toggle = () => {
		if (document.fullscreen) {
			document.exitFullscreen();
			document.exitPointerLock();
		} else if (mediaElement) {
			mediaElement.requestFullscreen();
			mediaElement.requestPointerLock();
		}
	};
</script>

{#if srcObject}
	{#if isAudio}
		<audio class="{`${!controls ? 'no-controls ' : ''}${$$restProps.class || ''}`}" bind:this="{mediaElement}" {...$$restProps} use:srcObjectAction="{srcObject}"></audio>
		<video class="{`${!controls ? 'no-controls ' : ''}${$$restProps.class || ''}`}" bind:this="{mediaElement}" {...$$restProps} use:srcObjectAction="{srcObject}"></video>
	{/if}
{/if}

<style>
	.no-controls::-webkit-media-controls {
		display: none;
	}
	.full {
		height: 100%;
	}
</style>

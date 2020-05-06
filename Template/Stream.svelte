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
</script>

{#if srcObject}
	{#if isAudio}
		<audio class="{`${!controls ? 'no-controls ' : ''}${$$restProps.class || ''}`}" bind:this="{mediaElement}" {...$$restProps} use:srcObjectAction="{srcObject}"></audio>
	{:else}
		<video class="{`${!controls ? 'no-controls ' : ''}${$$restProps.class || ''}`}" bind:this="{mediaElement}" {...$$restProps} use:srcObjectAction="{srcObject}"></video>
	{/if}
{:else}
	{#if isAudio}
		<audio class="{`${!controls ? 'no-controls ' : ''}${$$restProps.class || ''}`}" bind:this="{mediaElement}" {...$$restProps}></audio>
	{:else}
		<video class="{`${!controls ? 'no-controls ' : ''}${$$restProps.class || ''}`}" bind:this="{mediaElement}" {...$$restProps}></video>
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

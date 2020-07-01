<script context="module">
	const srcObjectAction = (node, srcObject) => {
		node.srcObject = srcObject;
	};
	const mutedAction = (node, muted) => {
		if (muted) node.volume = 0;
	};
	export { srcObjectAction as srcObject };
	import KeyCombo from "./KeyCombo.svelte";
</script>

<script>
	export let srcObject;
	export let isAudio = false;
	export let controls = false;
	export let muted = false;
	export let mediaElement = undefined;
	let _controls = {};
	$: _controls = controls ? { controls } : {};
</script>

{#if srcObject}
	{#if isAudio}
		<audio class:no-controls="{!controls}" class="{`${$$restProps.class || ''}`}" bind:this="{mediaElement}" {...$$restProps} use:srcObjectAction="{srcObject}" {..._controls} use:mutedAction={muted}></audio>
	{:else}
		<video class:no-controls="{!controls}" class="{`${$$restProps.class || ''}`}" bind:this="{mediaElement}" {...$$restProps} use:srcObjectAction="{srcObject}" {..._controls} use:mutedAction={muted}></video>
	{/if}
{:else}
	{#if isAudio}
		<audio class:no-controls="{!controls}" class="{`${$$restProps.class || ''}`}" bind:this="{mediaElement}" {...$$restProps} {..._controls} use:mutedAction={muted}></audio>
	{:else}
		<video class:no-controls="{!controls}" class="{`${$$restProps.class || ''}`}" bind:this="{mediaElement}" {...$$restProps} {..._controls} use:mutedAction={muted}></video>
	{/if}
{/if}

<style>
	.no-controls::-webkit-media-controls {
		display: none;
	}
</style>

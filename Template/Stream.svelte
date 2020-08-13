<script context="module">
	const srcObjectAction = (node, srcObject) => {
		const update = srcObject => {
			if (srcObject) node.srcObject = srcObject;
		};
		update(srcObject);
		return { update };
	};
	const mutedAction = (node, muted) => {
		const update = muted => {
			if (!muted) return;
			node.muted = true;
			node.volume = 0;
		};
		update(muted);
		return { update };
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

{#if isAudio}
	<audio
		class:no-controls="{!controls}"
		class="{`${$$restProps.class || ''}`}"
		bind:this="{mediaElement}"
		{...$$restProps}
		{..._controls}
		use:mutedAction="{muted}"
		use:srcObjectAction="{srcObject}"></audio>
{:else}
	<video
		class:no-controls="{!controls}"
		class="{`${$$restProps.class || ''}`}"
		bind:this="{mediaElement}"
		{...$$restProps}
		{..._controls}
		use:mutedAction="{muted}"
		use:srcObjectAction="{srcObject}"></video>
{/if}

<style>
	.no-controls::-webkit-media-controls {
		display: none;
	}
</style>

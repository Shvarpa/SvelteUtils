<script>
	export let stream;
	export let isAudio = false;
	const srcObject = (node, data) => {
		node.srcObject = data;
	};
	const { autoplay, controls } = $$restProps;
	export let mediaElement = undefined;
</script>

{#if stream}
	{#if isAudio}
		<audio bind:this="{mediaElement}" {...$$restProps} use:srcObject="{stream}"></audio>
	{:else}
		<video bind:this="{mediaElement}" {...$$restProps} use:srcObject="{stream}"></video>
	{/if}
{/if}

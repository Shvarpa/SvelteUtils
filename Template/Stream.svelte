<script>
   export let stream;
   export let isAudio = false;
   const srcObject = (node, data) => {
      node.srcObject = data;
   };
   const { autoplay, controls} = $$restProps;
</script>

{#if stream}
   {#if isAudio}
      <audio {...$$restProps} use:srcObject={stream} />
   {:else}
      <video {...$$restProps} use:srcObject={stream} />
   {/if}
{/if}

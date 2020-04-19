<script>
   import Toggleable from "./Toggleable.svelte";
   export let startLabel = "Start";
   export let stopLabel = "Stop";
</script>

<Toggleable let:toggle let:active on:start on:stop>
   <button class="button" on:click={toggle}>{active ? stopLabel : startLabel}</button>
</Toggleable>
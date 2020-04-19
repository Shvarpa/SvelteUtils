<script>
   import { createEventDispatcher } from "svelte"
   const dispatch = createEventDispatcher();

   export let active = false;
   const start = () => {
      active = true;      
      dispatch("start")
   }
   const stop = () => {
      dispatch("stop")
      active = false;
   }
   const toggle = () => {      
      if(active) stop(); 
      else start();
   }
</script>

<slot {start} {stop} {toggle} {active} />

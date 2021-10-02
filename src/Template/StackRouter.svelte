<script context="module">
   import { StackRouter } from "./ts/StackRouter"
   export { StackRouter };
</script>

<script>
   export let router = new StackRouter();   
</script>

<svelte:component this={$router.component} {...($router.props || {})} />
<script context="module">
	import { Router } from "./Router";
	export const getBasepath = () => window.location.href.match(/(?<protocol>.*):\/\/(?<site>[^/]*)(?<path>\/[^.]*)(?<type>[^./]*.[^./]*)?/).groups.path;
	export { Router };
</script>

<script>
	import { onMount } from "svelte";
	export let router = new Router();

	let mounted = false;
	let found, component, params;

	onMount(() => {
		if (!$router.basepath) router.baseurl = getBasepath();
		mounted = true;
	});

	$: found = router.find($router.url);
</script>

{#if mounted}
	<svelte:component this="{found.component}" {...found.props} />
{/if}

<script>
	export let limit = 14;
	export let text = "";
	export let minhover = 500;
	const expandable = text.length > limit;
	let expanded = !expandable;
	const toggle = () => {
		if (expandable) expanded = !expanded;
	};
	const expand = () => {
		if (expandable) expanded = true;
	};
	const shrink = () => {
		if (expandable) expanded = false;
	};
	let timer;
	const enter = () => {
		timer = setTimeout(expand, minhover);
	};
	const leave = () => {
		if (timer) clearTimeout(timer);
		shrink();
	};
</script>

<div on:mouseenter="{enter}" on:mouseleave="{leave}">
	{#if expanded}{text}{:else}{text.slice(0, Math.min(text.length, limit)) + '..'}{/if}
</div>

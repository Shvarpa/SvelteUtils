<script>
	export let levels = 2;
	export let level = 0;
	export let loop = true;

	const increase = () => {
		level = loop ? ((level + 1) % (levels)) : Math.min(level + 1, levels - 1);
	};
	const decrease = () => {
		level = loop ? ((level - 1) % (levels)) : Math.max(level - 1, 0);
	};
</script>

<slot {level} {increase} {decrease} />

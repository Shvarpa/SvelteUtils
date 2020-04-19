<script>
	export let levels = 2;
	export let level = 0;

	const increase = () => {
		level = Math.min(level + 1, levels - 1);
	};
	const decrease = () => {
		level = Math.max(level - 1, 0);
	};
</script>

<slot {level} {increase} {decrease} />

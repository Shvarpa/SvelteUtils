<script context="module">
	// import { ScrollChecker } from "./ScrollChecker";
</script>

<script>
	export let height = "250px";
	export let maxHeight = undefined;
	export let minHeight = undefined;
	export let background = "white";
	export let padding = "25px";

	let top = false;
	let bottom = false;

	let style = "";
	$: style = `
		${height ? `--height: ${height}; ` : ""}
		${maxHeight ? `--max-height: ${height}; ` : ""}
		${minHeight ? `--min-height: ${height}; ` : ""}
		${padding ? `--padding: ${padding};` : ""}
		${background ? `--background: ${background}` : ""}
	`;

	let scroll;
	const checkScroll = () => {
		const { scrollTop, clientHeight, scrollHeight } = scroll;
		top = scrollTop == 0;
		bottom = scrollTop + clientHeight == scrollHeight;
	};
</script>

<div class="{`scroller-wrapper ${$$props.class || ''}`}" {style}>
	{#if background && !top}
		<div class="top vertical"></div>
	{/if}
	{#if background && !bottom}
		<div class="bottom vertical"></div>
	{/if}
	<div class="scroller" bind:this="{scroll}" on:scroll="{checkScroll}">
		<slot />
	</div>
</div>

<style>
	.scroller-wrapper {
		position: relative;
		max-height: var(--max-height);
		min-height: var(--min-height);
		height: var(--height);
		overflow-y: hidden;
	}

	.scroller {
		max-height: var(--max-height);
		min-height: var(--min-height);
		height: var(--height);
		border-color: rgba(0, 0, 0, 0);
		transition: border-color 0.75s linear;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 2px 2px 20px 5px;
	}

	.vertical {
		width: 100%;
		height: var(--padding);
		pointer-events: none;
	}
	.bottom {
		position: absolute;
		bottom: calc(-0.25 * var(--padding));
		background: linear-gradient(transparent, var(--background));
	}

	.top {
		position: absolute;
		top: calc(-0.25 * var(--padding));
		background: linear-gradient(var(--background), transparent);
	}

	.scroller:hover {
		border-color: rgba(0, 0, 0, 0.1);
		transition: border-color 0.125s linear;
	}

	.scroller::-webkit-scrollbar,
	.scroller::-webkit-scrollbar-thumb,
	.scroller::-webkit-scrollbar-corner {
		/* add border to act as background-color */
		border-right-style: inset;
		/* sum viewport dimensions to guarantee border will fill scrollbar */
		border-right-width: calc(100vw + 100vh);
		/* inherit border-color to inherit transitions */
		border-color: inherit;
	}

	.scroller::-webkit-scrollbar {
		width: 0.5rem;
		height: 0.5rem;
	}

	.scroller::-webkit-scrollbar-thumb {
		border-color: rgba(0, 0, 0, 0.1);
		/* uncomment this to hide the thumb when not hovered */
		/* border-color: inherit; */
	}

	.scroller::-webkit-scrollbar-thumb:hover {
		border-color: rgba(0, 0, 0, 0.15);
	}

	.scroller::-webkit-scrollbar-thumb:active {
		border-color: rgba(0, 0, 0, 0.2);
	}
</style>

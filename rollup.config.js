import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import path from "path";
import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

const name = pkg.name.replace(/^\w/, m => m.toUpperCase()).replace(/-\w/g, m => m[1].toUpperCase());

const production = !process.env.ROLLUP_WATCH;
const dev = !production;

const srcDir = "src";
const outDir = "./dist";
const entry = ({ input, name }) => {
	const outFolder = path.join(outDir, path.dirname(input).replace(srcDir, ""));
	return {
		input: input,
		// output: [
		// 	{ file: path.join(outFolder, path.basename(input).replace(/\..*$/, ".js")), "format": "umd", name },
		// 	{ file: path.join(outFolder, path.basename(input).replace(/\..*$/, ".mjs")), "format": "es" }
		// ],
		output: { file: path.join(outFolder, path.basename(input).replace(/\..*$/, ".mjs")), "format": "es" },
		plugins: [svelte({ dev }), typescript({ tsconfig: "./tsconfig.json", declaration: true }), commonjs(), resolve(), !production && livereload("dist")]
	};
};

export default [
	{ input: "src/Store.ts", name: "Store" },
	{ input: "src/Actions/height.ts", name: "Actions/height" },
	{ input: "src/Actions/resize.ts", name: "Actions/resize" },
	{ input: "src/Template/Icon.svelte", name: "Template/Icon" },
	{ input: "src/Template/IconStack.svelte", name: "Template/IconStack" },
	{ input: "src/Template/KeyCombo.svelte", name: "Template/KeyCombo" },
	{ input: "src/Template/Modal.svelte", name: "Template/Modal" },
	{ input: "src/Template/Router.svelte", name: "Template/Router" },
	{ input: "src/Template/Scroller.svelte", name: "Template/Scroller" },
	{ input: "src/Template/Selectable.svelte", name: "Template/Selectable" },
	{ input: "src/Template/StackRouter.svelte", name: "Template/StackRouter" },
	{ input: "src/Template/Steps.svelte", name: "Template/Steps" },
	{ input: "src/Template/Stream.svelte", name: "Template/Stream" },
	{ input: "src/Template/TextShrink.svelte", name: "Template/TextShrink" },
	{ input: "src/Template/Toast.svelte", name: "Template/Toast" },
	{ input: "src/Template/Toggleable.svelte", name: "Template/Toggleable" },
	{ input: "src/Template/ToggleableButton.svelte", name: "Template/ToggleableButton" },
	{ input: "src/Template/Tooltip.svelte", name: "Template/Tooltip" },
	{ input: "src/Template/ts/Router.ts", name: "Template/ts/Router" },
	{ input: "src/Template/ts/keys.ts", name: "Template/ts/keys" },
	{ input: "src/Template/ts/StackRouter.ts", name: "Template/ts/StackRouter" }
].map(entry);

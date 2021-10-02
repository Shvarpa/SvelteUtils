import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import path from "path";
import pkg from "./package.json";
// import babel from "@rollup/plugin-babel";
// import preprocess from "svelte-preprocess";
// import fs from "fs";
import typescript from "@rollup/plugin-typescript";
// import typescript from "rollup-plugin-typescript2";
// import commonjs from "@rollup/plugin-commonjs";

const name = pkg.name.replace(/^\w/, m => m.toUpperCase()).replace(/-\w/g, m => m[1].toUpperCase());

const production = !process.env.ROLLUP_WATCH;
const dev = !production;

const srcDir = "src";
const outDir = "./dist";
const entry = input => {
	const outFolder = path.join(outDir, path.dirname(input).replace(srcDir, ""));
	return {
		input: input,
		// output: [
		// 	{ file: path.join(outFolder, path.basename(input).replace(/\..*$/, ".js")), "format": "umd", name },
		// 	{ file: path.join(outFolder, path.basename(input).replace(/\..*$/, ".mjs")), "format": "es" }
		// ],
		// output: { file: path.join(outFolder, path.basename(input).replace(/\..*$/, ".mjs")), "format": "es" },
		// output: { dir: "./dist", "format": "es" },
		output: { file: path.join(outFolder, path.basename(input).replace(/\..*$/, ".mjs")), "format": "es" },
		plugins: [
			svelte({
				extensions: ".svelte",
				dev
				// preprocess: preprocess({
				// 	babel: JSON.parse(fs.readFileSync("./.babelrc"))
				// })
			}),
			// babel({ extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"], babelHelpers: "bundled" }),
			// typescript({ tsconfig: './tsconfig.json' }), // 1
			typescript({ tsconfig: "./tsconfig.json" }), // 1
			// typescript({ useTsconfigDeclarationDir: false }), // 2
			resolve(),
			!production && livereload("dist")
		]
	};
};

export default entry("src/index.ts");
// export default [
// 	"src/Store.ts",
// 	"src/Actions/height.ts",
// 	"src/Actions/resize.ts",
// 	"src/Template/Icon.svelte",
// 	"src/Template/IconStack.svelte",
// 	"src/Template/KeyCombo.svelte",
// 	"src/Template/Modal.svelte",
// 	"src/Template/Router.svelte",
// 	"src/Template/Scroller.svelte",
// 	"src/Template/Selectable.svelte",
// 	"src/Template/StackRouter.svelte",
// 	"src/Template/Steps.svelte",
// 	"src/Template/Stream.svelte",
// 	"src/Template/TextShrink.svelte",
// 	"src/Template/Toast.svelte",
// 	"src/Template/Toggleable.svelte",
// 	"src/Template/ToggleableButton.svelte",
// 	"src/Template/Tooltip.svelte",
// 	"src/Template/Router.ts",
// 	"src/Template/keys.ts",
// 	"src/Template/StackRouter.ts"
// ].map(entry);

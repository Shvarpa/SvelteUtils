
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import pkg from './package.json';

const name = pkg.name
	.replace(/^\w/, m => m.toUpperCase())
    .replace(/-\w/g, m => m[1].toUpperCase());

const production = !process.env.ROLLUP_WATCH;

export default {
    input: production ? 'src/index.js' : "src/test/test.js",
    output: [
        { file: pkg.module, 'format': 'es' },
        { file: pkg.main, 'format': 'umd', name }
    ],
    plugins: [
        svelte({
            dev: !production,
        }),
        resolve(),
        !production && livereload('dist'),
    ],
};

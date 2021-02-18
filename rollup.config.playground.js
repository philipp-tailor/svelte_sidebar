import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import md from 'rollup-plugin-md'
import css from 'rollup-plugin-css-only'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import visualizer from 'rollup-plugin-visualizer'

const production = !process.env.ROLLUP_WATCH

export default {
	input: ['src/main.js', `src/components/Sidebar/Sidebar.svelte`],
	output: {
		chunkFileNames: '[name].js',
		sourcemap: true,
		format: 'esm',
		name: 'app',
		dir: 'public/',
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
			},
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs(),

		md({ marked: {} }),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		production && visualizer({ open: true, title: 'bundle visualizer' }),
	],
	watch: {
		clearScreen: false,
	},
}

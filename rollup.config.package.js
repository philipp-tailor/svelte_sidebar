import resolve from '@rollup/plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default {
	input: 'src/components/Sidebar/Sidebar.svelte',
	output: [
		{ file: pkg.module, format: 'es' },
		{ file: pkg.main, format: 'umd', name: 'Sidebar' },
	],
	plugins: [svelte({ emitCss: false }), resolve(), terser()],
}

import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import { name, pkg } from './config';

const config = {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    file: pkg.browser,
    format: 'iife',
    name
  },
  plugins: [
    svelte({
      dev: false,
      css: css => css.write('web/index.css'),
      customElement: true,
      tag: 'chroma-picker'
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    terser()
  ]
};

export default config;

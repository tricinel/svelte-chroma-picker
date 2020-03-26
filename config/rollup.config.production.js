import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import { name, pkg } from './config';

const config = {
  input: 'src/index.js',
  output: [
    {
      sourcemap: true,
      file: pkg.module,
      format: 'es'
    },
    {
      sourcemap: true,
      file: pkg.main,
      format: 'umd',
      name
    }
  ],
  plugins: [
    svelte(),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    terser()
  ]
};

export default config;

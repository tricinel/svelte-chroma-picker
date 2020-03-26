import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';

import { name } from './config';

const serve = function() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  };
};

const config = {
  input: 'demo/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name,
    file: 'demo/build/bundle.js'
  },
  plugins: [
    svelte({
      dev: true,
      css: css => css.write('demo/build/bundle.css')
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    serve(),
    livereload('demo')
  ],
  watch: {
    clearScreen: false
  }
};

export default config;

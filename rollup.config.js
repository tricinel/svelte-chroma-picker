import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: production ? 'lib/Picker.svelte' : 'demo/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: production ? 'web/index.js' : 'demo/build/bundle.js'
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write(production ? 'web/index.css' : 'demo/build/bundle.css');
      },
      customElement: production,
      tag: production && 'chroma-picker'
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    !production && serve(),
    !production && livereload('demo'),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};

function serve() {
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
}

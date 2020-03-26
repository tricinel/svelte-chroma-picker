import pkg from '../package.json';

const name = pkg.name
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

export { name, pkg };

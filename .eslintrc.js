module.exports = {
  extends: ['frontwerk', 'plugin:prettier/recommended'],
  plugins: ['svelte3', 'prettier'],
  overrides: [
    {
      files: ['lib/**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'prettier/prettier': 'off',
        'import/no-mutable-exports': 'off'
      }
    }
  ],
  rules: {
    'prettier/prettier': 'error',
    'import/no-unused-modules': 'off'
  }
};

# svelte-chroma-picker

What?! Yet another color picker? Yep, I wanted to learn [svelte][svelte].

![Npm version][npm-version-badge]
[![Npm downloads][npm-downloads-badge]][svelte-chroma-picker-npm] ![License][license-badge]

## Installation

```
yarn add svelte-chroma-picker
```

```
npm i --save svelte-chroma-picker
```

## Usage

To use it, simply import it as a svelte component.

```html
<script>
  import ChromaPicker from 'svelte-chroma-picker';

  let color = '#fff';
</script>

<ChromaPicker bind:color />
```

[Play with this example on Code Sandbox.][sandbox-svelte]

### Options

You have a few options at your disposal.

- _color_. Obviously, the color you want to bind to.
- _width_ and _height_. You can control the size of the color box for the picker.

### Events

- _update_. Dispatched every time you change the color. It returns an object with the rgb and hsv values for the current color, should you need them.

Check out the [Demo](./demo).

## A note on accessibility

I'm still working on making this 100% keyboard and screen reader accessible. Pull requests welcome!

## License

MIT License - fork, modify and use however you want.

[svelte]: https://svelte.dev/
[license-badge]: https://img.shields.io/npm/l/svelte-chroma-picker.svg?style=flat-square
[npm-version-badge]: https://img.shields.io/npm/v/svelte-chroma-picker.svg?style=flat-square
[npm-downloads-badge]: https://img.shields.io/npm/dt/svelte-chroma-picker.svg?style=flat-square
[svelte-chroma-picker-npm]: https://www.npmjs.com/package/svelte-chroma-picker
[sandbox-svelte]: https://codesandbox.io/s/svelte-chroma-picker

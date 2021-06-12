<script>
  import { createEventDispatcher } from 'svelte';
  import { valid, setChannel, channels, hsvToRgb, hsvToHex } from './colors';

  // The initial color which the consumer can pass in
  export let color = '#fff';

  // The picker needs a width and a height
  // The consumer can customize this
  export let width = 240;
  export let height = 160;

  const dispatch = createEventDispatcher();

  // Keep track of the position, size and background color of the color box picker
  const colorBox = {
    width,
    height,
    handle: {
      x: 0,
      y: 0
    },
    bg: {}
  };

  // The initial hue value
  let hue = 180;

  // Keep track of whether the user is dragging the handle around the color box
  let trackMove = false;

  // We'll need references to these DOM elements as well
  let handleEl;
  let colorBoxEl;

  // If the color is valid, we need to update the handle position
  $: if (valid(color)) {
    const { hsv } = channels(color);

    // Hue-less colors (black, white, and grays), the hue component will be NaN
    // So we need to make sure it doesn't blow up
    if (!isNaN(hsv.h)) {
      hue = hsv.h;
    }

    // Finally, we update the position of the handle
    colorBox.handle.x = hsv.s * 100;
    colorBox.handle.y = (1 - hsv.v) * 100;
  }

  // Adjust a single channel for the color
  const updateChannel = (channel, value) => {
    color = setChannel(color, channel, value);
  };

  // Make sure both the colorBox background and the actual color are updated
  // whenever the hue changes
  const updateHue = h => {
    const rgb = hsvToRgb(h, 1, 1);
    updateChannel('hsv.h', h);
    colorBox.bg = { r: rgb[0], g: rgb[1], b: rgb[2] };
  };

  $: updateHue(hue);

  // When the user moved the handle, we reposition it and update the color
  const updateColor = (x, y) => {
    handleEl.style.top = `${y}%`;
    handleEl.style.left = `${x}%`;
    color = hsvToHex(hue, x/100, 1-y/100);
  };

  const minmax = (n, min = 0, max = 100) => {
    let result = n;
    if (n > max) {
      result = max;
    }
    if (n < min) {
      result = min;
    }
    result = result.toFixed(2);

    return result;
  };

  // Based on the X and Y position of the client's mouse/touch
  // we calculate where the new position of the handle should be
  // and update the color
  const pick = (clientX, clientY) => {
    const { x, y } = colorBoxEl.getBoundingClientRect();
    let xPercentage = ((clientX - x) / colorBox.width) * 100;
    let yPercentage = ((clientY - y) / colorBox.height) * 100;

    yPercentage = minmax(yPercentage);
    xPercentage = minmax(xPercentage);

    updateColor(xPercentage, yPercentage);
  };

  // Whenever we have a valid color, we can let the consumer know of the current value
  $: valid(color) &&
    dispatch('update', {
      hex: color,
      ...channels(color)
    });

  /* Events */
  const stop = () => {
    trackMove = false;
  };

  const mousedown = event => {
    trackMove = true; // We need to start tracking
    const xPercentage = (((event.offsetX + 1) / colorBox.width) * 100).toFixed(
      2
    );
    const yPercentage = (((event.offsetY + 1) / colorBox.height) * 100).toFixed(
      2
    );
    updateColor(xPercentage, yPercentage);
  };

  const mousemove = event => {
    // We only perform this if the user has previously clicked on the colorBox
    // Otherwise, we might end up updating the color whenever the user moves his mouse around
    if (trackMove) {
      pick(event.clientX, event.clientY);
    }
  };

  const touchmove = event => {
    // We only perform this if the user has previously touched the colorBox
    // Otherwise, we might end up updating the color whenever the user moves drags the page around
    if (trackMove) {
      pick(event.touches[0].clientX, event.touches[0].clientY);
    }
  };
</script>

<div
  role="presentation"
  style="--width: {colorBox.width}px; --height: {colorBox.height}px;
  --color-red: {colorBox.bg.r}; --color-green: {colorBox.bg.g}; --color-blue: {colorBox.bg.b}"
>
  <div data-picker="saturation">
    <div data-picker="value">
      <div
        data-picker="handle"
        bind:this="{handleEl}"
        style="--top: {colorBox.handle.y}%; --left: {colorBox.handle.y}%"
      ></div>
      <div
        data-picker="colorBox"
        on:mousedown="{mousedown}"
        on:touchstart="{mousedown}"
        on:mousemove="{mousemove}"
        on:touchmove="{touchmove}"
        on:mouseup="{stop}"
        on:touchend="{stop}"
        bind:this="{colorBoxEl}"
      ></div>
    </div>
  </div>
</div>
<label style="--width: {colorBox.width}px; --height: {colorBox.height}px">
  <span>Hue</span>
  <input type="range" min="0" max="360" bind:value="{hue}" />
</label>

<style>
  [role='presentation'] {
    background: rgb(var(--color-red), var(--color-green), var(--color-blue));
    box-shadow: rgba(0, 0, 0, 0.06) 0 0 0 1px;
    height: var(--height);
    width: var(--width);
  }

  [data-picker='saturation'] {
    background: linear-gradient(
      to right,
      rgb(255, 255, 255),
      rgba(255, 255, 255, 0)
    );
    height: var(--height);
    width: var(--width);
  }

  [data-picker='value'] {
    background: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0));
    height: var(--height);
    overflow: hidden;
    width: var(--width);
  }

  [data-picker='handle'] {
    background: transparent;
    border-radius: 50%;
    border: 2px solid #f2f2f2;
    box-shadow: 0 0.3px 1.4px rgba(0, 0, 0, 0.6),
      0 0.9px 4.7px rgba(0, 0, 0, 0.032), 0 4px 21px rgba(0, 0, 0, 0.04);
    cursor: crosshair;
    height: 8px;
    left: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    transform: translate(-9px, -9px);
    width: 8px;

    top: var(--top, 50%);
    left: var(--left, 50%);
  }

  [data-picker='colorBox'] {
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.32) inset;
    cursor: crosshair;
    display: block;
    height: 100%;
    position: relative;
    transform: translate(0, -16px);
    touch-action: none;
    width: 100%;
  }

  label {
    display: block;
    margin: 0.8em 0;
    max-width: calc(var(--width) - 4px);
    width: calc(var(--width) - 4px);
  }

  label span {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  input {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    background: linear-gradient(
      to right,
      #ff0000 0%,
      #ffff00 17%,
      #00ff00 33%,
      #00ffff 50%,
      #0000ff 67%,
      #ff00ff 83%,
      #ff0000 100%
    );
    border-radius: 6px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.06) 0 0 0 1px inset;
    height: 12px;
    outline: none;
    padding: 1px 2px;
    width: 100%;
  }

  input::-moz-range-track {
    background: transparent;
    border: inherit;
  }

  input::-ms-track {
    background: transparent;
    border: inherit;
    color: transparent;
  }

  input::-ms-fill-lower,
  input::-ms-fill-upper {
    background: transparent;
  }

  input::-ms-tooltip {
    display: none;
  }

  input::-webkit-slider-thumb,
  input::-moz-range-thumb {
    -webkit-appearance: none;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.12) 0 0 0 1px inset;
    border-radius: 10px;
    border: none;
    height: 10px;
    width: 10px;
  }
</style>

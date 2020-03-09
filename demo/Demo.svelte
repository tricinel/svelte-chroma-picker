<script>
  import ChromaPicker from '../lib/Picker.svelte';

  export let color;

  let rgb;

  const handleColorUpdate = ev => {
    rgb = ev.detail.rgb;
  };
</script>

<main style="--color: {color}">

  <div>
    <p>
      HEX:
      <strong>{color}</strong>
      {#if rgb}
        Red:
        <strong>{rgb.r}</strong>
        Green:
        <strong>{rgb.g}</strong>
        Blue:
        <strong>{rgb.b}</strong>
      {/if}
    </p>

    <ChromaPicker
      bind:color
      width="320"
      height="240"
      on:update="{handleColorUpdate}"
    />
  </div>
</main>

<style>
  main {
    background-color: var(--color);
    margin: 0;
    padding: 1.6em 0;
    height: calc(100vh - 3.2em);
  }

  p {
    color: #444;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    font-weight: 300;
    font-size: 0.88em;
  }

  strong {
    background-color: #e6e6e6;
    border: 1px solid #ccc;
    border-radius: 2px;
    color: #212121;
    font-weight: 400;
    padding: 0.12em 0.24em;
  }

  div {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
      0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
      0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
      0 100px 80px rgba(0, 0, 0, 0.07);
    max-width: 32em;
    margin: 2.4em auto;
    padding: 1.6em;
  }
</style>

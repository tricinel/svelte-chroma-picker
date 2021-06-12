import chroma from 'chroma-js';

/**
 * Check if a string is a valid color
 * valid('#fff) // true
 * valid('#fafafa) // true
 * valid('white') // true
 * valid('avocado') // false
 * String -> Boolean
 */
export const { valid } = chroma;

/**
 * Change the value of a single channel for a color
 * @param {String}  color The color to adjust the channel for
 * @param {String}  channel The channel to adjust. This needs to meet chroma's format, see: https://vis4.net/chromajs/#color-set
 * @param {String}  value The new channel value.
 * @return {String} The HEX code for the new color
 * (String, String, String) -> String
 */
export const setChannel = (color, channel, value) =>
  chroma(color).set(channel, value).hex();

/**
 * Return the channels for a given color
 * @param {String} color The color to get the channels for
 * @return {Object} The rgb and hsv channels as an object
 * String -> { { Number, Number, Number } }
 */
export const channels = (color) => {
  const chromaColor = chroma(color);
  return {
    rgb: {
      r: chromaColor.get('rgb.r'),
      g: chromaColor.get('rgb.g'),
      b: chromaColor.get('rgb.b')
    },
    hsv: {
      h: chromaColor.get('hsv.h'),
      s: chromaColor.get('hsv.s'),
      v: chromaColor.get('hsv.v')
    }
  };
};

/**
 *
 * @param {Number} hue The Hue for the color
 * @param {Number} saturation The Saturation for the color
 * @param {Number} value The Value for the color
 * @return {Array} The red, green, and blue component for the color
 * (String, String, String) -> [Number, Number, Number]
 */
export const hsvToRgb = (hue, saturation, value) =>
  chroma.hsv(hue, saturation, value).rgb();

/**
 *
 * @param {Number} hue The Hue for the color
 * @param {Number} saturation The Saturation for the color
 * @param {Number} value The Value for the color
 * @return {String} The HEX code for the new color
 * (String, String, String) -> String
 */
export const hsvToHex = (hue, saturation, value) =>
  chroma.hsv(hue, saturation, value).hex();

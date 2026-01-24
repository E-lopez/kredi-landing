import { getRandomInt } from "./mathFunctions";

const bgColors = ['#9dc4f5', '#fbe74e', '#ffd0e2', '#ecefec', '#ebbbcd', '#bcbbeb', '#d6cb78', '#d6b578', '#9dc4f5', '#fbe74e', '#ffd0e2', '#ecefec', '#ebbbcd', '#bcbbeb', '#d6cb78', '#d6b578'];
const buttonBgs = ['#fbe74e', '#ebbbcd', '#bcbbeb', '#DBF4A7']

const arrays = {
  backgrounds: bgColors,
  button: buttonBgs,
}

export function randomColor(arrayName: keyof typeof arrays = 'backgrounds') {
  const colorArray = arrays[arrayName];
  return colorArray[getRandomInt(-1, colorArray.length)];
};

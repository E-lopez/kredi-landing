export function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z));
};

export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};


export function roundThreePlaces(number: number) {
  return Math.round((number)*1000)/1000
}
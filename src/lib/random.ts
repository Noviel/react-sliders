/* Lets pretend that Math.random() gives a correct random distribution */
export const int = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

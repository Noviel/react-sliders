export const insertItem = <T>(array: T[], index, item: T) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];

export const removeItem = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];

export const indexOf = (fn: Function) => (arr: number[]) =>
  arr.reduce((target, x, i, total) => (fn(x, total[target]) ? i : target), 0);

export const indexOfMax = indexOf((a, b) => a > b);
export const indexOfMin = indexOf((a, b) => a < b);

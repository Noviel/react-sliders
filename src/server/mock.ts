import { int } from '../lib/random';
import { DataEntry } from '../../@types';

export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const get = async (
  count: number,
  empty = false,
  delay = 1500,
  canFail = false
) => {
  console.log(`Fetching ${count} elements`);
  
  if (count < 0) {
    return Promise.reject('Wrong requested elements count.');
  }

  // emulate server latency
  await wait(delay);

  // sometimes server can be unavailable
  if (canFail && Math.random() > 0.8) {
    return Promise.reject('Oops. Something went wrong.');
  }

  const array: DataEntry[] = new Array(count);

  for (let i = 0; i < count; i++) {
    array[i] = {
      name: `item ${i}`,
      percent: empty ? 0 : int(0, 100),
    };
  }

  console.log(array);

  return array;
};

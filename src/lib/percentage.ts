import { insertItem, indexOfMax, indexOfMin } from './common';

export const initialCorrect = (data: number[]) => {
  // do not correct a single element
  if (data.length === 1) {
    return data;
  }
  const target = 100;
  const errorCoeff = target / data.reduce((acc, curr) => acc + curr, 0);

  console.log('initial correction');

  return data.map(v => v * errorCoeff);
};

export const correct = (data: number[], basisIndex = 0, delta = 0) => {
  const workData = [...data];
  let workDelta = delta;

  const error = workData.reduce((acc, curr) => acc + curr, 0) - 100;

  if (Math.abs(error) <= 1) {
    return workData;
  }

  workDelta = delta || error;

  const withoutBasis = workData.filter((_, index) => index !== basisIndex);

  const compensationIndex =
    workDelta > 0 ? indexOfMax(withoutBasis) : indexOfMin(withoutBasis);

  withoutBasis[compensationIndex] -= workDelta;

  if (withoutBasis[compensationIndex] < 0) {
    withoutBasis[compensationIndex] = 0;
  } else if (withoutBasis[compensationIndex] > 100) {
    withoutBasis[compensationIndex] = 100;
  }

  return insertItem(withoutBasis, basisIndex, data[basisIndex]);
};

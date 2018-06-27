import { Dispatch } from 'redux';

import { DataEntry } from '../../@types';
import { get } from '../server/mock';
import * as actions from './action-types';

export const setData = (data: DataEntry[]) => ({
  type: actions.SET_DATA,
  payload: data,
});

export const fetchDataFailed = (text: string) => ({
  type: actions.FETCH_DATA_FAILED,
  payload: { text },
});

export const fetchDataSuccess = (count: number) => ({
  type: actions.FETCH_DATA_SUCCESS,
  payload: { count },
});

export const isolatedItemPercentChange = (index: number, percent: number) => ({
  type: actions.ITEM_ISOLATED_CHANGE,
  payload: { index, percent },
});

export const correctPercentages = (
  correctionBasisIndex: number,
  delta: number
) => ({
  type: actions.CORRECT_PERCENTAGES,
  payload: {
    correctionBasisIndex,
    delta,
  },
});

export const changeItemPercent: any = (index: number, percent: number) => (
  dispatch: Dispatch,
  getState
) => {
  const delta = percent - getState().items.list[index].percent;
  // change percent of the target
  dispatch(isolatedItemPercentChange(index, percent));
  // correct other
  dispatch(correctPercentages(index, delta));
};

export const fetchData: any = (count: number) => (dispatch: Dispatch) => {
  dispatch({ type: actions.FETCH_DATA });

  return get(count)
    .then(data => {
      dispatch(fetchDataSuccess(data.length));
      dispatch(setData(data));
      // correct the initial data
      dispatch({ type: actions.INITIAL_CORRECT_PERCENTAGES });
    })
    .catch(err => dispatch(fetchDataFailed(err)));
};

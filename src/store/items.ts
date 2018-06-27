import { AnyAction } from 'redux';
import { DataEntry } from '../../@types';

import * as actions from './action-types';

import { correct, initialCorrect } from '../lib/percentage';

export type ItemsState = {
  list: DataEntry[];
  status: 'empty' | 'loading' | 'loaded' | 'error';
  error: string;
};

const initialState: ItemsState = { list: [], status: 'empty', error: '' };

const updateObjectInArray = (array, { index, content }) =>
  array.map((item, i) => {
    if (i !== index) {
      return item;
    }
    return {
      ...item,
      ...content,
    };
  });

export const items = (state: ItemsState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case actions.SET_DATA:
      return { ...state, list: payload };

    case actions.FETCH_DATA:
      return { ...state, status: 'loading', list: [] };
    case actions.FETCH_DATA_SUCCESS:
      return { ...state, status: 'loaded', error: '' };
    case actions.FETCH_DATA_FAILED:
      return { ...state, status: 'error', error: payload };

    case actions.ITEM_ISOLATED_CHANGE:
      return {
        ...state,
        list: updateObjectInArray(state.list, {
          index: payload.index,
          content: { percent: payload.percent },
        }),
      };

    case actions.INITIAL_CORRECT_PERCENTAGES: {
      // get pure percentage data as an array
      const data = state.list.map(el => el.percent);
      // correct and link back the corrected data with names
      const corrected = initialCorrect(data).map((percent, index) => ({
        name: state.list[index].name,
        percent,
      }));
      return { ...state, list: corrected };
    }

    case actions.CORRECT_PERCENTAGES: {
      const data = state.list.map(el => el.percent);
      const corrected = correct(data, payload.correctionBasisIndex).map(
        (percent, index) => ({
          name: state.list[index].name,
          percent,
        })
      );

      return { ...state, list: corrected };
    }
    default:
      return state;
  }
};

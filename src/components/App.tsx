import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Item } from './Item';
import { ItemsState } from '../store/items';
import { fetchData, changeItemPercent } from '../store/actions';

import { int } from '../lib/random';

const styles = require('./App.module.css');

export interface IAppProps {
  items: ItemsState;
  dispatch: Dispatch;
  count: number;
}

export class UnconnectedApp extends React.Component<IAppProps> {
  static defaultProps: Partial<IAppProps> = {
    count: 5,
  };

  constructor(props) {
    super(props);
  }

  public render() {
    const { items: { list, error, status }, dispatch, count } = this.props;
    if (status === 'loading') {
      return 'Loading from the server (kind of)...';
    } else if (status === 'error') {
      return (
        <>
          Unlucky. Sometimes loading from the server will result in error. Try
          again, please.
          {error}
          <button onClick={() => dispatch(fetchData(int(1, 9)))}>Retry</button>
        </>
      );
    }
    return (
      <div className={styles.app}>
        {list &&
          list.map(({ name, percent }, index) => (
            <Item
              key={name}
              value={percent}
              onChange={v => dispatch(changeItemPercent(index, v))}
            />
          ))}
        <br />
        Load new elements:
        <button onClick={() => dispatch(fetchData(int(1, 9)))}>1-9</button>
        <button onClick={() => dispatch(fetchData(count))}>{count}</button>
      </div>
    );
  }
}

export const App = connect(store => store)(UnconnectedApp);

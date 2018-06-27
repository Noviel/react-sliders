import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'rc-slider/assets/index.css';

import { App } from './components/App';
import { store } from './store/store';
import { fetchData } from './store/actions';

// fetch initial data
store.dispatch(fetchData(7));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

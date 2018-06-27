import React from 'react';

import * as NumericInput from 'react-numeric-input';
import Slider from 'rc-slider';
import throttle from 'lodash.throttle';

import { ItemsState } from '../store/items';

const styles = require('./Item.module.css');

export interface IAppProps {
  value: number;
  onChange?: (number) => any;
  items?: ItemsState;
}

export class Item extends React.Component<IAppProps> {
  onChange: (number) => any;

  constructor(props) {
    super(props);
    this.onChange = throttle(props.onChange, 40);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }

  render() {
    return (
      <div className={styles.item}>
        <Slider
          value={this.props.value}
          onChange={this.onChange}
          className={styles.slider}
        />
        <NumericInput
          min={0}
          max={100}
          precision={2}
          value={this.props.value}
          onChange={this.onChange}
          format={num => `${num} %`}
        />
      </div>
    );
  }
}

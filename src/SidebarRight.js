import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectDescription,
  setDescription,
  selectCount,
} from './counterSlice';

export default () => {
  const dispatch = useDispatch();
  const description = useSelector(selectDescription);

  return (
    <aside id='sidebar-right'>
      <h1>Right Side Panel</h1>
      <br/>
      <br/>
      <br/>
      <h1>{description}</h1>
    </aside>
  );
};

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectedK8Key,
  selectDescription,
  setK8Key,
  setDescription,
  selectCount,
  selectK8json,
  setK8JsonContent
} from './counterSlice';

export default () => {
  
  const dispatch = useDispatch();
  const k8Key = useSelector(selectedK8Key);
  const k8json = useSelector(selectK8json);
  let apiVersion = '';
  if(k8json && k8Key) {
    apiVersion = k8json[k8Key].apiVersion
  }
  
  const handleChange = (e) => {
    dispatch(setK8JsonContent({key: k8Key, value: e.target.value}))
  };

  return (
    <aside id='sidebar-right'>
      <h1>{k8Key}</h1>
      <br/>
      <input onChange={(event) => handleChange(event)}/>
    </aside>
  );
};


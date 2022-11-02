import React, { useEffect, useState, useRef, memo } from 'react';
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

  useEffect(() => {
    if(k8json && k8Key && k8json[k8Key]) {
      document.querySelector("#slectedObjDescription").value = JSON.stringify(k8json[k8Key])
    }
  }, [k8Key]);

  
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(setK8JsonContent({key: k8Key, value: JSON.parse(e.target.value)}))
  };

  return (
    <aside id='sidebar-right'>
      <h1>{k8Key}</h1>
      <br/>
      <textarea id="slectedObjDescription" onChange={(event) => handleChange(event)} rows ="10"></textarea>
    </aside>
  );
};


import React, { useEffect, useState, useRef, memo } from 'react';
import { Handle, Position, useReactFlow, useUpdateNodeInternals, Background } from 'reactflow';
import {
  makeMoveable,
  Rotatable,
  Draggable,
  Resizable,
  OnResize,
  OnRotate,
} from 'react-moveable';

import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  setDescription,
  setK8Key,
  selectedK8Key,
  selectK8json,
  selectDescription,
  selectCount,
} from './counterSlice';

const Moveable = makeMoveable([Draggable, Resizable, Rotatable]);

function ResizeRotateNode({
  id,
  selected,
  sourcePosition = Position.Left,
  targetPosition = Position.Right,
  data}) {

  const dispatch = useDispatch();
  // const count = useSelector((state) => state.counter.value);
  const count = 12
  // const description = useSelector(selectedK8Key);
  
  const m_k8json = useSelector(selectK8json);
  const m_json = m_k8json[data.label];

  const nodeRef = useRef(null);
  const resizeRef = useRef(null);
  const { setNodes } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);
  const [resizable, setResizable] = useState(true);
  const [rotatable, setRotatable] = useState(true);

  // useEffect(() => {
  //   nodeRef.current = document.querySelector(`.react-flow__node[data-id="${id}"]`);
  // }, [id]);
  nodeRef.current = document.querySelector(`.react-flow__node[data-id="${id}"]`);
  
  if(m_json) {
    data.content = JSON.stringify(m_json);
  }

  const onResize = (evt) => {
    if (!nodeRef.current) {
      return;
    }

    evt.delta[0] && (nodeRef.current.style.width = `${evt.width}px`);
    evt.delta[1] && (nodeRef.current.style.height = `${evt.height}px`);

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          node.position = {
            x: evt.direction[0] === -1 ? node.position.x - evt.delta[0] : node.position.x,
            y: evt.direction[1] === -1 ? node.position.y - evt.delta[1] : node.position.y,
          };
        }
        return node;
      })
    );
  };

  const onRotate = (evt) => {
    console.log('onRotateevt: ', evt);
    setRotation(evt.rotation);
    updateNodeInternals(id);
  };
  
  return (
    <>
      <Moveable
        className="nodrag"
        resizable={selected && resizable}
        // rotatable={selected && rotatable}
        hideDefaultLines={!selected}
        target={resizeRef}
        onResize={onResize}
        onRotate={onRotate}
        origin={true}
        keepRatio={false}
        throttleResize={10}
        renderDirections={["nw", "ne", "sw", "se"]}
      />
      <div
        ref={resizeRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#232426',
          borderRadius: 4,
          color: '#969b9e',
          padding: 20,
          transform: `rotate(${rotation}deg)`,
        }}
        onClick={() => dispatch(setK8Key(data?.label))}
      >
        <div>
          
          <h1>{data?.label}</h1>
          <br/>
          {data?.content}
          <p>{count}</p>
          {/* <div>
            <label>
              <input type="checkbox" checked={resizable} onChange={(evt) => setResizable(evt.target.checked)} />
              resizable
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" checked={rotatable} onChange={(evt) => setRotatable(evt.target.checked)} />
              rotatable
            </label>
          </div> */}
        </div>
        {/* <Handle style={{ opacity: 0.5 , background: "red"}} position={sourcePosition} type="source" /> */}
        <Handle style={{ opacity: 0.5 , background: "white"}} id="a" position="left" type="source" />
        <Handle style={{ opacity: 0.5 , background: "white"}} id="ab" position="top" type="source" />
        <Handle style={{ opacity: 1 , background: "black"}} id="b" position="right" type="source" />
        <Handle style={{ opacity: 1 , background: "black"}} id="c" position="bottom" type="source" />

        {/* <Handle style={{ opacity: 1, background: "blue" }} position={targetPosition} type="target" /> */}
      </div>
    </>
  );
}

export default memo(ResizeRotateNode);
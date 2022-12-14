import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  NodeProps
} from 'reactflow';

import {k8Relations} from "./config.js";

import { useSelector, useDispatch } from 'react-redux';
import {setK8json} from './counterSlice';

import ResizeRotateNode from './ResizeRotateNode';

import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import SidebarRight from './SidebarRight';
import './index.css';

const initialNodes = [
  // {
  //   id: '1',
  //   type: 'resizeRotate',
  //   data: { label: 'input node', content:  "This is a info of block"},
  //   position: { x: 250, y: 5 }
  // },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  resizeRotate: ResizeRotateNode,
};

const DnDFlow = () => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://k8json.herokuapp.com/k8sObjs") // http://localhost:3011/k8sObjs
    .then((res) => {
      return res.text()
    })
    .then((data) => {
      var domObjs = JSON.parse(data);
      dispatch(setK8json(domObjs));
    });
  }, []);
  

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      let nodeData = event.dataTransfer.getData('application/reactflow');
      nodeData = JSON.parse(nodeData);
      console.log('nodeData: ', nodeData);

      // check if the dropped element is valid
      if (typeof nodeData === 'undefined' || !nodeData) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newId = getId();
      const newNode = {
        id: newId,
        type: "resizeRotate",
        position,
        data: { label: `${nodeData.key}`, content:  `${nodeData.body.apiVersion}`, data:  nodeData.body},
      };

      let tempNodes = [];
      setNodes((nds) => {
        tempNodes = nds.concat(newNode)
        return tempNodes
      });

      const newEdgeId = Math.random();
      console.log("here1===>", nodes.length);

      tempNodes.forEach(node => {
        console.log('node: ', node);
        var flag = k8Relations(newNode.data.data, node.data.data);
        console.log('flag: ', flag);
        if(flag) {
          const newEdgeId = "edge_" + Math.random();
          setEdges((eds) => addEdge({ id: newEdgeId, source: newId , target: node.id, label: 'con' }, eds))
        }
      });
      
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodeTypes = {nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            connectionMode="loose"
          >
            {/* <Controls /> */}
            <Background style={{ background: "#323232" }} color="#ddd" />
          </ReactFlow>
        </div>
        <SidebarRight />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;

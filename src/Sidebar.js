import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      {/* <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div> */}
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'pod_1')} draggable>
        Pod_1
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'pod_2')} draggable>
        Pod_2
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Ingress')} draggable>
        Ingress
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Namespace')} draggable>
        Namespace
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Persistant')} draggable>
        Persistant
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'PVC')} draggable>
        PVC
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Service')} draggable>
        Service
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Statefulset')} draggable>
        Statefulset
      </div>
      
    </aside>
  );
};

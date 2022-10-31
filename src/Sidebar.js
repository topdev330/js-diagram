import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default () => {
  
  const [results, setResults] = useState([]);
  const k8json = useSelector((state) => state.counter.k8json);
  useEffect(() => {
    var tmpArr = [];
      for (const key in k8json) {
        if (k8json.hasOwnProperty(key)) {
          const content = JSON.stringify({key: key, body: k8json[key]})
          tmpArr.push(
            <div key={key} className="dndnode" onDragStart={(event) => onDragStart(event, content)} draggable>
              {key}
            </div>
          );
        }
      }
      setResults(tmpArr);
  }, [k8json]);

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      {results}
      {/* <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div> */}
      
    </aside>
  );
};

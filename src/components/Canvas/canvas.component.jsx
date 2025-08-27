import { useEffect, useRef, useState } from 'react';
import './canvas.styles.scss';

import { Layer, Stage } from 'react-konva';
import CanvasTable from '../CanvasTable/canvas-table.component';

const Canvas = (props) => {
  const { tables } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [canvasTables, setCanvasTables] = useState({});
  const wrapperRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (wrapperRef.current?.offsetHeight && wrapperRef.current?.offsetWidth) {
      setDimensions({
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight,
      });
    }
  }, []);

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e) {
    handleDragLeave();
    const tableName = e.dataTransfer.getData('tableName');
    const table = tables[tableName];
    setCanvasTables((pv) => ({ ...pv, [tableName]: table }));
  }

  return (
    <div
      ref={wrapperRef}
      className={`${'builder-canvas-wrapper'} ${
        isDragging ? 'builder-canvas-wrapper-is-dragging' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          {Object.entries(canvasTables).map(([tableName, value]) => {
            value.name = tableName;
            return <CanvasTable key={tableName} table={value} />;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
